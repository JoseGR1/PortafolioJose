import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { LanguageSwitch } from '@/common/LanguageSwitch';
import { ThemeToggle } from '@/components/ThemeToggle';

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
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

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
        <header
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
            )}
        >
            <div className="container mx-auto px-6 h-full flex items-center justify-between">
                <a href="#" className="text-2xl font-bold tracking-tighter text-primary">
                    Jose<span className="text-foreground">.dev</span>
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
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg p-6 flex flex-col gap-2 md:hidden animate-in slide-in-from-top-2">
                        {navItems.map((item) => (
                            <a
                                key={item.key}
                                href={item.href}
                                className={clsx(
                                    "text-lg font-medium py-3 px-4 rounded-lg transition-all duration-200",
                                    activeSection === item.key
                                        ? "text-primary bg-primary/10"
                                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {t(`nav.${item.key}`)}
                            </a>
                        ))}
                        <div className="mt-4 pt-4 flex justify-between items-center bg-muted/50 p-4 rounded-lg border-t border-border">
                            <span className="text-sm font-medium">Settings</span>
                            <div className="flex items-center gap-4">
                                <ThemeToggle />
                                <LanguageSwitch />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
