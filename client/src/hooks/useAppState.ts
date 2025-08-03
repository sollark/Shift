import { Account } from "@/models/Account";
import useAccountStore from "@/stores/accountStore";
import useAuthStore from "@/stores/tokenStore";
import useProfileStore from "@/stores/userStore";
import { log } from "@/service/console.service";
import { useCallback } from "react";

/**
 * Custom hook that provides centralized state management operations
 *
 * This hook encapsulates all store operations and provides a clean API
 * for managing application state. It replaces the anti-pattern storeService
 * that directly manipulated stores from service layers.
 *
 * @example
 * // In a component or custom hook:
 * const { saveAccount, saveAccessToken, clearAllStates } = useAppState()
 *
 * // Save account data (updates multiple stores)
 * saveAccount(accountData)
 *
 * // Save access token
 * saveAccessToken('token123')
 *
 * // Clear all application state (logout)
 * clearAllStates()
 */
export function useAppState() {
  const accountActions = useAccountStore((state) => ({
    setStatus: state.setStatus,
    setRole: state.setRole,
    clearAccount: state.clearAccount,
  }));

  const authActions = useAuthStore((state) => ({
    setToken: state.setToken,
    clearToken: state.clearToken,
  }));

  const profileActions = useProfileStore((state) => ({
    setProfile: state.setProfile,
    clearProfile: state.clearProfile,
  }));

  /**
   * Saves account data to the appropriate stores
   * Replaces storeService.saveAccount()
   *
   * @param account - Complete account object with profile, role, and status
   */
  const saveAccount = useCallback(
    (account: Account) => {
      log("useAppState - saveAccount(), account:", account);

      const { profile, role, status } = account;

      // Update each store with relevant data
      accountActions.setStatus(status);
      accountActions.setRole(role);
      profileActions.setProfile(profile);
    },
    [accountActions, profileActions]
  );

  /**
   * Saves access token to auth store
   * Replaces storeService.saveAccessToken()
   *
   * @param accessToken - JWT access token string
   */
  const saveAccessToken = useCallback(
    (accessToken: string) => {
      log("useAppState - saveAccessToken()");
      authActions.setToken(accessToken);
    },
    [authActions]
  );

  /**
   * Clears all application state (used for logout)
   * Replaces storeService.clearStoreStates()
   *
   * This method resets all stores to their initial state,
   * effectively logging out the user and clearing all data.
   */
  const clearAllStates = useCallback(() => {
    log("useAppState - clearAllStates()");

    // Clear all stores in the correct order
    accountActions.clearAccount();
    profileActions.clearProfile();
    authActions.clearToken();
  }, [accountActions, profileActions, authActions]);

  return {
    saveAccount,
    saveAccessToken,
    clearAllStates,
  };
}

/**
 * Type definitions for better TypeScript support
 */
export type AppStateActions = ReturnType<typeof useAppState>;
