'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeyboardControls, PointerLockControls } from '@react-three/drei';

const SPEED = 5;
const JUMP_FORCE = 4;

export default function Player() {
    const { camera } = useThree();
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 5, 0],
        fixedRotation: true,
        linearDamping: 0.95
    }));

    const velocity = useRef([0, 0, 0]);
    useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity]);

    const [subscribeKeys, getKeys] = useKeyboardControls();

    useFrame((state) => {
        if (!ref.current) return;

        // Sync camera to player position
        camera.position.copy(ref.current.position);
        // Add a little offset if we wanted the camera to be at "head" height, 
        // but the sphere is radius 1 (default), so center is fine or maybe slightly up.
        // Actually let's just use the center for now to avoid clipping.

        const { forward, backward, left, right, jump } = getKeys();

        // Movement direction derived from camera
        const frontVector = new THREE.Vector3(0, 0, Number(backward) - Number(forward));
        const sideVector = new THREE.Vector3(Number(left) - Number(right), 0, 0);
        const direction = new THREE.Vector3();

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);

        api.velocity.set(direction.x, velocity.current[1], direction.z);

        // Jump
        if (jump && Math.abs(velocity.current[1]) < 0.05) {
            api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2]);
        }
    });

    return (
        <>
            <PointerLockControls />
            <mesh ref={ref as any}>
                {/* Invisible player sphere for debugging if needed, or remove for total FPV */}
                {/* <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" /> */}
            </mesh>
        </>
    );
}
