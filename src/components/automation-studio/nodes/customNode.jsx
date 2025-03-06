import React, { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import iconMap from "@/components/automation-studio/iconMap";
import { ChevronDown, ChevronRight } from 'lucide-react';

function CustomNode({ data, selected }) {
  const { title, description, iconName } = data;
  const IconComponent = iconMap[iconName] || <span>Invalid Icon</span>;
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Verificar se este nó é do tipo Identity Verification
  const isIdentityVerification = title === 'Identity Verification';
  
  // Inicializar options se não existir no data
  if (isIdentityVerification && !data.options) {
    data.options = {
      liveness: false,
      idscan: false,
      photoIDMatch: false
    };
  }
  
  // Função para atualizar as opções
  const handleOptionChange = (option) => {
    const newOptions = {
      ...data.options,
      [option]: !data.options[option]
    };
    
    // Atualizar data.options
    data.options = newOptions;
    
    // Se existir um callback para alterações, chame-o
    if (data.onOptionsChange) {
      data.onOptionsChange(newOptions);
    }
  };

  return (
    <div className={`flex flex-col rounded-lg bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white h-auto min-h-[125px] w-[400px] p-5 ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="flex items-center relative">
        <div className="flex justify-center items-center text-black dark:text-white ml-2">
          {IconComponent}
        </div>
        
        <div className="ml-3 flex-1">
          <div className="text-lg font-bold text-black dark:text-white mb-1">{title}</div>
          <div className="text-zinc-600 dark:text-zinc-300 text-left">{description}</div>
        </div>
        
        {isIdentityVerification && (
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-1 rounded"
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
      </div>
      
      {/* Opções expandidas para Identity Verification */}
      {isIdentityVerification && isExpanded && (
        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
          <div className="text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">Verification Methods:</div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id={`liveness-${data.id}`} 
                checked={data.options.liveness}
                onChange={() => handleOptionChange('liveness')}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor={`liveness-${data.id}`} className="text-sm cursor-pointer">
                Liveness Detection
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id={`idscan-${data.id}`} 
                checked={data.options.idscan}
                onChange={() => handleOptionChange('idscan')}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor={`idscan-${data.id}`} className="text-sm cursor-pointer">
                ID Scan
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id={`photoIDMatch-${data.id}`} 
                checked={data.options.photoIDMatch}
                onChange={() => handleOptionChange('photoIDMatch')}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor={`photoIDMatch-${data.id}`} className="text-sm cursor-pointer">
                Photo ID Match
              </label>
            </div>
          </div>
        </div>
      )}

      <Handle type="target" position={Position.Top} className="w-4 h-4" />
      <Handle type="source" position={Position.Bottom} className="w-4 h-4" />
    </div>
  );
}

export default memo(CustomNode);