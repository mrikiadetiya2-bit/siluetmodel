import React from 'react';

/**
 * MascotFace Component
 * Renders glowing cyan robot facial features (eyes, eyebrows, mouth)
 * using SVG layered precisely on top of the black visor screen in badan.png.
 */
export default function MascotFace({ emotion = 'idle', isTalking = false }) {
    const isActivelyTalking = isTalking || emotion === 'talking';

    return (
        <svg
            viewBox="0 0 200 130"
            className="w-full h-full select-none pointer-events-none mascot-glow mascot-transition"
            aria-hidden="true"
        >
            <defs>
                {/* Soft Cyber-Cyan Glow Filter */}
                <filter id="cyberCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="2.8" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g filter="url(#cyberCyanGlow)">
                {/* ================= EYES ================= */}
                {emotion === 'happy' ? (
                    // Happy Arc Eyes (^ ^)
                    <g className="mascot-eye mascot-transition">
                        <path
                            d="M 46 56 Q 64 32 82 56"
                            fill="none"
                            stroke="#22d3ee"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                        <path
                            d="M 118 56 Q 136 32 154 56"
                            fill="none"
                            stroke="#22d3ee"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                    </g>
                ) : emotion === 'thinking' ? (
                    // Thinking Eyes (Shifted up & side, curious)
                    <g className="mascot-eye mascot-transition">
                        <ellipse cx="68" cy="44" rx="13" ry="14" fill="#22d3ee" />
                        <circle cx="72" cy="40" r="3.5" fill="#ffffff" />
                        <ellipse cx="140" cy="44" rx="13" ry="14" fill="#22d3ee" />
                        <circle cx="144" cy="40" r="3.5" fill="#ffffff" />
                    </g>
                ) : emotion === 'surprised' ? (
                    // Surprised Eyes (Wide open, bright)
                    <g className="mascot-eye mascot-transition">
                        <circle cx="64" cy="50" r="18" fill="#22d3ee" />
                        <circle cx="64" cy="50" r="9" fill="#083344" />
                        <circle cx="68" cy="46" r="4" fill="#ffffff" />

                        <circle cx="136" cy="50" r="18" fill="#22d3ee" />
                        <circle cx="136" cy="50" r="9" fill="#083344" />
                        <circle cx="140" cy="46" r="4" fill="#ffffff" />
                    </g>
                ) : emotion === 'sad' ? (
                    // Sad / Empathetic Eyes (Tilted slightly downward)
                    <g className="mascot-eye mascot-transition">
                        <ellipse
                            cx="64"
                            cy="52"
                            rx="13"
                            ry="16"
                            fill="#06b6d4"
                            transform="rotate(-14 64 52)"
                        />
                        <circle cx="61" cy="47" r="3.2" fill="#ffffff" />

                        <ellipse
                            cx="136"
                            cy="52"
                            rx="13"
                            ry="16"
                            fill="#06b6d4"
                            transform="rotate(14 136 52)"
                        />
                        <circle cx="133" cy="47" r="3.2" fill="#ffffff" />
                    </g>
                ) : (
                    // Idle / Normal Glowing Oval Eyes with Blinking
                    <g className="mascot-eye mascot-transition">
                        <ellipse cx="64" cy="50" rx="13" ry="17" fill="#22d3ee" />
                        <circle cx="68" cy="45" r="3.6" fill="#ffffff" opacity="0.9" />

                        <ellipse cx="136" cy="50" rx="13" ry="17" fill="#22d3ee" />
                        <circle cx="140" cy="45" r="3.6" fill="#ffffff" opacity="0.9" />
                    </g>
                )}

                {/* ================= MOUTH ================= */}
                {isActivelyTalking ? (
                    // Talking Mouth (Animated rhythmic flap)
                    <g className="mascot-mouth-talking mascot-transition">
                        <ellipse
                            cx="100"
                            cy="96"
                            rx="13"
                            ry="9"
                            fill="#06b6d4"
                            stroke="#22d3ee"
                            strokeWidth="3.2"
                        />
                    </g>
                ) : emotion === 'happy' ? (
                    // Joyful Open Grin
                    <path
                        d="M 83 91 Q 100 114 117 91 Z"
                        fill="#06b6d4"
                        stroke="#22d3ee"
                        strokeWidth="3.2"
                        strokeLinejoin="round"
                        className="mascot-transition"
                    />
                ) : emotion === 'surprised' ? (
                    // Surprised 'O' Mouth
                    <ellipse
                        cx="100"
                        cy="96"
                        rx="8.5"
                        ry="11.5"
                        fill="#0891b2"
                        stroke="#22d3ee"
                        strokeWidth="3.2"
                        className="mascot-transition"
                    />
                ) : emotion === 'sad' ? (
                    // Downturned Sad Mouth
                    <path
                        d="M 86 102 Q 100 91 114 102"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="4.2"
                        strokeLinecap="round"
                        className="mascot-transition"
                    />
                ) : emotion === 'thinking' ? (
                    // Small Neutral Line
                    <path
                        d="M 88 97 Q 100 96 112 97"
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="mascot-transition"
                    />
                ) : (
                    // Idle Smile
                    <path
                        d="M 86 94 Q 100 106 114 94"
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        className="mascot-transition"
                    />
                )}
            </g>
        </svg>
    );
}
