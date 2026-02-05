import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const buttonVariants = ({ variant = 'primary', size = 'md', className = '' }: { variant?: 'primary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg', className?: string }) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
    };

    const sizes = {
        sm: 'h-9 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 rounded-md',
    };

    return twMerge(clsx(baseStyles, variants[variant], sizes[size], className));
};

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
    return (
        <button
            className={buttonVariants({ variant, size, className })}
            {...props}
        />
    );
}
