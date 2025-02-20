import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import axiosInstance from "@/app/api/axios/axiosInstance";

export default function ButtonPublishWorkflow({ nodes = [] }) {
  const [workflowName, setWorkflowName] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!workflowName.trim()) {
      toast.error("Workflow name is required.");
      return;
    }

    if (!Array.isArray(nodes) || nodes.length === 0) {
      toast.error("No nodes found to create a workflow.");
      return;
    }

    const requiredProducts = nodes
      .map((node) => node?.data?.title?.toLowerCase().replace(/\s+/g, "_"))
      .filter(Boolean);

    const newWorkflow = {
      workflowName,
      clientId: "client123",
      tenantId: "tenant456",
      requiredProducts,
      tags: [],
    };

    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/v1/workflows", newWorkflow);

      if (response.status === 201 || response.status === 200) {
        toast.success(`Workflow "${workflowName}" has been published successfully.`);
        setWorkflowName("");
      } else {
        toast.error(`Failed to publish workflow. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || "An error occurred while publishing the workflow.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button disabled={loading}>{loading ? "Publishing..." : "Publish"}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Publish Workflow</SheetTitle>
          <SheetDescription>Fill in the details to publish your workflow.</SheetDescription>
        </SheetHeader>
        <div className="pt-4">
          <Label className="text-sm">Workflow Name</Label>
          <Input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            disabled={loading}
          />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handlePublish} disabled={loading}>
              {loading ? "Publishing..." : "Publish Workflow"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
