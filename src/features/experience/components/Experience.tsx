import { useTranslation } from 'react-i18next';
import { SectionContainer } from '@/layout/SectionContainer';
import { GraduationCap, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export function Experience() {
    const { t } = useTranslation();

    const education = [
        {
            id: 'e2',
            title: t('education.e2.title'),
            company: t('education.e2.company'),
            period: t('education.e2.period'),
            desc: t('education.e2.desc'),
            icon: BookOpen,
            inProgress: true
        },
        {
            id: 'e1',
            title: t('education.e1.title'),
            company: t('education.e1.company'),
            period: t('education.e1.period'),
            desc: t('education.e1.desc'),
            icon: GraduationCap,
        },
    ];

    return (
        <SectionContainer id="education">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">{t('education.title')}</h2>

            <div className="relative max-w-4xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />

                <div className="space-y-12">
                    {education.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const periodParts = item.period.split('–');
                        const isCurrentlyInProgress = item.inProgress;

                        return (
                            <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                {/* Dot/Icon */}
                                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-background bg-card flex items-center justify-center text-primary z-10 hidden md:flex group-hover:scale-110 transition-transform duration-300 shadow-md">
                                    <item.icon size={20} />
                                </div>

                                {/* Content Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={clsx(
                                        "w-full md:w-[45%] bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-all duration-300",
                                        isCurrentlyInProgress && "glow-active"
                                    )}
                                >
                                    <div className="flex flex-col gap-1 mb-4">
                                        <h3 className="text-xl font-bold">{item.title}</h3>
                                        <div className="flex items-center justify-between flex-wrap gap-2 text-sm">
                                            <span className="text-primary font-medium">{item.company}</span>
                                            <span className="px-3 py-1 bg-muted rounded-full text-muted-foreground font-medium flex items-center gap-2">
                                                {periodParts[0]} –
                                                <span className={clsx(isCurrentlyInProgress && "text-primary animate-soft-pulse-glow")}>
                                                    {periodParts[1] || item.period}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </SectionContainer>
    );
}
