"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AuthGuard } from "@/hooks/AuthGuard";
import { SidebarDemo } from "@/components/sidebar/SidebarDemo";
import { Header } from "@/components/header";
import IaAgent from "@/components/ia/iaAgent";
import SupportButton from "@/components/supportButton/supportButton";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const routeConfig = [
    {
      path: "/dashboard",
      roles: ["ADMIN", "USER", "ANALYST", "MANAGER"], 
      render: (children: React.ReactNode) => (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN", "USER", "ANALYST", "MANAGER"]}>
            <SidebarDemo>
              <Header />
              {children}
              <SupportButton />
            </SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    {
      path: "/verifications",
      roles: ["ADMIN", "USER", "MANAGER"], 
      render: (children: React.ReactNode) => (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN", "USER", "MANAGER"]}>
            <SidebarDemo>
              {children}
              <IaAgent />
              <SupportButton />
            </SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    {
      path: "/fraudflag",
      roles: ["ADMIN", "USER"], 
      render: (children: React.ReactNode) => (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN", "USER"]}>
            <SidebarDemo>{children}<SupportButton /></SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    {
      path: "/fraudlist",
      roles: ["ADMIN", "USER", "ANALYST", "MANAGER"], 
      render: (children: React.ReactNode) => (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN", "USER", "ANALYST", "MANAGER"]}>
            <SidebarDemo><Header />{children}<SupportButton /></SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    {
      path: "/templates",
      roles: ["ADMIN"], 
      render: (children: React.ReactNode) => (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN"]}>
            <SidebarDemo><Header />{children}<SupportButton /></SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    {
      path: "/settings",
      roles: ["USER", "ANALYST", "MANAGER"],
      render: (children: React.ReactNode) => (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["USER", "ANALYST", "MANAGER"]}>
            <SidebarDemo>{children}</SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    {
      path: "/admin-settings",
      roles: ["ADMIN"], 
      render: (children: React.ReactNode) => (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN"]}>
            <SidebarDemo>{children}</SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    {
      path: "/automation-studio",
      roles: ["ADMIN"], 
      render: (children: React.ReactNode) => (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN"]}>
            <SidebarDemo>{children}</SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
  ];

  const matched = routeConfig.find((route) => pathname.startsWith(route.path));

  return matched ? matched.render(children) : <>{children}</>;
};

export default ClientLayout;
