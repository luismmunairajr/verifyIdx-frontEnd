import jsPDF from "jspdf"
import "jspdf-autotable"

type ReportData = {
    summary: {
        totalVerifications: number,
        approvalRate: number,
        pendingVerifications: number,
        rejectedVerifications: number,
        processingTime: number
    } 
}
export const exportToPdf = (data: ReportData, filename: string) => {
    const doc = new jsPDF()

    // Colors
    const primaryColor: [number, number, number] = [51, 51, 51]
    const secondaryColor: [number, number, number] = [102, 102, 102]
    const accentColor: [number, number, number] = [59, 130, 246]
    const successColor: [number, number, number] = [34, 197, 94]
    const warningColor: [number, number, number] = [245, 158, 11]
    const dangerColor: [number, number, number] = [239, 68, 68]

    let yPosition = 20

    // Title
    doc.setFontSize(24)
    doc.setTextColor(...primaryColor)
    doc.setFont("helvetica", "bold")
    doc.text("Verification Identity Report", 20, yPosition)

    // Horizontal Line
    doc.setDrawColor(...accentColor)
    doc.setLineWidth(2)
    doc.line(20, yPosition + 5, 190, yPosition + 5)

    yPosition += 20

    // Date in which the report was generated
    doc.setFontSize(10)
    doc.setTextColor(...secondaryColor)
    doc.setFont("helvetica", "normal")
    doc.text(
    `This report was generated on: ${new Date().toLocaleDateString("pt-PT")} at ${new Date().toLocaleTimeString("pt-PT")}`,
    20,
    yPosition
    )

    yPosition += 20

    // Executive resume
    doc.setFontSize(16)
    doc.setTextColor(...primaryColor)
    doc.setFont("helvetica", "bold")
    doc.text("Executive Resume", 20, yPosition)

    // Background color for executive resume section
    doc.setFillColor(249, 249, 249)
    doc.rect(15, yPosition + 5, 180, 45, "F")

    yPosition += 15

    const metrics = [
        {label: "Total Number of Verifications", value: data.summary.totalVerifications.toLocaleString(), color: primaryColor},
        {label: "Approval Rate", value: `${data.summary.approvalRate}%`, color: successColor},
        {label: "Pending Verifications", value: data.summary.pendingVerifications.toString(), color: warningColor},
        {label: "Rejected Verifications", value: data.summary.rejectedVerifications.toLocaleString(), color: dangerColor},
        {label: "Average Time", value: `${data.summary.processingTime} min`, color: secondaryColor}
    ]

    doc.setFontSize(10)
    metrics.forEach((metric, index) => {
        const x = 25 + (index % 2) * 85
        const y = yPosition + Math.floor(index / 2) * 15

        doc.setFont("helvetica", "normal")
        doc.setTextColor(...secondaryColor)
        doc.text(metric.label + ":", x, y)
        
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...metric.color)
        doc.text(metric.value, x, y + 8)
    })
    
    yPosition += 60

    if (yPosition > 250) 
    {
        doc.addPage()
        yPosition = 20
    }

    // Section: Verification by Identification Document
    doc.setFontSize(14)
    doc.setTextColor(...primaryColor)
    doc.setFont("helvetica", "bold")
    doc.text("Verifications By Identification Document", 20, yPosition)

    doc.save(`${filename}.pdf`)
}