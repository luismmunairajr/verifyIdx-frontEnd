"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import FilterButtons from "@/components/templates/FilterButtons.jsx";
import CardTemplate from "@/components/templates/CardTemplate.jsx";
import Loading from "@/components/Loading";

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

  if (loading) {
    return (
      <div className="w-full flex flex-col p-6 px-40 space-y-10">
        <div className="w-full flex flex-col items-center mt-10 space-y-4">
          <h1 className="font-bold text-5xl">Workflow Templates</h1>
          <p className="text-lg">
            Choose from our ready-made templates to start building your workflow
            quickly.
          </p>
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col p-6 px-40 space-y-10">
      <div className="w-full flex flex-col items-center mt-10 space-y-4">
        <h1 className="font-bold text-5xl">Workflow Templates</h1>
        <p className="text-lg">
          Choose from our ready-made templates to start building your workflow
          quickly.
        </p>
        <Input
          placeholder="Search a Workflow"
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
            />
          ))}
        </div>
      ) : (
        <div className="text-center pt-10">
          <h1 className="text-4xl font-bold">No workflows found</h1>
          <p>Try searching for a different name.</p>
        </div>
      )}
    </div>
  );
}
