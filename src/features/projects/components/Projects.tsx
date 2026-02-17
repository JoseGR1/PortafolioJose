
import { useTranslation } from 'react-i18next';
import { SectionContainer } from '@/layout/SectionContainer';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
    {
        id: '1',
        titleKey: 'projects.p1.title',
        descKey: 'projects.p1.desc',
        tags: ['Spring Boot', 'Spring Security', 'React', 'TypeScript', 'PostgreSQL', 'DigitalOcean'],
        demoUrl: '#',
        repoUrl: '#',
        hasDemo: true
    },
    {
        id: '2',
        titleKey: 'projects.p2.title',
        descKey: 'projects.p2.desc',
        tags: ['Flutter', 'SQLite', 'APIs REST', 'JWT', 'VPS'],
        demoUrl: '#',
        repoUrl: '#',
        hasDemo: true
    },
    {
        id: '3',
        titleKey: 'projects.p3.title',
        descKey: 'projects.p3.desc',
        tags: ['Star Schema', 'PL/SQL', 'ETL', 'Data Warehouse'],
        demoUrl: '#',
        repoUrl: '#',
        hasDemo: false
    }
];

export function Projects() {
    const { t } = useTranslation();

    return (
        <SectionContainer id="projects">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t('projects.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
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
                        <CardFooter className="gap-3 mt-auto">
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={buttonVariants({ variant: 'outline', size: 'sm', className: 'w-full' })}
                            >
                                <Github className="mr-2 h-4 w-4" /> {t('projects.viewCode')}
                            </a>
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={buttonVariants({ variant: 'primary', size: 'sm', className: 'w-full' })}
                            >
                                <ExternalLink className="mr-2 h-4 w-4" /> {project.hasDemo ? t('projects.viewDemo') : t('projects.viewDetails')}
                            </a>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </SectionContainer>
    );
}
