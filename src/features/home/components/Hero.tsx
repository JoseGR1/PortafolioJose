
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
    const { t } = useTranslation();

    return (
        <section id="home" className="min-h-screen flex items-center pt-16">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary font-semibold text-lg mb-4 block">
                        {t('hero.greeting')}
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                        Jose <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                            {t('hero.role')}
                        </span>
                    </h1>
                    <p className="text-muted-foreground text-xl mb-8 max-w-lg leading-relaxed">
                        {t('hero.description')}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                            {t('hero.ctaProjects')} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            {t('hero.ctaContact')}
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden md:block"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-400/20 rounded-full blur-3xl -z-10" />
                    <div className="w-[400px] h-[400px] bg-muted rounded-2xl mx-auto shadow-2xl flex items-center justify-center border border-border">
                        {/* Placeholder for Profile Image or 3D Element */}
                        <span className="text-muted-foreground">Profile Image Placeholder</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
