import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const ThreeDCardFlip: React.FC<{
    perspective: number;
    maxRotation: number;
}> = ({ perspective, maxRotation }) => {
    const frame = useCurrentFrame();


    // Calculate rotation based on maxRotation prop
    // We'll oscillate between -maxRotation and +maxRotation
    const oscillation = Math.sin(frame / 20) * maxRotation;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#0f172a',
                justifyContent: 'center',
                alignItems: 'center',
                perspective: `${perspective}px`, // Apply perspective to container
            }}
        >
            <div
                style={{
                    width: 300,
                    height: 180,
                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                    borderRadius: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    transformStyle: 'preserve-3d', // Essential for 3D children
                    transform: `rotateY(${oscillation}deg) rotateX(${oscillation / 2}deg)`,
                }}
            >
                <div style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'white',
                    transform: 'translateZ(20px)', // Push text forward
                    textShadow: '0 5px 10px rgba(0,0,0,0.5)'
                }}>
                    3D Card
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: 50, color: 'white', opacity: 0.5, fontSize: 14 }}>
                perspective: {perspective}px | rotateY: {oscillation.toFixed(1)}°
            </div>
        </AbsoluteFill>
    );
};
