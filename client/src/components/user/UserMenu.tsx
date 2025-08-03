import { authService } from "@/service/auth.service";
import { stateManager } from "@/service/stateManager";
import { ROUTES } from "@/service/navigation.service";
import { Link } from "@tanstack/react-router";
import i18next from "i18next";

export function getUserMenu() {
  return [
    {
      key: "Account",
      link: (
        <Link to={ROUTES.ACCOUNT}>{i18next.t("account_menu.account")}</Link>
      ),
    },
    {
      key: "Profile",
      link: (
        <Link to={ROUTES.PROFILE}>{i18next.t("account_menu.profile")}</Link>
      ),
    },
    {
      key: "Settings",
      link: <Link to={ROUTES.SETTINGS}>{i18next.t("ui.settings")}</Link>,
    },
    {
      key: "SignOut",
      link: (
        <Link
          onClick={() => authService.signOut(stateManager.clearAllStates)}
          to={ROUTES.SIGNIN}
        >
          {i18next.t("auth.sign_out")}
        </Link>
      ),
    },
  ];
}

export function getGuestMenu() {
  return [
    {
      key: "SignIn",
      link: <Link to={ROUTES.SIGNIN}>{i18next.t("auth.sign_in")}</Link>,
    },
    {
      key: "Settings",
      link: <Link to={ROUTES.SETTINGS}>{i18next.t("ui.settings")}</Link>,
    },
  ];
}
