import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionContainer } from '@/layout/SectionContainer';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Project {
    id: string;
    titleKey: string;
    descKey: string;
    fullDescKey: string;
    detailsKey: string;
    tags: string[];
}

const projects: Project[] = [
    {
        id: '1',
        titleKey: 'projects.p1.title',
        descKey: 'projects.p1.desc',
        fullDescKey: 'projects.p1.fullDesc',
        detailsKey: 'projects.p1.details',
        tags: ['Spring Boot', 'Spring Security', 'React', 'TypeScript', 'PostgreSQL', 'DigitalOcean'],
    },
    {
        id: '2',
        titleKey: 'projects.p2.title',
        descKey: 'projects.p2.desc',
        fullDescKey: 'projects.p2.fullDesc',
        detailsKey: 'projects.p2.details',
        tags: ['Flutter', 'SQLite', 'APIs REST', 'JWT', 'VPS'],
    },
    {
        id: '3',
        titleKey: 'projects.p3.title',
        descKey: 'projects.p3.desc',
        fullDescKey: 'projects.p3.fullDesc',
        detailsKey: 'projects.p3.details',
        tags: ['Star Schema', 'PL/SQL', 'ETL', 'Data Warehouse'],
    }
];

export function Projects() {
    const { t } = useTranslation();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Body scroll lock
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProject]);

    // ESC key handler
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedProject(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <SectionContainer id="projects">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t('projects.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                {projects.map((project) => (
                    <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 flex flex-col h-full relative">
                        <CardHeader>
                            <CardTitle>{t(project.titleKey)}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground mb-6 line-clamp-3">
                                {t(project.descKey)}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map(tag => (
                                    <span key={tag} className="bg-primary/20 text-primary text-xs px-2.5 py-0.5 rounded-full font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-2 justify-start">
                            <Button
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-primary text-primary hover:bg-primary/10 hover:text-primary"
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedProject(project)}
                            >
                                {t('projects.viewMore')}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden"
                            role="dialog"
                            aria-modal="true"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute right-4 top-4 p-2 hover:bg-muted rounded-full transition-colors z-10"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="p-8 max-h-[85vh] overflow-y-auto">
                                <h3 className="text-2xl font-bold mb-2">{t(selectedProject.titleKey)}</h3>

                                <div className="mt-8">
                                    <p className="text-muted-foreground mb-8 leading-relaxed">
                                        {t(selectedProject.fullDescKey)}
                                    </p>

                                    <ul className="space-y-3 mb-8">
                                        {(t(selectedProject.detailsKey, { returnObjects: true }) as string[]).map((detail, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <span className="mr-3 mt-2 w-2 h-2 rounded-full bg-primary shrink-0" />
                                                <span className="text-muted-foreground">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="border-t border-border/50 pt-6">
                                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-70">
                                            {t('projects.technologies')}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tags.map(tag => (
                                                <span key={tag} className="bg-primary/20 text-primary text-xs px-2.5 py-1 rounded-full font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </SectionContainer>
    );
}
