import React, { useState, useEffect } from 'react';
import MascotCharacter from './MascotCharacter.jsx';
import ChatWindow from './ChatWindow.jsx';
import { useChatbot } from './useChatbot.js';
import { MessageSquare, X } from 'lucide-react';

/**
 * FloatingChatbot Component
 * Main entry point for the interactive Robot Deer AI floating chatbot widget.
 */
export default function FloatingChatbot() {
    const {
        isOpen,
        isMinimized,
        emotion,
        isWaving,
        isTalking,
        isLoading,
        error,
        messages,
        openChat,
        closeChat,
        toggleMinimize,
        resetChat,
        sendMessage,
        retryLastMessage,
    } = useChatbot();

    const [showTooltip, setShowTooltip] = useState(false);

    // Show initial greeting speech bubble after 2 seconds, auto-hide after 8 seconds
    useEffect(() => {
        const showTimer = setTimeout(() => {
            if (!isOpen) setShowTooltip(true);
        }, 2200);

        const hideTimer = setTimeout(() => {
            setShowTooltip(false);
        }, 9000);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [isOpen]);

    return (
        <div className="fixed z-50 pointer-events-none select-none font-sans">
            {/* ================= CHAT MODAL WINDOW ================= */}
            <div className="pointer-events-auto">
                <ChatWindow
                    isOpen={isOpen}
                    isMinimized={isMinimized}
                    onClose={closeChat}
                    onMinimize={toggleMinimize}
                    onReset={resetChat}
                    messages={messages}
                    isLoading={isLoading}
                    error={error}
                    onSendMessage={sendMessage}
                    onRetry={retryLastMessage}
                    emotion={emotion}
                />
            </div>

            {/* ================= FLOATING TRIGGER (BOTTOM-RIGHT) ================= */}
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 pointer-events-auto flex flex-col items-end">
                {/* Greeting Tooltip Speech Bubble (Only when chat is closed) */}
                {!isOpen && showTooltip && (
                    <div
                        className="mb-2 mr-2 px-3.5 py-2 rounded-2xl rounded-br-xs bg-neutral-900 text-white text-xs shadow-lg border border-neutral-700/60 max-w-[210px] animate-fade-in flex items-center justify-between gap-2"
                        style={{
                            boxShadow: '0 8px 20px rgba(0,0,0,0.18), 0 0 12px rgba(6,182,212,0.3)',
                        }}
                    >
                        <span>Hai! Mau kenalan atau tanya seputar Siluet Model? ✨</span>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowTooltip(false);
                            }}
                            className="p-0.5 text-neutral-400 hover:text-white transition-colors"
                            aria-label="Tutup sapaan"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                )}

                {/* Floating Mascot Deer Trigger Button */}
                <div
                    onClick={isOpen ? closeChat : openChat}
                    className="group relative cursor-pointer flex flex-col items-center"
                    title={isOpen ? 'Tutup Chatbot' : 'Buka Chatbot Robot Kijang'}
                >
                    {/* Character Component */}
                    <MascotCharacter
                        emotion={emotion}
                        isWaving={isWaving}
                        isTalking={isTalking}
                        size={isOpen ? 'sm' : 'md'}
                        className={`transition-all duration-300 transform group-hover:scale-105 active:scale-95 ${
                            isOpen ? 'opacity-90 hover:opacity-100' : 'drop-shadow-lg'
                        }`}
                    />

                    {/* Quick Badge Under Mascot */}
                    {!isOpen && (
                        <div className="-mt-1 px-3 py-1 rounded-full bg-neutral-900/90 backdrop-blur-xs border border-cyan-400/50 text-cyan-300 text-[11px] font-medium tracking-wide shadow-md flex items-center gap-1.5 transition-transform group-hover:scale-105">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
                            <span>Tanya AI</span>
                            <MessageSquare className="w-3 h-3 ml-0.5 text-cyan-400" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
