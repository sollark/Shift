import { config } from "@/config/config";
import { appStorageService } from "@/service/storage.service";
import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import HttpBackend, { HttpBackendOptions } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18next
  .use(HttpBackend) // Optional for dynamic loading
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) // Pass options to initReactI18next
  .init<HttpBackendOptions>({
    backend: {
      // files are loaded from vite server public folder
      loadPath: "/i18n/locales/{{lng}}/{{ns}}.json",
    },
    fallbackLng: appStorageService.getLanguageCode() || config.defaultLanguage,
    defaultNS: "translation",
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
    debug: true, // Enable debug logging (optional)
    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    },
  });

export const i18n = i18next;

// Usage
// Add import import './i18n/config' in main.tsx to enable  const {i18n} = useTranslate() hook
//
// In component
// const {t} = useTranslation()
// t('key') // returns the translation
//
// In function
// const translation = i18next.t('key')
