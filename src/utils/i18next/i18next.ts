import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from 'src/assets/locales/en';
import vn from 'src/assets/locales/vn';
import {ELanguage} from 'src/shared/interfaces';

export const resources = {
  vn: {
    translation: vn,
  },
  en: {
    translation: en,
  },
} as const;

export type ResourceType = (typeof resources)[ELanguage.ENGLISH];

i18next.use(initReactI18next).init({
  resources: resources,
  lng: ELanguage.ENGLISH,
  fallbackLng: ELanguage.ENGLISH,
  returnNull: false,
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
  compatibilityJSON: 'v3', // https://stackoverflow.com/questions/70493788/i18nextpluralresolver-your-environment-seems-not-to-be-intl-api-compatible-u
});

export default i18next;

export const changeLanguage = (language = ELanguage.ENGLISH) => {
  i18next
    .changeLanguage(language)
    .then(() => {})
    .catch(() => {});
};
