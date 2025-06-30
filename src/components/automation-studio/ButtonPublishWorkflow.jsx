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
<<<<<<< HEAD
import { useSession } from "next-auth/react";
=======

>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1

export default function ButtonPublishWorkflow({ nodes = [] }) {
  const [workflowName, setWorkflowName] = useState("");
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const { data: session } = useSession();
=======
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1

  const handlePublish = async () => {
    if (!workflowName.trim()) {
      toast.error("Workflow name is required.");
      return;
    }

    if (!Array.isArray(nodes) || nodes.length === 0) {
      toast.error("No nodes found to create a workflow.");
      return;
    }

    // Extrair as opções do nó "Identity Verification"
<<<<<<< HEAD
    const identityVerificationNode = nodes.find(
      (node) => node.data.title === "Identity Verification"
    );
    const identityVerificationOptions =
      identityVerificationNode?.data?.options || {};
=======
    const identityVerificationNode = nodes.find(node => node.data.title === "Identity Verification");
    const identityVerificationOptions = identityVerificationNode?.data?.options || {};
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1

    // Mapear as opções para o formato esperado no JSON
    const steps = [];
    if (identityVerificationOptions.liveness) steps.push("livenessDetection");
    if (identityVerificationOptions.idscan) steps.push("idscanOnly");
    if (identityVerificationOptions.photoIDMatch) steps.push("photoIDMatch");

<<<<<<< HEAD
const productTitleMap = {
  "identityVerification": "identity_verification",
  "Credit Score": "credit_score",
  "governmentScreening": "governemnt_database", // se for esse o esperado mesmo
  "AI Assistant": "ai_recommendation_assistant",
  "Watchlist": "watchlist",
  "Address Lookup": "address_lookup",
  "Digital Signature": "digital_signature",
  "Deceased Check": "deceased_api",
};

  const requiredProducts = nodes.map((node, index) => {
  const originalTitle = node?.data?.title;
  const product = productTitleMap[originalTitle] ?? ""; // fallback se não encontrar

  const options = node?.data?.options || {};
  const services = Object.entries(options)
    .filter(([_, isEnabled]) => isEnabled)
    .map(([key]) => ({ name: key }));
    
  return {
    order: index + 1,
    product,
    services,
  };
});



    const newWorkflow = {
      workflowName,
      clientId: session?.user?.clientId,
      tenantId: session?.user?.tenantId,
      requiredProducts,
      tags: [],
    };

    console.log("Tenant ID:", session?.user?.tenantId);
    console.log("Client ID:", session?.user?.clientId);
    console.log("Roles:", session?.roles);
    console.log(requiredProducts);

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
=======
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
      const response = await axiosInstance.post("/api/v1/workflows", newWorkflow);

      if (response.status === 201 || response.status === 200) {
        toast.success(`Workflow "${workflowName}" has been published successfully.`);
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
        setWorkflowName("");
      } else {
        toast.error(`Failed to publish workflow. Status: ${response.status}`);
      }
    } catch (error) {
<<<<<<< HEAD
      console.error("Erro ao publicar workflow:", error);

      let errorMessage = "An error occurred while publishing the workflow.";

      if (error?.response?.data?.message) {
        if (typeof error.response.data.message === "string") {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data.message === "object") {
          const msg = error.response.data.message;
          if (msg.message) {
            errorMessage = msg.message;
          } else {
            errorMessage = JSON.stringify(msg);
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

=======
      console.error(error);
      const errorMessage = error?.response?.data?.message || "An error occurred while publishing the workflow.";
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
<<<<<<< HEAD
        <Button disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
        </Button>
=======
        <Button disabled={loading}>{loading ? "Publishing..." : "Publish"}</Button>
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Publish Workflow</SheetTitle>
<<<<<<< HEAD
          <SheetDescription>
            Fill in the details to publish your workflow.
          </SheetDescription>
=======
          <SheetDescription>Fill in the details to publish your workflow.</SheetDescription>
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
