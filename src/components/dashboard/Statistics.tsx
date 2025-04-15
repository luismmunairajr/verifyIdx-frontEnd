'use client'
import { Eye, User, Drama, ShieldAlert} from "lucide-react"
import StatisticCard from "./StatisticCard"

import { useLanguage } from "@/components/language/language-provider"

export default function Statistics() {

    const { t } = useLanguage()

    return (
        <div className="w-full flex space-x-10 h-32 ">
            <StatisticCard title={t("approved")} number={24} icon={<Eye strokeWidth={1} className="dark:text-white" />} variance={-25} />
            <StatisticCard title={t("denied")} number={64} icon={<User strokeWidth={1} className="dark:text-white"/>} variance={+50} />
            <StatisticCard title={t("pending")} number={57} icon={<Drama strokeWidth={1} className="dark:text-white" />} variance={+3} />
            <StatisticCard title={t("total")} number={36} icon={<ShieldAlert strokeWidth={1} className="dark:text-white"/>} variance={-15} />
        </div>
    )
}