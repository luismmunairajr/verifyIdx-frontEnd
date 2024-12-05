import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";

type ButtonRenameWorkflowProps = {
  initialName: string;
  initialDescription: string;
  onSaveWorkflow: (name: string, description: string) => void;
};

export default function ButtonRenameWorkflow({
  initialName,
  initialDescription,
  onSaveWorkflow,
}: ButtonRenameWorkflowProps) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
  }, [initialName, initialDescription]);

  const handleSave = () => {
    const validName = name.trim() !== "";
    const validDescription = description.trim() !== "";
    setIsNameValid(validName);
    setIsDescriptionValid(validDescription);

    if (validName && validDescription) {
      onSaveWorkflow(name, description);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"secondary"}>Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Workflow</SheetTitle>
          <SheetDescription>
            Edit the workflow's name and description.
          </SheetDescription>
        </SheetHeader>
        <div className="pt-4">
          <Label className="text-sm">Workflow Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${!isNameValid ? "border-red-500" : ""}`}
          />
          {!isNameValid && (
            <p className="text-sm text-red-500">Name is required.</p>
          )}
        </div>
        <div className="pt-4 pb-4">
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${!isDescriptionValid ? "border-red-500" : ""}`}
          />
          {!isDescriptionValid && (
            <p className="text-sm text-red-500">Description is required.</p>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
