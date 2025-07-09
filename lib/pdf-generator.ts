import jsPDF from "jspdf"
import type { SchemeRecommendation } from "@/types/scheme"

export function generatePDFReport(recommendations: SchemeRecommendation[]) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  let yPosition = 20

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(text, maxWidth)
    doc.text(lines, x, y)
    return y + lines.length * fontSize * 0.4
  }

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 20) {
      doc.addPage()
      yPosition = 20
    }
  }

  // Header
  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("Government Scheme Recommendations", pageWidth / 2, yPosition, { align: "center" })
  yPosition += 15

  // Date
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  const currentDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  doc.text(`Generated on: ${currentDate}`, pageWidth / 2, yPosition, { align: "center" })
  yPosition += 20

  // Summary
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text(`Total Recommendations Found: ${recommendations.length}`, 20, yPosition)
  yPosition += 20

  // Recommendations Section
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text("Recommended Schemes", 20, yPosition)
  yPosition += 15

  recommendations.forEach((scheme, index) => {
    checkNewPage(40) // Check if we need space for the scheme

    // Scheme header with ranking
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text(`${index + 1}. ${scheme.schemeName}`, 20, yPosition)
    yPosition += 10

    // State
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text(`State: ${scheme.state}`, 25, yPosition)
    yPosition += 8

    // Application Link
    doc.setFont("helvetica", "bold")
    doc.text("Application Link:", 25, yPosition)
    yPosition += 6

    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 255)
    yPosition = addWrappedText(scheme.applicationLink, 25, yPosition, pageWidth - 50, 10)
    doc.setTextColor(0, 0, 0)
    yPosition += 15

    // Add a separator line
    if (index < recommendations.length - 1) {
      doc.setDrawColor(200, 200, 200)
      doc.line(20, yPosition, pageWidth - 20, yPosition)
      yPosition += 10
    }
  })

  // Footer section
  checkNewPage(30)
  yPosition += 10

  doc.setFontSize(10)
  doc.setFont("helvetica", "italic")
  doc.text("Important Notes:", 20, yPosition)
  yPosition += 8

  doc.setFont("helvetica", "normal")
  const footerNotes = [
    "• Please verify eligibility criteria on official websites before applying",
    "• Keep all required documents ready before starting the application process",
    "• Contact respective departments for any queries or clarifications",
    "• This report is generated based on the information provided and may not be exhaustive",
  ]

  footerNotes.forEach((note) => {
    yPosition = addWrappedText(note, 25, yPosition, pageWidth - 50, 9)
    yPosition += 4
  })

  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: "center" })
  }

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
  const filename = `Government_Scheme_Recommendations_${timestamp}.pdf`

  // Save the PDF
  doc.save(filename)
}
