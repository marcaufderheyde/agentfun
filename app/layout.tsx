import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { clsx } from 'clsx';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Vivid Dashboard',
    description: 'Your personal creative space',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={clsx(inter.className, "antialiased min-h-screen bg-slate-950 text-white selection:bg-fuchsia-500/30")}>
                <div className="fixed inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[100px] animate-blob" />
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-600/20 blur-[100px] animate-blob animation-delay-2000" />
                    <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[100px] animate-blob animation-delay-4000" />
                </div>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
