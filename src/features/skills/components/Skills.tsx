import { useTranslation } from 'react-i18next';
import { SectionContainer } from '@/layout/SectionContainer';
import { Network, Wrench } from 'lucide-react';

const skills = [
    {
        nameKey: 'skills.languages',
        items: [
            { name: 'Java', icon: 'devicon-java-plain' },
            { name: 'JavaScript', icon: 'devicon-javascript-plain' },
            { name: 'Python', icon: 'devicon-python-plain' },
            { name: 'C++', icon: 'devicon-cplusplus-plain' },
            { name: 'SQL', icon: 'devicon-mysql-plain' },
        ]
    },
    {
        nameKey: 'skills.frameworks',
        items: [
            { name: 'Spring Boot', icon: 'devicon-spring-plain' },
            { name: 'Spring Security (JWT)', icon: 'devicon-spring-plain' },
            { name: 'React', icon: 'devicon-react-original' },
            { name: 'Flutter', icon: 'devicon-flutter-plain' },
            { name: 'APIs REST', lucide: Network },
        ]
    },
    {
        nameKey: 'skills.databases',
        items: [
            { name: 'MySQL', icon: 'devicon-mysql-plain' },
            { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
            { name: 'SQLite', icon: 'devicon-sqlite-plain' },
        ]
    },
    {
        nameKey: 'skills.tools',
        items: [
            { name: 'Git y GitLab', icon: 'devicon-gitlab-plain' },
            { name: 'Maven', icon: 'devicon-apache-plain' },
            { name: 'Docker', icon: 'devicon-docker-plain' },
            { name: 'Jenkins', icon: 'devicon-jenkins-line' },
            { name: 'Postman', icon: 'devicon-postman-plain' },
            { name: 'DigitalOcean', icon: 'devicon-digitalocean-plain' },
        ]
    },
];

export function Skills() {
    const { t } = useTranslation();

    return (
        <SectionContainer id="skills">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t('skills.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skills.map((category, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-xl border border-border bg-card transition-all duration-300"
                    >
                        <h3 className="text-xl font-semibold mb-6">{t(category.nameKey)}</h3>
                        <ul className="space-y-3">
                            {category.items.map((skill) => (
                                <li
                                    key={skill.name}
                                    className="flex items-center gap-3 text-muted-foreground transition-all duration-300 hover:text-primary hover:scale-105 hover:translate-x-1 hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.6)] group"
                                >
                                    {skill.icon ? (
                                        <i className={`${skill.icon} text-lg transition-all duration-300 group-hover:scale-110`} />
                                    ) : skill.lucide ? (
                                        <skill.lucide size={18} className="transition-all duration-300 group-hover:scale-110" />
                                    ) : (
                                        <Wrench size={18} className="transition-all duration-300 group-hover:scale-110" />
                                    )}
                                    {skill.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
