import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Select from "react-select";
import { toast } from "sonner";
import Loading from "../Loading";

const categoryOptions = [
  { value: "security", label: "Security" },
  { value: "fraud_detection", label: "Fraud Detection" },
  { value: "identity_verification", label: "Identity Verification" },
  { value: "machine_learning", label: "Machine Learning" },
  { value: "ai_automation", label: "AI Automation" },
  { value: "access_control", label: "Access Control" },
  { value: "deep_learning", label: "Deep Learning" },
  { value: "risk_assessment", label: "Risk Assessment" },
  { value: "kyc", label: "KYC" },
  { value: "aml", label: "AML" },
];

export function ButtonSaveWorkflow({ nodes, edges, workflowName }) {
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
      const response = await fetch("/api/workflows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        throw new Error(errorData.error || "Failed to save workflow");
      }

      const savedWorkflow = await response.json();
      toast.success(`Workflow "${savedWorkflow.name}" saved successfully!`);

      setWorkflowDescription("");
      setSelectedCategories([]);
    } catch (error) {
      console.error("Error saving workflow:", error);
      toast.error(`Error saving workflow: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>{t("salvar")}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
           <SheetTitle>{t("criarWorkflow")}</SheetTitle>
          <SheetDescription>
           {t("adicioneDescricaoECategorias")}
          </SheetDescription>
        </SheetHeader>

        <div className="pt-4 pb-4">
           <Label>{t("descricao")}</Label>
          <Textarea
            value={workflowDescription}
            onChange={(e) => setWorkflowDescription(e.target.value)}
          />
        </div>

        <div className="pt-4 pb-4">
           <Label>{t("categorias")}</Label>
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
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? <Loading /> : t("salvarWorkflow")}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
