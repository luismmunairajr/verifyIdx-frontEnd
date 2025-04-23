"use client";
import { SidebarDemo } from "@/components/sidebar/SidebarDemo";
import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import IaAgent from "@/components/ia/iaAgent";
import SupportButton from "@/components/supportButton/supportButton";
import react from "react";
import { AuthGuard } from "@/hooks/AuthGuard";

const ClientLayout = ({ children }: { children: react.ReactNode }) => {
  const pathname = usePathname();

  const layouts: Record<string, JSX.Element> = {
    "/": <div>{children}</div>,
    "/dashboard": (
      <div className="flex h-screen">
        <AuthGuard>
          <SidebarDemo>
            <Header />
            {children}
            <SupportButton />
          </SidebarDemo>
        </AuthGuard>
      </div>
    ),
    "/verifications": (
      <div className="flex h-screen">
        <AuthGuard>
          <SidebarDemo>
            {children}
            <IaAgent />
            <SupportButton />
          </SidebarDemo>
        </AuthGuard>
      </div>
    ),
    "/fraudflag": (
      <div className="flex h-screen">
        <AuthGuard>
          <SidebarDemo>
            {children}
            <SupportButton />
          </SidebarDemo>
        </AuthGuard>
      </div>
    ),
    "/fraudlist": (
      <div className="flex h-screen">
        <AuthGuard>
          <SidebarDemo>
            <Header />
            {children}
            <SupportButton />
          </SidebarDemo>
        </AuthGuard>
      </div>
    ),
    "/templates": (
      <div className="flex h-screen">
        <AuthGuard>
          <SidebarDemo>
            <Header />
            {children}
            <SupportButton />
          </SidebarDemo>
        </AuthGuard>
      </div>
    ),
    "/settings": (
      <div className="flex h-screen">
        <AuthGuard>
          <SidebarDemo>{children}</SidebarDemo>
        </AuthGuard>
      </div>
    ),
    "/admin-settings": (
      <div className="flex h-screen">
        <AuthGuard>
          <SidebarDemo>{children}</SidebarDemo>
        </AuthGuard>
      </div>
    ),
    "/automation-studio": (
      <AuthGuard>
        <SidebarDemo>{children}</SidebarDemo>
      </AuthGuard>
    ),
  };

  return layouts[pathname] || <div>{children}</div>;
};

export default ClientLayout;
