"use client"

import React from "react"

import { Loader2, ExternalLink, AlertCircle, RefreshCw, Download, FileText, Shield, Plus, Eye } from "lucide-react"
import { useState } from "react"
import type { SchemeRecommendation } from "@/types/scheme"
import { ApplicationTracker } from "./application-tracker"
import { addTrackedApplication, isSchemeTracked } from "@/lib/application-tracker"

interface SchemeResultsProps {
  recommendations: SchemeRecommendation[]
  isLoading: boolean
  error: string | null
  onRetry: () => void
}

// Function to check if link is official government domain
function isOfficialGovLink(url: string): boolean {
  const govDomains = [
    ".gov.in",
    ".nic.in",
    "pmkisan.gov.in",
    "pmjay.gov.in",
    "nrega.nic.in",
    "skillindia.gov.in",
    "startupindia.gov.in",
    "digitalindia.gov.in",
    "mygov.in",
    "india.gov.in",
    "pmkvyofficial.org",
    "ddugky.gov.in",
    "pgrkam.com",
    "employment.gujarat.gov.in",
    "upsdm.gov.in",
    "strive.msde.gov.in",
    "skillindiadigital.gov.in",
    "tsdm.tripura.gov.in",
    "nlc.gov.in",
    "mysy.guj.nic.in",
    "sevasindhu.karnataka.gov.in",
    "msde.maharashtra.gov.in",
    "himayat.org",
    "tnskill.tn.gov.in",
    "asdm.assam.gov.in",
    "jsdm.jharkhand.gov.in",
    "skillodisha.gov.in",
    "pbssd.gov.in",
    "cgsda.cgstate.gov.in",
    "skillmissionbihar.org",
    "dseu.ac.in",
    "eskillindia.org",
    "meity.gov.in",
    "minorityaffairs.gov.in",
  ]

  return govDomains.some((domain) => url.includes(domain))
}

export function SchemeResults({ recommendations, isLoading, error, onRetry }: SchemeResultsProps) {
  const [showTracker, setShowTracker] = useState(false)
  const [trackedSchemes, setTrackedSchemes] = useState<Set<string>>(new Set())

  const handlePrintPDF = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    // Get the results content
    const resultsContent = document.querySelector(".results-content")?.innerHTML || ""

    // Create the print document
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Government Scheme Recommendations</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 20px;
              color: #1f2937;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 3px solid #3b82f6;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #1f2937;
              margin: 0 0 10px 0;
              font-size: 28px;
            }
            .header p {
              color: #6b7280;
              margin: 0;
              font-size: 14px;
            }
            .scheme-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 20px;
              margin-top: 20px;
            }
            .scheme-card {
              border: 2px solid #e5e7eb;
              border-radius: 12px;
              padding: 24px;
              background: #ffffff;
              box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            }
            .scheme-title {
              font-size: 18px;
              font-weight: 700;
              color: #1f2937;
              margin-bottom: 8px;
              line-height: 1.4;
            }
            .scheme-state {
              color: #6b7280;
              font-size: 14px;
              margin-bottom: 16px;
              font-weight: 500;
            }
            .scheme-link {
              color: #3b82f6;
              text-decoration: none;
              font-weight: 600;
              font-size: 14px;
              word-break: break-all;
            }
            .badge {
              display: inline-block;
              background: #dbeafe;
              color: #1e40af;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              margin-right: 8px;
              margin-bottom: 12px;
            }
            .official-badge {
              background: #dcfce7;
              color: #166534;
            }
            @media print {
              body { margin: 0; }
              .scheme-card { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Government Scheme Recommendations</h1>
            <p>Generated on ${new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
            <p><strong>Note:</strong> All links are official government and authorized websites</p>
          </div>
          ${resultsContent}
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  const handleTrackApplication = (scheme: SchemeRecommendation) => {
    addTrackedApplication(scheme)
    setTrackedSchemes((prev) => new Set([...prev, scheme.schemeName]))

    // Show success message
    alert(`Started tracking application for ${scheme.schemeName}`)
  }

  // Check which schemes are already tracked
  React.useEffect(() => {
    const tracked = new Set<string>()
    recommendations.forEach((scheme) => {
      if (isSchemeTracked(scheme.schemeName)) {
        tracked.add(scheme.schemeName)
      }
    })
    setTrackedSchemes(tracked)
  }, [recommendations])

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Searching for schemes...</h2>
          <p className="text-gray-600">Please wait while we find the best recommendations for you</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-red-800 font-semibold text-lg">Something went wrong</h3>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
            <button
              onClick={onRetry}
              className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {recommendations.length > 0 ? `Found ${recommendations.length} Schemes` : "No Results"}
          </h2>
          {recommendations.length > 0 && (
            <p className="text-gray-600 mt-1">Personalized recommendations with official government links</p>
          )}
        </div>
        <div className="flex gap-3">
          {recommendations.length > 0 && (
            <>
              <button
                onClick={() => setShowTracker(true)}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center font-medium"
              >
                <Eye className="h-5 w-5 mr-2" />
                Track Applications
              </button>
              <button
                onClick={handlePrintPDF}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center font-medium"
              >
                <Download className="h-5 w-5 mr-2" />
                Download as PDF
              </button>
            </>
          )}
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            <FileText className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">No schemes found</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any schemes matching your profile. Try adjusting your selection criteria or tags.
          </p>
          <button
            onClick={onRetry}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Search Again
          </button>
        </div>
      ) : (
        <div className="results-content">
          <div className="scheme-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((scheme, index) => (
              <div
                key={scheme.id}
                className="scheme-card bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 border border-gray-100"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      #{index + 1}
                    </span>
                    {isOfficialGovLink(scheme.applicationLink) && (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        Official
                      </span>
                    )}
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                      {scheme.state}
                    </span>
                  </div>
                  <h3 className="scheme-title text-lg font-bold text-gray-900 mb-2 leading-tight">
                    {scheme.schemeName}
                  </h3>
                  <p className="scheme-state text-sm text-gray-600 font-medium">State: {scheme.state}</p>
                </div>

                <div className="mt-6 space-y-3">
                  <a
                    href={scheme.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="scheme-link w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                  >
                    Apply Now
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>

                  <button
                    onClick={() => handleTrackApplication(scheme)}
                    disabled={trackedSchemes.has(scheme.schemeName)}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                      trackedSchemes.has(scheme.schemeName)
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    }`}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {trackedSchemes.has(scheme.schemeName) ? "Already Tracking" : "Track Application"}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    {isOfficialGovLink(scheme.applicationLink) ? "Official Government Website" : "External Link"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showTracker && <ApplicationTracker onClose={() => setShowTracker(false)} />}
    </div>
  )
}
