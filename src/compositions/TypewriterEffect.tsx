import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

export const TypewriterEffect: React.FC<{
    text: string;
    speed: number;
    fontSize: number;
    letterSpacing: number;
    color: string;
    fontWeight: string;
}> = ({ text, speed, fontSize, letterSpacing, color, fontWeight }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const charsToShow = Math.floor(frame / speed);
    const textToShow = text.substring(0, charsToShow);
    const cursorVisible = Math.floor(frame / (fps / 2)) % 2 === 0;

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#020617',
            }}
        >
            <div
                style={{
                    fontFamily: '"Fira Code", monospace',
                    fontSize: `${fontSize}px`,
                    color: color,
                    fontWeight: fontWeight,
                    letterSpacing: `${letterSpacing}px`,
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '0 40px'
                }}
            >
                <span>{textToShow}</span>
                <span
                    style={{
                        display: 'inline-block',
                        width: fontSize * 0.6,
                        height: fontSize * 0.9,
                        backgroundColor: color,
                        marginLeft: 10,
                        opacity: cursorVisible ? 1 : 0,
                        boxShadow: `0 0 ${fontSize / 4}px ${color}`
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
