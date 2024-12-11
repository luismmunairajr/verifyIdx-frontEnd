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

export default function ButtonAddWorkflow() {


    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>Save</Button>
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
                    <Input />
                </div>
                <div className="pt-4 pb-4">
                    <Label>Description</Label>
                    <Textarea/>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button>Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}