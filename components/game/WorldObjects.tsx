'use client';

import { useBox } from '@react-three/cannon';
import { useMemo } from 'react';
import * as THREE from 'three';

export default function WorldObjects() {
    // Generate 100 random objects
    const objects = useMemo(() => {
        return new Array(100).fill(0).map(() => ({
            position: [(Math.random() - 0.5) * 100, Math.random() * 5 + 0.5, (Math.random() - 0.5) * 100] as [number, number, number],
            args: [Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5] as [number, number, number],
            color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
            type: ['box', 'cylinder', 'cone'][Math.floor(Math.random() * 3)] as 'box' | 'cylinder' | 'cone'
        }));
    }, []);

    return (
        <>
            {objects.map((data, i) => (
                <PhysicsObject key={i} {...data} />
            ))}
        </>
    );
}

function PhysicsObject({ position, args, color, type }: { position: [number, number, number], args: [number, number, number], color: THREE.Color, type: 'box' | 'cylinder' | 'cone' }) {
    const [ref] = useBox(() => ({ mass: 1, position, args }));

    // For simplicity, we use the same box collider for all (or we could use useCylinder etc), 
    // but visually render different shapes.

    return (
        <mesh ref={ref as any} castShadow receiveShadow>
            {type === 'box' && <boxGeometry args={args} />}
            {type === 'cylinder' && <cylinderGeometry args={[args[0] / 2, args[0] / 2, args[1], 16]} />}
            {type === 'cone' && <coneGeometry args={[args[0] / 2, args[1], 16]} />}

            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2} // Neon glow
                toneMapped={false}
            />
        </mesh>
    );
}

