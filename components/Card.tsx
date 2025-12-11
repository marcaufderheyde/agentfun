import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={twMerge(
                "glass rounded-3xl p-6 border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white/15",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
