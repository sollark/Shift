import { accountService } from "./account.service";
import { httpService } from "./axios/http.service";
import { log } from "./console.service";
import { cookieService } from "./cookie.service";
// Import Account type from its module (update the path as needed)
// Update the import path below if your Account model is in a different location
import { Account } from "@/models/Account";

/**
 * Authentication Service - Handles user authentication operations
 *
 * This service manages authentication flows including registration,
 * sign-in, sign-out, and token management. It follows dependency
 * injection principles by accepting callback functions for state
 * management rather than directly manipulating stores.
 *
 * State updates are handled by the calling components using the
 * useAppState hook, ensuring proper separation of concerns.
 */

type AuthData = {
  accessToken: string;
};

/**
 * Registers a new user account
 *
 * @param email - User's email address
 * @param password - User's password
 * @param onTokenSave - Callback to save access token to state
 * @returns Promise with success status and message
 *
 * @example
 * // In a component with useAppState hook:
 * const { saveAccessToken } = useAppState()
 *
 * const result = await registration(
 *   'user@example.com',
 *   'password123',
 *   saveAccessToken
 * )
 */
async function registration(
  email: string,
  password: string,
  onTokenSave?: (token: string) => void
) {
  try {
    const registrationResponse = await httpService.post<AuthData>(
      "auth/registration",
      { email, password }
    );

    if (!registrationResponse) {
      return { success: false, message: "Cannot connect to server" };
    }

    const { success, message } = registrationResponse;
    if (message) log("authService - registration, message:", message);

    if (success) {
      // Save token using injected callback
      saveAccessToken(onTokenSave);
    }

    return { success, message };
  } catch (error) {
    log("authService - registration error:", error);
    return { success: false, message: "Registration failed" };
  }
}

/**
 * Signs in an existing user
 *
 * @param email - User's email address
 * @param password - User's password
 * @param onTokenSave - Callback to save access token to state
 * @param onAccountSave - Callback to save account data to state
 * @returns Promise with success status and message
 *
 * @example
 * // In a component with useAppState hook:
 * const { saveAccessToken, saveAccount } = useAppState()
 *
 * const result = await signIn(
 *   'user@example.com',
 *   'password123',
 *   saveAccessToken,
 *   saveAccount
 * )
 */
async function signIn(
  email: string,
  password: string,
  onTokenSave?: (token: string) => void,
  onAccountSave?: (account: Account) => void
) {
  try {
    const signInResponse = await httpService.post<AuthData>("auth/signin", {
      email,
      password,
    });

    if (!signInResponse?.success) {
      return { success: false, message: "Cannot connect to server" };
    }

    const { success, message } = signInResponse;
    if (message) log("authService - signIn, message:", message);

    if (success) {
      // Save token using injected callback
      saveAccessToken(onTokenSave);

      // Fetch and save account data using injected callback
      await accountService.getAccount(onAccountSave);
    }

    return { success, message };
  } catch (error) {
    log("authService - signIn error:", error);
    return { success: false, message: "Sign in failed" };
  }
}

/**
 * Signs out the current user
 *
 * @param onStatesClear - Callback to clear all application state
 * @returns Promise<void>
 *
 * @example
 * // In a component with useAppState hook:
 * const { clearAllStates } = useAppState()
 *
 * await signOut(clearAllStates)
 */
async function signOut(onStatesClear?: () => void) {
  try {
    log("authService - signOut");

    await httpService.put("auth/signout");

    // Clear all states using injected callback
    onStatesClear?.();
  } catch (error) {
    log("authService - signOut error:", error);
    // Clear states even if API call fails
    onStatesClear?.();
  }
}

/**
 * Checks if user is authenticated
 *
 * @param onTokenSave - Callback to save access token to state
 * @param onStatesClear - Callback to clear states if auth fails
 * @returns Promise with authentication status
 *
 * @example
 * // In a component with useAppState hook:
 * const { saveAccessToken, clearAllStates } = useAppState()
 *
 * const result = await authCheck(saveAccessToken, clearAllStates)
 */
async function authCheck(
  onTokenSave?: (token: string) => void,
  onStatesClear?: () => void
) {
  try {
    log("authService - authCheck");

    const authCheckResponse = await httpService.get<AuthData>("auth/check");

    if (!authCheckResponse?.success) {
      // Clear states on auth failure
      onStatesClear?.();
      return { success: false, message: "Failed to authenticate" };
    }

    const { success, message } = authCheckResponse;
    log("authService - authCheck, message:", message);

    // Save token on success
    saveAccessToken(onTokenSave);

    return { success, message };
  } catch (error) {
    log("authService - authCheck error:", error);
    onStatesClear?.();
    return { success: false, message: "Authentication check failed" };
  }
}

/**
 * Refreshes authentication tokens
 *
 * @param onTokenSave - Callback to save new access token to state
 * @param onStatesClear - Callback to clear states if refresh fails
 * @returns Promise with refresh status
 *
 * @example
 * // In a component with useAppState hook:
 * const { saveAccessToken, clearAllStates } = useAppState()
 *
 * const result = await refreshTokens(saveAccessToken, clearAllStates)
 */
async function refreshTokens(
  onTokenSave?: (token: string) => void,
  onStatesClear?: () => void
) {
  try {
    log("authService - refreshTokens");

    const refreshResponse = await httpService.get<AuthData>("auth/refresh");

    if (!refreshResponse?.success) {
      // Clear states on refresh failure
      onStatesClear?.();
      return { success: false, message: "Failed to refresh token" };
    }

    const { success, message } = refreshResponse;
    log("authService - refreshTokens, message:", message);

    // Save new token on success
    saveAccessToken(onTokenSave);

    return { success, message };
  } catch (error) {
    log("authService - refreshTokens error:", error);
    onStatesClear?.();
    return { success: false, message: "Token refresh failed" };
  }
}

/**
 * Authentication service exports
 *
 * All functions now follow dependency injection principles:
 * - Accept callback functions for state management
 * - No direct store manipulation
 * - Better separation of concerns
 * - Improved testability
 */
export const authService = {
  registration,
  signIn,
  signOut,
  authCheck,
  refreshTokens,
};

/**
 * Private helper function to save access token from cookies
 *
 * This function is used internally by auth operations that need
 * to extract and save the access token from HTTP-only cookies.
 *
 * @param onTokenSave - Callback to save the token to state
 * @returns void
 */
function saveAccessToken(onTokenSave?: (token: string) => void) {
  const headerPayload = cookieService.getCookieValue(
    "accessTokenHeaderPayload"
  );
  if (!headerPayload) {
    log("authService - accessTokenHeaderPayload is missing");
    return;
  }

  onTokenSave?.(headerPayload);
}
