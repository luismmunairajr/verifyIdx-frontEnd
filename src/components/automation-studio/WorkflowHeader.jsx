"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ButtonSaveWorkflow } from "@/components/automation-studio/ButtonSaveWorkflow";
import Publish from "@/components/automation-studio/ButtonPublishWorkflow";
import Clear from "@/components/automation-studio/Clear";
import { useLanguage } from "../language/language-provider";

export default function WorkflowHeader({ nodes, edges, setNodes, setEdges }) {
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const { t } = useLanguage();

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleSave = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTitleSave();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <header className="flex items-center justify-between border-b p-4 bg-background sticky top-0 z-10">
      <div className="flex-1 mr-4">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={handleKeyDown}
            className="text-xl font-medium h-10 max-w-md"
            placeholder={t("enter_workflow_name")}
          />
        ) : (
          <h1
            onClick={handleTitleClick}
            className="text-xl font-bold cursor-pointer hover:text-primary transition-colors truncate max-w-md"
          >
            {title.trim() !== "" ? title : t("untitled")}
          </h1>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Clear nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
        <ButtonSaveWorkflow nodes={nodes} edges={edges} workflowName={title} />
        <Publish nodes={nodes} workflowName={title} />
      </div>
    </header>
  );
}
