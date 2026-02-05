
import { useTranslation } from 'react-i18next';
import { SectionContainer } from '@/layout/SectionContainer';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export function Contact() {
    const { t } = useTranslation();

    return (
        <SectionContainer id="contact">
            <div className="max-w-xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
                <p className="text-muted-foreground mb-8">
                    {t('contact.description')}
                </p>

                <form className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{t('contact.name')}</label>
                            <input id="name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder={t('contact.placeholders.name')} />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{t('contact.email')}</label>
                            <input id="email" type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder={t('contact.placeholders.email')} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{t('contact.message')}</label>
                        <textarea id="message" className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder={t('contact.placeholders.message')} />
                    </div>
                    <Button className="w-full">
                        {t('contact.send')} <Send className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </div>
        </SectionContainer>
    );
}
