import React from 'react';

/**
 * ChatMessage Component
 * Displays individual chat bubbles for user and bot with timestamps and avatar.
 */
export default function ChatMessage({ message }) {
    const isBot = message.sender === 'bot';

    return (
        <div
            className={`flex w-full gap-2.5 items-end transition-all duration-300 ${
                isBot ? 'justify-start' : 'justify-end'
            }`}
        >
            {/* Bot Avatar Icon */}
            {isBot && (
                <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-950/90 border border-cyan-400/40 p-1 flex items-center justify-center shadow-sm shadow-cyan-500/20 mb-1">
                    <img
                        src="/assets/mascot/badan.png"
                        alt="Robot Kijang"
                        className="w-full h-full object-contain"
                        draggable={false}
                    />
                </div>
            )}

            {/* Bubble Container */}
            <div
                className={`max-w-[82%] sm:max-w-[78%] flex flex-col ${
                    isBot ? 'items-start' : 'items-end'
                }`}
            >
                <div
                    className={`px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed shadow-sm break-words whitespace-pre-wrap ${
                        isBot
                            ? 'bg-neutral-50/95 border border-neutral-200/80 text-neutral-800 rounded-bl-xs'
                            : 'bg-neutral-900 text-neutral-50 rounded-br-xs shadow-neutral-900/10'
                    }`}
                >
                    {message.text}
                </div>

                {/* Timestamp */}
                <span className="text-[10px] text-neutral-400 mt-1 px-1">
                    {message.timestamp}
                </span>
            </div>
        </div>
    );
}
