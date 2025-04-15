import { useLanguage } from "@/components/language/language-provider"

export default function Badges() {
    const { t } = useLanguage()
    return (
        <div className="w-full flex space-x-2 justify-center 2xl:justify-start 2xl:pl-20 text-neutral-100 text-sm">
            <div className="bg-blue-500 p-2 rounded-lg">
                {t("livenessVerified")}
            </div>

            <div className="bg-red-500 p-2 rounded-lg">
                {t("pep")}
            </div>

            <div className="bg-green-500 p-2 rounded-lg">
                {t("documentScan")}
            </div>
        </div>
    )
}