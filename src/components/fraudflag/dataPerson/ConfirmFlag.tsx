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

export default function ConfirmFlag() {
    const { t } = useLanguage()

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="px-4 hover:bg-transparent hover:border hover:border-blue-500 hover:text-blue-500 dark:bg-blue-800 dark:hover:bg-transparent dark:hover:text-blue-500 dark:text-white">
                    {t("confirmFraudflag")}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t("areYouSure")}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {t("confirmFraudflagDescription")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction>{t("continue")}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
