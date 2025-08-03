import Cookies from "js-cookie";

/**
 * Cookie Service - Abstraction layer for browser cookies
 *
 * This service provides a centralized way to handle cookies
 * with proper error handling and fallbacks.
 *
 * Benefits:
 * - Centralized cookie management
 * - Error handling and fallbacks
 * - Easy to test with dependency injection
 * - Consistent API across the application
 */

export interface ICookieService {
  getCookieValue(cookieName: string): string | undefined;
  setCookieValue(
    cookieName: string,
    value: string,
    options?: Cookies.CookieAttributes
  ): void;
  removeCookie(cookieName: string): void;
}

class CookieService implements ICookieService {
  getCookieValue(cookieName: string): string | undefined {
    try {
      return Cookies.get(cookieName);
    } catch (error) {
      console.warn(`Failed to get cookie: ${cookieName}`, error);
      return undefined;
    }
  }

  setCookieValue(
    cookieName: string,
    value: string,
    options?: Cookies.CookieAttributes
  ): void {
    try {
      Cookies.set(cookieName, value, options);
    } catch (error) {
      console.warn(`Failed to set cookie: ${cookieName}`, error);
    }
  }

  removeCookie(cookieName: string): void {
    try {
      Cookies.remove(cookieName);
    } catch (error) {
      console.warn(`Failed to remove cookie: ${cookieName}`, error);
    }
  }
}

/**
 * Mock implementation for testing
 */
export class MockCookieService implements ICookieService {
  private cookies = new Map<string, string>();

  getCookieValue(cookieName: string): string | undefined {
    return this.cookies.get(cookieName);
  }

  setCookieValue(cookieName: string, value: string): void {
    this.cookies.set(cookieName, value);
  }

  removeCookie(cookieName: string): void {
    this.cookies.delete(cookieName);
  }
}

// Default service instance
export const cookieService = new CookieService();
