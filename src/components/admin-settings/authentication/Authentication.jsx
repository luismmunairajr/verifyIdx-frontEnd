import Image from "next/image"
import singlesignon from "@/assets/singlesignon.svg"
import google from "@/assets/google.svg"
import { Button } from "@/components/ui/button"
import { TriangleAlert, Check } from "lucide-react"
import { useLanguage } from "@/components/language/language-provider"

export default function Authentication() {
    const { t } = useLanguage()
    return (
        <div className="px-6 space-y-6 dark:bg-zinc-900 w-full 2xl:w-[1000px]">
            <h3 className="text-xl font-semibold">{t("methods")}</h3>
            <div className="border flex rounded-xl p-4 items-start justify-between">
                <div className="flex items-start gap-4">
                    <Image src={singlesignon} alt="" />
                    <div className="space-y-4">
                        <h1 className="font-semibold">{t("singleSignOn")}</h1>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">{t("singleSignOnSubtitle")}</p>
                        <Button variant={"secondary"}>{t("disableSingleSignOn")}</Button>
                    </div>
                </div>
                <p className="flex text-yellow-500 gap-2"><TriangleAlert /> {t("redirectUri")}</p>
            </div>
            <div className="border flex rounded-xl p-4 items-start justify-between">
                <div className="flex items-start gap-4">
                    <Image src={google} alt="" className="size-14" />
                    <div className="space-y-2">
                        <h1 className="font-semibold">{t("googleOAuth")}</h1>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">{t("googleOAuthSubtitle")}</p>
                        <div className="flex justify-between items-center">
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">{t("googleClientSecret")}</p>
                            <div className="flex gap-2">
                                <p className="font-semibold text-xl">.........................</p>
                                <div className="bg-yellow-300 p-1 rounded-xl">
                                    <p className="text-yellow-600 text-sm">{t("demoValue")}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center ">
                            <p className="text-zinc-500 text-sm dark:text-zinc-300">{t("googleClientID")}</p>
                            <div className="flex gap-2 ">
                                <p className="font-semibold text-xl">.........................</p>
                                <div className="bg-yellow-300 p-1 rounded-xl">
                                    <p className="text-yellow-600 text-sm">{t("demoValue")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="flex text-green-500 gap-2"><Check /> {t("enabled")}</p>
            </div>
        </div>
    )
}