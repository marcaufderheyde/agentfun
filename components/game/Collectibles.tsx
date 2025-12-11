'use client';

import { useCylinder, useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import { useGameStore } from '@/store/gameStore';

export function Coin({ position }: { position: [number, number, number] }) {
    const [active, setActive] = useState(true);
    const addScore = useGameStore((state) => state.addScore);
    const [ref, api] = useCylinder(() => ({
        mass: 0,
        position,
        rotation: [Math.PI / 2, 0, 0], // Stand up
        args: [0.5, 0.5, 0.1, 16],
        isTrigger: true,
        onCollide: (e) => {
            if (active && e.body.userData?.tag === 'player') {
                addScore(100);
                setActive(false);
                // Move away to ensure no double triggers before unmount
                api.position.set(0, -100, 0);
            }
        },
    }));

    useFrame((state) => {
        if (active && ref.current) {
            // Spin
            ref.current.rotation.z += 0.05;
            ref.current.rotation.x = Math.PI / 2; // Keep upright
        }
    });

    if (!active) return null;

    return (
        <mesh ref={ref as any}>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
            <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={2} />
        </mesh>
    );
}

export function Hazard({ position }: { position: [number, number, number] }) {
    const [active, setActive] = useState(true);
    const addScore = useGameStore((state) => state.addScore);
    const [ref, api] = useSphere(() => ({
        mass: 0,
        position,
        args: [0.5],
        isTrigger: true,
        onCollide: (e) => {
            if (active && e.body.userData?.tag === 'player') {
                addScore(-50);
                setActive(false);
                api.position.set(0, -100, 0);
            }
        },
    }));

    useFrame((state) => {
        if (active && ref.current) {
            // Pulse scale?
            const s = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.2;
            ref.current.scale.set(s, s, s);
        }
    });

    if (!active) return null;

    return (
        <mesh ref={ref as any}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={3} />
        </mesh>
    );
}

export default function Collectibles() {
    // Generate random positions
    // Area: -50 to 50
    const coins = useMemo(() => {
        return new Array(100).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 100,
                2,
                (Math.random() - 0.5) * 100
            ] as [number, number, number]
        }));
    }, []);

    const hazards = useMemo(() => {
        return new Array(30).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 100,
                1,
                (Math.random() - 0.5) * 100
            ] as [number, number, number]
        }));
    }, []);

    return (
        <>
            {coins.map((props, i) => <Coin key={'coin-' + i} position={props.position} />)}
            {hazards.map((props, i) => <Hazard key={'hazard-' + i} position={props.position} />)}
        </>
    );
}
