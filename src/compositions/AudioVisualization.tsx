import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Audio } from 'remotion';

// Public domain / Creative Commons sample audio
const AUDIO_URL = "https://raw.githubusercontent.com/remotion-dev/template-audiogram/main/public/audio.mp3";

export const AudioVisualization: React.FC<{
    volume: number;
}> = ({ volume }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Note: For this cheat sheet demo, we simulate the visualization 
    // to avoid complex CORS/AudioContext setup issues in the browser preview.
    // In a real app, you would use:
    // const audioData = useAudioData(AUDIO_URL);

    const numberOfBars = 16;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0f172a',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '4px',
            }}
        >
            <Audio src={AUDIO_URL} volume={volume} />

            {Array.from({ length: numberOfBars }).map((_, i) => {
                // Simulate frequency data using Math.sin and noise
                // This creates a convincing "beat" effect synchronized nicely enough for a demo.
                const time = frame / fps;
                const speed = 5 + i * 0.5;
                const offset = i * 20; // phase shift

                // Combine a bass beat (every ~0.5s) and some high freq jitter
                const beat = Math.sin(time * 10) > 0.5 ? 1 : 0.2;
                const jitter = Math.random() * 0.3;
                const wave = Math.sin(time * speed + offset) * 0.5 + 0.5;

                // Mix them
                const amplitude = (wave * 0.7 + beat * 0.3 + jitter) * volume;

                const height = Math.min(150, Math.max(10, amplitude * 120));

                return (
                    <div
                        key={i}
                        style={{
                            width: 12,
                            height: `${height}px`,
                            backgroundColor: '#3b82f6',
                            borderRadius: 4,
                            opacity: 0.8,
                            transform: `scaleY(${1})`,
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};
