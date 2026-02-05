
import { useTranslation } from 'react-i18next';
import { SectionContainer } from '@/layout/SectionContainer';
import { Briefcase } from 'lucide-react';

const experiences = [
    {
        id: '1',
        roleKey: 'experience.e1.role',
        companyKey: 'experience.e1.company',
        period: '2023 - Present',
        descKey: 'experience.e1.desc'
    },
    {
        id: '2',
        roleKey: 'experience.e2.role',
        companyKey: 'experience.e2.company',
        period: '2021 - 2023',
        descKey: 'experience.e2.desc'
    }
];

export function Experience() {
    const { t } = useTranslation();

    return (
        <SectionContainer id="experience" className="bg-muted/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t('experience.title')}</h2>
            <div className="max-w-3xl mx-auto">
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                <Briefcase className="w-5 h-5 text-primary" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-border bg-card shadow-sm">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-lg">{t(exp.roleKey)}</h3>
                                    <time className="text-xs font-medium text-muted-foreground">{exp.period}</time>
                                </div>
                                <div className="text-primary font-medium mb-2">{t(exp.companyKey)}</div>
                                <p className="text-muted-foreground text-sm">
                                    {t(exp.descKey)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}
