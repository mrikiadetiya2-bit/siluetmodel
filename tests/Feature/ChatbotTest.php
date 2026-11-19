<?php

namespace Tests\Feature;

use Tests\TestCase;

class ChatbotTest extends TestCase
{
    public function test_chatbot_rejects_empty_message(): void
    {
        $response = $this->postJson('/api/chat', [
            'message' => '   ',
        ]);

        $response->assertStatus(422);
    }

    public function test_chatbot_returns_successful_response(): void
    {
        $response = $this->postJson('/api/chat', [
            'message' => 'Halo robot kijang!',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'reply',
                'emotion',
                'conversation_id',
            ])
            ->assertJson([
                'success' => true,
            ]);
    }

    public function test_chatbot_reset_conversation(): void
    {
        $response = $this->postJson('/api/chat/reset', [
            'conversation_id' => 'test-conv-1234',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);
    }
}
