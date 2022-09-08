import intl from 'react-intl-universal';

import ptBR from '@/locales/pt-BR.json';

const locales: { [key: string]: unknown } = {
  'pt-BR': ptBR,
};

export const currentLocale = locales[navigator.language] ? navigator.language : 'pt-BR';

export default function loadLocales() {
  intl.init({
    currentLocale,
    locales,
  });
}

export const currencyConfig = {
  locale: currentLocale,
  formats: {
    number: {
      BRL: {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};
