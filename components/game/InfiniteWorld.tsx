'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useState } from 'react';
import Chunk from './Chunk';
import * as THREE from 'three';

const CHUNK_SIZE = 50;
const RENDER_DISTANCE = 2; // Radius of chunks to render (e.g., 2 means 5x5 grid)

export default function InfiniteWorld() {
    const { camera } = useThree();
    const [currentChunk, setCurrentChunk] = useState<{ x: number, z: number }>({ x: 0, z: 0 });

    useFrame(() => {
        // Calculate which chunk the camera is currently in
        const cx = Math.round(camera.position.x / CHUNK_SIZE);
        const cz = Math.round(camera.position.z / CHUNK_SIZE);

        if (cx !== currentChunk.x || cz !== currentChunk.z) {
            setCurrentChunk({ x: cx, z: cz });
        }
    });

    // Calculate active chunks
    const chunks = [];
    for (let x = currentChunk.x - RENDER_DISTANCE; x <= currentChunk.x + RENDER_DISTANCE; x++) {
        for (let z = currentChunk.z - RENDER_DISTANCE; z <= currentChunk.z + RENDER_DISTANCE; z++) {
            chunks.push(<Chunk key={`${x},${z}`} x={x} z={z} />);
        }
    }

    return <group>{chunks}</group>;
}
