"use client";

import { useState } from "react";
import { Building2, Receipt, KeyRound, Fingerprint, Bolt } from "lucide-react";
import ApiKeys from "@/components/admin-settings/apiKeys/ApiKeys";
import Authentication from "@/components/admin-settings/authentication/Authentication";
import BillUsage from "@/components/admin-settings/billUsage/BillUsage";
import CompanyInformation from "@/components/admin-settings/companyInformation/CompanyInformation";
import GeneralSettings from "@/components/admin-settings/generalSettings/GeneralSettings";
import { Header } from "../header";

const menuItems = [
  {
    id: "companyinformation",
    icon: <Building2 size={30} />,
    label: "Company Information",
    component: <CompanyInformation />,
  },
  {
    id: "billusage",
    icon: <Receipt size={30} />,
    label: "Bill & Usage",
    component: <BillUsage />,
  },
  {
    id: "authentication",
    icon: <Fingerprint size={30} />,
    label: "Authentication",
    component: <Authentication />,
  },
  {
    id: "apikeys",
    icon: <KeyRound size={30} />,
    label: "API KEYS",
    component: <ApiKeys />,
  },
  {
    id: "generalsettings",
    icon: <Bolt size={30} />,
    label: "General Settings",
    component: <GeneralSettings />,
  },
];

export default function SidebarLayout() {
  const [activeItem, setActiveItem] = useState("companyinformation");
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
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-500 dark:hover:bg-white dark:hover:text-black hover:text-white dark:text-white h-14 ${
              activeItem === item.id
                ? "bg-blue-500 dark:bg-white dark:text-black text-white"
                : ""
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
