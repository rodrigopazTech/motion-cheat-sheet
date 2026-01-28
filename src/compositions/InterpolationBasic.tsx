import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const InterpolationBasic: React.FC<{
    extrapolate: boolean;
}> = ({ extrapolate }) => {
    const frame = useCurrentFrame();


    // Animation 1: Rotation
    // Rotate 360 degrees over 2 seconds (60 frames)
    const rotation = interpolate(
        frame,
        [0, 60],
        [0, 360],
        {
            extrapolateRight: extrapolate ? 'extend' : 'clamp',
        }
    );

    // Animation 2: Horizontal Move
    const x = interpolate(
        frame,
        [0, 60],
        [0, 400],
        {
            extrapolateRight: extrapolate ? 'extend' : 'clamp',
        }
    );

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0f172a',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: 40,
            }}
        >
            <div
                style={{
                    width: 150,
                    height: 150,
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    borderRadius: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    transform: `translateX(${x}px) rotate(${rotation}deg)`,
                }}
            >
                <span style={{ fontWeight: 'bold' }}>Box</span>
            </div>

            <div style={{ position: 'absolute', bottom: 50, fontSize: 24, opacity: 0.7 }}>
                Frame: {frame}
            </div>
        </AbsoluteFill>
    );
};
