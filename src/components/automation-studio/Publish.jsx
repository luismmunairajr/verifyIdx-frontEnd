import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axiosInstance from "@/app/api/axios/axiosInstance";
import { Send } from "lucide-react"
export default function Publish({ nodes = [], workflowName }) {
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!Array.isArray(nodes) || nodes.length === 0) {
      toast.error("No nodes found to create a workflow.");
      return;
    }

    // Extrair as opções do nó "Identity Verification"
    const identityVerificationNode = nodes.find(
      (node) => node.data.title === "Identity Verification"
    );
    const identityVerificationOptions =
      identityVerificationNode?.data?.options || {};

    // Mapear as opções para o formato esperado no JSON
    const steps = [];
    if (identityVerificationOptions.liveness) steps.push("livenessDetection");
    if (identityVerificationOptions.idscan) steps.push("idscanOnly");
    if (identityVerificationOptions.photoIDMatch) steps.push("photoIDMatch");

    const requiredProducts = nodes
      .map((node) => node?.data?.title?.toLowerCase().replace(/\s+/g, "_"))
      .filter(Boolean);

    const newWorkflow = {
      workflowName,
      clientId: "client123",
      tenantId: "tenant456",
      requiredProducts,
      verifications: [
        {
          products: {
            identity_verification: {
              steps: steps,
            },
          },
        },
      ],
      tags: [],
    };

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/api/v1/workflows",
        newWorkflow
      );

      if (response.status === 201 || response.status === 200) {
        toast.success(
          `Workflow "${workflowName}" has been published successfully.`
        );
      } else {
        toast.error(`Failed to publish workflow. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while publishing the workflow.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      onClick={handlePublish}
      disabled={loading}
      className="flex items-center gap-1">
      <Send className="h-4 w-4" />
      <span className="hidden sm:inline">
        {loading ? "Publishing..." : "Publish"}
      </span>
    </Button>
  );
}
