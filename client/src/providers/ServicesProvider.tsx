import React, { createContext, useContext, ReactNode } from "react";
import {
  IStorageService,
  IDOMService,
  appStorageService,
  appDOMService,
  MockStorageService,
  MockDOMService,
} from "@/service/storage.service";

/**
 * Services Context - Dependency injection for storage and DOM services
 *
 * This context provides dependency injection for storage and DOM services,
 * allowing components to receive these dependencies rather than directly
 * accessing browser APIs.
 *
 * Benefits:
 * - Easy testing with mock services
 * - Better separation of concerns
 * - SSR compatibility
 * - Configurable storage strategies
 */

export interface IServicesContext {
  storageService: IStorageService & {
    getLanguageCode(): string | null;
    setLanguageCode(languageCode: string): void;
    getTheme(): string | null;
    setTheme(theme: string): void;
  };
  domService: IDOMService & {
    setLanguageDirection(direction: string): void;
    setLanguageFontSize(fontSize: string): void;
  };
}

const ServicesContext = createContext<IServicesContext | null>(null);

type ServicesProviderProps = {
  children: ReactNode;
  // Optional override services for testing
  storageService?: IServicesContext["storageService"];
  domService?: IServicesContext["domService"];
};

/**
 * Services Provider - Provides storage and DOM services through context
 */
export const ServicesProvider: React.FC<ServicesProviderProps> = ({
  children,
  storageService = appStorageService,
  domService = appDOMService,
}) => {
  const services: IServicesContext = {
    storageService,
    domService,
  };

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

/**
 * Hook to use services from context
 */
export const useServices = (): IServicesContext => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};

/**
 * Hook to use storage service specifically
 */
export const useStorageService = () => {
  const { storageService } = useServices();
  return storageService;
};

/**
 * Hook to use DOM service specifically
 */
export const useDOMService = () => {
  const { domService } = useServices();
  return domService;
};

/**
 * Test helper - Creates mock services for testing
 */
export const createMockServices = (): IServicesContext => {
  const mockStorage = new MockStorageService();
  const mockDOM = new MockDOMService();

  const extendedMockStorage = Object.assign(mockStorage, {
    getLanguageCode: () => mockStorage.getItem("languageCode"),
    setLanguageCode: (code: string) =>
      mockStorage.setItem("languageCode", code),
    getTheme: () => mockStorage.getItem("theme"),
    setTheme: (theme: string) => mockStorage.setItem("theme", theme),
  });

  const extendedMockDOM = Object.assign(mockDOM, {
    setLanguageDirection: (direction: string) =>
      mockDOM.setBodyDirection(direction),
    setLanguageFontSize: (fontSize: string) =>
      mockDOM.setDocumentFontSize(fontSize),
  });

  return {
    storageService: extendedMockStorage,
    domService: extendedMockDOM,
  };
};
