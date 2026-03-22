import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const ThreeDCardFlip: React.FC<{
    perspective: number;
    rotateX: number;
    rotateY: number;
    color: string;
    glow: number;
}> = ({ perspective, rotateX, rotateY, color, glow }) => {
    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#020617',
                justifyContent: 'center',
                alignItems: 'center',
                perspective: `${perspective}px`,
            }}
        >
            <div
                style={{
                    width: 300,
                    height: 180,
                    background: color === '#ffffff' 
                        ? 'white' 
                        : `linear-gradient(135deg, ${color}, #000000)`,
                    borderRadius: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 ${glow * 40}px ${color}`,
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'transform 0.1s ease-out'
                }}
            >
                <div style={{
                    fontSize: 32,
                    fontWeight: '900',
                    color: color === '#ffffff' ? '#020617' : 'white',
                    transform: 'translateZ(50px)', // Muy profundo
                    textShadow: '0 10px 20px rgba(0,0,0,0.5)',
                    letterSpacing: '-1px'
                }}>
                    3D STUDIO
                </div>
                
                {/* Reflejo lateral para dar volumen */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    transform: 'translateZ(1px)',
                    borderRadius: 20
                }} />
            </div>

            <div style={{ position: 'absolute', bottom: 40, display: 'flex', gap: 15 }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px', fontSize: 11, color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>
                    X: {rotateX}°
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px', fontSize: 11, color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>
                    Y: {rotateY}°
                </div>
            </div>
        </AbsoluteFill>
    );
};
