<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

class BackgroundRemovalService
{
    private const TEMP_CUTOUT_PATTERN = '/^runway\/tmp\/[0-9a-f-]{36}_cutout\.png$/';
    private const TEMP_ORIGINAL_PATTERN = '/^runway\/tmp\/[0-9a-f-]{36}_original\.(jpg|jpeg|png|webp)$/';

    /**
     * Resolve Python executable for both development (Windows/Laragon/venv) and production (Linux/venv).
     */
    public function resolvePythonBinary(): string
    {
        $configured = config('services.rembg.python_path');
        if (is_string($configured) && trim($configured) !== '') {
            return trim($configured);
        }

        $candidates = [
            base_path('.venv-rembg/Scripts/python.exe'),
            base_path('.venv-rembg/bin/python'),
            base_path('.venv/Scripts/python.exe'),
            base_path('.venv/bin/python'),
        ];

        // Check Laragon Python installations on Windows development environments
        if (DIRECTORY_SEPARATOR === '\\') {
            $laragonMatches = glob('C:\\laragon\\bin\\python\\python-*\\python.exe') ?: [];
            rsort($laragonMatches);
            $candidates = array_merge($candidates, $laragonMatches);
        }

        foreach ($candidates as $path) {
            if (is_string($path) && is_file($path)) {
                return $path;
            }
        }

        return DIRECTORY_SEPARATOR === '\\' ? 'python' : 'python3';
    }

    /**
     * Process an uploaded image with rembg U2Net and store both original backup and transparent PNG
     * inside runway/tmp/ for admin preview confirmation.
     *
     * @return array<string, mixed>
     */
    public function removeBackgroundToTemporaryPreview(UploadedFile $file): array
    {
        $ext = strtolower($file->getClientOriginalExtension() ?: $file->extension() ?: 'png');
        if (! in_array($ext, ['jpg', 'jpeg', 'png', 'webp'], true)) {
            $ext = 'png';
        }

        $rawBytes = @file_get_contents($file->getRealPath());
        if ($rawBytes === false || $rawBytes === '') {
            throw new RuntimeException('Gagal membaca file foto yang diunggah.');
        }

        return $this->removeBackgroundFromBytes($rawBytes, $ext);
    }

    /**
     * Process raw image bytes with rembg U2Net and store original backup + transparent PNG
     * inside runway/tmp/ for admin preview confirmation.
     *
     * @return array<string, mixed>
     */
    public function removeBackgroundFromBytes(string $rawBytes, string $ext = 'png'): array
    {
        $this->pruneStaleTempFiles();

        $disk = Storage::disk('public');
        $token = Str::uuid()->toString();
        $ext = strtolower($ext);
        if (! in_array($ext, ['jpg', 'jpeg', 'png', 'webp'], true)) {
            $ext = 'png';
        }

        $originalRelative = "runway/tmp/{$token}_original.{$ext}";
        $cutoutRelative = "runway/tmp/{$token}_cutout.png";

        // Store original photo first as backup
        $stored = $disk->put($originalRelative, $rawBytes);
        if (! $stored) {
            throw new RuntimeException('Gagal menyimpan foto sementara untuk diproses.');
        }

        $inputAbsolute = $disk->path($originalRelative);
        $outputAbsolute = $disk->path($cutoutRelative);

        try {
            $meta = $this->runRembgProcess($inputAbsolute, $outputAbsolute);
        } catch (RuntimeException $e) {
            $disk->delete([$originalRelative, $cutoutRelative]);
            throw $e;
        }

        if (! $disk->exists($cutoutRelative) || filesize($outputAbsolute) === 0) {
            $disk->delete([$originalRelative, $cutoutRelative]);
            throw new RuntimeException('AI tidak menghasilkan gambar output yang valid. Silakan coba foto lain.');
        }

        $imageInfo = @getimagesize($outputAbsolute);
        if ($imageInfo === false || ($imageInfo[2] ?? null) !== IMAGETYPE_PNG) {
            $disk->delete([$originalRelative, $cutoutRelative]);
            throw new RuntimeException('Hasil pemrosesan AI bukan format PNG yang valid.');
        }

        return [
            'token' => $token,
            'preview_url' => '/storage/'.$cutoutRelative,
            'original_url' => '/storage/'.$originalRelative,
            'processed_path' => $cutoutRelative,
            'original_path' => $originalRelative,
            'width' => $meta['width'] ?? $imageInfo[0],
            'height' => $meta['height'] ?? $imageInfo[1],
            'model' => $meta['model'] ?? config('services.rembg.model', 'u2net'),
        ];
    }

    /**
     * Promote confirmed temporary cutout and original backup into permanent runway storage.
     *
     * @return array{image: string, original_image: ?string}
     */
    public function finalizeTemporaryFiles(string $processedPath, ?string $originalPath = null): array
    {
        if (! preg_match(self::TEMP_CUTOUT_PATTERN, $processedPath)) {
            throw new RuntimeException('Path hasil penghapusan background tidak valid.');
        }

        $disk = Storage::disk('public');
        if (! $disk->exists($processedPath)) {
            throw new RuntimeException('File hasil preview tidak ditemukan atau sudah kedaluwarsa. Silakan unggah ulang foto.');
        }

        $finalId = Str::uuid()->toString();
        $finalCutoutRelative = "runway/{$finalId}.png";

        if (! $disk->move($processedPath, $finalCutoutRelative)) {
            throw new RuntimeException('Gagal menyimpan gambar hasil penghapusan background.');
        }

        $finalOriginalUrl = null;
        if (is_string($originalPath) && $originalPath !== '' && preg_match(self::TEMP_ORIGINAL_PATTERN, $originalPath, $matches)) {
            if ($disk->exists($originalPath)) {
                $ext = $matches[1];
                $finalOriginalRelative = "runway/originals/{$finalId}.{$ext}";
                if ($disk->move($originalPath, $finalOriginalRelative)) {
                    $finalOriginalUrl = '/storage/'.$finalOriginalRelative;
                }
            }
        }

        return [
            'image' => '/storage/'.$finalCutoutRelative,
            'original_image' => $finalOriginalUrl,
        ];
    }

