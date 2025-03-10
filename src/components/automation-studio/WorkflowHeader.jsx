"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Publish from "@/components/automation-studio/Publish.jsx";
import Saving from "@/components/automation-studio/Saving.jsx";
import Clear from "@/components/automation-studio/Clear.jsx";

export default function WorkflowHeader({ nodes, edges, setNodes, setEdges }) {
  const [title, setTitle] = useState("Untitled");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  // Handle title save when clicking outside or pressing Enter
  const handleTitleSave = () => {
    setIsEditing(false);
  };

  // Handle key press events
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTitleSave();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  // Focus input when editing starts
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
            placeholder="Enter workflow name"
          />
        ) : (
          <h1
            onClick={handleTitleClick}
            className="text-xl font-medium cursor-pointer hover:text-primary transition-colors truncate max-w-md"
          >
            {title || "Untitled"}
          </h1>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Clear nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges}/>
        <Saving nodes={nodes} edges={edges} workflowName={title} />
        <Publish nodes={nodes} workflowName={title} />
      </div>
    </header>
  );
}
