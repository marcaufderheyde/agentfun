import WarpTunnel from '@/components/3d/WarpTunnel';

export default function WarpPage() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-black">
            {/* UI Overlay */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 tracking-tight">Warp Speed</h1>
                <p className="text-white/50 mt-2">Hold on tight.</p>
            </div>

            <WarpTunnel />
        </main>
    );
}
