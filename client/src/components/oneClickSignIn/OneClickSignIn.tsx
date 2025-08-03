import { authService } from "@/service/auth.service";
import { navigationService } from "@/service/navigation.service";
import { useAppState } from "@/hooks/useAppState";
import useAccountStore, { accountSelector } from "@/stores/accountStore";
import { useNavigate } from "@tanstack/react-router";
import SecondaryButton from "@/ui/button/SecondaryButton";
import React from "react";

const OneClickSignIn: React.FC = () => {
  const navigate = useNavigate();

  // Use dependency injection - get state management functions from hook
  const { saveAccessToken, saveAccount } = useAppState();

  // Use proper hook pattern instead of direct store access
  const isAccountComplete = useAccountStore(accountSelector.isComplete);

  const handleSignIn = async (role: string) => {
    let email = "";
    let password = "";

    switch (role) {
      case "user":
        email = "user@test.com";
        password = "userpass@";
        break;
      case "admin":
        email = "admin@test.com";
        password = "adminpass@";
        break;
      default:
        return;
    }

    // Use dependency injection - pass state management callbacks to services
    const signInResult = await authService.signIn(
      email,
      password,
      saveAccessToken,
      saveAccount
    );

    if (signInResult.success) {
      // Use navigation service instead of hardcoded routes
      navigationService.handlePostAuthNavigation(navigate, isAccountComplete);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <SecondaryButton onClick={() => handleSignIn("user")}>
        Sign in as User
      </SecondaryButton>
      <SecondaryButton onClick={() => handleSignIn("admin")}>
        Sign in as Admin
      </SecondaryButton>
    </div>
  );
};

export default OneClickSignIn;
