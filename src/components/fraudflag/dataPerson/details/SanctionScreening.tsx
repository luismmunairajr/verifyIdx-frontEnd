import { Person } from "../../type";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";

interface PersonDetailsProps {
    person: Person
}

export default function SanctionScreening({ person }: PersonDetailsProps) {
    const { t } = useLanguage()
    return (
        <div className="p-10 w-full grid grid-cols-3">
            <div className="space-y-6">
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("status")}</Label>
                    <p className="dark:text-white">{"COMPLETE"}</p>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("matchScore")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{"100"}</p>
                        <div className="text-xs rounded-full px-2 bg-green-500 text-white flex items-center justify-center ">
                            <Check size={15}/>
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("categories")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">t{("pep")}</p>
                        <div className="text-xs rounded-full px-2 bg-blue-500 text-white flex items-center justify-center">
                            <p>{t("Active")}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("fullName")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{"Daniel Francisco Chapo"}</p>
                        <div className="text-xs rounded-full py-0 px-2 bg-green-500 text-white flex items-center justify-center">
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("dateOfBirth")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{"1977-01-06"}</p>
                        <div className="text-xs rounded-full px-2 bg-red-500 text-white flex items-center justify-center">
                            <X size={15} />
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("gender")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{"MALE"}</p>
                        <div className="text-xs rounded-full px-2 bg-green-500 text-white flex items-center justify-center">
                            <Check size={15} />
                        </div>
                    </div>
                </div>

            </div>
            <div className="space-y-6">
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("location")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{"MOZ"}</p>
                        <div className="text-xs rounded-full px-2 bg-red-500 text-white flex items-center justify-center">
                            <X size={15}/>
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("nacionality")}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{"MOZAMBIQUE"}</p>
                        <div className="text-xs rounded-full px-2 bg-green-500 text-white flex items-center justify-center">
                            <Check size={15} />
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{t("category")}</Label>
                    <p className="dark:text-white">{"POLITICAL INDIVIDUAL"}</p>
                </div>
            </div>
        </div>
    )
}