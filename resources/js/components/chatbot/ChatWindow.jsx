import React, { useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader.jsx';
import ChatMessage from './ChatMessage.jsx';
import ChatInput from './ChatInput.jsx';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * ChatWindow Component
 * Modal chat window displaying header, scrollable message list, typing indicator, and input bar.
 */
export default function ChatWindow({
    isOpen,
    isMinimized,
    onClose,
    onMinimize,
    onReset,
    messages = [],
    isLoading = false,
    error = null,
    onSendMessage,
    onRetry,
    emotion = 'idle',
}) {
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom on new message or loading state change
    useEffect(() => {
        if (isOpen && !isMinimized && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading, isOpen, isMinimized]);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed bottom-20 right-4 sm:right-6 z-50 flex flex-col bg-white rounded-2xl shadow-2xl border border-neutral-200/80 transition-all duration-300 overflow-hidden ${
                isMinimized
                    ? 'w-72 sm:w-80 h-auto'
                    : 'w-[calc(100vw-32px)] sm:w-[400px] h-[530px] max-h-[82vh]'
            }`}
            style={{
                boxShadow:
                    '0 20px 40px -15px rgba(0,0,0,0.18), 0 0 25px -5px rgba(6,182,212,0.15)',
            }}
            role="dialog"
            aria-label="Jendela Obrolan Robot Kijang AI"
        >
            {/* Header */}
            <ChatHeader
                onMinimize={onMinimize}
                onClose={onClose}
                onReset={onReset}
                isMinimized={isMinimized}
                emotion={emotion}
            />

            {/* Content Body (Hidden when minimized) */}
            {!isMinimized && (
                <div className="flex flex-col flex-1 min-h-0 bg-neutral-50/50">
                    {/* Scrollable Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scroll-smooth">
                        {messages.map((msg) => (
                            <ChatMessage key={msg.id} message={msg} />
                        ))}

                        {/* Loading / Thinking Indicator */}
                        {isLoading && (
                            <div className="flex items-end gap-2.5">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-950/90 border border-cyan-400/40 p-1 flex items-center justify-center shadow-sm shadow-cyan-500/20 mb-1">
                                    <img
                                        src="/assets/mascot/badan.png"
                                        alt="Robot Kijang Avatar"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="bg-neutral-100 border border-neutral-200/80 px-4 py-3 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}

                        {/* Error Alert with Retry */}
                        {error && (
                            <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs gap-2">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                                    <span>{error}</span>
                                </div>
                                {onRetry && (
                                    <button
                                        type="button"
                                        onClick={onRetry}
                                        className="shrink-0 flex items-center gap-1 px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-800 font-medium transition-colors cursor-pointer"
                                    >
                                        <RefreshCw className="w-3 h-3" />
                                        <span>Ulangi</span>
                                    </button>
                                )}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Bar */}
                    <ChatInput
                        onSendMessage={onSendMessage}
                        disabled={isLoading}
                        showSuggestions={messages.length <= 2}
                    />
                </div>
            )}
        </div>
    );
}
