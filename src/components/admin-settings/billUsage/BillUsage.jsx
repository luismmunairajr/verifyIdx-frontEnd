import { Component as Barchart } from "@/components/dashboard/chart/barChart/barchart";
import Invoice from "@/components/admin-settings/billUsage/Invoice"

export default function BillUsage() {
    return (
        <div className="p-6 w-full space-y-4">
            <div className="flex justify-between">
                <div className="flex flex-col justify-between w-1/2">
                    <div>
                        <h2 className="text-4xl font-semibold">3,120.84 <span className="text-base">MZN</span></h2>
                        <p className="text-zinc-600 text-sm">Current Total Bill</p>
                    </div>
                    <div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <div className="size-2 rounded-full bg-blue-500" />
                                <p>970.53 <span className="text-xs">MZN</span></p>
                            </div>
                            <p className="text-xs ml-4">Available</p>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <div className="size-2 rounded-full bg-blue-950" />
                                <p>2,158.84 <span className="text-xs">MZN</span></p>
                            </div>
                            <p className="text-xs ml-4">Locked</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <Barchart />
                </div>
            </div>
            <div>
                <h2 className="text-xl text-zinc-500">Invoices</h2>
                <Invoice/>
            </div>
        </div>
    )
}