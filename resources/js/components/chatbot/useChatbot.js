import { useState, useEffect, useRef, useCallback } from 'react';
import { chatbotService } from './chatbotService.js';

const STORAGE_KEY_CONV = 'siluet_chatbot_conv_id';
const STORAGE_KEY_MSGS = 'siluet_chatbot_msgs';

const INITIAL_GREETING = {
    id: 'msg-initial',
    sender: 'bot',
    text: 'Halo! ✨ Aku Robot Kijang AI, maskot resmi Siluet Model Tala. Ada yang bisa kubantu seputar kelas modeling, jadwal, atau Virtual Runway hari ini?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    emotion: 'happy',
};

/**
 * useChatbot Hook
 * Orchestrates messages, conversation ID, emotions, talking animation, and API communication.
 */
export function useChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [emotion, setEmotion] = useState('idle');
    const [isWaving, setIsWaving] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastFailedMessage, setLastFailedMessage] = useState(null);

    // Conversation ID and Messages
    const [conversationId, setConversationId] = useState(() => {
        try {
            return sessionStorage.getItem(STORAGE_KEY_CONV) || null;
        } catch {
            return null;
        }
    });

    const [messages, setMessages] = useState(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY_MSGS);
            return saved ? JSON.parse(saved) : [INITIAL_GREETING];
        } catch {
            return [INITIAL_GREETING];
        }
    });

    const talkingTimeoutRef = useRef(null);
    const emotionTimeoutRef = useRef(null);

    // Persist messages & conversationId to sessionStorage
    useEffect(() => {
        try {
            sessionStorage.setItem(STORAGE_KEY_MSGS, JSON.stringify(messages));
        } catch {
            // ignore session storage quota errors
        }
    }, [messages]);

    useEffect(() => {
        if (conversationId) {
            try {
                sessionStorage.setItem(STORAGE_KEY_CONV, conversationId);
            } catch {
                // ignore
            }
        }
    }, [conversationId]);

    // Initial waving greeting on page load (runs once for 3 seconds)
    useEffect(() => {
        const timer = setTimeout(() => {
            triggerWave(3200);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // Wave helper
    const triggerWave = useCallback((duration = 2400) => {
        setIsWaving(true);
        setTimeout(() => {
            setIsWaving(false);
        }, duration);
    }, []);

    // Open chat
    const openChat = useCallback(() => {
        setIsOpen(true);
        setIsMinimized(false);
        triggerWave(2200);
        setEmotion('happy');
        setTimeout(() => setEmotion('idle'), 2400);
    }, [triggerWave]);

    // Close chat
    const closeChat = useCallback(() => {
        setIsOpen(false);
        setIsMinimized(false);
        setEmotion('idle');
    }, []);

    // Toggle minimize
    const toggleMinimize = useCallback(() => {
        setIsMinimized((prev) => !prev);
    }, []);

    // Clear and reset chat
    const resetChat = useCallback(async () => {
        if (conversationId) {
            try {
                await chatbotService.resetConversation(conversationId);
            } catch {
                // ignore
            }
        }
        try {
            sessionStorage.removeItem(STORAGE_KEY_CONV);
            sessionStorage.removeItem(STORAGE_KEY_MSGS);
        } catch {
            // ignore
        }
        setConversationId(null);
        setMessages([
            {
                ...INITIAL_GREETING,
                id: 'msg-' + Date.now(),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
        ]);
        setError(null);
        setLastFailedMessage(null);
        setEmotion('happy');
        triggerWave(2400);
        setTimeout(() => setEmotion('idle'), 2500);
    }, [conversationId, triggerWave]);

    // Send a message
    const sendMessage = useCallback(
        async (userText) => {
            const trimmed = userText.trim();
            if (!trimmed || isLoading) return;

            setError(null);
            setLastFailedMessage(null);

            const userMsg = {
                id: 'user-' + Date.now(),
                sender: 'user',
                text: trimmed,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            setMessages((prev) => [...prev, userMsg]);
            setIsLoading(true);
            setEmotion('thinking');

            try {
                const res = await chatbotService.sendMessage(trimmed, conversationId);

                if (res.conversation_id) {
                    setConversationId(res.conversation_id);
                }

                const botReply = res.reply || 'Halo! Senang bisa berbincang denganmu.';
                const targetEmotion = res.emotion || 'happy';

                const botMsg = {
                    id: 'bot-' + Date.now(),
                    sender: 'bot',
                    text: botReply,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    emotion: targetEmotion,
                };

                setMessages((prev) => [...prev, botMsg]);

                // Calculate talking duration based on text length (min 1.8s, max 4.5s)
                const charCount = botReply.length;
                const talkDuration = Math.min(Math.max(charCount * 35, 1800), 4500);

                // Start talking animation
                setIsTalking(true);
                setEmotion('talking');

                if (talkingTimeoutRef.current) clearTimeout(talkingTimeoutRef.current);
                if (emotionTimeoutRef.current) clearTimeout(emotionTimeoutRef.current);

                talkingTimeoutRef.current = setTimeout(() => {
                    setIsTalking(false);
                    setEmotion(targetEmotion);

                    // Settle to idle after showing target emotion
                    emotionTimeoutRef.current = setTimeout(() => {
                        setEmotion('idle');
                    }, 4000);
                }, talkDuration);
            } catch (err) {
                console.error('Chatbot error:', err);
                setError(err.message || 'Gagal mengirim pesan. Silakan coba lagi.');
                setLastFailedMessage(trimmed);
                setEmotion('sad');

                setTimeout(() => setEmotion('idle'), 3500);
            } finally {
                setIsLoading(false);
            }
        },
        [conversationId, isLoading]
    );

    // Retry sending last failed message
    const retryLastMessage = useCallback(() => {
        if (lastFailedMessage) {
            sendMessage(lastFailedMessage);
        }
    }, [lastFailedMessage, sendMessage]);

    return {
        isOpen,
        isMinimized,
        emotion,
        isWaving,
        isTalking,
        isLoading,
        error,
        messages,
        conversationId,
        openChat,
        closeChat,
        toggleMinimize,
        resetChat,
        sendMessage,
        retryLastMessage,
        triggerWave,
        setEmotion,
    };
}
