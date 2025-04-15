import React from "react";
import { SidebarLink } from "@/components/ui/sidebar";
import { links } from "./links";
import { usePathname } from "next/navigation";

export const SidebarLinks = () => {
  const pathname = usePathname();
  return (
    <div className="mt-8 flex flex-col space-y-3">
      {links(pathname).map((link, idx) => (
        <SidebarLink key={idx} link={link} />
      ))}
    </div>
  );
};
