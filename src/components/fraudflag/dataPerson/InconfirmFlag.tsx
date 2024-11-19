import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function InconfirmFlag() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"} className="w-44 hover:bg-transparent hover:border hover:border-red-500 hover:text-red-500">Reject Fraudflag</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle >Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to reject the fraud flag for this person. This action will remove them from the suspect list. Are you sure?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}