import { api } from '../../services/api.js';

/**
 * Chatbot API Service
 * Handles secure communication with Laravel /api/chat endpoint.
 */
export const chatbotService = {
    /**
     * Send chat message to backend.
     * @param {string} message
     * @param {string|null} conversationId
     * @returns {Promise<{success: boolean, reply: string, emotion: string, conversation_id: string}>}
     */
    async sendMessage(message, conversationId = null, currentPath = null) {
        const activePath = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
        return await api('/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                message: message.trim(),
                conversation_id: conversationId,
                current_path: activePath,
            }),
        });
    },

    /**
     * Reset the conversation session.
     * @param {string} conversationId
     * @returns {Promise<{success: boolean, message: string}>}
     */
    async resetConversation(conversationId) {
        if (!conversationId) return { success: true };
        return await api('/api/chat/reset', {
            method: 'POST',
            body: JSON.stringify({
                conversation_id: conversationId,
            }),
        });
    },
};
