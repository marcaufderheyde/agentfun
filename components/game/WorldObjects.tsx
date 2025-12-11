'use client';

import { useBox } from '@react-three/cannon';
import { useMemo } from 'react';

function Cube({ position }: { position: [number, number, number] }) {
    const [ref] = useBox(() => ({ mass: 1, position, args: [2, 2, 2] }));
    return (
        <mesh ref={ref as any} castShadow>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={`hsl(${Math.random() * 360}, 50%, 50%)`} />
        </mesh>
    );
}

export default function WorldObjects() {
    const cubes = useMemo(() => {
        const items = [];
        for (let i = 0; i < 50; i++) {
            const x = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            const y = Math.random() * 10 + 2;
            items.push(<Cube key={i} position={[x, y, z]} />);
        }
        return items;
    }, []);

    return <>{cubes}</>;
}
