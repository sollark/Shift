import { ProfileSchema } from "@/models/Profile";
import { accountService } from "@/service/account.service";
import { navigationService } from "@/service/navigation.service";
import { log } from "@/service/console.service";
import useAccountStore, { accountSelector } from "@/stores/accountStore";
import useUserStore from "@/stores/userStore";
import { useNavigate } from "@tanstack/react-router";
import { FC, ReactElement } from "react";
import { z } from "zod";
import MultistepForm from "../MultistepForm";
import { useAppState } from "@/hooks/useAppState";

interface Props {
  children: ReactElement[];
  [key: string]: any; // allow any other prop that is not explicitly defined
}

const AccountSchema = z.object({}).merge(ProfileSchema);

/**
 * AccountForm Component - Multi-step form for account updates
 *
 * This component demonstrates proper use of the new state management
 * pattern. Instead of directly calling storeService, it uses the
 * useAppState hook for clean dependency injection.
 *
 * @example
 * <AccountForm>
 *   <AccountStep1 />
 *   <AccountStep2 />
 * </AccountForm>
 */
const AccountForm: FC<Props> = (props: Props) => {
  const { children } = props;
  const navigate = useNavigate();

  // Get profile data from store
  const profile = useUserStore((state) => state.profile);

  // Get account completion status
  const isAccountComplete = useAccountStore(accountSelector.isComplete);

  // Use the new state management hook (replaces storeService)
  const { saveAccount } = useAppState();

  // Default form values from current profile
  const defaultValues = {
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    ID: profile?.ID || "",
  };

  /**
   * Form submission handler
   *
   * This function demonstrates the new dependency injection pattern:
   * - Calls accountService with a callback function
   * - Uses saveAccount from useAppState hook
   * - No direct store manipulation
   *
   * @param form - Form data from the multi-step form
   */
  async function submit(form: any) {
    log("AccountForm - submit, form data:", form);

    try {
      // Call service with dependency injection callback
      const account = await accountService.updateAccount(
        form.firstName,
        form.lastName,
        form.ID,
        saveAccount // Inject state update function
      );

      log("AccountForm - account updated:", account);

      // Use navigation service instead of hardcoded route
      if (account && isAccountComplete) {
        navigationService.handlePostAccountUpdateNavigation(
          navigate,
          isAccountComplete
        );
      }
    } catch (error) {
      log("AccountForm - submit error:", error);
      // Handle error (show notification, etc.)
    }
  }

  return (
    <MultistepForm
      schema={AccountSchema}
      defaultValues={defaultValues}
      submit={submit}
    >
      {children}
    </MultistepForm>
  );
};

export default AccountForm;
