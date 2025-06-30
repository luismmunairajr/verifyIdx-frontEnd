"use client";
<<<<<<< HEAD

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Publish from "@/components/automation-studio/ButtonPublishWorkflow.jsx";
=======
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Publish from "@/components/automation-studio/Publish.jsx";
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
import Saving from "@/components/automation-studio/Saving.jsx";
import Clear from "@/components/automation-studio/Clear.jsx";
import { useLanguage } from "../language/language-provider";

export default function WorkflowHeader({ nodes, edges, setNodes, setEdges }) {
<<<<<<< HEAD
  const [title, setTitle] = useState(""); 
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const { t } = useLanguage();

=======
  const [title, setTitle] = useState("untitled");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
  const handleTitleClick = () => {
    setIsEditing(true);
  };

<<<<<<< HEAD
=======
  // Handle title save when clicking outside or pressing Enter
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
  const handleTitleSave = () => {
    setIsEditing(false);
  };

<<<<<<< HEAD
=======
  // Handle key press events
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTitleSave();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

<<<<<<< HEAD
=======
  // Focus input when editing starts
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

<<<<<<< HEAD
=======
 
  const { t } = useLanguage()
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
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
<<<<<<< HEAD
            placeholder={t("enter_workflow_name")}
=======
            placeholder="Enter workflow name"
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
          />
        ) : (
          <h1
            onClick={handleTitleClick}
            className="text-xl font-bold cursor-pointer hover:text-primary transition-colors truncate max-w-md"
          >
<<<<<<< HEAD
            {title.trim() !== "" ? title : t("untitled")}
=======
            {title || t("untitled")}
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
          </h1>
        )}
      </div>
      <div className="flex items-center gap-2">
<<<<<<< HEAD
        <Clear nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
=======
        <Clear nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges}/>
>>>>>>> 1073c117b18002f5fa8077376d6251fe1f8f2ec1
        <Saving nodes={nodes} edges={edges} workflowName={title} />
        <Publish nodes={nodes} workflowName={title} />
      </div>
    </header>
  );
}
