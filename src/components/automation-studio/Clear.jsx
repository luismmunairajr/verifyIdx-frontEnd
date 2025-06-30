"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../language/language-provider";

export default function Clear({nodes, edges, setNodes, setEdges}) {
    const [previousState, setPreviousState] = useState({nodes: [], edges: []});
    const handleClear = () => {

        setPreviousState({nodes, edges});

        setNodes([]);
        setEdges([]);
        toast("Workflow has been clear", {
            description: "Click undo if you want to revert the action",
            action: {
              label: "Undo",
              onClick: handleUndo
            },
          })
    }

    const handleUndo = () => {
        setNodes(previousState.nodes);
        setEdges(previousState.edges);
        toast("Workflow has been restored", {
            type: "success",
          })
        }
        const { t } = useLanguage()
  return (
    <Button
      size="sm"
      variant="destructive"
      className="flex items-center gap-1"
      onClick={handleClear}
    >
      <Eraser className="h-4 w-4" />
      <span className="hidden sm:inline">{t("clear")}</span>
    </Button>
  );
}
