import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const TypewriterEffect: React.FC<{
    text: string;
    speed: number; // frames per character
}> = ({ text, speed }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Calculate how many characters to show
    const charsToShow = Math.floor(frame / speed);
    const textToShow = text.substring(0, charsToShow);

    // Blinking cursor: simple on/off every 15 frames (0.5s at 30fps)
    const cursorVisible = Math.floor(frame / (fps / 2)) % 2 === 0;

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0f172a',
            }}
        >
            <div
                style={{
                    fontFamily: '"Fira Code", monospace',
                    fontSize: 80,
                    color: '#10b981', // Terminal green
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'baseline',
                }}
            >
                <span>{textToShow}</span>
                <span
                    style={{
                        display: 'inline-block',
                        width: 50,
                        height: 80,
                        backgroundColor: '#10b981',
                        marginLeft: 10,
                        opacity: cursorVisible ? 1 : 0,
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
