import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import ru from './locales/ru.json';

export const LANGS = [
  { code: 'tr', label: 'Türkçe', short: 'TR' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'ru', label: 'Русский', short: 'RU' },
] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      // Türkçe = anahtarın kendisi (kaynak gerekmez, fallback anahtarı döndürür)
      tr: { translation: {} },
      en: { translation: en },
      de: { translation: de },
      fr: { translation: fr },
      ru: { translation: ru },
    },
    // TR → Türkçe (anahtarın kendisi); diğer/desteklenmeyen diller → İngilizce
    // (Türkçe'ye düşmesin). de/fr/ru'da eksik anahtar olursa da İngilizce.
    fallbackLng: { tr: ['tr'], default: ['en'] },
    supportedLngs: ['tr', 'en', 'de', 'fr', 'ru'],
    nonExplicitSupportedLngs: true, // en-US → en
    load: 'languageOnly',
    // Türkçe metin ANAHTAR olarak kullanılıyor → ayraçları KAPAT
    // (yoksa "Etiketi okut." ya da "Fiyat: 100" gibi metinler nested key sanılır).
    keySeparator: false,
    nsSeparator: false,
    interpolation: { escapeValue: false },
    returnEmptyString: false,
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    },
  });

// <html lang>'i seçili dile göre güncelle (SEO + erişilebilirlik + CSS uppercase
// locale kuralı: yanlış lang'da İngilizce "service" → Türkçe "SERVİCE" olur).
const setHtmlLang = (lng: string) => {
  if (typeof document !== 'undefined') document.documentElement.lang = (lng || 'tr').split('-')[0];
};
// Desteklenmeyen tarayıcı dili (örn. es/it) → Türkçe yerine İngilizce aç.
const SUPPORTED = ['tr', 'en', 'de', 'fr', 'ru'];
if (!SUPPORTED.includes((i18n.language || 'tr').split('-')[0])) {
  i18n.changeLanguage('en');
}
setHtmlLang(i18n.language); // ilk yükleme (languageChanged init'ten önce kaydedilemez)
i18n.on('languageChanged', setHtmlLang);

export default i18n;
