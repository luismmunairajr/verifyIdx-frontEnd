'use client';

import { useState } from 'react';
import { User, FileLock} from 'lucide-react';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import Credentials from './Credentials/Credentials';
import { Header } from '../header';

const menuItems = [
  { id: 'personalDetails', icon: <User size={30} />, label: 'Personal Details', component: <PersonalDetails /> },
  { id: 'credentials', icon: <FileLock size={30} />, label: 'Credentials', component: <Credentials /> }
];

export default function SidebarLayout() {
  const [activeItem, setActiveItem] = useState('personalDetails');

  return (
    <div className="flex h-full">
      <div
        className={"bg-zinc-100 dark:bg-zinc-800 text-black flex flex-col p-2 transition-all duration-300 gap-2 w-64"}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-800 dark:hover:bg-white dark:hover:text-black hover:text-white dark:text-white h-14 ${activeItem === item.id ? 'bg-blue-800 dark:bg-white dark:text-black text-white' : ''}`}
            onClick={() => setActiveItem(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      
      <div className="flex-1 bg-white dark:bg-zinc-900">
      <Header/>
        {menuItems.find((item) => item.id === activeItem)?.component}
      </div>
    </div>
  );
}
