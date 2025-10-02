"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import FilterButtons from "@/components/templates/FilterButtons";
import CardTemplate from "@/components/templates/CardTemplate";
import Loading from "@/components/Loading";
import { useLanguage } from "@/components/language/language-provider";
import axiosInstance from "@/app/api/axios/axiosInstance";

export default function TemplatesPage() {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await axiosInstance.get("/api/axios/templates");
        // O backend retorna a lista diretamente ou dentro de data.data?
        const data = response.data?.data || response.data;
        setWorkflows(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching workflows:", error);
        setWorkflows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.workflowName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full flex flex-col p-6 px-40 space-y-10">
        <div className="w-full flex flex-col items-center mt-10 space-y-4">
          <h1 className="font-bold text-5xl">{t("workflowTemplatespublished")}</h1>
          <p className="text-lg">{t("templatesubtitle")}</p>
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col p-6 px-40 space-y-10">
      <div className="w-full flex flex-col items-center mt-10 space-y-4">
        <h1 className="font-bold text-5xl">{t("workflowTemplatespublished")}</h1>
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
              key={workflow.id}
              id={workflow.id}
              name={workflow.workflowName}
              description={`${t("version")}: ${workflow.version}`}
              categories={[
                `${t("createdAt")}: ${new Date(workflow.createdAt).toLocaleDateString()}`,
                `${t("updatedAt")}: ${new Date(workflow.updatedAt).toLocaleDateString()}`,
              ]}
              source="backend"
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
