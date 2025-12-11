"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, FlyControls, Sphere, MeshDistortMaterial, Instances, Instance } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

interface StarLayerProps {
    color: string;
    count: number;
    size: number;
    radius: number;
    speed: number;
}

function StarLayer({ color, count, size, radius, speed }: StarLayerProps) {
    const ref = useRef<any>();

    const sphere = useMemo(() => {
        if (count <= 0) return new Float32Array(0);
        return random.inSphere(new Float32Array(count * 3), { radius });
    }, [count, radius]);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 50 * speed;
            // Different layers can rotate slightly differently for parallax if desired, 
            // but keeping it uniform works for a coherent galaxy.
            ref.current.rotation.y -= delta / 60 * speed;
        }
    });

    return (
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color={color}
                size={size}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
            />
        </Points>
    );
}

interface StarsProps {
    color: string;
    count: number;
    speed: number;
    universeSize: number;
}

function Stars({ color, count, speed, universeSize }: StarsProps) {
    // Split total count into layers for size variation
    // 60% Small (Dust)
    // 30% Medium (Stars)
    // 10% Large (Giants)

    const safeCount = Math.min(count, 200000);
    const smallCount = Math.floor(safeCount * 0.6);
    const mediumCount = Math.floor(safeCount * 0.3);
    const largeCount = Math.floor(safeCount * 0.1);

    // Base radius * 1.5 to encompass planets
    const starRadius = universeSize * 1.5;

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            {/* Small Dust */}
            <StarLayer
                color={color}
                count={smallCount}
                size={0.05}
                radius={starRadius}
                speed={speed}
            />

            {/* Medium Stars */}
            <StarLayer
                color={color}
                count={mediumCount}
                size={0.15}
                radius={starRadius}
                speed={speed}
            />

            {/* bright Giants */}
            <StarLayer
                color="#ffffff" // Giants are often white/bright
                count={largeCount}
                size={0.35}
                radius={starRadius}
                speed={speed * 1.1} // Parallax: Giants move slightly faster/differently
            />
        </group>
    );
}

function ProceduralPlanets({ count, universeSize }: { count: number, universeSize: number }) {
    const planets = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * universeSize,
                (Math.random() - 0.5) * universeSize,
                (Math.random() - 0.5) * universeSize
            ] as [number, number, number],
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
            scale: Math.random() * 8 + 2,
            distort: Math.random() * 0.5
        }));
    }, [count, universeSize]);

    return (
        <group>
            {planets.map((planet, i) => (
                <Sphere key={i} position={planet.position} scale={planet.scale}>
                    <MeshDistortMaterial
                        color={planet.color}
                        roughness={0.4}
                        metalness={0.2}
                        distort={planet.distort}
                        speed={2}
                    />
                </Sphere>
            ))}
        </group>
    );
}

function AsteroidField({ count, universeSize }: { count: number, universeSize: number }) {
    const asteroidCount = Math.min(count * 5, 20000);

    const asteroids = useMemo(() => {
        // Asteroids fill the same volume as planets
        return Array.from({ length: asteroidCount }).map(() => ({
            position: [
                (Math.random() - 0.5) * universeSize,
                (Math.random() - 0.5) * universeSize,
                (Math.random() - 0.5) * universeSize
            ] as [number, number, number],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
            scale: Math.random() * 0.5 + 0.1
        }));
    }, [count, asteroidCount, universeSize]);

    return (
        <Instances range={asteroidCount}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#888888" roughness={0.8} />

            {asteroids.map((data, i) => (
                <Instance
                    key={i}
                    position={data.position}
                    rotation={data.rotation}
                    scale={data.scale}
                />
            ))}
        </Instances>
    );
}

interface GalaxySceneProps {
    config: {
        starColor: string;
        starCount: number;
        speed: number;
        planetCount: number;
    }
}

export default function GalaxyScene({ config }: GalaxySceneProps) {
    // UNIFIED SCALING LOGIC
    const universeSize = useMemo(() => {
        const starFactor = config.starCount / 50;
        const planetFactor = config.planetCount * 0.5;
        return 300 + Math.max(starFactor, planetFactor);
    }, [config.starCount, config.planetCount]);

    return (
        <div className="w-full h-screen absolute inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 50], fov: 60, far: universeSize * 2 }}>

                {/* Environment Lights */}
                <ambientLight intensity={0.5} />
                <pointLight position={[100, 100, 100]} intensity={1.5} color="#ffffff" />

                <Stars
                    key={`stars-${config.starCount}`}
                    color={config.starColor}
                    count={config.starCount}
                    speed={config.speed}
                    universeSize={universeSize}
                />

                <ProceduralPlanets
                    key={`planets-${config.planetCount}`}
                    count={config.planetCount}
                    universeSize={universeSize}
                />

                <AsteroidField
                    key={`asteroids-${config.planetCount}`}
                    count={config.planetCount}
                    universeSize={universeSize}
                />

                <FlyControls
                    movementSpeed={50.0}
                    rollSpeed={0.4}
                    dragToLook={true}
                    autoForward={false}
                    makeDefault
                />
            </Canvas>
        </div>
    );
}
