import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { clsx } from 'clsx';
import ThemeBackground from '@/components/ThemeBackground';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeContext';

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
                <ThemeProvider>
                    <ThemeBackground />
                    <Navbar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
