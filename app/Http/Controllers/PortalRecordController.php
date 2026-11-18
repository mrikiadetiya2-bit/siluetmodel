<?php

namespace App\Http\Controllers;

use App\Models\PortalRecord;
use App\Services\BackgroundRemovalService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class PortalRecordController extends Controller
{
    private const TYPES = ['testimonial', 'gallery', 'settings', 'contact', 'certificate', 'booking', 'runway'];

    public function __construct(
        private readonly BackgroundRemovalService $backgroundRemoval,
    ) {}

    public function removeRunwayBackground(Request $request): JsonResponse
    {
        $maxKb = (int) config('services.rembg.max_upload_kb', 5120);
        $maxMbLabel = round($maxKb / 1024, 1);

        try {
            if ($request->filled('image_base64')) {
                $request->validate([
                    'image_base64' => ['required', 'string'],
                ]);

                $dataUri = (string) $request->input('image_base64');
                if (! preg_match('/^data:image\/(jpeg|jpg|png|webp);base64,([A-Za-z0-9+\/\s]+=*)$/', $dataUri, $matches)) {
                    return response()->json([
                        'message' => 'Format gambar harus JPG, JPEG, PNG, atau WEBP.',
                    ], 422);
                }

                $rawBytes = base64_decode(preg_replace('/\s+/', '', $matches[2]), true);
                if ($rawBytes === false || $rawBytes === '') {
                    return response()->json([
                        'message' => 'Data foto tidak valid atau rusak.',
                    ], 422);
                }

                if (strlen($rawBytes) > ($maxKb * 1024)) {
                    return response()->json([
                        'message' => "Ukuran foto maksimal {$maxMbLabel} MB.",
                    ], 422);
                }

                $imgInfo = @getimagesizefromstring($rawBytes);
                $allowedTypes = [
                    IMAGETYPE_JPEG => 'jpg',
                    IMAGETYPE_PNG => 'png',
                    IMAGETYPE_WEBP => 'webp',
                ];
                if ($imgInfo === false || ! isset($allowedTypes[$imgInfo[2] ?? 0])) {
                    return response()->json([
                        'message' => 'File yang diunggah bukan gambar JPG, PNG, atau WEBP yang valid.',
                    ], 422);
                }

                $result = $this->backgroundRemoval->removeBackgroundFromBytes($rawBytes, $allowedTypes[$imgInfo[2]]);

                return response()->json($result);
            }

            $request->validate([
                'image' => ['required', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:'.$maxKb],
            ], [
                'image.required' => 'Pilih foto model terlebih dahulu.',
                'image.uploaded' => 'Foto gagal diunggah karena melebihi batas upload PHP server ('.ini_get('upload_max_filesize').').',
                'image.image' => 'File yang diunggah harus berupa gambar.',
                'image.mimes' => 'Format gambar harus JPG, JPEG, PNG, atau WEBP.',
                'image.max' => "Ukuran foto maksimal {$maxMbLabel} MB.",
            ]);

            $result = $this->backgroundRemoval->removeBackgroundToTemporaryPreview($request->file('image'));

            return response()->json($result);
        } catch (\Illuminate\Validation\ValidationException $e) {
            throw $e;
        } catch (RuntimeException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        } catch (\Throwable $e) {
            Log::error('Unexpected runway background removal error', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'Terjadi kesalahan saat menghapus background foto. Silakan coba lagi.',
            ], 500);
        }
    }

    public function discardRunwayPreview(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'processed_path' => ['nullable', 'string', 'max:255'],
            'original_path' => ['nullable', 'string', 'max:255'],
        ]);

        $this->backgroundRemoval->discardTemporaryFiles(
            $validated['processed_path'] ?? null,
            $validated['original_path'] ?? null,
        );

        return response()->json(['message' => 'Preview sementara dihapus.']);
    }

    public function index(string $type): JsonResponse
    {
        abort_unless(in_array($type, self::TYPES, true), 404);

        return response()->json(PortalRecord::query()->where('type', $type)->latest()->get());
    }

    public function update(Request $request, PortalRecord $record): JsonResponse
    {
        abort_unless(in_array($record->type, self::TYPES, true), 404);
        $data = $request->validate([
            'data' => ['sometimes', 'array'],
            'status' => ['sometimes', 'string', 'max:40'],
        ]);

        if ($record->type === 'gallery') {
            $request->validate([
                'images' => ['sometimes', 'array', 'size:3'],
                'images.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            ]);
            $galleryData = array_merge($record->data ?? [], $request->input('data', []));
            $request->validate([
                'data.title' => ['sometimes', 'required', 'string', 'max:255'],
                'data.audience' => ['sometimes', 'required', 'in:Man,Women,Kids'],
            ]);
            if ($request->hasFile('images')) {
                $oldImages = $record->data['images'] ?? [];
                $galleryData['images'] = array_map(fn ($file) => '/storage/'.$file->store('gallery', 'public'), $request->file('images'));
                $galleryData['image'] = $galleryData['images'][0];
                foreach ($oldImages as $oldImage) {
                    if (is_string($oldImage) && str_starts_with($oldImage, '/storage/')) {
                        Storage::disk('public')->delete(substr($oldImage, strlen('/storage/')));
                    }
                }
            }
            $data['data'] = $galleryData;
        }

        if ($record->type === 'runway') {
            $maxKb = (int) config('services.rembg.max_upload_kb', 5120);
            $request->validate([
                'image' => ['nullable', 'file', 'image', 'mimes:png,webp,jpg,jpeg', 'max:'.$maxKb],
                'processed_path' => ['nullable', 'string', 'max:255'],
                'original_path' => ['nullable', 'string', 'max:255'],
                'data.name' => ['sometimes', 'required', 'string', 'max:255'],
                'data.role' => ['sometimes', 'required', 'string', 'max:255'],
                'data.category' => ['sometimes', 'required', 'string', 'max:100'],
                'data.lookTitle' => ['sometimes', 'required', 'string', 'max:255'],
                'data.lookDesc' => ['nullable', 'string'],
                'data.designer' => ['nullable', 'string', 'max:255'],
                'data.height' => ['nullable', 'string', 'max:50'],
                'data.bookingText' => ['nullable', 'string', 'max:255'],
            ]);
            $runwayData = array_merge($record->data ?? [], $request->input('data', []));

            try {
                if ($request->filled('processed_path')) {
                    $finalized = $this->backgroundRemoval->finalizeTemporaryFiles(
                        (string) $request->input('processed_path'),
                        $request->input('original_path') ? (string) $request->input('original_path') : null,
                    );
                    $this->backgroundRemoval->deleteStoredRunwayAssets($record->data ?? []);
                    $runwayData['image'] = $finalized['image'];
                    if ($finalized['original_image']) {
                        $runwayData['original_image'] = $finalized['original_image'];
                    }
                } elseif ($request->hasFile('image')) {
                    $preview = $this->backgroundRemoval->removeBackgroundToTemporaryPreview($request->file('image'));
                    $finalized = $this->backgroundRemoval->finalizeTemporaryFiles(
                        $preview['processed_path'],
                        $preview['original_path'],
                    );
                    $this->backgroundRemoval->deleteStoredRunwayAssets($record->data ?? []);
                    $runwayData['image'] = $finalized['image'];
                    if ($finalized['original_image']) {
                        $runwayData['original_image'] = $finalized['original_image'];
                    }
                }
            } catch (RuntimeException $e) {
                return response()->json(['message' => $e->getMessage()], 422);
            }

            $data['data'] = $runwayData;
        }

        $record->update($data);

        return response()->json($record->refresh());
    }

    public function destroy(PortalRecord $record): JsonResponse
    {
        abort_unless(in_array($record->type, self::TYPES, true), 404);
        if ($record->type === 'gallery') {
            foreach ($record->data['images'] ?? [$record->data['image'] ?? null] as $image) {
                if (is_string($image) && str_starts_with($image, '/storage/')) {
                    Storage::disk('public')->delete(substr($image, strlen('/storage/')));
                }
            }
        }
        if ($record->type === 'runway') {
            $this->backgroundRemoval->deleteStoredRunwayAssets($record->data ?? []);
        }
        $record->delete();

        return response()->json(['message' => 'Data berhasil dihapus.']);
    }

    public function publicIndex(string $type): JsonResponse
    {
        abort_unless(in_array($type, ['testimonial', 'gallery', 'mentor', 'schedule', 'runway'], true), 404);

        $query = PortalRecord::query()->where('type', $type)->where('status', 'Aktif');

        return response()->json($query->latest()->get());
    }

    public function upsertSettings(Request $request): JsonResponse
    {
        $data = $request->validate([
            'data' => ['required', 'array'],
            'data.name' => ['sometimes', 'string', 'max:255'],
            'data.tagline' => ['sometimes', 'string', 'max:255'],
            'data.email' => ['sometimes', 'email', 'max:255'],
            'data.phone' => ['sometimes', 'string', 'max:40'],
            'data.whatsapp' => ['sometimes', 'string', 'max:40'],
            'data.address' => ['sometimes', 'string', 'max:1000'],
            'data.bcaAccount' => ['sometimes', 'string', 'max:100'],
            'data.mandiriAccount' => ['sometimes', 'string', 'max:100'],
        ]);

        $record = PortalRecord::updateOrCreate(['type' => 'settings'], ['data' => $data['data'], 'status' => 'Aktif']);
        return response()->json($record);
    }

    public function store(Request $request, string $type): JsonResponse
    {
        abort_unless(in_array($type, self::TYPES, true), 404);
        $data = $request->validate([
            'data' => ['required', 'array'],
            'status' => ['sometimes', 'string', 'max:40'],
        ]);
        if (is_string($data['data'] ?? null)) {
            $data['data'] = json_decode($data['data'], true) ?: [];
        }
        if ($type === 'gallery' && is_string($data['data']['campaigns'] ?? null)) {
            $data['data']['campaigns'] = json_decode($data['data']['campaigns'], true) ?: [];
        }
        if ($type === 'contact') {
            $request->validate([
                'data.name' => ['required', 'string', 'max:255'],
                'data.email' => ['required', 'email', 'max:255'],
                'data.phone' => ['nullable', 'string', 'max:40'],
            ]);
        }

        if ($type === 'gallery') {
            $request->validate([
                'images' => ['required', 'array', 'size:3'],
                'images.*' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
                'data.title' => ['required', 'string', 'max:255'],
                'data.category' => ['required', 'string', 'max:100'],
                'data.audience' => ['required', 'in:Man,Women,Kids'],
                'data.date' => ['nullable', 'string', 'max:100'],
                'data.age' => ['nullable', 'integer', 'min:1', 'max:120'],
                'data.height' => ['nullable', 'string', 'max:50'],
                'data.campaigns' => ['nullable', 'array', 'max:20'],
                'data.campaigns.*' => ['string', 'max:255'],
            ]);
            $data['data']['images'] = array_map(fn ($file) => '/storage/'.$file->store('gallery', 'public'), $request->file('images'));
            $data['data']['image'] = $data['data']['images'][0];
        }

        if ($type === 'runway') {
            $maxKb = (int) config('services.rembg.max_upload_kb', 5120);
            $request->validate([
                'image' => ['nullable', 'file', 'image', 'mimes:png,webp,jpg,jpeg', 'max:'.$maxKb],
                'processed_path' => ['nullable', 'string', 'max:255'],
                'original_path' => ['nullable', 'string', 'max:255'],
                'data.name' => ['required', 'string', 'max:255'],
                'data.role' => ['required', 'string', 'max:255'],
                'data.category' => ['required', 'string', 'max:100'],
                'data.lookTitle' => ['required', 'string', 'max:255'],
                'data.lookDesc' => ['nullable', 'string'],
                'data.designer' => ['nullable', 'string', 'max:255'],
                'data.height' => ['nullable', 'string', 'max:50'],
                'data.bookingText' => ['nullable', 'string', 'max:255'],
            ]);

            try {
                if ($request->filled('processed_path')) {
                    $finalized = $this->backgroundRemoval->finalizeTemporaryFiles(
                        (string) $request->input('processed_path'),
                        $request->input('original_path') ? (string) $request->input('original_path') : null,
                    );
                    $data['data']['image'] = $finalized['image'];
                    if ($finalized['original_image']) {
                        $data['data']['original_image'] = $finalized['original_image'];
                    }
                } elseif ($request->hasFile('image')) {
                    $preview = $this->backgroundRemoval->removeBackgroundToTemporaryPreview($request->file('image'));
                    $finalized = $this->backgroundRemoval->finalizeTemporaryFiles(
                        $preview['processed_path'],
                        $preview['original_path'],
                    );
                    $data['data']['image'] = $finalized['image'];
                    if ($finalized['original_image']) {
                        $data['data']['original_image'] = $finalized['original_image'];
                    }
                }
            } catch (RuntimeException $e) {
                return response()->json(['message' => $e->getMessage()], 422);
            }
        }

        $record = DB::transaction(function () use ($type, $data) {
            $record = PortalRecord::create([
                'type' => $type,
                'data' => $data['data'],
                'status' => $data['status'] ?? 'Aktif',
            ]);

            return $record;
        });

        return response()->json($record, 201);
    }

    public function publicStore(Request $request, string $type): JsonResponse
    {
        abort_unless(in_array($type, ['contact', 'booking'], true), 404);

        return $this->store($request, $type);
    }
}
