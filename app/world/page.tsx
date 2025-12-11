import Scene from '@/components/game/Scene';

export default function WorldPage() {
    return (
        <div className="w-full h-screen bg-black">
            <Scene />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-4 left-4 text-white pointer-events-none select-none">
                <h1 className="text-2xl font-bold">FPV World</h1>
                <p className="opacity-70">WASD to Move | Space to Jump | Click to Start</p>
            </div>
        </div>
    );
}
