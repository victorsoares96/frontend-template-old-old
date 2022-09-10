import 'react-i18next';

import common from '@/locales/en-US/common.json';
import glossary from '@/locales/en-US/glossary.json';
import validation from '@/locales/en-US/validation.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common' | 'glossary' | 'validation';
    resources: {
      common: typeof common;
      glossary: typeof glossary;
      validation: typeof validation;
    };
  }
}
