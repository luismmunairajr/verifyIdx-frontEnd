"use client";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {links} from "@/components/sidebar/links";
import Person from "@/components/Person";
import NotificationButton from "./Notifications/NotificationButton";
import {ModeToggle} from "./modeToggle";
import { useSession } from "next-auth/react";

export const Header = () => {
  const {data: session, status } = useSession();
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState("Loading...");

  useEffect(() => {
    const currentLink = links(pathname).find((link) => link.href === pathname);
    if (currentLink) {
      setPageTitle(currentLink.label);
    }
  }, [pathname])
  const name = session?.user?.name;
  if (status === "loading") {
    <h1>loading...</h1>
  } 
  return (
    <header className="text-black flex justify-between md:p-6 pt-6 px-1 h-24 dark:text-white">
      <div className={"flex gap-2 items-end"}>
        <h1 className="md:text-3xl font-bold text-lg">{pageTitle}</h1>
        <div className={"bg-blue-300 px-1 mb-2 rounded-full text-xs text-blue-800"}>
          <p>admin</p>
        </div>
      </div>
      <div className="flex items-center md:space-x-4 space-x-1">
        <ModeToggle/>
        <NotificationButton/>
        <p className="md:text-base text-xs">{session?.user?.name ?? "user"}</p>
        <Person/>
      </div>
    </header>
  );
};
