import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const ThreeDOrbital: React.FC<{
    radius: number;
    speed: number;
}> = ({ radius, speed }) => {
    const frame = useCurrentFrame();

    // Create an array of items to orbit
    const items = [0, 1, 2, 3, 4];

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#020617',
                justifyContent: 'center',
                alignItems: 'center',
                perspective: '1000px',
            }}
        >
            {/* Center Object */}
            <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: '#3b82f6',
                boxShadow: '0 0 50px #3b82f6',
                position: 'absolute',
                zIndex: 10,
            }} />

            {/* Orbiting Objects */}
            {items.map((i) => {
                const offset = (i / items.length) * 360; // Spread items evenly
                const angle = frame * speed + offset; // Animation over time

                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const z = Math.sin(rad) * radius; // Move in X and Z plane (flat orbit)

                // Scale based on Z to fake depth perception
                const scale = interpolate(z, [-radius, radius], [0.5, 1.5]);
                const opacity = interpolate(z, [-radius, radius], [0.3, 1]);
                const zIndex = z > 0 ? 20 : 0; // Show in front or behind center

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: '#a855f7',
                            transform: `translate3d(${x}px, 0, ${z}px) scale(${scale})`,
                            opacity,
                            zIndex,
                            boxShadow: `0 0 20px rgba(168, 85, 247, ${opacity})`,
                        }}
                    />
                );
            })}

            <div style={{ position: 'absolute', bottom: 50, color: 'white', opacity: 0.5 }}>
                Orbit: X = cos(a) * {radius}, Z = sin(a) * {radius}
            </div>
        </AbsoluteFill>
    );
};
