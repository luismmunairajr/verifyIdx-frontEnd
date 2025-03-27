"use client";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {links} from "@/components/sidebar/links";
import Person from "@/components/Person";
import NotificationButton from "./Notifications/NotificationButton";
import {ModeToggle} from "./modeToggle";
import { useSession } from "next-auth/react"

export const Header = () => {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("Loading...");

  const { data: session } = useSession()
  useEffect(() => {
    const currentLink = links(pathname).find((link) => link.href === pathname);
    if (currentLink) {
      setPageTitle(currentLink.label);
    }
  }, [pathname])
  return (
    <header className="text-black flex justify-between md:p-6 pt-6 px-1 h-24 dark:text-white">
      <div className={"flex gap-2 items-end"}>
        <h1 className="md:text-3xl font-bold text-lg">{pageTitle}</h1>
      </div>
      <div className="flex items-center md:space-x-4 space-x-1">
        <ModeToggle/>
        <NotificationButton/>
        <p className="md:text-base text-xs">{session?.user?.name ?? "User"}</p>
        <Person/>
      </div>
    </header>
  );
};
