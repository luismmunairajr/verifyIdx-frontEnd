import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"

type ButtonAddWorkflowProps = {
    onAddWorkflow: (name: string, description: string) => void
}

export default function ButtonAddWorkflow({onAddWorkflow}: ButtonAddWorkflowProps) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    
    const handleSave = () => {
        if(name.trim() && description.trim()) {
            onAddWorkflow(name, description)
            setName("")
            setDescription("")
        }
    }


    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>Add Workflow</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create Workflow</SheetTitle>
                    <SheetDescription>
                        Create a new Workflow and add a description about that
                    </SheetDescription>
                </SheetHeader>
                <div className="pt-4">
                    <Label className="text-sm">Workflow Name</Label>
                    <Input value={name} onChange={(e)=> setName(e.target.value)}/>
                </div>
                <div className="pt-4 pb-4">
                    <Label>Description</Label>
                    <Textarea value={description} onChange={(e)=> setDescription(e.target.value)} />
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" onClick={handleSave}>Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}