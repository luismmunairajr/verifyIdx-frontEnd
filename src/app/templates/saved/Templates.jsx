"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import FilterButtons from "@/components/templates/FilterButtons.jsx";
import CardTemplate from "@/components/templates/CardTemplate.jsx";
import Loading from "@/components/Loading";
import { useLanguage } from "@/components/language/language-provider";

export default function TemplatesPage() {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

 useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await fetch("/api/workflows");
        if (!response.ok) {
          throw new Error("Failed to fetch workflows");
        }
        const data = await response.json();
        setWorkflows(data);
      } catch (error) {
        console.error("Error fetching workflows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []); 
  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { t } = useLanguage()

  if (loading) {
    return (
      <div className="w-full flex flex-col p-6 px-40 space-y-10">
        <div className="w-full flex flex-col items-center mt-10 space-y-4">
          <h1 className="font-bold text-5xl">{t("workflowTemplatessaved")}</h1>
          <p className="text-lg">{t("templatesubtitle")}</p>
          <Loading /> 
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col p-6 px-40 space-y-10">
      <div className="w-full flex flex-col items-center mt-10 space-y-4">
        <h1 className="font-bold text-5xl">{t("workflowTemplatessaved")}</h1>
        <p className="text-lg">{t("templatesubtitle")}</p>
        <Input
          placeholder={t("searchWorkflow")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <FilterButtons />
      {filteredWorkflows.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 p-4">
          {filteredWorkflows.map((workflow) => (
            <CardTemplate
              key={workflow._id}
              id={workflow._id}
              name={workflow.name}
              description={workflow.description}
              categories={workflow.categories}
              source="mongo"
            />
          ))}
        </div>
      ) : (
        <div className="text-center pt-10">
          <h1 className="text-2xl font-semibold">{t("noWorkflows")}</h1>
          <p>{t("trySearching")}</p>
        </div>
      )}
    </div>
  );
}
