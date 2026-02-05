import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

interface RootProviderProps {
    children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </ThemeProvider>
    );
}
