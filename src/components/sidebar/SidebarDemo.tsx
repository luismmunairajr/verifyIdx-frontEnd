"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { SidebarLinks } from "./SidebarLinks";
import { SidebarFooter } from "./SidebarFooter";
import { Logo, LogoIcon } from "./Logo";
import { cn } from "@/lib/utils";

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-white dark:bg-zinc-950 w-full flex-1 mx-auto border border-neutral-200 dark:text-white overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <SidebarLinks />
          </div>
          <SidebarFooter />
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 overflow-y-auto ">{children}</div>
    </div>
  );
}
