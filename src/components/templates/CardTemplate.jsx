'use client'

import { Card } from "@/components/ui/card"
import { ScanEye, Fingerprint, Sparkles, List, Bot } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";

const CATEGORY_PROPS = {
  security: { label: "Security" },
  fraud_detection: { label: "Fraud Detection" },
  identity_verification: { label: "Identity Verification" },
  machine_learning: { label: "Machine Learning" },
  ai_automation: { label: "AI Automation" },
  access_control: { label: "Access Control" },
  deep_learning: { label: "Deep Learning" },
  risk_assessment: { label: "Risk Assessment" },
  kyc: { label: "KYC" },
  aml: { label: "AML" },
};

export default function CardTemplate({ id, name, description, categories, source }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/templates/${id}?source=${source}`);
  };

  const categoryArray = Array.isArray(categories) ? categories : [];

  return (
    <Card
      className="p-4 md:p-5 rounded-xl space-y-3 md:space-y-5 h-auto md:h-60 hover:border-blue-500 transition duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-wrap gap-2 md:space-x-2">
        <div className="rounded-full p-2 bg-zinc-100 dark:bg-zinc-900">
          <ScanEye className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <div className="rounded-full p-2 bg-zinc-100 dark:bg-zinc-900">
          <Fingerprint className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <div className="rounded-full p-2 bg-zinc-100 dark:bg-zinc-900">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <div className="rounded-full p-2 bg-zinc-100 dark:bg-zinc-900">
          <List className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <div className="rounded-full p-2 bg-zinc-100 dark:bg-zinc-900">
          <Bot className="w-4 h-4 md:w-5 md:h-5" />
        </div>
      </div>

      <h2 className="font-semibold text-base md:text-lg break-words">{name}</h2>

      <p className="text-zinc-900 dark:text-zinc-100 text-sm md:text-xs line-clamp-2 break-words">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {categoryArray.length > 0 ? (
          categoryArray.map((category, index) => {
            const categoryInfo = CATEGORY_PROPS[category] || { label: category };
            return (
              <Badge key={index} variant="outline" className="text-xs md:text-sm">
                {categoryInfo.label}
              </Badge>
            );
          })
        ) : (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 font-normal text-xs"
          >
            No categories
          </Badge>
        )}
      </div>
    </Card>
  );
}
