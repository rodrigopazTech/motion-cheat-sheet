import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const WordHighlight: React.FC<{
    words: string;
    highlightSpeed: number; // frames per word
}> = ({ words, highlightSpeed }) => {
    const frame = useCurrentFrame();
    const wordList = words.split(' ');

    return (
        <AbsoluteFill
            style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 50,
                backgroundColor: '#ffffff',
            }}
        >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: 1000 }}>
                {wordList.map((word, i) => {
                    // Determine active state for this word
                    // Start highlighting at i * highlightSpeed
                    // Fade in highlight over 5 frames
                    const startFrame = i * highlightSpeed;

                    const highlightProgress = interpolate(
                        frame,
                        [startFrame, startFrame + 5],
                        [0, 1],
                        { extrapolateRight: 'clamp' }
                    );

                    // Reset highlight after the word is "read" (optional, keeping it lit for now)
                    // const isPassed = frame > startFrame + highlightSpeed;

                    return (
                        <span
                            key={i}
                            style={{
                                fontSize: 60,
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 800,
                                position: 'relative',
                                color: '#1e293b',
                                zIndex: 1,
                            }}
                        >
                            {/* Highlight Background */}
                            <span
                                style={{
                                    position: 'absolute',
                                    bottom: 5,
                                    left: -5,
                                    right: -5,
                                    height: '40%',
                                    backgroundColor: '#facc15', // Yellow highlighter
                                    opacity: highlightProgress,
                                    zIndex: -1,
                                    transform: `scaleX(${highlightProgress})`,
                                    transformOrigin: 'left',
                                }}
                            />
                            {word}
                        </span>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
