"use client";
import { SidebarDemo } from "@/components/sidebar/SidebarDemo";
import { usePathname } from "next/navigation";
import { Header } from "@/components/header";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/" ? (
        <div>
          {children}
        </div>
      ) : pathname === "/verifications" ? (
        <div className="flex h-screen">
          <SidebarDemo>
            {children}
          </SidebarDemo>
        </div>
      ) : pathname === "/fraudflag" ? (
        <div className="flex h-screen">
          <SidebarDemo>
            {children}
          </SidebarDemo>
        </div>
      ) : pathname === "/automation-studio" ? (
        <SidebarDemo>
          <Header />
          {children}
        </SidebarDemo>
      ) : pathname === "/about/terms-of-service" ? (
        <div>
          {children}
        </div>
      ) : (
        <SidebarDemo>
          <Header />
          {children}
        </SidebarDemo>
      )}
    </>
  );
};

export default ClientLayout;
