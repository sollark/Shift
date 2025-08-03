import { config } from "@/config/config";
import { LANGUAGES } from "@/constants/constants";
import { log } from "@/service/console.service";
import { FC, ReactNode, createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "./AppThemeProvider";
import { useStorageService, useDOMService } from "./ServicesProvider";

const DEFAULT_LANGUAGE = config.defaultLanguage;

type LanguageProviderProps = {
  children: ReactNode;
};

export type LanguageContextType = {
  languageCode: string;
  changeLanguage: (languageCode: string) => void;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("LanguageProvider must be used within a AppThemeProvider");
  }
  const { languageCode, setLanguageCode } = themeContext;

  if (!languageCode) {
    throw new Error("LanguageProvider must be used within a AppThemeProvider");
  }

  // Use injected services instead of direct browser API access
  const storageService = useStorageService();
  const domService = useDOMService();

  useEffect(() => {
    const storedLanguageCode = storageService.getLanguageCode();
    const initialLanguageCode = storedLanguageCode || DEFAULT_LANGUAGE;

    if (LANGUAGES.some((lang) => lang.value === initialLanguageCode)) {
      setLanguageCode(initialLanguageCode);
    } else {
      setLanguageCode(LANGUAGES[0].value);
    }
  }, [setLanguageCode, storageService]);

  const changeLanguage = (newLanguageCode: string) => {
    if (LANGUAGES.some((lang) => lang.value === newLanguageCode)) {
      log("Setting language ...");
      setLanguageCode(newLanguageCode);
      storageService.setLanguageCode(newLanguageCode);
      i18n.changeLanguage(newLanguageCode);
    } else {
      throw new Error(`Invalid language code: ${newLanguageCode}`);
    }
  };

  const { i18n } = useTranslation();

  // Use injected DOM service instead of direct DOM manipulation
  useEffect(() => {
    domService.setLanguageDirection(i18n.dir());
    domService.setLanguageFontSize(languageCode === "he" ? "16px" : "14px");
  }, [languageCode, i18n, domService]);

  return (
    <LanguageContext.Provider value={{ languageCode, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
