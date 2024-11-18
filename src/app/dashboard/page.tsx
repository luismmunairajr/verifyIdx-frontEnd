import { Component as Piechart } from "@/components/dashboard/chart/pieChart/piechart";
import { Component as Barchart } from "@/components/dashboard/chart/barChart/barchart";
import { Component as Barcharthorizontal } from "@/components/dashboard/chart/barChart/barcharthorizontal";
import { Component as RadialChart } from "@/components/dashboard/chart/radialChart/radialChart";
import { Component as LineChart } from "@/components/dashboard/chart/lineChart/lineChart";
import { Component as LineChartMultiple } from "@/components/dashboard/chart/lineChart/lineChartMultiple";
import Bluestring from "@/components/bluestring";
import Estatistics from "@/components/dashboard/Estatistics";

export default function Dashboard() {
    return (
        <div className="w-full min-h-screen flex flex-col px-6 pt-10 space-y-10 overflow-y-auto">
            <Estatistics />
            <div className="w-full flex space-x-10">
                <div className="w-1/2">
                    <RadialChart />
                </div>
                <div className="w-1/2">
                    <Barchart />
                </div>
                <div className="w-1/2">
                    <Piechart />
                </div>
            </div>
            <div className="w-full flex space-x-10">
                <div className="w-1/2">
                    <LineChart />
                </div>
                <div className="w-1/2">
                    <Barcharthorizontal />
                </div>
                <div className="w-1/2">
                    <LineChartMultiple />
                </div>
            </div>
            <Bluestring />
        </div>
    )
}