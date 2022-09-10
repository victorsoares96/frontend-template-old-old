import { useTranslation } from 'react-i18next';

import { supportedLanguages } from '@/locales/i18n';

import { MenuItem, Select } from './styled';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const currentLanguage = supportedLanguages.find((lang) => lang.code === i18n.language);
  return (
    <Select
      defaultValue={currentLanguage?.code}
      onChange={(e) => i18n.changeLanguage(e.target.value as string)}
    >
      {supportedLanguages.map((language) => (
        <MenuItem key={language.code} value={language.code}>
          {language.flag} {language.name}
        </MenuItem>
      ))}
    </Select>
  );
}
export default LanguageSelector;
