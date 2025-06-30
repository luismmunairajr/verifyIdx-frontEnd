"use client";

import { useState } from "react";
import { User, FileLock } from "lucide-react";
import PersonalDetails from "@/components/settings/PersonalDetails/PersonalDetails";
import Credentials from "@/components/settings/Credentials/Credentials";
import { Header } from "@/components/header";

const menuItems = [
  {
    id: "personalDetails",
    icon: <User size={30} />,
    label: "Personal Details",
    component: <PersonalDetails />,
  },
  {
    id: "credentials",
    icon: <FileLock size={30} />,
    label: "Credentials",
    component: <Credentials />,
  },
];

export default function SidebarLayout() {
  const [activeItem, setActiveItem] = useState("personalDetails");

  return (
    <div className="flex h-full overflow-hidden">
      <div
        className={
          "bg-zinc-100 dark:bg-zinc-800 text-black flex flex-col p-2 transition-all duration-300 gap-2 w-64 flex-shrink-0"
        }
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 
            hover:bg-blue-500 hover:text-white dark:hover:bg-white dark:hover:text-black h-14
            ${
              activeItem === item.id
                ? "bg-blue-500 text-white dark:bg-white dark:text-black"
                : "dark:text-white"
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-white dark:bg-zinc-900 overflow-auto">
        <Header />
        {menuItems.find((item) => item.id === activeItem)?.component}
      </div>
    </div>
  );
}
