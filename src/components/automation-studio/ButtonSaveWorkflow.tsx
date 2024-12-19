import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

type ButtonSaveWorkflowProps = {
  nodes: any[]; 
  edges: any[]; 
};

const flowKey = 'workflows';

export default function ButtonSaveWorkflow({ nodes, edges }: ButtonSaveWorkflowProps) {
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");

  const handleSave = () => {
    if (!workflowName.trim()) {
      toast.error("Workflow name is required.");
      return;
    }

    if (nodes.length === 0 || edges.length === 0) {
      toast.error("Cannot save an empty workflow.");
      return;
    }

    const processNodes = nodes.map((node)=> ({
      ...node,
      data: {
        ...node.data,
        icon: node.data.icon,
      }
    }))

    const savedWorkflows = JSON.parse(localStorage.getItem(flowKey) || "[]");

    const newWorkflow = {
      id: Date.now(),
      name: workflowName,
      description: workflowDescription,
      nodes: processNodes,
      edges,
    };

    localStorage.setItem(flowKey, JSON.stringify([...savedWorkflows, newWorkflow]));

    setWorkflowName("");
    setWorkflowDescription("");

    toast.success(`Workflow "${newWorkflow.name}" has been successfully saved.`);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Save</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Workflow</SheetTitle>
          <SheetDescription>
            Provide a name and description for your workflow.
          </SheetDescription>
        </SheetHeader>
        <div className="pt-4">
          <Label className="text-sm">Workflow Name</Label>
          <Input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
          />
        </div>
        <div className="pt-4 pb-4">
          <Label>Description</Label>
          <Textarea
            value={workflowDescription}
            onChange={(e) => setWorkflowDescription(e.target.value)}
          />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleSave}>Save Workflow</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
