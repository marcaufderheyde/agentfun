import ZenCanvas from '@/components/ZenCanvas';

export default function ZenPage() {
    return (
        <main className="min-h-screen relative">
            <div className="absolute top-8 left-8 z-10 pointer-events-none">
                <h1 className="text-4xl font-bold text-white/90 tracking-tight">Zen Mode</h1>
                <p className="text-white/50 mt-2">Move your mouse to create. Breathe.</p>
            </div>
            <ZenCanvas />
        </main>
    );
}
