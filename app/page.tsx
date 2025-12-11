import ClockWidget from '@/components/ClockWidget';
import FocusWidget from '@/components/FocusWidget';
import QuoteWidget from '@/components/QuoteWidget';
import TodoList from '@/components/TodoList';
import Card from '@/components/Card';

export default function Home() {
    return (
        <main className="min-h-screen p-8 md:p-12 lg:p-24 flex flex-col items-center justify-center gap-8">
            <div className="w-full max-w-6xl z-10">
                <header className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-2">
                        Good Day
                    </h1>
                    <p className="text-slate-400 text-lg">Your dashboard is looking vivid today.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                    {/* Main Focus - Large Block */}
                    <div className="lg:col-span-2 lg:row-span-1">
                        <FocusWidget />
                    </div>

                    {/* Clock - Square Block */}
                    <div className="lg:col-span-1 lg:row-span-1">
                        <ClockWidget />
                    </div>

                    {/* Quote - Square Block */}
                    <div className="lg:col-span-1 lg:row-span-1">
                        <QuoteWidget />
                    </div>

                    {/* Todo List - Tall Block */}
                    <div className="lg:col-span-2 lg:row-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-2">
                        <TodoList />
                    </div>

                    {/* Placeholder/Extra - Wide Block */}
                    <div className="lg:col-span-2 lg:row-span-1">
                        <Card className="h-full flex items-center justify-center group overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="text-slate-500 group-hover:text-slate-300 transition-colors">✨ Explore your creativity</span>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
