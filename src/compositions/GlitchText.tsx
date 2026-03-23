import React from 'react';
import { AbsoluteFill, useCurrentFrame, random, interpolate } from 'remotion';

export const GlitchText: React.FC<{
    text: string;
    fontSize: number;
    glitchIntensity: number; // 0 to 1
    rgbOffset: number; // 0 to 20
}> = ({ text, fontSize, glitchIntensity, rgbOffset }) => {
    const frame = useCurrentFrame();

    // Generar valores aleatorios para el glitch basados en el frame
    // Usamos una semilla que cambia solo cuando el glitch "se dispara"
    const seed = Math.floor(frame / 2);
    const isGlitching = random(`glitch-active-${seed}`) < 0.3 * glitchIntensity;
    
    const offsetX = isGlitching ? (random(`x-${seed}`) - 0.5) * 20 * glitchIntensity : 0;
    const offsetY = isGlitching ? (random(`y-${seed}`) - 0.5) * 5 * glitchIntensity : 0;
    
    // RGB Split: Las capas de color se separan más cuando hay glitch
    const currentRgbOffset = rgbOffset + (isGlitching ? 15 * glitchIntensity : 0);

    const textStyle: React.CSSProperties = {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: `${fontSize}px`,
        fontWeight: 900,
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        textTransform: 'uppercase',
        letterSpacing: '2px'
    };

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#020617',
                overflow: 'hidden'
            }}
        >
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                
                {/* Capa Roja (Desfasada a la izquierda) */}
                <div style={{
                    ...textStyle,
                    color: '#ff0000',
                    transform: `translate(${-currentRgbOffset + offsetX}px, ${offsetY}px)`,
                    mixBlendMode: 'screen',
                    opacity: 0.8
                }}>
                    {text}
                </div>

                {/* Capa Cian (Desfasada a la derecha) */}
                <div style={{
                    ...textStyle,
                    color: '#00ffff',
                    transform: `translate(${currentRgbOffset + offsetX}px, ${-offsetY}px)`,
                    mixBlendMode: 'screen',
                    opacity: 0.8
                }}>
                    {text}
                </div>

                {/* Capa Blanca Principal (Central) */}
                <div style={{
                    ...textStyle,
                    color: '#ffffff',
                    transform: `translate(${offsetX}px, ${offsetY}px)`,
                    zIndex: 2
                }}>
                    {text}
                </div>

                {/* Efectos de líneas horizontales de glitch aleatorias */}
                {isGlitching && Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: random(`h-${seed}-${i}`) * 20,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            top: `${random(`t-${seed}-${i}`) * 100}%`,
                            transform: `translateX(${(random(`tx-${seed}-${i}`) - 0.5) * 100}px)`,
                            zIndex: 3
                        }}
                    />
                ))}
            </div>
        </AbsoluteFill>
    );
};
