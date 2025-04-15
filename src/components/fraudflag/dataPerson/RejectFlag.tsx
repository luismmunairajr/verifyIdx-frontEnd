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
import { useLanguage } from "@/components/language/language-provider"

export default function RejectFlag() {
    const { t } = useLanguage()

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"} className="px-4 hover:bg-transparent hover:border hover:border-red-500 hover:text-red-500">
                    {t("rejectFraudflag")}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t("areYouSure")}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t("rejectFraudflagDescription")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                        {t("continue")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
