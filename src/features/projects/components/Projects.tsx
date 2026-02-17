import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionContainer } from '@/layout/SectionContainer';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface Project {
    id: string;
    titleKey: string;
    descKey: string;
    fullDescKey: string;
    detailsKey: string;
    tags: string[];
    image?: string;
    galleryImages?: string[];
}

const projects: Project[] = [
    {
        id: '1',
        titleKey: 'projects.p1.title',
        descKey: 'projects.p1.desc',
        fullDescKey: 'projects.p1.fullDesc',
        detailsKey: 'projects.p1.details',
        tags: ['Spring Boot', 'Spring Security', 'React', 'TypeScript', 'PostgreSQL', 'DigitalOcean'],
        image: '/assets/projects/tcp.png',
        galleryImages: [
            '/assets/projects/tcp/tcp1.png',
            '/assets/projects/tcp/tcp2.png',
            '/assets/projects/tcp/tcp3.png',
            '/assets/projects/tcp/tcp4.png',
            '/assets/projects/tcp/tcp5.png',
            '/assets/projects/tcp/tcp6.png',
            '/assets/projects/tcp/tcp7.png'
        ]
    },
    {
        id: '2',
        titleKey: 'projects.p2.title',
        descKey: 'projects.p2.desc',
        fullDescKey: 'projects.p2.fullDesc',
        detailsKey: 'projects.p2.details',
        tags: ['Flutter', 'SQLite', 'APIs REST', 'JWT', 'VPS'],
        image: '/assets/projects/mobile-app.png'
    },
    {
        id: '3',
        titleKey: 'projects.p3.title',
        descKey: 'projects.p3.desc',
        fullDescKey: 'projects.p3.fullDesc',
        detailsKey: 'projects.p3.details',
        tags: ['Star Schema', 'PL/SQL', 'ETL', 'Data Warehouse'],
        image: '/assets/projects/data-warehouse.png'
    }
];

export function Projects() {
    const { t } = useTranslation();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const [activeTcpImageIndex, setActiveTcpImageIndex] = useState(0);

    // Auto-slide effect for the TCP card preview
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!selectedProject && !isImageExpanded) {
            interval = setInterval(() => {
                const tcpProject = projects.find(p => p.id === '1');
                if (tcpProject?.galleryImages) {
                    setActiveTcpImageIndex((prev) => (prev + 1) % tcpProject.galleryImages!.length);
                }
            }, 3000); // Change image every 3 seconds
        }
        return () => clearInterval(interval);
    }, [selectedProject, isImageExpanded]);

    // Body scroll lock
    useEffect(() => {
        if (selectedProject || isImageExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProject, isImageExpanded]);

    // ESC key handler
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isImageExpanded) setIsImageExpanded(false);
                else setSelectedProject(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isImageExpanded]);

    const handleNextImage = (e: React.MouseEvent, total: number) => {
        e.stopPropagation();
        setActiveTcpImageIndex((prev) => (prev + 1) % total);
    };

    const handlePrevImage = (e: React.MouseEvent, total: number) => {
        e.stopPropagation();
        setActiveTcpImageIndex((prev) => (prev - 1 + total) % total);
    };

    const getImageUrl = (imagePath?: string) => {
        if (!imagePath) return '';
        const path = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
        return `${import.meta.env.BASE_URL}${path}`;
    };

    return (
        <SectionContainer id="projects">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t('projects.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                {projects.map((project) => {
                    const hasGallery = project.galleryImages && project.galleryImages.length > 0;
                    const currentImage = (hasGallery && project.id === '1')
                        ? project.galleryImages![activeTcpImageIndex]
                        : project.image;

                    return (
                        <Card
                            key={project.id}
                            className="group hover:shadow-lg transition-all duration-300 flex flex-col h-full relative cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Project Image Container */}
                            {currentImage && (
                                <div className="relative w-full overflow-hidden rounded-t-2xl bg-muted/20">
                                    <div className="relative h-52 w-full overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={currentImage}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                src={getImageUrl(currentImage)}
                                                alt={t(project.titleKey)}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </AnimatePresence>

                                        {/* Dark Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            )}

                            <CardHeader className={clsx(!currentImage && "pt-6")}>
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
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent card click trigger
                                        setSelectedProject(project);
                                    }}
                                >
                                    {t('projects.viewMore')}
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
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

                            <div className="p-8 max-h-[85vh] overflow-y-auto no-scrollbar">
                                {(selectedProject.galleryImages?.[activeTcpImageIndex] || selectedProject.image) && (
                                    <div className="flex flex-col gap-4 mb-8">
                                        <div
                                            className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-border cursor-zoom-in group/modal-img"
                                            onClick={() => setIsImageExpanded(true)}
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={selectedProject.galleryImages?.[activeTcpImageIndex] || selectedProject.image}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    src={getImageUrl(selectedProject.galleryImages?.[activeTcpImageIndex] || selectedProject.image)}
                                                    alt={t(selectedProject.titleKey)}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/modal-img:scale-105"
                                                />
                                            </AnimatePresence>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                                            {/* Gallery Controls in Modal */}
                                            {selectedProject.galleryImages && (
                                                <>
                                                    <button
                                                        onClick={(e) => handlePrevImage(e, selectedProject.galleryImages!.length)}
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-10"
                                                    >
                                                        <ChevronLeft className="h-6 w-6" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleNextImage(e, selectedProject.galleryImages!.length)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-10"
                                                    >
                                                        <ChevronRight className="h-6 w-6" />
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        {/* Thumbnails row in Modal */}
                                        {selectedProject.galleryImages && (
                                            <div className="flex gap-2 p-1 overflow-x-auto no-scrollbar pb-2">
                                                {selectedProject.galleryImages.map((img, idx) => (
                                                    <button
                                                        key={img}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveTcpImageIndex(idx);
                                                        }}
                                                        className={clsx(
                                                            "relative h-14 w-20 shrink-0 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105",
                                                            activeTcpImageIndex === idx
                                                                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                                                : "opacity-50 hover:opacity-100"
                                                        )}
                                                    >
                                                        <img src={getImageUrl(img)} className="w-full h-full object-cover" />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
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

            {/* Image Lightbox */}
            <AnimatePresence>
                {isImageExpanded && (selectedProject?.galleryImages?.[activeTcpImageIndex] || selectedProject?.image) && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsImageExpanded(false)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-zoom-out"
                        />

                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => setIsImageExpanded(false)}
                            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110]"
                        >
                            <X className="h-6 w-6 text-white" />
                        </motion.button>

                        <motion.img
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            src={getImageUrl(selectedProject?.galleryImages?.[activeTcpImageIndex] || selectedProject?.image)}
                            alt={t(selectedProject?.titleKey || '')}
                            className="relative max-w-full max-h-full object-contain rounded-xl shadow-2xl z-[105]"
                        />
                    </div>
                )}
            </AnimatePresence>
        </SectionContainer>
    );
}
