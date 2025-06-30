import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import Select from "react-select";
import { toast } from "sonner";
import { useLanguage } from "../language/language-provider";

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

export default function Saving({ nodes, edges, workflowName }) {
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
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
      console.log("Saved workflow response:", savedWorkflow);

      setWorkflowDescription("");
      setSelectedCategories([]);

      toast.success(`${t("workflow")} "${savedWorkflow.name}" ${t("savedSucessfully")}!`);
    } catch (error) {
      console.error(t("errorSaving Workflow"), error);
      toast.error(`${t("errorSaving Workflow")} ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { t } = useLanguage()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline">{t("save")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("saveWorkflow")}</DialogTitle>
          <DialogDescription>
            {t("saveTheWorkflow")}
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label>{t("description")}</Label>
          <Textarea
            value={workflowDescription}
            onChange={(e) => setWorkflowDescription(e.target.value)}
          />
        </div>
        <div>
          <Label>{t("categories")}</Label>
          <Select
            isMulti
            options={categoryOptions}
            value={selectedCategories}
            onChange={setSelectedCategories}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? t("saving") : t("saveWorkflow")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
