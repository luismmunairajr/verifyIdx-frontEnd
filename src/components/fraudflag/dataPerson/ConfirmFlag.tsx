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

export default function ConfirmFlag() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-44 hover:bg-transparent hover:border hover:border-blue-500 hover:text-blue-500 dark:bg-blue-800 dark:hover:bg-transparent dark:hover:text-blue-500 dark:text-white">Confirm Fraudflag</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to confirm that there has been fraud associated with this person. This may lead to internal review process. Are you sure?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}