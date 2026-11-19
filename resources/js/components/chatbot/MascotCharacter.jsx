import React, { useState } from 'react';
import MascotFace from './MascotFace.jsx';
import './MascotAnimation.css';

/**
 * MascotCharacter Component
 * Renders the unified Robot Deer Mascot with natural anatomical proportions:
 * - Layer 1 (z-15): Tangan Kiri / Left Arm (tangankiri_arm.png) anchored at left shoulder (59.3%, 57.5%)
 * - Layer 2 (z-15): Tangan Kanan / Right Arm (tangankanan_arm.png) scaled down ~22% for balanced anatomy,
 *                   positioned at (14.26%, 17.39%), with pivot at right shoulder socket (78.1%, 91.2%)
 * - Layer 3 (z-20): Badan Utama / Body (badan.png) - shoulder armor plates overlap both arm bases seamlessly
 * - Layer 4 (z-30): Face screen with cyber-cyan SVG eyes & mouth (MascotFace)
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
            {/* Anchored seamlessly to left shoulder (X=648, Y=450 on 1024x765) */}
            <div
                className="absolute pointer-events-none z-15"
                style={{
                    left: '59.3%',
                    top: '57.5%',
                    width: '11.8%',
                    height: '34.6%',
                    transformOrigin: '20% 0%',
                }}
            >
                <img
                    src="/assets/mascot/tangankiri_arm.png"
                    alt="Robot Kijang Tangan Kiri"
                    className="w-full h-full object-contain pointer-events-none"
                    loading="eager"
                    draggable={false}
                />
            </div>

            {/* ================= LAYER 2: TANGAN KANAN (RIGHT ARM / WAVING) ================= */}
            {/* Scaled down ~22% for natural anatomical proportion matching left arm */}
            {/* Socket base aligns at right shoulder (X=385, Y=455) under the shoulder pauldron */}
            <div
                className={`absolute pointer-events-none z-15 transition-transform duration-500 ease-out ${
                    shouldWave ? 'mascot-arm-waving' : ''
                }`}
                style={{
                    left: '14.26%',
                    top: '17.39%',
                    width: '29.88%',
                    height: '46.14%',
                    transformOrigin: '78.1% 91.2%',
                }}
            >
                <img
                    src="/assets/mascot/tangankanan_arm.png"
                    alt="Robot Kijang Tangan Kanan"
                    className="w-full h-full object-contain pointer-events-none"
                    loading="eager"
                    draggable={false}
                />
            </div>

            {/* ================= LAYER 3: BADAN UTAMA (BODY & TORSO) ================= */}
            {/* Layer z-20 overlaps both arm socket bases by 8-10px for seamless ball-and-socket joints */}
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
