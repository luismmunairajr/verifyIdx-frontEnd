import { Label } from "@/components/ui/label"
import { Check, X } from "lucide-react"
import { useLanguage } from "@/components/language/language-provider"

export default function SanctionScreening({ person }) {
    const { t } = useLanguage()

    const getStatusIcon = (condition) => (
        <div
            className={`text-xs rounded-full px-2 text-white flex items-center justify-center ${condition ? "bg-green-500" : "bg-red-500"}`}>
            {condition ? <Check size={15} /> : <X size={15} />}
        </div>
    )

    return (
        <div className="p-10 w-full grid grid-cols-3">
            <div className="space-y-6">
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("status")}</Label>
                    <p className="dark:text-white">{person.watchlistStatus}</p>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("matchScore")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.matchScore}</p>
                        <div className="text-xs rounded-full px-2 bg-blue-500 text-white flex items-center justify-center ">
                            <p>{person.matchStrength}</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("categories")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.categories}</p>
                        {getStatusIcon(person.personStatus === "ACTIVE")}
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("fullName")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.primaryName}</p>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("dateOfBirth")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.matchedDateOfBirth}</p>
                        {getStatusIcon(person.dateOfBirthResult === "MATCHED")}
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("gender")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.matchedGender}</p>
                        {getStatusIcon(person.genderResult === "MATCHED")}
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("location")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.matchedLocation}</p>
                        {getStatusIcon(person.locationResult === "MATCHED")}
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("nationality")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.matchedNacionality}</p>
                        {getStatusIcon(person.nacionalityResult === "MATCHED")}
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("category")}</Label>
                    <p className="dark:text-white">{person.category}</p>
                </div>
            </div>
        </div>
    )
}
