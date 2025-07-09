"use client"

import { useState } from "react"
import { SchemeForm } from "@/components/scheme-form"
import { SchemeResults } from "@/components/scheme-results"
import type { UserProfile, SchemeRecommendation } from "@/types/scheme"

// Comprehensive government scheme links database
const GOVERNMENT_SCHEME_LINKS: Record<string, string> = {
  // Women & Child Development
  "beti bachao beti padhao": "https://wcd.nic.in/bbbp-scheme",
  "sukanya samriddhi yojana": "https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=61",
  "pradhan mantri matru vandana yojana": "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana",
  "e-skilling for women": "https://meity.gov.in/",

  // Agriculture & Farmers
  "pm kisan": "https://pmkisan.gov.in/",
  "pm kisan samman nidhi": "https://pmkisan.gov.in/",
  "kisan credit card": "https://pmkisan.gov.in/Rpt_BeneficiaryStatus_pub.aspx",
  "pradhan mantri fasal bima yojana": "https://pmfby.gov.in/",

  // Health
  "ayushman bharat": "https://pmjay.gov.in/",
  "pradhan mantri jan arogya yojana": "https://pmjay.gov.in/",
  "pm jay": "https://pmjay.gov.in/",
  "rashtriya swasthya bima yojana": "https://www.rsby.gov.in/",

  // National Skill Development Schemes
  "pradhan mantri kaushal vikas yojana": "https://pmkvyofficial.org",
  pmkvy: "https://pmkvyofficial.org",
  "pmkvy 4.0": "https://pmkvyofficial.org",
  "deen dayal upadhyaya grameen kaushalya yojana": "https://ddugky.gov.in/",
  "ddu-gky": "https://ddugky.gov.in/",
  strive: "https://strive.msde.gov.in/",
  "strive industrial training support": "https://strive.msde.gov.in/",
  "skill india digital": "https://skillindiadigital.gov.in/",
  "skill india digital platform": "https://skillindiadigital.gov.in/",
  "startup india seed fund": "https://startupindia.gov.in/",
  "startup india seed fund scheme": "https://startupindia.gov.in/",
  "nai manzil": "https://minorityaffairs.gov.in/",
  "nai manzil scheme": "https://minorityaffairs.gov.in/",

  // State-wise Skill Development Programs
  "punjab ghar ghar rozgar": "https://pgrkam.com/",
  "punjab ghar ghar rozgar yojana": "https://pgrkam.com/",
  "gujarat skill development": "https://employment.gujarat.gov.in/",
  "skill development initiative scheme gujarat": "https://employment.gujarat.gov.in/",
  "uttar pradesh skill development mission": "https://upsdm.gov.in/",
  upsdm: "https://upsdm.gov.in/",
  "up skill development mission": "https://upsdm.gov.in/",
  "karnataka yuva nidhi": "https://sevasindhu.karnataka.gov.in/",
  "karnataka yuva nidhi scheme": "https://sevasindhu.karnataka.gov.in/",
  cmkky: "https://sevasindhu.karnataka.gov.in/",
  "maharashtra skill development": "https://msde.maharashtra.gov.in/",
  "maharashtra skill development program": "https://msde.maharashtra.gov.in/",
  himayat: "https://himayat.org/",
  "himayat scheme": "https://himayat.org/",
  "tamil nadu skill development": "https://tnskill.tn.gov.in/",
  "tamil nadu skill development corporation": "https://tnskill.tn.gov.in/",
  tnsdc: "https://tnskill.tn.gov.in/",
  "bihar kaushal yuva": "https://skillmissionbihar.org/",
  "kaushal yuva program bihar": "https://skillmissionbihar.org/",
  "west bengal utkarsh bangla": "https://pbssd.gov.in/",
  "utkarsh bangla": "https://pbssd.gov.in/",

  // Employment & Rural Development
  "mahatma gandhi nrega": "https://nrega.nic.in/netnrega/home.aspx",
  mgnrega: "https://nrega.nic.in/netnrega/home.aspx",
  "skill india": "https://www.skillindia.gov.in/",

  // Housing
  "pradhan mantri awas yojana": "https://pmaymis.gov.in/",
  "pm awas yojana urban": "https://pmaymis.gov.in/",
  "pm awas yojana gramin": "https://pmayg.nic.in/",
  "pradhan mantri awas yojana gramin": "https://pmayg.nic.in/",

  // Financial Inclusion & Banking
  "pradhan mantri mudra yojana": "https://www.mudra.org.in/",
  "mudra loan": "https://www.mudra.org.in/",
  "pradhan mantri jan dhan yojana": "https://pmjdy.gov.in/",
  "stand up india": "https://www.standupmitra.in/",

  // Education
  "sarva shiksha abhiyan": "https://samagra.education.gov.in/",
  "mid day meal scheme": "https://mdm.nic.in/",
  "rashtriya madhyamik shiksha abhiyan": "https://samagra.education.gov.in/",

  // Entrepreneurship
  "startup india": "https://www.startupindia.gov.in/",
  "pradhan mantri employment generation programme":
    "https://www.kviconline.gov.in/pmegpeportal/jsp/pmegponline/index.jsp",

  // Social Security & Pension
  "pradhan mantri shram yogi maan dhan": "https://maandhan.in/",
  "atal pension yojana": "https://npscra.nsdl.co.in/atal-pension-yojana.php",
  "pradhan mantri jeevan jyoti bima yojana": "https://www.jansuraksha.gov.in/",
  "pradhan mantri suraksha bima yojana": "https://www.jansuraksha.gov.in/",

  // Rural Development
  "pradhan mantri gram sadak yojana": "https://pmgsy.nic.in/",
  "national rural livelihood mission": "https://aajeevika.gov.in/",

  // Digital India
  "digital india": "https://digitalindia.gov.in/",
  "pradhan mantri gramin digital saksharta abhiyan": "https://pmgdisha.in/",

  // Gas & Energy
  "pradhan mantri ujjwala yojana": "https://pmuy.gov.in/",
  "pradhan mantri sahaj bijli har ghar yojana": "https://saubhagya.gov.in/",

  // Water & Sanitation
  "jal jeevan mission": "https://jaljeevanmission.gov.in/",
  "swachh bharat mission": "https://swachhbharatmission.gov.in/",
}

