import MemoryGame from '@/components/MemoryGame';

export default function MemoryPage() {
    return (
        <main className="min-h-screen py-24 flex flex-col items-center justify-center relative overflow-hidden bg-slate-950">
            {/* Background Accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
            </div>

            <div className="z-10 w-full max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-purple-200">
                    Neon Memory
                </h1>
                <p className="text-slate-400 mb-12">Match the pairs. Challenge your mind.</p>

                <MemoryGame />
            </div>
        </main>
    );
}
