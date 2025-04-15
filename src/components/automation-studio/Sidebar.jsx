import React from 'react';
import { useDnD } from './DnDContext';
import nodes from '@/components/automation-studio/NodeData.jsx';
import iconMap from "@/components/automation-studio/iconMap";
import { useLanguage } from '@/components/language/language-provider';


export default function Sidebar() {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeData) => {
    setType(nodeData);
    event.dataTransfer.effectAllowed = 'move';
  };

  const { t } = useLanguage()

  return (
    <aside className="bg-white border border-gray-200 p-4 text-xs h-full overflow-y-auto w-full flex flex-col gap-2 dark:bg-black">
      <div className="mb-4 text-gray-700">{t("dragAndDrop")}</div>
      {nodes.map((node) => {
        const IconComponent = iconMap[node.iconName] || <span>Invalid Icon</span>;
        return (
          <div
            className="border p-2 rounded-sm border-black dark:border-white mb-2 cursor-grab flex gap-2"
            key={node.id}
            onDragStart={(event) => onDragStart(event, node)}
            draggable
          >
            <div className="flex items-center justify-center h-full text-black rounded dark:text-white">
              {IconComponent}
            </div>
            <div className="flex flex-col items-start w-full">
              <h1 className="font-semibold">{t(node.title)}</h1>
              <p>{t(node.description)}</p>
            </div>
          </div>
        );
      })}
    </aside>
  );
}