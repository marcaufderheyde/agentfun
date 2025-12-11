'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { SeededRandom, getChunkSeed } from '@/utils/seededRandom';
import { Coin, Hazard } from './Collectibles';
import { useBox } from '@react-three/cannon';

const CHUNK_SIZE = 50;

function PhysicsObject({ position, args, color, type }: { position: [number, number, number], args: [number, number, number], color: THREE.Color, type: 'box' | 'cylinder' | 'cone' }) {
    const [ref] = useBox(() => ({ mass: 1, position, args }));

    return (
        <mesh ref={ref as any} castShadow receiveShadow>
            {type === 'box' && <boxGeometry args={args} />}
            {type === 'cylinder' && <cylinderGeometry args={[args[0] / 2, args[0] / 2, args[1], 16]} />}
            {type === 'cone' && <coneGeometry args={[args[0] / 2, args[1], 16]} />}
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
        </mesh>
    );
}

export default function Chunk({ x, z }: { x: number; z: number }) {
    const data = useMemo(() => {
        const seed = getChunkSeed(x, z);
        const rng = new SeededRandom(seed);

        // Chunk origin in world space
        const worldX = x * CHUNK_SIZE;
        const worldZ = z * CHUNK_SIZE;

        const objects = [];
        const collectibles = [];

        // Generate Terrain Objects (5-10 per chunk)
        const objectCount = Math.floor(rng.nextRange(5, 10));
        for (let i = 0; i < objectCount; i++) {
            const px = worldX + rng.nextRange(-CHUNK_SIZE / 2, CHUNK_SIZE / 2);
            const pz = worldZ + rng.nextRange(-CHUNK_SIZE / 2, CHUNK_SIZE / 2);
            objects.push({
                position: [px, rng.nextRange(0.5, 3), pz] as [number, number, number],
                args: [rng.nextRange(0.5, 2), rng.nextRange(0.5, 4), rng.nextRange(0.5, 2)] as [number, number, number],
                color: new THREE.Color().setHSL(rng.next(), 1, 0.5),
                type: ['box', 'cylinder', 'cone'][Math.floor(rng.next() * 3)] as 'box' | 'cylinder' | 'cone'
            });
        }

        // Generate Collectibles (2-5 per chunk)
        const coinCount = Math.floor(rng.nextRange(2, 5));
        for (let i = 0; i < coinCount; i++) {
            const px = worldX + rng.nextRange(-CHUNK_SIZE / 2, CHUNK_SIZE / 2);
            const pz = worldZ + rng.nextRange(-CHUNK_SIZE / 2, CHUNK_SIZE / 2);
            collectibles.push({ type: 'coin', position: [px, 2, pz] as [number, number, number] });
        }

        // Generate Hazards (0-2 per chunk)
        const hazardCount = Math.floor(rng.nextRange(0, 2));
        for (let i = 0; i < hazardCount; i++) {
            const px = worldX + rng.nextRange(-CHUNK_SIZE / 2, CHUNK_SIZE / 2);
            const pz = worldZ + rng.nextRange(-CHUNK_SIZE / 2, CHUNK_SIZE / 2);
            collectibles.push({ type: 'hazard', position: [px, 1, pz] as [number, number, number] });
        }

        return { objects, collectibles };
    }, [x, z]);

    return (
        <group>
            {data.objects.map((d, i) => <PhysicsObject key={`obj-${x}-${z}-${i}`} {...d} />)}
            {data.collectibles.map((d, i) =>
                d.type === 'coin'
                    ? <Coin key={`col-${x}-${z}-${i}`} position={d.position} />
                    : <Hazard key={`col-${x}-${z}-${i}`} position={d.position} />
            )}
        </group>
    );
}
