import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitch } from '@/common/LanguageSwitch';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/app/providers/ThemeProvider';
import logoDark from '@/assets/logoDark.svg';
import logoLight from '@/assets/logoLight.svg';

const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'projects', href: '#projects' },
    { key: 'experience', href: '#experience' },
    { key: 'contact', href: '#contact' },
];

export function Navbar() {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Detect active section
            const sections = navItems.map(item => item.key);
            let currentSection = 'home';

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentSection = section;
                        break;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={clsx(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                )}
            >
                <div className="container mx-auto px-6 h-full flex items-center justify-between">
                    <a href="#" className="flex items-center">
                        <img
                            src={theme === 'dark' ? logoDark : logoLight}
                            alt="Jose.dev"
                            className="h-10 w-auto transition-opacity duration-300"
                        />
                    </a>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.key}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector(item.href)?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }}
                                className={clsx(
                                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                                    activeSection === item.key
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                )}
                            >
                                {activeSection === item.key && (
                                    <motion.span
                                        layoutId="nav-highlight"
                                        className="absolute inset-0 rounded-full bg-primary/15 backdrop-blur-sm -z-10"
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 25
                                        }}
                                    />
                                )}
                                {t(`nav.${item.key}`)}
                            </a>
                        ))}
                        <div className="pl-4 ml-4 border-l border-border flex items-center gap-2">
                            <ThemeToggle />
                            <LanguageSwitch />
                        </div>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground relative z-[70]"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay & Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-background md:hidden"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header in Drawer */}
                            <div className="px-6 py-6 flex items-center justify-between">
                                <a href="#" className="flex items-center" onClick={() => setIsOpen(false)}>
                                    <img
                                        src={theme === 'dark' ? logoDark : logoLight}
                                        alt="Jose.dev"
                                        className="h-10 w-auto"
                                    />
                                </a>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex-grow flex flex-col justify-center px-8 space-y-4">
                                {navItems.map((item, idx) => (
                                    <motion.a
                                        key={item.key}
                                        href={item.href}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                        className={clsx(
                                            "text-3xl font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center group",
                                            activeSection === item.key
                                                ? "text-primary bg-primary/10"
                                                : "text-muted-foreground hover:text-primary hover:bg-primary/5 hover:translate-x-2"
                                        )}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsOpen(false);
                                            setTimeout(() => {
                                                document.querySelector(item.href)?.scrollIntoView({
                                                    behavior: 'smooth',
                                                    block: 'start'
                                                });
                                            }, 300);
                                        }}
                                    >
                                        {t(`nav.${item.key}`)}
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Footer Settings */}
                            <div className="p-8 border-t border-border bg-card/30">
                                <div className="flex flex-col gap-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold uppercase tracking-wider opacity-60">Settings</span>
                                        <div className="flex items-center gap-4">
                                            <ThemeToggle />
                                            <LanguageSwitch />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
