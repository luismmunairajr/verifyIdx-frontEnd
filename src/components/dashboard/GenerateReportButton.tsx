"use client"
import { Button } from "../ui/button";
import { exportToPdf } from "@/lib/export-utils";
import { Download } from "lucide-react";

type ReportData = {
    summary: {
        totalVerifications: number,
        approvalRate: number,
        pendingVerifications: number,
        rejectedVerifications: number,
        processingTime: number
    } 
}
const data: ReportData = {
    summary: {
        totalVerifications: 12,
        approvalRate: 70,
        pendingVerifications: 3,
        rejectedVerifications: 0,
        processingTime: 5
    }
}

export const ReportButton = () => (
    <Button onClick={() => exportToPdf(data, "report")}>
        <Download/> <span>Export Report</span>
    </Button>
)