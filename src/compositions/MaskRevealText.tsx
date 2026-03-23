import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const MaskRevealText: React.FC<{
    text: string;
    fontSize: number;
    color: string;
    revealDirection: 'up' | 'down';
}> = ({ text, fontSize, color, revealDirection }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animación de entrada suave con muelle
    const entrance = spring({
        frame,
        fps,
        config: {
            stiffness: 100,
            damping: 15,
            mass: 0.8
        }
    });

    // Calcular el desplazamiento vertical basado en la dirección
    const initialOffset = fontSize * 1.2;
    const translateY = revealDirection === 'up' 
        ? (1 - entrance) * initialOffset 
        : (entrance - 1) * initialOffset;

    // Opacidad para un toque extra de elegancia
    const opacity = interpolate(entrance, [0, 0.5], [0, 1]);

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#020617',
            }}
        >
            <div style={{
                overflow: 'hidden', // La máscara real
                padding: '10px 40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h1 style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: `${fontSize}px`,
                    fontWeight: 900,
                    color: color,
                    margin: 0,
                    transform: `translateY(${translateY}px)`,
                    opacity: opacity,
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    textAlign: 'center'
                }}>
                    {text}
                </h1>
            </div>
            
            {/* Línea decorativa que marca el borde de la máscara */}
            <div style={{
                width: entrance * 200,
                height: '2px',
                backgroundColor: color,
                marginTop: revealDirection === 'up' ? 0 : 10,
                marginBottom: revealDirection === 'up' ? 10 : 0,
                opacity: entrance * 0.5,
                borderRadius: '2px',
                boxShadow: `0 0 15px ${color}`
            }} />
        </AbsoluteFill>
    );
};
