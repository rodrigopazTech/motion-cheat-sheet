import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Audio } from 'remotion';

// Public domain / Creative Commons sample audio
const AUDIO_URL = "https://raw.githubusercontent.com/remotion-dev/template-audiogram/main/public/audio.mp3";

export const AudioVisualization: React.FC<{
    volume: number;
    sensitivity: number;
    bars: number;
    color: string;
}> = ({ volume, sensitivity, bars, color }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const numberOfBars = bars;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#020617',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: bars > 64 ? '1px' : '4px',
                padding: '40px'
            }}
        >
            <Audio src={AUDIO_URL} volume={volume} />

            {Array.from({ length: numberOfBars }).map((_, i) => {
                const time = frame / fps;
                const speed = 4 + i * (10 / numberOfBars);
                const offset = i * (Math.PI * 2 / numberOfBars);

                // Mezcla de frecuencias simuladas con sensibilidad
                const beat = Math.sin(time * 12 + offset) > 0.8 ? 1.2 : 0.3;
                const wave = Math.sin(time * speed + offset) * 0.5 + 0.5;
                
                const amplitude = (wave * 0.6 + beat * 0.4) * volume * sensitivity;
                const height = Math.min(200, Math.max(8, amplitude * 180));

                return (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            height: `${height}px`,
                            backgroundColor: color,
                            borderRadius: bars > 64 ? 1 : 4,
                            opacity: 0.6 + (amplitude * 0.4),
                            boxShadow: amplitude > 0.8 ? `0 0 15px ${color}` : 'none',
                            transition: 'height 0.1s ease-out'
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};
