import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const SpringConfigurable: React.FC<{
    mass: number;
    damping: number;
    stiffness: number;
}> = ({ mass, damping, stiffness }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Create spring animation
    const scale = spring({
        frame,
        fps,
        config: {
            mass,
            damping,
            stiffness,
        },
        durationInFrames: 60, // Optional: duration for the spring to settle logic usually inherent
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0f172a',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    width: 200,
                    height: 200,
                    background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                    borderRadius: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 20px 50px rgba(16, 185, 129, 0.4)',
                    transform: `scale(${scale})`,
                }}
            >
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: 40, fontWeight: 'bold' }}>Boing!</div>
                    <div style={{ fontSize: 14, opacity: 0.8, marginTop: 8 }}>
                        scale: {scale.toFixed(2)}
                    </div>
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: 50, color: '#94a3b8', fontSize: 14, textAlign: 'center', gap: 10, display: 'flex', flexDirection: 'column' }}>
                <div>Mass: {mass} | Damping: {damping} | Stiffness: {stiffness}</div>
            </div>
        </AbsoluteFill>
    );
};