function findSchemeLink(schemeName: string): string {
  const normalizedName = schemeName.toLowerCase().trim()

  // Direct match
  if (GOVERNMENT_SCHEME_LINKS[normalizedName]) {
    return GOVERNMENT_SCHEME_LINKS[normalizedName]
  }

  // Partial match - find the best matching scheme
  for (const [key, link] of Object.entries(GOVERNMENT_SCHEME_LINKS)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return link
    }
  }

  // Special handling for common abbreviations and variations
  const abbreviations: Record<string, string> = {
    pmkvy: "pradhan mantri kaushal vikas yojana",
    "ddu-gky": "deen dayal upadhyaya grameen kaushalya yojana",
    upsdm: "uttar pradesh skill development mission",
    cmkky: "karnataka yuva nidhi scheme",
    tnsdc: "tamil nadu skill development corporation",
  }

  // Check abbreviations
  if (abbreviations[normalizedName]) {
    const fullName = abbreviations[normalizedName]
    if (GOVERNMENT_SCHEME_LINKS[fullName]) {
      return GOVERNMENT_SCHEME_LINKS[fullName]
    }
  }

  // Check if any abbreviation matches the scheme name
  for (const [abbr, fullName] of Object.entries(abbreviations)) {
    if (normalizedName.includes(abbr) || normalizedName.includes(fullName)) {
      if (GOVERNMENT_SCHEME_LINKS[fullName]) {
        return GOVERNMENT_SCHEME_LINKS[fullName]
      }
    }
  }

  // Fallback to MyGov portal for scheme search
  return `https://www.mygov.in/search/?query=${encodeURIComponent(schemeName)}`
}

// Function to filter schemes based on gender eligibility
function filterSchemesByGender(schemes: any[], userGender: string): any[] {
  return schemes.filter((scheme) => {
    const schemeName = (scheme.Scheme_Name || scheme.scheme_name || scheme.name || "").toLowerCase()

    // Female-only schemes
    const femaleOnlySchemes = [
      "beti bachao",
      "beti padhao",
      "sukanya samriddhi",
      "matru vandana",
      "e-skilling for women",
      "women empowerment",
      "girl child",
      "pregnant women",
      "lactating mother",
    ]

    const isFemaleOnlyScheme = femaleOnlySchemes.some((keyword) => schemeName.includes(keyword))

    // If it's a female-only scheme, only show to females
    if (isFemaleOnlyScheme && userGender !== "Female") {
      console.log(`🚫 Filtered out female-only scheme "${schemeName}" for ${userGender} user`)
      return false
    }

    // If it's a female-only scheme and user is female, include it
    // If it's not a female-only scheme, include it for any gender
    return true
  })
}

