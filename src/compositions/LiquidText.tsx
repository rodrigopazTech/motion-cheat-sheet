import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const LiquidText: React.FC<{
    text: string;
    fontSize: number;
    color: string;
    waveIntensity: number; // 0 to 50
    waveSpeed: number; // 1 to 10
}> = ({ text, fontSize, color, waveIntensity, waveSpeed }) => {
    const frame = useCurrentFrame();

    // Animamos la frecuencia base para crear el movimiento de "oleaje"
    const baseFrequency = interpolate(
        Math.sin(frame * 0.05 * waveSpeed),
        [-1, 1],
        [0.01, 0.02]
    );

    // Identificador único para el filtro SVG para evitar conflictos
    const filterId = useMemo(() => `liquid-filter-${Math.random().toString(36).substr(2, 9)}`, []);

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#020617',
                overflow: 'hidden'
            }}
        >
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id={filterId}>
                        <feTurbulence
                            type="turbulence"
                            baseFrequency={baseFrequency}
                            numOctaves="2"
                            result="turbulence"
                            seed={Math.floor(frame / 5)} // Cambia sutilmente cada 5 frames
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="turbulence"
                            scale={waveIntensity}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>

            <h1
                style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: `${fontSize}px`,
                    fontWeight: 900,
                    color: color,
                    filter: `url(#${filterId})`,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    margin: 0,
                    padding: '0 40px',
                    // Gradiente sutil para acentuar el efecto líquido
                    background: `linear-gradient(180deg, ${color}, rgba(255,255,255,0.5))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                {text}
            </h1>
        </AbsoluteFill>
    );
};
