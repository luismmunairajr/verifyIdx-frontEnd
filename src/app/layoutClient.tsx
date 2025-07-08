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

  const layouts: Record<
    string,
    {
      allowedRoles: string[];
      layout: React.ReactNode;
    }
  > = {
    "/": {
      allowedRoles: [],
      layout: <>{children}</>,
    },
    "/dashboard": {
      allowedRoles: ["ADMIN", "USER", "ANALYST"],
      layout: (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN", "USER", "ANALYST"]}>
            <SidebarDemo>
              <Header />
              {children}
              <SupportButton />
            </SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    "/verifications": {
      allowedRoles: ["ADMIN", "USER"],
      layout: (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN", "USER"]}>
            <SidebarDemo>
              {children}
              <IaAgent />
              <SupportButton />
            </SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
  
    "/fraudflag": {
      allowedRoles: ["ADMIN", "USER"],
      layout: (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN", "USER"]}>
            <SidebarDemo>
              {children}
              <SupportButton />
            </SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    "/fraudlist": {
      allowedRoles: ["ADMIN", "USER", "ANALYST"],
      layout: (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN", "USER", "ANALYST"]}>
            <SidebarDemo>
              <Header />
              {children}
              <SupportButton />
            </SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    "/templates": {
      allowedRoles: ["ADMIN"],
      layout: (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN"]}>
            <SidebarDemo>
              <Header />
              {children}
              <SupportButton />
            </SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    "/settings": {
      allowedRoles: ["USER", "ANALYST"],
      layout: (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["USER", "ANALYST"]}>
            <SidebarDemo>{children}</SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    "/admin-settings": {
      allowedRoles: ["ADMIN"],
      layout: (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN"]}>
            <SidebarDemo>{children}</SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
    "/automation-studio": {
      allowedRoles: ["ADMIN"],
      layout: (
        <div className="flex h-screen">
          <AuthGuard allowedRoles={["ADMIN"]}>
            <SidebarDemo>{children}</SidebarDemo>
          </AuthGuard>
        </div>
      ),
    },
  };

  const route = layouts[pathname];

  // Se rota não definida ou user sem permissão, renderiza children simples ou redireciona no AuthGuard
  return route ? route.layout : <>{children}</>;
};
export default ClientLayout;