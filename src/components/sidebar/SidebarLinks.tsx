"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { SidebarLink } from "@/components/ui/sidebar";
import { links } from "./links";
import { usePathname } from "next/navigation";
import { useRoles } from "@/hooks/useRoles";

export const SidebarLinks = () => {
  const pathname = usePathname();
  const { roles, loading } = useRoles();

  if (loading) {
    return (
      <div className="space-y-6 mt-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-10" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col space-y-3">
      {links(pathname, roles).map((link, idx) => (
        <SidebarLink key={idx} link={link} />
      ))}
    </div>
  );
};
