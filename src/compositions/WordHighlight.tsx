import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const WordHighlight: React.FC<{
    words: string;
    highlightSpeed: number;
    fontSize: number;
    color: string;
    decorationHeight: number; // New prop: 10 to 100
}> = ({ words, highlightSpeed, fontSize, color, decorationHeight }) => {
    const frame = useCurrentFrame();
    const wordList = words.split(' ');

    return (
        <AbsoluteFill
            style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 40,
                backgroundColor: '#020617',
            }}
        >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: 1000 }}>
                {wordList.map((word, i) => {
                    const startFrame = i * highlightSpeed;

                    const highlightProgress = interpolate(
                        frame,
                        [startFrame, startFrame + 5],
                        [0, 1],
                        { extrapolateRight: 'clamp' }
                    );

                    return (
                        <span
                            key={i}
                            style={{
                                fontSize: `${fontSize}px`,
                                fontFamily: 'Inter, system-ui, sans-serif',
                                fontWeight: 900,
                                position: 'relative',
                                color: highlightProgress > 0.5 ? '#ffffff' : 'rgba(255,255,255,0.2)',
                                transition: 'color 0.1s ease',
                                zIndex: 1,
                            }}
                        >
                            {/* Pro Decoration Effect (Highlight or Underline) */}
                            <span
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: '-2%',
                                    width: '104%',
                                    height: `${decorationHeight}%`,
                                    backgroundColor: color,
                                    opacity: highlightProgress * 0.8,
                                    zIndex: -1,
                                    borderRadius: decorationHeight < 30 ? '2px' : '4px',
                                    transform: `scaleX(${highlightProgress})`,
                                    transformOrigin: 'left',
                                    boxShadow: highlightProgress > 0.8 && decorationHeight > 50 ? `0 0 20px ${color}` : 'none'
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
