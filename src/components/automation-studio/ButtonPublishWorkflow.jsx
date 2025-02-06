import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
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
import { DatePickerDemo } from "./DataPicker";

export default function ButtonPublishWorkflow({ nodes }) {
  const [workflowName, setWorkflowName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const handlePublish = async () => {
    if (!workflowName.trim()) {
      toast.error("Workflow name is required.");
      return;
    }
  
    if (!dueDate.trim()) {
      toast.error("Due date is required.");
      return;
    }
  
    const requiredProducts = nodes.map((node) =>
      node.data.title.toLowerCase().replace(/\s+/g, "_")
    );
  
    const newWorkflow = {
      workflowName,
      priority,
      dueDate,
      initiatedBy: "fictitious@example.com",
      clientId: "client123",
      tenantId: "tenant456",
      requiredProducts,
      tags: [],
    };
  
    try {
      const response = await axiosInstance.post("/api/v1/workflows", newWorkflow);
      if (response.status === 201 || response.status === 200) {
        toast.success(`Workflow "${workflowName}" has been published successfully.`);
        console.log(response.data)
      } else {
        toast.error(`Failed to publish workflow. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while publishing the workflow.");
    }
  
    setWorkflowName("");
    setPriority("Low");
    setDueDate("");
  };
  
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Publish</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Publish Workflow</SheetTitle>
          <SheetDescription>
            Fill in the details to publish your workflow.
          </SheetDescription>
        </SheetHeader>
        <div className="pt-4">
          <Label className="text-sm">Workflow Name</Label>
          <Input value={workflowName} onChange={(e) => setWorkflowName(e.target.value)} />
        </div>
        <div className="pt-4">
          <Label className="text-sm">Priority</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-4 pb-4">
          <Label className="text-sm">Due Date</Label>
          <Input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handlePublish}>Publish Workflow</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
