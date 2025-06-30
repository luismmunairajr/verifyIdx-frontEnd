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
import Loading from "../Loading";

const categoryOptions = [
  { value: "security", label: "Security" },
  { value: "fraud_detection", label: "Fraud Detection" },
  { value: "identity_verification", label: "Identity Verification" },
  { value: "machine_learning", label: "Machine Learning" },
  { value: "ai_automation", label: "AI Automation" }, // Fixed typo in "AI"
  { value: "access_control", label: "Access Control" }, // Fixed typo in "Access"
  { value: "deep_learning", label: "Deep Learning" },
  { value: "risk_assessment", label: "Risk Assessment" }, // Fixed typo in "Assessment"
  { value: "kyc", label: "KYC" },
  { value: "aml", label: "AML" },
];

export default function ButtonSaveWorkflow({ nodes, edges }) {
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!workflowName.trim()) {
      toast.error("Workflow name is required.");
      return;
    }
  
    if (nodes.length === 0 || edges.length === 0) {
      toast.error("Cannot save an empty workflow.");
      return;
    }
    
    setIsSubmitting(true);
  
    const processNodes = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        iconName: node.data.iconName,
      },
    }));
    
    const categories = selectedCategories.map((category) => category.value);
  
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
          categories,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save workflow');
      }
  
      const savedWorkflow = await response.json();
      console.log("Saved workflow response:", savedWorkflow);
  
      setWorkflowName("");
      setWorkflowDescription("");
      setSelectedCategories([]);
  
      toast.success(`Workflow "${savedWorkflow.name}" saved successfully!`);
    } catch (error) {
      console.error('Error saving workflow:', error);
      toast.error(`Error saving workflow: ${error.message}`);
    } finally {
      setIsSubmitting(false);
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
            <Button 
              onClick={handleSave} 
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loading/> : "Save Workflow"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}