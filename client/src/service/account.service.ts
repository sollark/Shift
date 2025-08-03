import { Account } from "@/models/Account";
import { httpService } from "./axios/http.service";
import { log } from "./console.service";

/**
 * Account Service - Handles account-related API operations
 *
 * This service is responsible for communicating with the backend
 * for account operations. It follows dependency injection principles
 * by accepting dependencies through function parameters rather than
 * hard-coding imports.
 *
 * State management is now handled by the calling components using
 * the useAppState hook, following proper separation of concerns.
 */

type AccountData = {
  account: Account;
};

/**
 * Updates user account information
 *
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param ID - User's identification number
 * @param onSuccess - Callback function to handle successful account save
 * @returns Promise<Account | null> - Updated account data or null if failed
 *
 * @example
 * // In a component with useAppState hook:
 * const { saveAccount } = useAppState()
 *
 * const account = await updateAccount(
 *   'John',
 *   'Doe',
 *   '123456',
 *   saveAccount  // Pass the state update function
 * )
 */
async function updateAccount(
  firstName: string,
  lastName: string,
  ID: string,
  onSuccess?: (account: Account) => void
): Promise<Account | null> {
  try {
    const response = await httpService.post<AccountData>("account/update", {
      firstName,
      lastName,
      ID,
    });

    log("accountService - updateAccount, response", response);

    if (response?.success) {
      const { account } = response.data;

      // Call the success callback to update state (dependency injection)
      onSuccess?.(account);

      return account;
    }

    log("accountService - updateAccount failed:", response?.message);
    return null;
  } catch (error) {
    log("accountService - updateAccount error:", error);
    return null;
  }
}

/**
 * Retrieves user account information
 *
 * @param onSuccess - Callback function to handle successful account retrieval
 * @returns Promise<Account | null> - Account data or null if failed
 *
 * @example
 * // In a component with useAppState hook:
 * const { saveAccount } = useAppState()
 *
 * const account = await getAccount(saveAccount)
 * if (account) {
 *   console.log('Account loaded:', account)
 * }
 */
async function getAccount(
  onSuccess?: (account: Account) => void
): Promise<Account | null> {
  try {
    const response = await httpService.get<AccountData>("account");

    log("accountService - getAccount, response", response);

    if (response?.success) {
      const { account } = response.data;

      // Call the success callback to update state (dependency injection)
      onSuccess?.(account);

      return account;
    }

    log("accountService - getAccount failed:", response?.message);
    return null;
  } catch (error) {
    log("accountService - getAccount error:", error);
    return null;
  }
}

/**
 * Account service exports
 *
 * These functions now follow dependency injection principles:
 * - No hard-coded store dependencies
 * - Accept callback functions for state updates
 * - Focused on single responsibility (API communication)
 * - Better testability and flexibility
 */
export const accountService = {
  updateAccount,
  getAccount,
};