    /**
     * Safely delete temporary preview files when admin re-uploads or cancels.
     */
    public function discardTemporaryFiles(?string $processedPath, ?string $originalPath = null): void
    {
        $disk = Storage::disk('public');

        if (is_string($processedPath) && preg_match(self::TEMP_CUTOUT_PATTERN, $processedPath)) {
            $disk->delete($processedPath);
        }

        if (is_string($originalPath) && preg_match(self::TEMP_ORIGINAL_PATTERN, $originalPath)) {
            $disk->delete($originalPath);
        }
    }

    /**
     * Delete both cutout and original backup images associated with a runway record.
     *
     * @param array<string, mixed> $recordData
     */
    public function deleteStoredRunwayAssets(array $recordData): void
    {
        $disk = Storage::disk('public');

        foreach (['image', 'original_image'] as $key) {
            $url = $recordData[$key] ?? null;
            if (is_string($url) && str_starts_with($url, '/storage/runway/')) {
                $relative = substr($url, strlen('/storage/'));
                $disk->delete($relative);
            }
        }
    }

    /**
     * Execute the local Python rembg script with timeout and deterministic model cache directory.
     *
     * @return array<string, mixed>
     */
    private function runRembgProcess(string $inputAbsolute, string $outputAbsolute): array
    {
        $python = $this->resolvePythonBinary();
        $script = config('services.rembg.script_path', base_path('scripts/remove_background.py'));
        $model = (string) config('services.rembg.model', 'u2net');
        $cacheDir = (string) config('services.rembg.cache_dir', storage_path('app/rembg-models'));
        $timeout = max(30, (int) config('services.rembg.timeout', 120));
        $alphaMatting = (bool) config('services.rembg.alpha_matting', false);

        if (! is_file($script)) {
            Log::error('rembg script missing', ['script' => $script]);
            throw new RuntimeException('Konfigurasi layanan AI background remover belum lengkap.');
        }

        if (! is_dir($cacheDir)) {
            @mkdir($cacheDir, 0755, true);
        }

        // Prevent PHP from timing out before the subprocess timeout finishes
        if (function_exists('set_time_limit')) {
            @set_time_limit($timeout + 30);
        }

        $command = [
            $python,
            $script,
            '--input',
            $inputAbsolute,
            '--output',
            $outputAbsolute,
            '--model',
            $model,
        ];

        if ($alphaMatting) {
            $command[] = '--alpha-matting';
        }

        // Inherit full OS environment (critical on Windows when php.ini variables_order=GPCS omits $_ENV)
        $baseEnv = getenv();
        $env = is_array($baseEnv) ? $baseEnv : [];
        $env['U2NET_HOME'] = $cacheDir;
        $env['NUMBA_CACHE_DIR'] = storage_path('framework/cache');
        $env['OMP_NUM_THREADS'] = '4';
        $env['PYTHONIOENCODING'] = 'utf-8';
        if (empty($env['TEMP']) && empty($env['TMP'])) {
            $env['TEMP'] = sys_get_temp_dir();
            $env['TMP'] = sys_get_temp_dir();
        }
        if (empty($env['USERPROFILE']) && empty($env['HOME'])) {
            $env['HOME'] = $cacheDir;
            $env['USERPROFILE'] = $cacheDir;
        }

        try {
            $result = Process::timeout($timeout)
                ->env($env)
                ->run($command);
        } catch (\Throwable $e) {
            Log::error('rembg process execution exception', [
                'message' => $e->getMessage(),
                'model' => $model,
            ]);

            throw new RuntimeException('Proses penghapusan background melebihi batas waktu atau gagal dijalankan. Silakan coba lagi.');
        }

        if (! $result->successful()) {
            $stderr = $result->errorOutput();
            Log::error('rembg process failed', [
                'exit_code' => $result->exitCode(),
                'stderr_tail' => strlen($stderr) > 1500 ? substr($stderr, -1500) : $stderr,
                'stdout' => Str::limit($result->output(), 500),
            ]);

            throw new RuntimeException('Gagal menghapus background foto dengan AI. Pastikan foto jelas dan coba lagi.');
        }

        $decoded = json_decode(trim($result->output()), true);
        if (! is_array($decoded) || empty($decoded['success'])) {
            Log::error('rembg returned unexpected output', [
                'stdout' => Str::limit($result->output(), 500),
            ]);
            throw new RuntimeException('Respons AI background remover tidak valid. Silakan coba lagi.');
        }

        return $decoded;
    }

    /**
     * Clean up abandoned temporary preview files older than 24 hours.
     */
    private function pruneStaleTempFiles(int $olderThanHours = 24): void
    {
        $disk = Storage::disk('public');
        if (! $disk->exists('runway/tmp')) {
            return;
        }

        $cutoff = time() - ($olderThanHours * 3600);
        foreach ($disk->files('runway/tmp') as $file) {
            if ($disk->lastModified($file) < $cutoff) {
                $disk->delete($file);
            }
        }
    }
}
