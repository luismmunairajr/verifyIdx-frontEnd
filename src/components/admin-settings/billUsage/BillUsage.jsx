import { Component as Barchart } from "@/components/admin-settings/billUsage/barChart";
import Invoice from "@/components/admin-settings/billUsage/Invoice"
import { useLanguage } from "@/components/language/language-provider";

export default function BillUsage() {
    const { t } = useLanguage();
    return (
        <div className="p-6 space-y-4 dark:bg-zinc-900 w-full 2xl:w-[1000px]">
            <div className="flex justify-between">
                <div className="flex flex-col justify-between w-1/2">
                    <div>
                        <h2 className="text-4xl font-semibold">3,120.84 <span className="text-base">MZN</span></h2>
                        <p className="text-zinc-600 text-sm">{t("currentTotal")}</p>
                    </div>
                    <div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <div className="size-2 rounded-full bg-blue-500" />
                                <p>970.53 <span className="text-xs">MZN</span></p>
                            </div>
                            <p className="text-xs ml-4">{t("available")}</p>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <div className="size-2 rounded-full bg-blue-950" />
                                <p>2,158.84 <span className="text-xs">MZN</span></p>
                            </div>
                            <p className="text-xs ml-4">{t("locked")}</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <Barchart />
                </div>
            </div>
            <div>
                <h2 className="text-xl text-zinc-500">{t("invoices")}</h2>
                <Invoice/>
            </div>
        </div>
    )
}