export default function HomePage() {
  const [recommendations, setRecommendations] = useState<SchemeRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleFormSubmit = async (profile: UserProfile) => {
    setIsLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      console.log("🔍 Submitting profile:", profile)

      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: Number(profile.age),
          gender: profile.gender,
          education: profile.education,
          area: profile.area,
          state: profile.state,
          tags: Array.isArray(profile.tags) ? profile.tags : profile.tags.split(",").map((t) => t.trim()),
        }),
      })

      console.log("📡 Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error occurred" }))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("📊 Response data:", data)

      // Handle different possible response formats
      const schemes = Array.isArray(data) ? data : data.recommendations || data.schemes || data.data || []

      if (!Array.isArray(schemes) || schemes.length === 0) {
        console.warn("⚠️ No schemes found in response:", data)
        setRecommendations([])
        return
      }

      // Filter schemes by gender BEFORE processing
      const genderFilteredSchemes = filterSchemesByGender(schemes, profile.gender)
      console.log(`🎯 Filtered ${schemes.length} schemes to ${genderFilteredSchemes.length} for ${profile.gender} user`)

      const formattedRecommendations: SchemeRecommendation[] = genderFilteredSchemes.map((item: any, index: number) => {
        const rawLink = item.Application_Link || item.application_link || item.link || item.url || ""
        const schemeName = item.Scheme_Name || item.scheme_name || item.name || item.title || "Unknown Scheme"
        const state = item.State || item.state || item.location || "Unknown State"

        // Use real government link if available, otherwise use API provided link
        let applicationLink = ""
        if (rawLink && rawLink.startsWith("http")) {
          applicationLink = rawLink
        } else {
          applicationLink = findSchemeLink(schemeName)
        }

        return {
          id: String(index),
          schemeName,
          state,
          applicationLink,
        }
      })

      // Ensure maximum 5 recommendations
      const finalRecommendations = formattedRecommendations.slice(0, 5)

      // ONLY for females aged 0-21, ensure Beti Bachao Beti Padhao is included
      if (profile.gender === "Female" && profile.age >= 0 && profile.age <= 21) {
        const betiBachaoExists = finalRecommendations.some(
          (scheme) =>
            scheme.schemeName.toLowerCase().includes("beti bachao") ||
            scheme.schemeName.toLowerCase().includes("beti padhao"),
        )

        if (!betiBachaoExists) {
          // Create Beti Bachao scheme with real government link
          const betiBachaoScheme: SchemeRecommendation = {
            id: "beti-bachao-priority",
            schemeName: "Beti Bachao Beti Padhao",
            state: profile.state,
            applicationLink: "https://wcd.nic.in/bbbp-scheme",
          }

          // Replace the last recommendation with Beti Bachao to maintain exactly 5 total
          if (finalRecommendations.length >= 5) {
            finalRecommendations[4] = betiBachaoScheme
          } else {
            finalRecommendations.push(betiBachaoScheme)
          }

          console.log("✅ Beti Bachao Beti Padhao scheme prioritized for eligible female user (age 0-21)")
        }
      }

      console.log("🎯 Final recommendations (max 5):", finalRecommendations)
      setRecommendations(finalRecommendations)
    } catch (err) {
      console.error("❌ API Error:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch recommendations. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setRecommendations([])
    setError(null)
    setHasSearched(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Government Scheme Finder</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find government schemes and benefits tailored to your profile. Enter your details below to get personalized
            recommendations with official application links.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <SchemeForm onSubmit={handleFormSubmit} isLoading={isLoading} onReset={handleReset} />
        </div>

        {(hasSearched || isLoading) && (
          <SchemeResults recommendations={recommendations} isLoading={isLoading} error={error} onRetry={handleReset} />
        )}
      </div>
    </div>
  )
}
