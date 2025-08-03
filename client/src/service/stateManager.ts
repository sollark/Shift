import { Account } from "@/models/Account";
import useAccountStore from "@/stores/accountStore";
import useAuthStore from "@/stores/tokenStore";
import useProfileStore from "@/stores/userStore";
import { log } from "./console.service";

/**
 * State Manager - Non-hook version for services that can't use React hooks
 *
 * This module provides state management functions that can be used
 * outside of React components, such as in route configurations,
 * interceptors, and other service modules.
 *
 * For React components, prefer using the useAppState hook instead.
 */

/**
 * Saves account data to the appropriate stores
 * Non-hook version of useAppState.saveAccount()
 */
export function saveAccount(account: Account): void {
  log("stateManager - saveAccount(), account:", account);

  const { profile, role, status } = account;

  // Update each store with relevant data
  useAccountStore.getState().setStatus(status);
  useAccountStore.getState().setRole(role);
  useProfileStore.getState().setProfile(profile);
}

/**
 * Saves access token to auth store
 * Non-hook version of useAppState.saveAccessToken()
 */
export function saveAccessToken(accessToken: string): void {
  log("stateManager - saveAccessToken()");
  useAuthStore.getState().setToken(accessToken);
}

/**
 * Clears all application state (used for logout)
 * Non-hook version of useAppState.clearAllStates()
 */
export function clearAllStates(): void {
  log("stateManager - clearAllStates()");

  // Clear all stores in the correct order
  useAccountStore.getState().clearAccount();
  useProfileStore.getState().clearProfile();
  useAuthStore.getState().clearToken();
}

export const stateManager = {
  saveAccount,
  saveAccessToken,
  clearAllStates,
};
