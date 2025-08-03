import { Role } from "@/models/Account";
import {
  useNavigationByPermissions,
  NavigationLink,
} from "./useNavigationByPermissions";

/**
 * Legacy navigation hook - now uses permission-based system
 * @deprecated Use useNavigationByPermissions directly for better separation of concerns
 */
export function useNavigationMenu(role: Role): NavigationLink[] {
  return useNavigationByPermissions(role);
}
