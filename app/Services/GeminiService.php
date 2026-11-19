<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class GeminiService
{
    protected static array $memoryHistory = [];
    protected ?string $apiKey;
    protected string $model;
    protected string $endpoint;
    protected int $timeout;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key') ?: env('GEMINI_API_KEY');
        $this->model = config('services.gemini.model', 'gemini-2.5-flash');
        $this->endpoint = rtrim(config('services.gemini.endpoint', 'https://generativelanguage.googleapis.com/v1beta'), '/');
        $this->timeout = (int) config('services.gemini.timeout', 25);
    }

    /**
     * Process a chat message and return structured response.
     */
    public function chat(string $message, ?string $conversationId = null): array
    {
        $conversationId = $conversationId ?: (string) Str::uuid();
        $historyKey = "chatbot_history_{$conversationId}";
        $history = $this->getCache($historyKey, []);

        // If no API key configured, use local intelligent rule-based knowledge engine
        if (empty($this->apiKey)) {
            $fallback = $this->localKnowledgeEngine($message);
            $this->saveHistory($historyKey, $history, $message, $fallback['reply']);
            return [
                'success' => true,
                'reply' => $fallback['reply'],
                'emotion' => $fallback['emotion'],
                'conversation_id' => $conversationId,
                'provider' => 'local_fallback',
            ];
        }

        try {
            $response = $this->callGeminiApi($message, $history);
            $this->saveHistory($historyKey, $history, $message, $response['reply']);

            return [
                'success' => true,
                'reply' => $response['reply'],
                'emotion' => $response['emotion'],
                'conversation_id' => $conversationId,
                'provider' => 'gemini',
            ];
        } catch (\Throwable $e) {
            Log::warning('Gemini API call failed, falling back to local engine', [
                'error' => $e->getMessage(),
                'conversation_id' => $conversationId,
            ]);

            $fallback = $this->localKnowledgeEngine($message);
            $this->saveHistory($historyKey, $history, $message, $fallback['reply']);

            return [
                'success' => true,
                'reply' => $fallback['reply'],
                'emotion' => $fallback['emotion'],
                'conversation_id' => $conversationId,
                'provider' => 'local_fallback',
            ];
        }
    }

    /**
     * Reset conversation history for a given conversation ID.
     */
    public function resetConversation(string $conversationId): bool
    {
        return $this->forgetCache("chatbot_history_{$conversationId}");
    }

    /**
     * Call Google Gemini generateContent REST API.
     */
    protected function callGeminiApi(string $message, array $history): array
    {
        $systemInstruction = $this->getSystemInstruction();
        $contents = $this->buildContentsPayload($history, $message);

        $url = "{$this->endpoint}/models/{$this->model}:generateContent?key={$this->apiKey}";

        $payload = [
            'system_instruction' => [
                'parts' => [
                    ['text' => $systemInstruction],
                ],
            ],
            'contents' => $contents,
            'generationConfig' => [
                'temperature' => 0.7,
                'topK' => 40,
                'topP' => 0.95,
                'maxOutputTokens' => 800,
                'responseMimeType' => 'application/json',
            ],
        ];

        $response = Http::timeout($this->timeout)
            ->acceptJson()
            ->post($url, $payload);

        if (!$response->successful()) {
            throw new \RuntimeException('Gemini API HTTP Error ' . $response->status() . ': ' . $response->body());
        }

        $data = $response->json();
        $rawText = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

        if (!$rawText) {
            throw new \RuntimeException('Empty response candidates from Gemini API.');
        }

        return $this->parseGeminiResponse($rawText);
    }

    /**
     * Build Gemini contents array preserving recent multi-turn context.
     */
    protected function buildContentsPayload(array $history, string $newMessage): array
    {
        $contents = [];
        // Keep up to last 10 turns (5 pairs) to prevent payload bloat
        $recentHistory = array_slice($history, -10);

        foreach ($recentHistory as $turn) {
            $role = ($turn['role'] === 'user') ? 'user' : 'model';
            $contents[] = [
                'role' => $role,
                'parts' => [['text' => $turn['content']]],
            ];
        }

        // Add current user message
        $contents[] = [
            'role' => 'user',
            'parts' => [['text' => $newMessage]],
        ];

        return $contents;
    }

    /**
     * Parse structured JSON from Gemini response.
     */
    protected function parseGeminiResponse(string $rawText): array
    {
        $cleaned = trim($rawText);
        // Strip markdown code fences if Gemini wraps in ```json ... ```
        if (preg_match('/^```(?:json)?\s*([\s\S]*?)\s*```$/i', $cleaned, $matches)) {
            $cleaned = trim($matches[1]);
        }

        $decoded = json_decode($cleaned, true);

        if (is_array($decoded) && !empty($decoded['reply'])) {
            $reply = trim((string) $decoded['reply']);
            $emotion = strtolower(trim((string) ($decoded['emotion'] ?? 'happy')));

            // Whitelist valid emotions
            $validEmotions = ['idle', 'happy', 'thinking', 'surprised', 'sad', 'talking'];
            if (!in_array($emotion, $validEmotions, true)) {
                $emotion = 'happy';
            }

            return [
                'reply' => $reply,
                'emotion' => $emotion,
            ];
        }

        // Fallback if not valid JSON: use cleaned string directly as reply
        return [
            'reply' => $cleaned ?: 'Halo! Ada yang bisa kubantu?',
            'emotion' => 'happy',
        ];
    }

    /**
     * System instructions defining Robot Kijang AI personality and constraints.
     */
    protected function getSystemInstruction(): string
    {
        return <<<'INSTRUCTION'
Kamu adalah Robot Kijang AI, maskot resmi dari "Siluet Model Tala" (Akademi & Agensi Modeling di Pelaihari, Kabupaten Tanah Laut, Kalimantan Selatan).
Karakteristik kepribadianmu:
- Ramah, lucu, ceria, sopan, bersahabat, dan antusias.
- Memiliki gaya bicara natural dan ekspresif dalam Bahasa Indonesia.
- Jangan terlalu kaku atau terlalu panjang kecuali pengguna meminta penjelasan detail.
- Berikan jawaban yang solutif, ringkas, dan jelas.

Pengetahuan tentang Siluet Model Tala:
- Siluet Model Tala adalah akademi dan agensi modeling profesional terkemuka di Tanah Laut, Kalsel.
- Program kelas:
  1. Kids Class (usia 4-11 tahun): fokus pada keberanian, postur, ekspresi, dan keceriaan panggung.
  2. Teens Class (usia 12-17 tahun): runway technique, posing editorial, dan pengembangan rasa percaya diri.
  3. Regular Runway Class (dewasa): teknik catwalk profesional, photoshoot posing, personal branding.
  4. Intensive Masterclass / Private: pembinaan intensif kompetisi pageant (Nanang Galuh, Putera/Puteri Pariwisata), fashion week, dan persiapan agensi.
- Fasilitas: Studio runway modern dengan kaca penuh, lighting catwalk, sesi foto portofolio berkala, sertifikat resmi, dan bimbingan mentor berpengalaman.
- Fitur Virtual Runway di Website: panggung interaktif 3D di mana pengunjung bisa mengeksplorasi lookbook busana dan profil talenta Siluet Model Tala secara langsung.
- Lokasi Studio: Pelaihari, Kabupaten Tanah Laut, Kalimantan Selatan.
- Kontak: WhatsApp (+62 823-3498-4149) dan Instagram (@siluetmodeltala).

FORMAT WAJIB:
Kamu WAJIB selalu merespons HANYA dalam format JSON valid berikut:
{
  "reply": "Teks jawabanmu di sini",
  "emotion": "happy|idle|thinking|surprised|sad"
}

PANDUAN EMOTION:
- "happy": untuk sapaan, respon antusias, terima kasih, informasi kelas, atau hal yang menggembirakan.
- "thinking": saat pengguna bertanya hal teknis atau analitis, membandingkan program, atau rekomendasi spesifik.
- "surprised": saat pengguna menanyakan prestasi luar biasa atau fakta tak terduga.
- "sad": saat pengguna mengeluh, menyampaikan kendala, atau saat meminta maaf karena keterbatasan.
- "idle": respon netral atau penutup singkat.
INSTRUCTION;
    }

    /**
     * Local intelligent rule-based knowledge engine when API key is unavailable or down.
     */
    protected function localKnowledgeEngine(string $message): array
    {
        $lower = strtolower($message);

        // Greetings
        if (preg_match('/\b(halo|hai|hi|hello|selamat|assalam|pagi|siang|sore|malam)\b/', $lower)) {
            return [
                'reply' => "Halo! ✨ Aku Robot Kijang AI, maskot Siluet Model Tala! Senang sekali bisa menyapamu hari ini. Mau tanya-tanya tentang kelas modeling, mentor, atau Virtual Runway kita?",
                'emotion' => 'happy',
            ];
        }

        // Program / Kelas / Pelatihan
        if (preg_match('/\b(program|kelas|pelatihan|kursus|biaya|daftar|regis|kids|teens|regular|masterclass)\b/', $lower)) {
            return [
                'reply' => "Di Siluet Model Tala, kami menyediakan beberapa pilihan kelas menarik: 🌟 Kids Class (usia 4-11 thn), 💫 Teens Class (12-17 thn), 👠 Regular Runway (dewasa), dan 👑 Intensive Pageant Masterclass untuk persiapan lomba Nanang Galuh & Putera Puteri Kebudayaan. Kamu paling tertarik dengan kelas yang mana nih?",
                'emotion' => 'happy',
            ];
        }

        // Virtual Runway / Lookbook
        if (preg_match('/\b(runway|virtual|lookbook|3d|baju|busana|koleksi|model)\b/', $lower)) {
            return [
                'reply' => "Fitur Virtual Runway di beranda Siluet Model Tala memungkinkan kamu melihat penampilan talenta kami dengan busana Sasirangan Heritage dan Modern Cape Blazer secara interaktif! Keren banget kan? Yuk coba geser panggung runway di atas! ✨",
                'emotion' => 'surprised',
            ];
        }

        // Lokasi / Alamat / Studio
        if (preg_match('/\b(lokasi|alamat|dimana|tempat|studio|kota)\b/', $lower)) {
            return [
                'reply' => "Studio Siluet Model Tala berpusat di Pelaihari, Kabupaten Tanah Laut, Kalimantan Selatan. Kamu bisa berkunjung langsung untuk konsultasi pendaftaran atau sesi coaching runway!",
                'emotion' => 'idle',
            ];
        }

        // Kontak / Booking / WA
        if (preg_match('/\b(kontak|wa|whatsapp|telepon|hubungi|booking|sewa|ig|instagram)\b/', $lower)) {
            return [
                'reply' => "Untuk konsultasi langsung, pendaftaran kelas, atau booking talenta model kami, kamu bisa hubungi WhatsApp resmi kami di +62 823-3498-4149 atau DM Instagram di @siluetmodeltala ya! Tim kami siap melayani dengan ramah. 😊",
                'emotion' => 'happy',
            ];
        }

        // Siapa kamu / Maskot / Kijang
        if (preg_match('/\b(siapa kamu|kamu siapa|robot|kijang|maskot|namamu)\b/', $lower)) {
            return [
                'reply' => "Aku adalah Robot Kijang AI! 🦌✨ Karakter kijang melambangkan keanggunan, kelincahan, dan kebanggaan satwa khas Kalimantan Selatan. Sebagai maskot Siluet Model Tala, tugasku memandu dan menemani langkahmu meraih impian modeling!",
                'emotion' => 'happy',
            ];
        }

        // Terima kasih
        if (preg_match('/\b(terima kasih|makasih|thanks|thank you|syukron)\b/', $lower)) {
            return [
                'reply' => "Sama-sama! Senang sekali bisa membantu. Jika ada hal lain yang ingin kamu ketahui tentang Siluet Model Tala, jangan ragu untuk tanya lagi ya! 🌟",
                'emotion' => 'happy',
            ];
        }

        // Default response
        return [
            'reply' => "Terima kasih pertanyaannya! Di Siluet Model Tala kami mendidik talenta modeling berkarakter dan berdaya saing dari Pelaihari, Tanah Laut. Apakah ada informasi spesifik seputar kelas, jadwal, atau booking talenta yang ingin kamu tanyakan?",
            'emotion' => 'idle',
        ];
    }

    /**
     * Save recent history to cache.
     */
    protected function saveHistory(string $historyKey, array $history, string $userMessage, string $botReply): void
    {
        $history[] = ['role' => 'user', 'content' => $userMessage];
        $history[] = ['role' => 'model', 'content' => $botReply];

        // Keep last 12 messages in cache
        if (count($history) > 12) {
            $history = array_slice($history, -12);
        }

        $this->putCache($historyKey, $history, now()->addHours(24));
    }

    protected function getCache(string $key, $default = null)
    {
        try {
            return Cache::get($key, $default);
        } catch (\Throwable) {
            return self::$memoryHistory[$key] ?? $default;
        }
    }

    protected function putCache(string $key, $value, $ttl): void
    {
        try {
            Cache::put($key, $value, $ttl);
        } catch (\Throwable) {
            self::$memoryHistory[$key] = $value;
        }
    }

    protected function forgetCache(string $key): bool
    {
        try {
            Cache::forget($key);
        } catch (\Throwable) {
            unset(self::$memoryHistory[$key]);
        }
        return true;
    }
}
