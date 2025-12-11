'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeyboardControls, PointerLockControls, PerspectiveCamera } from '@react-three/drei';

const SPEED = 15;
const JUMP_FORCE = 10;

export default function Player() {
    const { camera } = useThree();
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 5, 0],
        fixedRotation: true,
        linearDamping: 0.0,
        angularDamping: 1.0, // Prevent rolling artifacts
        allowSleep: false,   // Crucial: prevents the body from freezing if it stops moving
        userData: { tag: 'player' },
    }));

    const velocity = useRef([0, 0, 0]);
    useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity]);

    const [subscribeKeys, getKeys] = useKeyboardControls();

    useFrame((state) => {
        if (!ref.current) return;

        const { forward, backward, left, right, jump } = getKeys();

        // FPS Movement Logic
        // The camera is attached to the mesh. The mesh has fixed rotation.
        // We need the camera's world direction to know where "forward" is rel to the view.
        // Even though camera is child of mesh, its world rotation is what matters.

        const fwd = new THREE.Vector3();
        camera.getWorldDirection(fwd);
        fwd.y = 0;
        fwd.normalize();

        const rightDir = new THREE.Vector3();
        rightDir.crossVectors(fwd, camera.up).normalize();

        const moveX = (Number(right) - Number(left));
        const moveZ = (Number(forward) - Number(backward));

        const vel = new THREE.Vector3();
        vel.addScaledVector(fwd, moveZ);
        vel.addScaledVector(rightDir, moveX);
        vel.normalize().multiplyScalar(SPEED);

        api.velocity.set(vel.x, velocity.current[1], vel.z);

        if (jump && Math.abs(velocity.current[1]) < 0.05) {
            api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2]);
        }
    });

    return (
        <>
            <mesh ref={ref as any}>
                <PerspectiveCamera makeDefault position={[0, 0.5, 0]} />
                {/* DEBUG NOSE: If this moves, physics moves. If this stays with you, camera is attached. */}
                <mesh position={[0, 0.5, -1]}>
                    <boxGeometry args={[0.1, 0.1, 0.1]} />
                    <meshStandardMaterial color="red" />
                </mesh>
            </mesh>
            <PointerLockControls />
        </>
    );
}
