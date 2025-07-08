"use client";

import { useState, useEffect } from "react";
import { Building2, Receipt, KeyRound, Fingerprint, Bolt } from "lucide-react";
import ApiKeys from "@/components/admin-settings/apiKeys/ApiKeys";
import Authentication from "@/components/admin-settings/authentication/Authentication";
import BillUsage from "@/components/admin-settings/billUsage/BillUsage";
import CompanyInformation from "@/components/admin-settings/companyInformation/CompanyInformation";
import GeneralSettings from "@/components/admin-settings/generalSettings/GeneralSettings";
import { Header } from "../header";
import { useLanguage } from "@/components/language/language-provider";
import { useRoles } from "@/hooks/useRoles";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const menuItems = [
  {
    id: "companyinformation",
    icon: <Building2 size={30} />,
    label: "companyInformation",
    component: <CompanyInformation />,
  },
  {
    id: "billusage",
    icon: <Receipt size={30} />,
    label: "billUsage",
    component: <BillUsage />,
  },
  {
    id: "authentication",
    icon: <Fingerprint size={30} />,
    label: "authentication",
    component: <Authentication />,
  },
  {
    id: "apikeys",
    icon: <KeyRound size={30} />,
    label: "apiKeys",
    component: <ApiKeys />,
  },
  {
    id: "generalsettings",
    icon: <Bolt size={30} />,
    label: "generalSettings",
    component: <GeneralSettings />,
  },
];

export default function SidebarLayout() {
  const [activeItem, setActiveItem] = useState("companyinformation");
  const { t } = useLanguage();
  const { roles, loading } = useRoles();
  const router = useRouter();

  useEffect(() => {
    // Normaliza as roles para uppercase antes de verificar
    const normalizedRoles = roles.map((r) => r.toUpperCase());

    if (!loading && (!Array.isArray(roles) || !normalizedRoles.includes("ADMIN"))) {
      router.push("/unauthorized");
    }
  }, [loading, roles, router]);

  if (loading) {
    return (
      <div className="p-10 text-center h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  // Normaliza para uppercase para garantir a comparação correta
  const normalizedRoles = roles.map((r) => r.toUpperCase());
  if (!Array.isArray(roles) || !normalizedRoles.includes("ADMIN")) {
    return null; // Não renderiza nada para não autorizados
  }

  return (
    <div className="flex h-full overflow-hidden">
      <div className="bg-zinc-100 dark:bg-zinc-800 text-black flex flex-col p-2 transition-all duration-300 gap-2 w-64 flex-shrink-0">
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
            <span>{t(item.label)}</span>
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
