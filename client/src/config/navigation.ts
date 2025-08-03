import { Role } from "@/models/Account";

export type NavigationItem = {
  key: string;
  path: string;
  titleKey: string; // i18n key
  requiredRoles?: Role[];
  exact?: boolean;
};

// Define all possible navigation items
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    key: "home",
    path: "/",
    titleKey: "pages.home",
    requiredRoles: ["guest", "user", "admin"],
    exact: true,
  },
  {
    key: "about",
    path: "/about",
    titleKey: "pages.about",
    requiredRoles: ["guest", "user", "admin"],
  },
  {
    key: "account",
    path: "/account",
    titleKey: "pages.account",
    requiredRoles: ["user", "admin"],
  },
  {
    key: "profile",
    path: "/profile",
    titleKey: "pages.profile",
    requiredRoles: ["user", "admin"],
  },
  {
    key: "settings",
    path: "/settings",
    titleKey: "ui.settings",
    requiredRoles: ["guest", "user", "admin"],
  },
  // Future admin-only items can be added here
  // {
  //   key: 'admin-panel',
  //   path: '/admin',
  //   titleKey: 'pages.admin',
  //   requiredRoles: ['admin'],
  // },
];

/**
 * Get navigation items for a specific role
 */
export function getNavigationItemsForRole(role: Role): NavigationItem[] {
  return NAVIGATION_ITEMS.filter(
    (item) => item.requiredRoles?.includes(role) ?? false
  );
}

/**
 * Check if a user has access to a specific navigation item
 */
export function hasAccessToNavItem(
  item: NavigationItem,
  userRole: Role
): boolean {
  return item.requiredRoles?.includes(userRole) ?? false;
}
