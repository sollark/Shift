/**
 * Storage Service - Abstraction layer for browser storage APIs
 *
 * This service provides a dependency injection-friendly abstraction
 * over browser storage APIs (localStorage, sessionStorage, etc.)
 * and DOM manipulation functions.
 *
 * Benefits:
 * - Easy to test with mock implementations
 * - SSR compatible with fallback implementations
 * - Centralized storage logic
 * - Better separation of concerns
 */

export interface IStorageService {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

export interface IDOMService {
  setBodyDirection(direction: string): void;
  setDocumentFontSize(fontSize: string): void;
}

/**
 * LocalStorage implementation of storage service
 */
class LocalStorageService implements IStorageService {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Failed to set item in localStorage: ${key}`, error);
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove item from localStorage: ${key}`, error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn("Failed to clear localStorage", error);
    }
  }
}

/**
 * SessionStorage implementation of storage service
 */
class SessionStorageService implements IStorageService {
  getItem(key: string): string | null {
    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get item from sessionStorage: ${key}`, error);
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      sessionStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Failed to set item in sessionStorage: ${key}`, error);
    }
  }

  removeItem(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove item from sessionStorage: ${key}`, error);
    }
  }

  clear(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.warn("Failed to clear sessionStorage", error);
    }
  }
}

/**
 * Memory-based storage implementation (for SSR or testing)
 */
class MemoryStorageService implements IStorageService {
  private storage = new Map<string, string>();

  getItem(key: string): string | null {
    return this.storage.get(key) || null;
  }

  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }

  removeItem(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

/**
 * DOM manipulation service implementation
 */
class DOMService implements IDOMService {
  setBodyDirection(direction: string): void {
    try {
      if (typeof document !== "undefined") {
        document.body.dir = direction;
      }
    } catch (error) {
      console.warn("Failed to set body direction", error);
    }
  }

  setDocumentFontSize(fontSize: string): void {
    try {
      if (typeof document !== "undefined") {
        document.documentElement.style.fontSize = fontSize;
      }
    } catch (error) {
      console.warn("Failed to set document font size", error);
    }
  }
}

/**
 * Mock implementations for testing
 */
export class MockStorageService implements IStorageService {
  private storage = new Map<string, string>();

  getItem(key: string): string | null {
    return this.storage.get(key) || null;
  }

  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }

  removeItem(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

export class MockDOMService implements IDOMService {
  public bodyDirection = "";
  public documentFontSize = "";

  setBodyDirection(direction: string): void {
    this.bodyDirection = direction;
  }

  setDocumentFontSize(fontSize: string): void {
    this.documentFontSize = fontSize;
  }
}

/**
 * Factory function to create appropriate storage service
 */
function createStorageService(): IStorageService {
  // Check if we're in a browser environment
  if (typeof window !== "undefined" && window.localStorage) {
    return new LocalStorageService();
  }

  // Fallback to memory storage for SSR or environments without localStorage
  return new MemoryStorageService();
}

/**
 * Factory function to create appropriate DOM service
 */
function createDOMService(): IDOMService {
  return new DOMService();
}

/**
 * Default service instances
 */
export const storageService = createStorageService();
export const sessionStorageService = new SessionStorageService();
export const memoryStorageService = new MemoryStorageService();
export const domService = createDOMService();

/**
 * Storage service with specific methods for the application
 */
export const appStorageService = {
  // Language storage
  getLanguageCode(): string | null {
    return storageService.getItem("languageCode");
  },

  setLanguageCode(languageCode: string): void {
    storageService.setItem("languageCode", languageCode);
  },

  // Theme storage
  getTheme(): string | null {
    return storageService.getItem("theme");
  },

  setTheme(theme: string): void {
    storageService.setItem("theme", theme);
  },

  // General storage methods
  ...storageService,
};

/**
 * DOM service with specific methods for the application
 */
export const appDOMService = {
  setLanguageDirection(direction: string): void {
    domService.setBodyDirection(direction);
  },

  setLanguageFontSize(fontSize: string): void {
    domService.setDocumentFontSize(fontSize);
  },

  // General DOM methods
  ...domService,
};
