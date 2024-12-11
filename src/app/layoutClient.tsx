"use client";
import { SidebarDemo } from "@/components/sidebar/SidebarDemo";
import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import IaAgent from "@/components/ia/iaAgent";
import SupportButton from "@/components/supportButton/supportButton";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const layouts: Record<string, JSX.Element> = {
    "/": <div>{children}</div>,
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
    "/automation-studio": (
      <SidebarDemo>
        <Header />
        {children}
        <SupportButton />
      </SidebarDemo>
    ),
    "/about/terms-of-service": <div>{children}</div>,
  };

  // Retorno do layout correspondente ou um padrão
  return (
  layouts[pathname] || (
    
    <SidebarDemo>
      <Header />
      {children}
      <SupportButton />
    </SidebarDemo>
    )
  );
};

export default ClientLayout;
