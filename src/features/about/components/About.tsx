
import { useTranslation } from 'react-i18next';
import { SectionContainer } from '@/layout/SectionContainer';

export function About() {
    const { t } = useTranslation();

    return (
        <SectionContainer id="about" className="bg-muted/30">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('about.title')}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('about.description')}
                </p>
            </div>
        </SectionContainer>
    );
}
