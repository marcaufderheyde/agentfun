'use client';

import { usePlane } from '@react-three/cannon';

export default function Ground() {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.5, 0] // slightly lower to spawn safely
    }));

    return (
        <mesh ref={ref as any} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[2000, 2000]} />
            {/* Reflective floor */}
            <meshStandardMaterial color="#000" roughness={0.1} metalness={0.8} />
            {/* Glowing Grid */}
            <gridHelper args={[400, 100, '#ff00ff', '#00ffff']} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        </mesh>
    );
}
