'use client'
import ButtonAddWorkflow from "@/components/automation-studio/ButtonAddWorkflow";
import { PackageOpen } from "lucide-react";
import React, { useState } from "react";
import { Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ButtonRenameWorkflow from "@/components/automation-studio/ButtonRenameWorkflow";

type Workflow = {
  id: string
  name: string
  description: string
}

export default function AutomationStudio() {
  const router = useRouter()
  const editor = () => {
    router.push('/automation-studio/flowcanvas')
  }
  const [workflows, setWorkflows] = useState<Workflow[]>([])

  const handleAddWorkflow = (name: string, description: string) => {
    setWorkflows((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, description }
    ])
  }

  const handleEditWorkflow = (id: string, name: string, description: string) => {
    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === id ? { ...workflow, name, description } : workflow
      )
    );
  };

  return (
    <div className="w-full min-h-screen p-6 space-y-4">
      <div className="flex flex-col items-center border shadow rounded-lg w-full h-40 justify-center space-y-4">
        <PackageOpen strokeWidth={1} className="size-10" />
        <ButtonAddWorkflow onAddWorkflow={handleAddWorkflow} />
      </div>
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="w-full h-44 shadow rounded-lg p-4 border space-y-2">
            <div className="flex items-center space-x-4">
              <Workflow />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{workflow.name}</h3>
              <p className="text-sm text-gray-600">{workflow.description}</p>
            </div>
            <div className="flex space-x-4">
              <Button onClick={editor}>Open</Button>
              <ButtonRenameWorkflow
                initialName={workflow.name}
                initialDescription={workflow.description}
                onSaveWorkflow={(name, description) => handleEditWorkflow(workflow.id, name, description)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}