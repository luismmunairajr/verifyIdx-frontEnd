import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ChevronDown, ChevronRight } from 'lucide-react';

function ConditionNode({ data, selected }) {
  const { title, description, condition, onConditionChange } = data;
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar a expansão

  const handleChange = (field, value) => {
    const newCondition = { ...condition, [field]: value };
    if (onConditionChange) {
      onConditionChange(newCondition);
    }
  };

  return (
    <div className={`flex flex-col rounded-lg bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white h-auto min-h-[125px] w-[400px] p-5 ${selected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="flex items-center relative">
        <div className="ml-3 flex-1">
          <div className="text-lg font-bold text-black dark:text-white mb-1">{title}</div>
          <div className="text-zinc-600 dark:text-zinc-300 text-left">{description}</div>
        </div>

        {/* Botão para expandir/recolher as opções */}
        <button
          className="absolute right-4 top-4 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-1 rounded"
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Campos da condição (exibidos apenas quando expandido) */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
          <div className="text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">Defina a Condição:</div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={condition.leftOperand}
                onChange={(e) => handleChange('leftOperand', e.target.value)}
                placeholder="Operando Esquerdo"
                className="p-1 border rounded w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={condition.operator}
                onChange={(e) => handleChange('operator', e.target.value)}
                className="p-1 border rounded"
              >
                <option value=">">{'>'}</option>
                <option value="<">{'<'}</option>
                <option value="==">{'=='}</option>
                <option value="!=">{'!='}</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={condition.rightOperand}
                onChange={(e) => handleChange('rightOperand', e.target.value)}
                placeholder="Operando Direito"
                className="p-1 border rounded w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Handles para conexões */}
      <Handle type="target" position={Position.Top} className="w-4 h-4" />
      <Handle type="source" position={Position.Bottom} id="true" className="w-4 h-4" />
      <Handle type="source" position={Position.Bottom} id="false" className="w-4 h-4" />
    </div>
  );
}

export default ConditionNode;