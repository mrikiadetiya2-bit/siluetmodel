import React from 'react';
import { Minus, X, RotateCcw, Sparkles } from 'lucide-react';

/**
 * ChatHeader Component
 * Clean, luxury header bar showing mascot status, reset, minimize, and close actions.
 */
export default function ChatHeader({
    onMinimize,
    onClose,
    onReset,
    isMinimized = false,
    emotion = 'idle',
}) {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 text-white rounded-t-2xl border-b border-neutral-800 shadow-sm select-none">
            {/* Mascot Avatar and Status */}
            <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-neutral-800 border border-cyan-400/50 flex items-center justify-center p-1 shadow-inner">
                    <img
                        src="/assets/mascot/badan.png"
                        alt="Robot Kijang Avatar"
                        className="w-full h-full object-contain"
                        draggable={false}
                    />
                    {/* Live Glowing Status Indicator */}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-cyan-400 rounded-full border-2 border-neutral-900 shadow-sm shadow-cyan-400" />
                </div>

                <div>
                    <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-sm tracking-wide text-white flex items-center gap-1">
                            Robot Kijang AI
                        </h3>
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                        <span className="text-cyan-400 font-medium">Siluet Tala</span> • Asisten AI
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 text-neutral-400">
                {/* Reset Conversation */}
                <button
                    type="button"
                    onClick={onReset}
                    className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
                    title="Mulai percakapan baru"
                    aria-label="Mulai percakapan baru"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>

                {/* Minimize Button */}
                <button
                    type="button"
                    onClick={onMinimize}
                    className="p-1.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
                    title={isMinimized ? 'Perbesar' : 'Kecilkan'}
                    aria-label={isMinimized ? 'Perbesar' : 'Kecilkan'}
                >
                    <Minus className="w-4 h-4" />
                </button>

                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors cursor-pointer"
                    title="Tutup percakapan"
                    aria-label="Tutup percakapan"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
