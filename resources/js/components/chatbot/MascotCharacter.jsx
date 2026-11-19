import React, { useState } from 'react';
import MascotFace from './MascotFace.jsx';
import './MascotAnimation.css';

/**
 * MascotCharacter Component
 * Renders the unified Robot Deer Mascot with 100% anatomical fidelity:
 * - Layer 1 (z-10): Tangan Kiri / Left Arm (tangankiri.png, 1024×765) — pixel-perfect rest posture
 * - Layer 2 (z-15): Tangan Kanan / Right Arm (tangankanan.png, 1024×765) — anatomical shoulder socket
 *                   anchored at (380, 468) -> 37.11% 61.18%, smooth ball-joint waving under shoulder plate
 * - Layer 3 (z-20): Badan Utama / Body (badan.png, 1024×765) — shoulder plate overlaps arm socket seamlessly
 * - Layer 4 (z-30): Face screen with cyber-cyan SVG glowing eyes & mouth (MascotFace)
 */
export default function MascotCharacter({
    emotion = 'idle',
    isWaving = false,
    isTalking = false,
    size = 'md',
    interactive = true,
    className = '',
    onClick,
}) {
    const [hoverWaving, setHoverWaving] = useState(false);
    const [hoverEmotion, setHoverEmotion] = useState(null);

    // Size presets (preserving 1024:765 aspect ratio)
    const sizeClasses = {
        sm: 'w-24 sm:w-28',
        md: 'w-36 sm:w-44',
        lg: 'w-52 sm:w-64',
        xl: 'w-64 sm:w-80',
        full: 'w-full',
    };

    const containerSize = sizeClasses[size] || size;
    const shouldWave = isWaving || hoverWaving;
    const currentEmotion = hoverEmotion || emotion;

    const handleMouseEnter = () => {
        if (!interactive) return;
        setHoverWaving(true);
        if (currentEmotion === 'idle') setHoverEmotion('happy');
    };

    const handleMouseLeave = () => {
        if (!interactive) return;
        setHoverWaving(false);
        setHoverEmotion(null);
    };

    // Emotion container animation class
    let floatClass = 'mascot-container';
    if (currentEmotion === 'thinking') {
        floatClass = 'mascot-thinking';
    } else if (currentEmotion === 'happy') {
        floatClass = 'mascot-happy';
    }

    return (
        <div
            className={`relative select-none cursor-pointer ${floatClass} ${containerSize} ${className}`}
            style={{ aspectRatio: '1024 / 765' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            aria-label="Siluet Model Tala AI Mascot"
        >
            {/* ================= LAYER 1: TANGAN KIRI (LEFT ARM / RELAXED) ================= */}
            {/* Full 1024×765 canvas: pixel-perfect alignment with badan.png */}
            <img
                src="/assets/mascot/tangankiri.png"
                alt="Robot Kijang Tangan Kiri"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                loading="eager"
                draggable={false}
            />

            {/* ================= LAYER 2: TANGAN KANAN (RIGHT ARM / WAVING) ================= */}
            {/* Full 1024×765 canvas: shoulder socket at (380, 468) -> 37.11% 61.18% */}
            {/* Layer z-15 smoothly anchored under the shoulder plate of badan.png (z-20) */}
            <img
                src="/assets/mascot/tangankanan.png"
                alt="Robot Kijang Tangan Kanan"
                className={`absolute inset-0 w-full h-full object-contain pointer-events-none z-15 ${shouldWave ? 'mascot-arm-waving' : ''
                    }`}
                style={{
                    transformOrigin: '37.11% 61.18%',
                }}
                loading="eager"
                draggable={false}
            />

            {/* ================= LAYER 3: BADAN UTAMA (BODY & TORSO) ================= */}
            {/* Layer z-20 overlaps both arm socket bases seamlessly with zero gap */}
            <img
                src="/assets/mascot/badan.png"
                alt="Robot Kijang Badan"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
                loading="eager"
                draggable={false}
            />

            {/* ================= LAYER 4: FACE SCREEN (CYAN SVG) ================= */}
            {/* Screen visor coordinates: left 37.7%, top 27.2%, width 26.2%, height 22.75% */}
            <div
                className="absolute z-30 pointer-events-none"
                style={{
                    left: '37.7%',
                    top: '27.2%',
                    width: '26.2%',
                    height: '22.75%',
                }}
            >
                <MascotFace emotion={currentEmotion} isTalking={isTalking} />
            </div>

            {/* ================= SOFT GROUNDING SHADOW ================= */}
            <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/5 h-3 bg-black/15 rounded-full blur-sm pointer-events-none -z-10"
                style={{
                    animation: 'mascot-float 4.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite',
                }}
            />
        </div>
    );
}
