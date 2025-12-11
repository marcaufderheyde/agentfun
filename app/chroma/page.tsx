import ChromaPuzzle from '@/components/ChromaPuzzle';

export default function ChromaPage() {
    return (
        <main className="min-h-screen py-24 flex flex-col items-center justify-center bg-slate-950">
            <div className="z-10 w-full max-w-lg text-center px-4">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
                    Chroma
                </h1>
                <p className="text-slate-400 mb-12">Drag the tiles to arrange the perfect gradient.</p>

                <ChromaPuzzle />
            </div>
        </main>
    );
}
