import { Link } from "@tanstack/react-router";
import { useMemo, createElement, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { getNavigationItemsForRole, NavigationItem } from "@/config/navigation";
import { Role } from "@/models/Account";

export type NavigationLink = {
  key: string;
  link: ReactElement;
};

/**
 * Custom hook that provides navigation links based on user permissions
 * Separates authentication logic from navigation rendering
 */
export function useNavigationByPermissions(userRole: Role): NavigationLink[] {
  const { t } = useTranslation();

  return useMemo(() => {
    // Get items user has permission to see
    const allowedItems = getNavigationItemsForRole(userRole);

    // Transform to navigation links
    return allowedItems.map((item: NavigationItem) => {
      return {
        key: item.key,
        link: createElement(Link, { to: item.path }, t(item.titleKey)),
      };
    });
  }, [userRole, t]);
}

/**
 * Check if user has permission to access a specific route
 */
export function useCanAccessRoute(path: string, userRole: Role): boolean {
  return useMemo(() => {
    const allowedItems = getNavigationItemsForRole(userRole);
    return allowedItems.some((item) => item.path === path);
  }, [path, userRole]);
}
