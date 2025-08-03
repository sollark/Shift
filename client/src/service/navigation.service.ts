import { UseNavigateResult } from "@tanstack/react-router";

/**
 * Navigation Service - Handles application navigation logic
 *
 * This service centralizes all navigation operations and route paths,
 * following dependency injection principles by accepting the navigate
 * function as a parameter rather than importing it directly.
 *
 * Benefits:
 * - Centralized route management
 * - Easy to update routes in one place
 * - Better testability with mock navigation
 * - Separation of concerns (UI components don't know about routes)
 */

// Centralized route constants
export const ROUTES = {
  HOME: "/",
  SIGNIN: "/signin",
  REGISTRATION: "/registration",
  ACCOUNT: "/account",
  ACCOUNT_EDIT: "/account/edit",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  ABOUT: "/about",
  UNAUTHORIZED: "/unauthorized",
  UNAUTHENTICATED: "/unauthenticated",
} as const;

/**
 * Navigation operations for authentication flows
 */
export const navigationService = {
  /**
   * Navigate to home page
   */
  goToHome: (navigate: UseNavigateResult<string>) => {
    navigate({ to: ROUTES.HOME });
  },

  /**
   * Navigate to sign in page
   */
  goToSignIn: (navigate: UseNavigateResult<string>) => {
    navigate({ to: ROUTES.SIGNIN });
  },

  /**
   * Navigate to registration page
   */
  goToRegistration: (navigate: UseNavigateResult<string>) => {
    navigate({ to: ROUTES.REGISTRATION });
  },

  /**
   * Navigate to account page
   */
  goToAccount: (navigate: UseNavigateResult<string>) => {
    navigate({ to: ROUTES.ACCOUNT });
  },

  /**
   * Navigate to account edit page
   */
  goToAccountEdit: (navigate: UseNavigateResult<string>) => {
    navigate({ to: ROUTES.ACCOUNT_EDIT });
  },

  /**
   * Navigate to profile page
   */
  goToProfile: (navigate: UseNavigateResult<string>) => {
    navigate({ to: ROUTES.PROFILE });
  },

  /**
   * Handle post-authentication navigation based on account completion status
   *
   * @param navigate - Navigation function from useNavigate hook
   * @param isAccountComplete - Whether user account setup is complete
   */
  handlePostAuthNavigation: (
    navigate: UseNavigateResult<string>,
    isAccountComplete: boolean
  ) => {
    if (isAccountComplete) {
      navigationService.goToHome(navigate);
    } else {
      navigationService.goToAccountEdit(navigate);
    }
  },

  /**
   * Handle post-registration navigation
   * Always goes to account edit for new users
   *
   * @param navigate - Navigation function from useNavigate hook
   */
  handlePostRegistrationNavigation: (navigate: UseNavigateResult<string>) => {
    navigationService.goToAccountEdit(navigate);
  },

  /**
   * Handle post-account-update navigation based on account completion
   *
   * @param navigate - Navigation function from useNavigate hook
   * @param isAccountComplete - Whether user account setup is complete
   */
  handlePostAccountUpdateNavigation: (
    navigate: UseNavigateResult<string>,
    isAccountComplete: boolean
  ) => {
    if (isAccountComplete) {
      navigationService.goToHome(navigate);
    }
    // If not complete, stay on current page for further editing
  },
};

/**
 * Type definitions for better TypeScript support
 */
export type NavigationService = typeof navigationService;
export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
