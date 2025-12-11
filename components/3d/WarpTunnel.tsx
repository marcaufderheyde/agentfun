"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import * as THREE from 'three';

function Tunnel() {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.position.z = (t * 20) % 20;
        }
    });

    // Create a series of rings to simulate a tunnel
    const rings = Array.from({ length: 40 }).map((_, i) => (
        <Torus key={i} args={[3, 0.05, 16, 100]} position={[0, 0, -i * 2]}>
            <meshBasicMaterial color={`hsl(${(i * 10) % 360}, 70%, 50%)`} wireframe />
        </Torus>
    ));

    return (
        <group ref={meshRef}>
            {rings}
        </group>
    );
}

export default function WarpTunnel() {
    return (
        <div className="w-full h-screen absolute inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <fog attach="fog" args={['black', 5, 20]} />
                <Tunnel />
            </Canvas>
        </div>
    );
}
