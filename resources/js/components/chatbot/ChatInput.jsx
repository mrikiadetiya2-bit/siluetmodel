import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';

const DEFAULT_SUGGESTIONS = [
    '✨ Kelas apa saja yang ada?',
    '👠 Bagaimana cara booking model?',
    '📍 Di mana lokasi studio?',
    '🌟 Ceritakan tentang Virtual Runway',
];

/**
 * ChatInput Component
 * Input form with auto-focus, Enter-to-send, and quick suggestion prompt pills.
 */
export default function ChatInput({
    onSendMessage,
    disabled = false,
    suggestions = DEFAULT_SUGGESTIONS,
    showSuggestions = true,
}) {
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed || disabled) return;

        onSendMessage(trimmed);
        setText('');
        if (inputRef.current) inputRef.current.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleSuggestionClick = (prompt) => {
        // Strip emoji prefix if desired or send directly
        const cleanPrompt = prompt.replace(/^[^\w\s]+\s*/, '');
        onSendMessage(cleanPrompt);
    };

    return (
        <div className="p-3 bg-white border-t border-neutral-100 flex flex-col gap-2 rounded-b-2xl">
            {/* Quick Suggestion Pills */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
                    {suggestions.map((suggestion, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            disabled={disabled}
                            className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-cyan-50 hover:text-cyan-700 text-neutral-600 transition-colors border border-neutral-200/60 cursor-pointer disabled:opacity-50"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}

            {/* Input & Send Form */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    placeholder="Tulis pesan untuk Robot Kijang..."
                    maxLength={1000}
                    className="flex-1 px-3.5 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-neutral-900 placeholder:text-neutral-400 transition-all disabled:opacity-50"
                />

                <button
                    type="submit"
                    disabled={!text.trim() || disabled}
                    className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 active:scale-95 text-cyan-400 hover:text-cyan-300 disabled:opacity-40 disabled:hover:bg-neutral-900 disabled:active:scale-100 transition-all cursor-pointer disabled:cursor-not-allowed shadow-sm"
                    title="Kirim Pesan"
                    aria-label="Kirim Pesan"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
