
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';

export function LanguageSwitch() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle language"
        >
            <span className={clsx(i18n.language === 'es' ? 'text-primary font-bold' : 'text-muted-foreground')}>ES</span>
            <span className="text-muted-foreground">|</span>
            <span className={clsx(i18n.language === 'en' ? 'text-primary font-bold' : 'text-muted-foreground')}>EN</span>
        </button>
    );
}
