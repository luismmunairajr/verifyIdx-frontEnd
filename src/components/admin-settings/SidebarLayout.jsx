'use client';

import { useState } from 'react';
import { Building2, Receipt, KeyRound, Fingerprint, Bolt } from 'lucide-react';
import ApiKeys from "@/components/admin-settings/apiKeys/ApiKeys";
import Authentication from "@/components/admin-settings/authentication/Authentication";
import BillUsage from "@/components/admin-settings/billUsage/BillUsage";
import CompanyInformation from "@/components/admin-settings/companyInformation/CompanyInformation";
import GeneralSettings from "@/components/admin-settings/generalSettings/GeneralSettings";
import { Header } from '../header';

const menuItems = [
  { id: 'companyinformation', icon: <Building2 size={30} />, label: 'Company Information', component: <CompanyInformation /> },
  { id: 'billusage', icon: <Receipt size={30} />, label: 'Bill & Usage', component: <BillUsage /> },
  { id: 'authentication', icon: <Fingerprint size={30} />, label: 'Authentication', component: <Authentication /> },
  { id: 'apikeys', icon: <KeyRound size={30} />, label: 'API KEYS', component: <ApiKeys /> },
  { id: 'generalsettings', icon: <Bolt size={30} />, label: 'General Settings', component: <GeneralSettings /> }
];

export default function SidebarLayout() {
  const [activeItem, setActiveItem] = useState('companyinformation');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`bg-zinc-100 text-black flex flex-col p-2 transition-all duration-300 gap-2 fixed h-full ${isHovered ? 'w-64' : 'w-16'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-800 hover:text-white h-14 ${activeItem === item.id ? 'bg-blue-800 text-white' : ''}`}
            onClick={() => setActiveItem(item.id)}
          >
            {item.icon}
            {isHovered && <span>{item.label}</span>}
          </div>
        ))}
      </div>
      
      <div className={`flex-1 bg-white transition-all duration-300 ${isHovered ? 'ml-64' : 'ml-16'}`}>
        <Header />
        {menuItems.find((item) => item.id === activeItem)?.component}
      </div>
    </div>
  );
}
