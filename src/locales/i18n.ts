import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import esTranslation from './es/translation.json';
import enTranslation from './en/translation.json';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'es',
        supportedLngs: ['es', 'en'],
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            es: { translation: esTranslation },
            en: { translation: enTranslation }
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        }
    });

export default i18n;
