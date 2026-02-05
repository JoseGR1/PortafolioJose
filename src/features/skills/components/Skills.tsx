
import { useTranslation } from 'react-i18next';
import { SectionContainer } from '@/layout/SectionContainer';
import { Database, Layout, PenTool, Terminal } from 'lucide-react';

const skills = [
    { nameKey: 'skills.frontend', icon: Layout, items: ['React', 'TypeScript', 'TailwindCSS', 'Redux', 'Next.js'] },
    { nameKey: 'skills.backend', icon: Database, items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'] },
    { nameKey: 'skills.tools', icon: Terminal, items: ['Git', 'Docker', 'AWS', 'Vite'] },
    { nameKey: 'skills.design', icon: PenTool, items: ['Figma', 'Adobe XD', 'Responsive Design'] },
];

export function Skills() {
    const { t } = useTranslation();

    return (
        <SectionContainer id="skills">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t('skills.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skills.map((category, index) => (
                    <div key={index} className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                            <category.icon size={24} />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">{t(category.nameKey)}</h3>
                        <ul className="space-y-2">
                            {category.items.map((skill) => (
                                <li key={skill} className="flex items-center text-muted-foreground">
                                    <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
