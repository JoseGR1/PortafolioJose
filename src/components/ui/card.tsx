import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
    className?: string;
    children: ReactNode;
}

export function Card({ className, children }: CardProps) {
    return (
        <div className={clsx('bg-card text-card-foreground rounded-xl border border-border shadow-sm overflow-hidden', className)}>
            {children}
        </div>
    );
}

export function CardHeader({ className, children }: CardProps) {
    return <div className={clsx('p-6', className)}>{children}</div>;
}

export function CardTitle({ className, children }: CardProps) {
    return <h3 className={clsx('text-xl font-semibold leading-none tracking-tight', className)}>{children}</h3>;
}

export function CardContent({ className, children }: CardProps) {
    return <div className={clsx('p-6 pt-0', className)}>{children}</div>;
}

export function CardFooter({ className, children }: CardProps) {
    return <div className={clsx('p-6 pt-0 flex items-center', className)}>{children}</div>;
}
