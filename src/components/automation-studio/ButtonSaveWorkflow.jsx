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
import Select from "react-select"

const categoryOptions = [
  { value: "security", label: "Security" },
  { value: "fraud_detection", label: "Fraud Detection" },
  { value: "identity_verification", label: "Identity Verification" },
  { value: "machine_learning", label: "Machine Learning" },
];

export default function ButtonSaveWorkflow({ nodes, edges }) {
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSave = async () => {
    if (!workflowName.trim()) {
      toast.error("Workflow name is required.");
      return;
    }
  
    if (nodes.length === 0 || edges.length === 0) {
      toast.error("Cannot save an empty workflow.");
      return;
    }
  
    const processNodes = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        iconName: node.data.iconName,
      },
    }));
  
    try {
      const response = await fetch('/api/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: workflowName,
          description: workflowDescription,
          nodes: processNodes,
          edges,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save workflow');
      }
  
      const savedWorkflow = await response.json();
  
      setWorkflowName("");
      setWorkflowDescription("");
  
      toast.success(`Workflow "${savedWorkflow.name}" saved successfully!`);
    } catch (error) {
      console.error('Error saving workflow:', error);
      toast.error("Error saving workflow. Please try again.");
    }
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
        <div className="pt-4 pb-4">
          <Label>Categories</Label>
          <Select
            isMulti
            options={categoryOptions}
            value={selectedCategories}
            onChange={setSelectedCategories}
            className="basic-multi-select"
            classNamePrefix="select"
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
