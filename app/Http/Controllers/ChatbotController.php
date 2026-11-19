<?php

namespace App\Http\Controllers;

use App\Services\GeminiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatbotController extends Controller
{
    protected GeminiService $geminiService;

    public function __construct(GeminiService $geminiService)
    {
        $this->geminiService = $geminiService;
    }

    /**
     * Handle incoming chat message from user.
     * Endpoint: POST /api/chat
     */
    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'max:1000'],
            'conversation_id' => ['nullable', 'string', 'max:100'],
        ]);

        $message = trim($validated['message']);
        $conversationId = $validated['conversation_id'] ?? null;

        if ($message === '') {
            return response()->json([
                'success' => false,
                'reply' => 'Pesan tidak boleh kosong.',
                'emotion' => 'sad',
                'conversation_id' => $conversationId,
            ], 422);
        }

        try {
            $result = $this->geminiService->chat($message, $conversationId);

            return response()->json([
                'success' => true,
                'reply' => $result['reply'],
                'emotion' => $result['emotion'],
                'conversation_id' => $result['conversation_id'],
            ]);
        } catch (\Throwable $e) {
            Log::error('ChatbotController error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'reply' => 'Maaf, robot kijang sedang sedikit pusing dengan koneksi jaringan. Boleh diulang pertanyaannya? 🦌',
                'emotion' => 'sad',
                'conversation_id' => $conversationId,
            ], 500);
        }
    }

    /**
     * Reset chat conversation session.
     * Endpoint: POST /api/chat/reset
     */
    public function reset(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'conversation_id' => ['required', 'string', 'max:100'],
        ]);

        $this->geminiService->resetConversation($validated['conversation_id']);

        return response()->json([
            'success' => true,
            'message' => 'Sesi percakapan berhasil direset.',
        ]);
    }
}
