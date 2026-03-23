import React from 'react';
import { AbsoluteFill, useCurrentFrame, random } from 'remotion';

export const GlitchText: React.FC<{
    text: string;
    fontSize: number;
    glitchIntensity: number;
    rgbOffset: number;
}> = ({ text, fontSize, glitchIntensity, rgbOffset }) => {
    const frame = useCurrentFrame();

    const seed = Math.floor(frame / 2);
    const isGlitching = random(`glitch-active-${seed}`) < 0.3 * glitchIntensity;
    
    const offsetX = isGlitching ? (random(`x-${seed}`) - 0.5) * 20 * glitchIntensity : 0;
    const offsetY = isGlitching ? (random(`y-${seed}`) - 0.5) * 5 * glitchIntensity : 0;
    
    const currentRgbOffset = rgbOffset + (isGlitching ? 15 * glitchIntensity : 0);

    const textStyle: React.CSSProperties = {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: `${fontSize}px`,
        fontWeight: 900,
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        lineHeight: 1
    };

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#020617', // Fondo estático sólido
            }}
        >
            {/* Contenedor del Texto: Aquí se confina el Glitch */}
            <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: fontSize * 1.5, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                overflow: 'hidden' // ESTO EVITA QUE EL GLITCH SALGA AL FONDO
            }}>
                
                {/* Capa Roja */}
                <div style={{
                    ...textStyle,
                    color: '#ff0000',
                    transform: `translate(${-currentRgbOffset + offsetX}px, ${offsetY}px)`,
                    mixBlendMode: 'screen',
                    opacity: 0.8
                }}>
                    {text}
                </div>

                {/* Capa Cian */}
                <div style={{
                    ...textStyle,
                    color: '#00ffff',
                    transform: `translate(${currentRgbOffset + offsetX}px, ${-offsetY}px)`,
                    mixBlendMode: 'screen',
                    opacity: 0.8
                }}>
                    {text}
                </div>

                {/* Capa Blanca Principal */}
                <div style={{
                    ...textStyle,
                    color: '#ffffff',
                    transform: `translate(${offsetX}px, ${offsetY}px)`,
                    zIndex: 2
                }}>
                    {text}
                </div>

                {/* Líneas de Glitch: Ahora confinadas al contenedor del texto */}
                {isGlitching && Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: random(`h-${seed}-${i}`) * (fontSize / 4),
                            backgroundColor: i % 2 === 0 ? '#ff0000' : '#00ffff',
                            opacity: 0.3,
                            top: `${random(`t-${seed}-${i}`) * 100}%`,
                            transform: `translateX(${(random(`tx-${seed}-${i}`) - 0.5) * (fontSize / 2)}px)`,
                            zIndex: 3,
                            mixBlendMode: 'overlay'
                        }}
                    />
                ))}
            </div>
        </AbsoluteFill>
    );
};
