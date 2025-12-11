'use client';

import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Sky, Stars, KeyboardControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Player from './Player';
import Ground from './Ground';
import InfiniteWorld from './InfiniteWorld';
import { Suspense } from 'react';

export default function Scene() {
    return (
        <Canvas shadows camera={{ fov: 45 }}>
            <KeyboardControls
                map={[
                    { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
                    { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
                    { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
                    { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
                    { name: 'jump', keys: ['Space'] },
                ]}
            >
                {/* Dark Atmosphere */}
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 10, 50]} />

                {/* Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ff00ff" castShadow />
                <pointLight position={[-10, 10, -10]} intensity={2} color="#00ffff" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Suspense fallback={null}>
                    <Physics gravity={[0, -9.81, 0]} defaultContactMaterial={{ friction: 0 }}>
                        <Player />
                        <Ground />
                        <InfiniteWorld />
                    </Physics>
                </Suspense>

                {/* Post Processing */}
                <EffectComposer>
                    <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.4} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </KeyboardControls>
        </Canvas>
    );
}
