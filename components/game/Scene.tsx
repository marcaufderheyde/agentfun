'use client';

import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Sky, Stars, Stats, KeyboardControls } from '@react-three/drei';
import Player from './Player';
import Ground from './Ground';
import WorldObjects from './WorldObjects';
import { Suspense } from 'react';

export default function Scene() {
    return (
        <KeyboardControls
            map={[
                { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
                { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
                { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
                { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
                { name: 'jump', keys: ['Space'] },
            ]}
        >
            <Canvas shadows camera={{ fov: 45 }}>
                <Sky sunPosition={[100, 20, 100]} />
                <Stars />
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                <Suspense fallback={null}>
                    <Physics gravity={[0, -9.81, 0]}>
                        <Player />
                        <Ground />
                        <WorldObjects />
                    </Physics>
                </Suspense>
                <Stats />
            </Canvas>
        </KeyboardControls>
    );
}
