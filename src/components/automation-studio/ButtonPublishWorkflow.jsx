"use client";

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
import { useSession } from "next-auth/react";
import { useLanguage } from "../language/language-provider";

export default function ButtonPublishWorkflow({ nodes = [] }) {
  const [workflowName, setWorkflowName] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { t } = useLanguage();

  const handlePublish = async () => {
    if (!workflowName.trim()) {
      toast.error("Workflow name is required.");
      return;
    }

    if (!Array.isArray(nodes) || nodes.length === 0) {
      toast.error("No nodes found to create a workflow.");
      return;
    }

    // Identifica os nodes
    const identityNode = nodes.find((node) => node.data.title === "identityVerification");
    const governmentNode = nodes.find((node) => node.data.title === "governmentScreening");

    // Identity Verification Steps
    const identityOptions = identityNode?.data?.options || {};
    const identityVerificationSteps = [];
    if (identityOptions.liveness) identityVerificationSteps.push("liveness");
    if (identityOptions.idscan) identityVerificationSteps.push("idScan");
    if (identityOptions.photoIDMatch) identityVerificationSteps.push("matchId");
    if (identityOptions.enrollment) identityVerificationSteps.push("enrollment");

    // Required Products
    const requiredProducts = ["identity_verification"];
    const governmentOptions = governmentNode?.data?.options || {};
    if (governmentOptions.nuit) requiredProducts.push("nuit");
    if (governmentOptions.nuib) requiredProducts.push("nuib");

    // Monta payload
    const newWorkflow = {
      workflowName,
      webhookUrl: process.env.WEBHOOKURL || "https://webhook.site/cac47fb0-14df-439f-81a9-0017802ddeef",
      requiredProducts,
      identityVerificationSteps,
      tags: [],
    };

    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/axios/automation-studio", newWorkflow);

      if (response.status === 201 || response.status === 200) {
        toast.success(`Workflow "${workflowName}" has been published successfully.`);
        setWorkflowName("");
      } else {
        toast.error(`Failed to publish workflow. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao publicar workflow:", error);
      toast.error(error.message || "Erro ao publicar workflow");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button disabled={loading}>{loading ? t("publicando") : t("publicar")}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("publicarWorkflow")}</SheetTitle>
          <SheetDescription>{t("preenchaOsDadosParaPublicar")}</SheetDescription>
        </SheetHeader>
        <div className="pt-4">
          <Label className="text-sm">{t("nomeDoWorkflow")}</Label>
          <Input value={workflowName} onChange={(e) => setWorkflowName(e.target.value)} disabled={loading} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handlePublish} disabled={loading}>
              {loading ? t("publicando") : t("publicarWorkflow")}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
