import {
  LayoutGrid,
  Drama,
  ShieldAlert,
  Contact,
  Settings,
  UserCog,
  Layers,
  Workflow,
} from "lucide-react";
import { useRoles } from "@/hooks/useRoles";

export const links = (pathname: string, roles: string[] = []) => {
  const baseLinks = [
    {
      label: "dashboard",
      href: "/dashboard",
      icon: (
        <LayoutGrid
          className={`flex-shrink-0 duration-200 ease-in-out ${
            pathname === "/dashboard"
              ? "text-white dark:text-neutral-200 size-10"
              : "text-neutral-200 dark:text-neutral-200 size-7 hover:size-10"
          }`}
          strokeWidth={pathname === "/dashboard" ? 2 : 1}
        />
      ),
    },
    {
      label: "verifications",
      href: "/verifications",
      icon: (
        <Contact
          className={`flex-shrink-0 duration-200 ease-in-out ${
            pathname === "/verifications"
              ? "text-white dark:text-neutral-200 size-10"
              : "text-neutral-200 dark:text-neutral-200 size-7 hover:size-10"
          }`}
          strokeWidth={pathname === "/verifications" ? 2 : 1}
        />
      ),
    },
    {
      label: "fraudflag",
      href: "/fraudflag",
      icon: (
        <ShieldAlert
          className={`flex-shrink-0 duration-200 ease-in-out ${
            pathname === "/fraudflag"
              ? "text-white dark:text-neutral-200 size-10"
              : "text-neutral-200 dark:text-neutral-200 size-7 hover:size-10"
          }`}
          strokeWidth={pathname === "/fraudflag" ? 2 : 1}
        />
      ),
    },
    {
      label: "fraudlist",
      href: "/fraudlist",
      icon: (
        <Drama
          className={`flex-shrink-0 duration-200 ease-in-out ${
            pathname === "/fraudlist"
              ? "text-white dark:text-neutral-200 size-10"
              : "text-neutral-200 dark:text-neutral-200 size-7 hover:size-10"
          }`}
          strokeWidth={pathname === "/fraudlist" ? 2 : 1}
        />
      ),
    },
    {
      label: "templates",
      href: "/templates",
      icon: (
        <Layers
          className={`flex-shrink-0 duration-200 ease-in-out ${
            pathname === "/templates"
              ? "text-white dark:text-neutral-200 size-10"
              : "text-neutral-200 dark:text-neutral-200 size-7 hover:size-10"
          }`}
          strokeWidth={pathname === "/templates" ? 2 : 1}
        />
      ),
    },
    {
      label: "automationStudio",
      href: "/automation-studio",
      icon: (
        <Workflow
          className={`flex-shrink-0 duration-200 ease-in-out ${
            pathname === "/automation-studio"
              ? "text-white dark:text-neutral-200 size-10"
              : "text-neutral-200 dark:text-neutral-200 size-7 hover:size-10"
          }`}
          strokeWidth={pathname === "/automation-studio" ? 2 : 1}
        />
      ),
    },
    {
      label: "settings",
      href: "/settings",
      icon: (
        <Settings
          className={`flex-shrink-0 duration-200 ease-in-out ${
            pathname === "/settings"
              ? "text-white dark:text-neutral-200 size-10"
              : "text-neutral-200 dark:text-neutral-200 size-7 hover:size-10"
          }`}
          strokeWidth={pathname === "/settings" ? 2 : 1}
        />
      ),
    },
  ];

  if (Array.isArray(roles) && roles.includes("admin")) {
    baseLinks.push({
      label: "adminSettings",
      href: "/admin-settings",
      icon: (
        <UserCog
          className={`flex-shrink-0 duration-200 ease-in-out ${
            pathname === "/admin-settings"
              ? "text-white dark:text-neutral-200 size-10"
              : "text-neutral-200 dark:text-neutral-200 size-7 hover:size-10"
          }`}
          strokeWidth={pathname === "/admin-settings" ? 2 : 1}
        />
      ),
    });
  }

  return baseLinks;
};
