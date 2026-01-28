import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const SpringSequence: React.FC<{
    delay: number;
    duration: number;
}> = ({ delay, duration }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Spring 1: Entrance (starts at 0)
    const entrance = spring({
        frame,
        fps,
        config: { damping: 15 },
    });

    // Spring 2: Exit (starts after delay + duration)
    const exit = spring({
        frame: frame - (delay + 40 + duration), // Wait 40 frames + hold duration + delay
        fps,
        config: { damping: 15 },
    });

    // Combine them: Entrance (0->1) MINUS Exit (0->1)
    // Result shifts from 0 -> 1 -> 0
    const scale = entrance - exit;

    // Opacity example using same logic
    const opacity = Math.max(0, scale);

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
                    width: 250,
                    height: 150,
                    background: 'linear-gradient(to right, #f43f5e, #e11d48)',
                    borderRadius: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold',
                    boxShadow: '0 10px 40px rgba(225, 29, 72, 0.4)',
                    transform: `scale(${scale})`,
                    opacity,
                }}
            >
                Spring Seq.
            </div>

            <div style={{ position: 'absolute', bottom: 40, width: '100%', padding: '0 40px', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
                    <span>In</span>
                    <span>Wait</span>
                    <span>Out</span>
                </div>
                <div style={{ width: '100%', height: 4, background: '#334155', marginTop: 10, borderRadius: 2, overflow: 'hidden' }}>
                    {/* Visual Timeline */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: '#f43f5e',
                        transform: `scaleX(${entrance})`,
                        transformOrigin: 'left',
                        opacity: 0.5
                    }} />
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: '#0f172a',
                        transform: `scaleX(${exit})`,
                        transformOrigin: 'left',
                        marginTop: -4
                    }} />
                </div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 10, textAlign: 'center' }}>
                    val = entrance - exit
                </div>
            </div>
        </AbsoluteFill>
    );
};
