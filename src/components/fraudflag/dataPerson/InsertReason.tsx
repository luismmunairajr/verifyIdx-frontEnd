'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, useState } from "react"
import { CircleCheck } from "lucide-react"

interface InsertReasonProps {
    handleFraudConfirmation: (reason: string) => void;
}

export default function InsertReason({handleFraudConfirmation}: InsertReasonProps) {
    const [reason, setReason] = useState("")
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {setReason(e.target.value)}
    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        handleFraudConfirmation(reason);
        setOpen(false);
        setReason("");
    }

    return (
        <Dialog onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Confirm Fraud</Button>
            </DialogTrigger>
            <DialogContent>
                {open ? 
                <DialogHeader className="space-y-4">
                    <DialogTitle>Insert Reason</DialogTitle>
                    <DialogDescription className="">
                        Please provide a reason for flagging this data as fraudulent
                    </DialogDescription>
                    <Textarea value={reason} onChange={handleChange}/>
                    <Button type="submit" onClick={handleSubmit} className="w-1/3 mr-0 ml-auto">Submit</Button>
                </DialogHeader> :
                <DialogHeader className="flex flex-col items-center space-y-4">
                    <DialogTitle className="flex flex-col items-center space-y-2">
                        <CircleCheck className="w-10 h-10 text-green-500" />
                        <span className="text-xl">Success</span>
                    </DialogTitle>
                    <DialogDescription className="">               
                        <span className="text-xl">User was added to fraud list successfully.</span>
                    </DialogDescription>
                </DialogHeader>}
            </DialogContent>
        </Dialog>
    )
}