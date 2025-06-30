'use client'
import { ReactNode } from "react"
import { ChartColumn } from "lucide-react"
import clsx from "clsx"
import { useLanguage } from "@/components/language/language-provider"

interface StatisticCardProps{
    title: string
    number: number
    icon: ReactNode
    variance: number
}
export default function StatisticCard({title, number, icon, variance}: StatisticCardProps) {

    const containerClass = clsx(
        "flex items-center justify-start gap-1 text-sm ", {
            "text-red-500": variance<0,
            "text-green-500": variance>0
        }
    )

    const { t } = useLanguage()
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow w-1/3 p-4 flex items-center justify-between dark:bg-zinc-950">
            <div>
                <h2 className="text-sm">{title}</h2>
                <p className="text-3xl font-bold">{number}</p>
                <div className={containerClass}>
                    <ChartColumn strokeWidth={1} className="size-5" />
                    <p className="text-xs">{variance} {t("forYesterday")}</p>
                </div>
            </div>
            <div className="p-2 rounded-full text-black flex items-start justify-start h-full">
                {icon}
            </div>
        </div>
    )
}