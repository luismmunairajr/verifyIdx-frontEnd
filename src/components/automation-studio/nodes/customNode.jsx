import React, { memo, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import iconMap from "@/components/automation-studio/iconMap";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";

function CustomNode({ data, selected }) {
  const { t } = useLanguage();
  const { title, description, iconName, options = {}, onOptionsChange } = data;

  const IconComponent = iconMap[iconName] || <span>Invalid Icon</span>;
  const [isExpanded, setIsExpanded] = useState(false);

  const isIdentityVerification = title === "identityVerification";

  const handleOptionChange = (option) => {
    const newOptions = {
      ...options,
      [option]: !options[option],
    };

    if (onOptionsChange) {
      onOptionsChange(newOptions);
    }
  };

  return (
    <div
      className={`flex flex-col rounded-lg bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white h-auto min-h-[125px] w-[400px] p-5 ${
        selected ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="flex items-center relative">
        <div className="flex justify-center items-center text-black dark:text-white ml-2">
          {IconComponent}
        </div>

        <div className="ml-3 flex-1">
          <div className="text-lg font-bold mb-1">{t(title)}</div>
          <div className="text-zinc-600 dark:text-zinc-300 text-left">
            {t(description)}
          </div>
        </div>

        {isIdentityVerification && (
          <button
            className="absolute right-4 top-1 text-white dark:text-zinc-400 hover:bg-zinc-100 bg-blue-500 dark:hover:bg-zinc-800 p-1 rounded"
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
      </div>

      {isIdentityVerification && isExpanded && (
        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
          <div className="text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">
            {t("verificationMethods")}:
          </div>

          <div className="space-y-2">
            <Checkbox
              id={`liveness-${data.id}`}
              checked={options.liveness}
              label={t("livenessDetection")}
              onChange={() => handleOptionChange("liveness")}
            />

            <Checkbox
              id={`idscan-${data.id}`}
              checked={options.idscan}
              label={t("idScan")}
              onChange={() => handleOptionChange("idscan")}
            />

            <Checkbox
              id={`photoIDMatch-${data.id}`}
              checked={options.photoIDMatch}
              label={t("photoIDMatch")}
              onChange={() => handleOptionChange("photoIDMatch")}
            />
          </div>
        </div>
      )}

      <Handle type="target" position={Position.Top} className="w-4 h-4" />
      <Handle type="source" position={Position.Bottom} className="w-4 h-4" />
    </div>
  );
}

// Component checkbox reutilizável
function Checkbox({ id, checked, label, onChange }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="mr-2 h-4 w-4"
      />
      <label htmlFor={id} className="text-sm cursor-pointer">
        {label}
      </label>
    </div>
  );
}

export default memo(CustomNode);
