import React from "react";
import { SidebarLink } from "../ui/sidebar";
import { MoveLeft } from "lucide-react";

export const SidebarFooter = () => {
  return (
    <div>
      <SidebarLink
        link={{
          label: "Logout",
          href: "/",
          icon: (
            <MoveLeft className="size-7 text-white hover:size-10 duration-200 ease-in-out" strokeWidth={1} />
          ),
        }}
      />
    </div>
  );
};
