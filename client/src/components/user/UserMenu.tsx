import { authService } from "@/service/auth.service";
import { Link } from "@tanstack/react-router";
import i18next from "i18next";
import { clearAllStates } from "../../service/stateManager"; // Update the path if the file name or location is different, e.g., "@/service/stateManager.ts" or "@/services/stateManager"

export function getUserMenu() {
  return [
    {
      key: "Account",
      link: <Link to="/account">{i18next.t("account_menu.account")}</Link>,
    },
    {
      key: "Profile",
      link: <Link to="/profile">{i18next.t("account_menu.profile")}</Link>,
    },
    {
      key: "Settings",
      link: <Link to="/settings">{i18next.t("ui.settings")}</Link>,
    },
    {
      key: "SignOut",
      link: (
        <Link onClick={() => authService.signOut(clearAllStates)} to="/signin">
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
      link: <Link to="/signin">{i18next.t("auth.sign_in")}</Link>,
    },
    {
      key: "Settings",
      link: <Link to="/settings">{i18next.t("ui.settings")}</Link>,
    },
  ];
}
