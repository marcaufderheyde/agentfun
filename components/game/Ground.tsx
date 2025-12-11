'use client';

import { usePlane } from '@react-three/cannon';

export default function Ground() {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.5, 0] // slightly lower to spawn safely
    }));

    return (
        <mesh ref={ref as any} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial color="#333" roughness={0.4} metalness={0.8} />
            <gridHelper args={[100, 100, 0xff0000, 'teal']} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        </mesh>
    );
}
