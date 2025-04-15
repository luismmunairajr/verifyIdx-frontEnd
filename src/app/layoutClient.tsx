"use client";
import { SidebarDemo } from "@/components/sidebar/SidebarDemo";
import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import IaAgent from "@/components/ia/iaAgent";
import SupportButton from "@/components/supportButton/supportButton";
import react from "react";

const ClientLayout = ({ children }: { children: react.ReactNode }) => {
  const pathname = usePathname();

  const layouts: Record<string, JSX.Element> = {
    "/": <div>{children}</div>,
    "/dashboard": (
      <div className="flex h-screen">
        <SidebarDemo>
          <Header />
          {children}
          <SupportButton />
        </SidebarDemo>
      </div>
    ),
    "/verifications": (
      <div className="flex h-screen">
        <SidebarDemo>
          {children}
          <IaAgent />
          <SupportButton />
        </SidebarDemo>
      </div>
    ),
    "/fraudflag": (
      <div className="flex h-screen">
        <SidebarDemo>
          {children}
          <SupportButton />
        </SidebarDemo>
      </div>
    ),
    "/fraudlist": (
      <div className="flex h-screen">
        <SidebarDemo>
          <Header />
          {children}
          <SupportButton />
        </SidebarDemo>
      </div>
    ),
    "/templates": (
      <div className="flex h-screen">
        <SidebarDemo>
          <Header />
          {children}
          <SupportButton />
        </SidebarDemo>
      </div>
    ),
    "/settings": (
      <div className="flex h-screen">
        <SidebarDemo>{children}</SidebarDemo>
      </div>
    ),
    "/admin-settings": (
      <div className="flex h-screen">
        <SidebarDemo>{children}</SidebarDemo>
      </div>
    ),
    "/automation-studio": <SidebarDemo>{children}</SidebarDemo>,
    "/about/terms-of-service": <div>{children}</div>,
  };

  return layouts[pathname] || <div>{children}</div>;
};

export default ClientLayout;
