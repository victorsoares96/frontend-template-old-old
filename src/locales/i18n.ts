// ! For slow compilation time see this: https://react.i18next.com/latest/typescript#slow-compilation-time
import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import enUSResources from '@/locales/en-US';
import ptBRResources from '@/locales/pt-BR';

export enum Languages {
  enUS = 'en-US',
  ptBR = 'pt-BR',
}

export const supportedLanguages: Array<{ flag: string; code: Languages; name: string }> = [
  { flag: '🇺🇸', code: Languages.enUS, name: 'English' },
  { flag: '🇧🇷', code: Languages.ptBR, name: 'Português' },
];

export const defaultNS = 'common';
export const resources = {
  [Languages.enUS]: enUSResources,
  [Languages.ptBR]: ptBRResources,
} as const;

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: import.meta.env.DEV,
    fallbackLng: Languages.enUS,
    ns: ['common', 'glossary', 'validation'],
    defaultNS: 'common',
    /* backend: {
      loadPath: `/locales/{{lng}}/{{ns}}.json`,
    }, */
    resources,
  });

export default i18n;
