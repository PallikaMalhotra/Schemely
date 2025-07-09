import type { UserProfile, GovernmentScheme } from "@/types/scheme"

// Comprehensive government schemes database with proper gender eligibility
const GOVERNMENT_SCHEMES: Omit<GovernmentScheme, "matchScore">[] = [
  // Women & Child Development - FEMALE ONLY
  {
    id: "beti-bachao",
    name: "Beti Bachao Beti Padhao",
    description: "Scheme to save and educate girl children",
    benefits: "Financial assistance for education, healthcare, and skill development",
    minAge: 0,
    maxAge: 21,
    genderEligibility: "Female",
    minEducation: "Any",
    area: "Any",
    state: "Any",
    targetGroups: ["Women", "Student", "Girl Child"],
    department: "Ministry of Women and Child Development",
    applicationLink: "https://wcd.nic.in/bbbp-scheme",
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana",
    description: "Savings scheme for girl children",
    benefits: "High interest rate savings account with tax benefits",
    minAge: 0,
    maxAge: 10,
    genderEligibility: "Female",
    minEducation: "Any",
    area: "Any",
    state: "Any",
    targetGroups: ["Women", "Student", "Girl Child"],
    department: "Ministry of Finance",
    applicationLink: "https://www.nsiindia.gov.in/",
  },
  {
    id: "pm-matru-vandana",
    name: "Pradhan Mantri Matru Vandana Yojana",
    description: "Maternity benefit scheme for pregnant and lactating mothers",
    benefits: "Cash incentive of ₹5,000 for first living child",
    minAge: 19,
    maxAge: 49,
    genderEligibility: "Female",
    minEducation: "Any",
    area: "Any",
    state: "Any",
    targetGroups: ["Women", "Pregnant Women"],
    department: "Ministry of Women and Child Development",
    applicationLink: "https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana",
  },
  {
    id: "e-skilling-women",
    name: "e-Skilling for Women",
    description: "Digital literacy and ICT skills for women",
    benefits: "Free digital skills training with certification",
    minAge: 18,
    maxAge: 60,
    genderEligibility: "Female",
    minEducation: "Class 10",
    area: "Any",
    state: "Any",
    targetGroups: ["Women", "Unemployed", "Digital Skills"],
    department: "Ministry of Electronics and Information Technology",
    applicationLink: "https://meity.gov.in/",
  },

  // Agriculture & Farmers - ANY GENDER
  {
    id: "pm-kisan",
    name: "PM-KISAN Samman Nidhi",
    description: "Direct income support to small and marginal farmers",
    benefits: "₹6,000 per year in three equal installments directly to bank accounts",
    minAge: 18,
    maxAge: 100,
    genderEligibility: "Any",
    minEducation: "Any",
    area: "Rural",
    state: "Any",
    targetGroups: ["Farmer", "Rural Worker"],
    department: "Ministry of Agriculture & Farmers Welfare",
    applicationLink: "https://pmkisan.gov.in/",
  },
  {
    id: "kisan-credit-card",
    name: "Kisan Credit Card",
    description: "Credit facility for farmers for agricultural needs",
    benefits: "Easy credit access for farming activities",
    minAge: 18,
    maxAge: 70,
    genderEligibility: "Any",
    minEducation: "Any",
    area: "Rural",
    state: "Any",
    targetGroups: ["Farmer", "Rural Worker"],
    department: "Ministry of Agriculture & Farmers Welfare",
    applicationLink: "https://pmkisan.gov.in/Rpt_BeneficiaryStatus_pub.aspx",
  },

  // Health - ANY GENDER
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat - PM-JAY",
    description: "Health insurance scheme for economically vulnerable families",
    benefits: "Health cover of ₹5 lakh per family per year for secondary and tertiary care",
    minAge: 0,
    maxAge: 100,
    genderEligibility: "Any",
    minEducation: "Any",
    area: "Any",
    state: "Any",
    targetGroups: ["Rural Worker", "Unemployed", "Senior Citizen", "BPL"],
    department: "Ministry of Health and Family Welfare",
    applicationLink: "https://pmjay.gov.in/",
  },

  // National Skill Development - ANY GENDER
  {
    id: "pmkvy-4",
    name: "PMKVY 4.0 - Pradhan Mantri Kaushal Vikas Yojana",
    description: "Skill development and vocational training program",
    benefits: "Free skill training with certification and job placement assistance",
    minAge: 15,
    maxAge: 59,
    genderEligibility: "Any",
    minEducation: "Class 8",
    area: "Any",
    state: "Any",
    targetGroups: ["Student", "Unemployed", "Rural Worker", "Youth"],
    department: "Ministry of Skill Development and Entrepreneurship",
    applicationLink: "https://pmkvyofficial.org",
  },
  {
    id: "ddu-gky",
    name: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana",
    description: "Rural skill development program with placement guarantee",
    benefits: "Free skill training with guaranteed job placement",
    minAge: 15,
    maxAge: 35,
    genderEligibility: "Any",
    minEducation: "Class 8",
    area: "Rural",
    state: "Any",
    targetGroups: ["Student", "Rural Worker", "Unemployed", "Youth"],
    department: "Ministry of Rural Development",
    applicationLink: "https://ddugky.gov.in/",
  },
  {
    id: "strive",
    name: "STRIVE - Skills Strengthening for Industrial Value Enhancement",
    description: "Industry-linked urban skilling program",
    benefits: "Industry-relevant skill training with job linkages",
    minAge: 18,
    maxAge: 45,
    genderEligibility: "Any",
    minEducation: "Class 8",
    area: "Urban",
    state: "Any",
    targetGroups: ["Student", "Unemployed", "Urban Worker"],
    department: "Ministry of Skill Development and Entrepreneurship",
    applicationLink: "https://strive.msde.gov.in/",
  },
  {
    id: "skill-india-digital",
    name: "Skill India Digital Platform",
    description: "Digital learning platform for skill development",
    benefits: "Free online courses with certification",
    minAge: 15,
    maxAge: 60,
    genderEligibility: "Any",
    minEducation: "Class 8",
    area: "Any",
    state: "Any",
    targetGroups: ["Student", "Unemployed", "Digital Skills", "Youth"],
    department: "Ministry of Skill Development and Entrepreneurship",
    applicationLink: "https://skillindiadigital.gov.in/",
  },
  {
    id: "nai-manzil",
    name: "Nai Manzil Scheme",
    description: "Education and skill development for minority communities",
    benefits: "Integrated education and skill training for minorities",
    minAge: 10,
    maxAge: 35,
    genderEligibility: "Any",
    minEducation: "Dropout",
    area: "Any",
    state: "Any",
    targetGroups: ["Minority", "Student", "Unemployed", "Dropout"],
    department: "Ministry of Minority Affairs",
    applicationLink: "https://minorityaffairs.gov.in/",
  },

  // State-wise Skill Development - ANY GENDER
  {
    id: "punjab-ghar-ghar-rozgar",
    name: "Punjab Ghar Ghar Rozgar Yojana",
    description: "Employment generation scheme for Punjab youth",
    benefits: "Job placement assistance and skill development",
    minAge: 18,
    maxAge: 35,
    genderEligibility: "Any",
    minEducation: "Class 10",
    area: "Any",
    state: "Punjab",
    targetGroups: ["Student", "Unemployed", "Youth"],
    department: "Government of Punjab",
    applicationLink: "https://pgrkam.com/",
  },
  {
    id: "gujarat-skill-development",
    name: "Gujarat Skill Development Initiative",
    description: "Vocational training and entrepreneurship development",
    benefits: "NSQF-aligned training with job linkages",
    minAge: 18,
    maxAge: 35,
    genderEligibility: "Any",
    minEducation: "Class 10",
    area: "Any",
    state: "Gujarat",
    targetGroups: ["Student", "Unemployed", "Entrepreneur"],
    department: "Government of Gujarat",
    applicationLink: "https://employment.gujarat.gov.in/",
  },
  {
    id: "up-skill-development",
    name: "Uttar Pradesh Skill Development Mission",
    description: "Comprehensive skill development program for UP",
    benefits: "NSQF courses with apprenticeships and job placements",
    minAge: 18,
    maxAge: 35,
    genderEligibility: "Any",
    minEducation: "Class 10",
    area: "Any",
    state: "Uttar Pradesh",
    targetGroups: ["Student", "Unemployed", "Youth"],
    department: "Government of Uttar Pradesh",
    applicationLink: "https://upsdm.gov.in/",
  },
  {
    id: "karnataka-yuva-nidhi",
    name: "Karnataka Yuva Nidhi (CMKKY)",
    description: "Skill development for Karnataka youth",
    benefits: "3,000+ NSQF-aligned courses with placement guarantee",
    minAge: 18,
    maxAge: 35,
    genderEligibility: "Any",
    minEducation: "Diploma",
    area: "Any",
    state: "Karnataka",
    targetGroups: ["Student", "Graduate", "Unemployed"],
    department: "Government of Karnataka",
    applicationLink: "https://sevasindhu.karnataka.gov.in/",
  },
  {
    id: "maharashtra-skill-development",
    name: "Maharashtra Skill Development Program",
    description: "Vocational training and entrepreneurship support",
    benefits: "Skill training with priority for women and BPL families",
    minAge: 18,
    maxAge: 35,
    genderEligibility: "Any",
    minEducation: "Class 10",
    area: "Any",
    state: "Maharashtra",
    targetGroups: ["Student", "Unemployed", "Entrepreneur"],
    department: "Government of Maharashtra",
    applicationLink: "https://msde.maharashtra.gov.in/",
  },
  {
    id: "himayat-jk",
    name: "Himayat Scheme (J&K)",
    description: "Skill training and job placement for J&K youth",
    benefits: "Skill training with guaranteed job placements",
    minAge: 18,
    maxAge: 35,
    genderEligibility: "Any",
    minEducation: "Class 10",
    area: "Any",
    state: "Jammu and Kashmir",
    targetGroups: ["Student", "Unemployed", "Rural Worker"],
    department: "Government of J&K",
    applicationLink: "https://himayat.org/",
  },
  {
    id: "tamil-nadu-skill-development",
    name: "Tamil Nadu Skill Development Corporation",
    description: "Vocational training and apprenticeship programs",
    benefits: "NSQF-aligned training with industry partnerships",
    minAge: 18,
    maxAge: 35,
    genderEligibility: "Any",
    minEducation: "Class 10",
    area: "Any",
    state: "Tamil Nadu",
    targetGroups: ["Student", "Unemployed", "Youth"],
    department: "Government of Tamil Nadu",
    applicationLink: "https://tnskill.tn.gov.in/",
  },
  {
    id: "bihar-kaushal-yuva",
    name: "Bihar Kaushal Yuva Program",
    description: "Skill and entrepreneurship training for Bihar youth",
    benefits: "Skill training with job placement assistance",
    minAge: 18,
    maxAge: 35,
    genderEligibility: "Any",
    minEducation: "Class 8",
    area: "Any",
    state: "Bihar",
    targetGroups: ["Student", "Unemployed", "Rural Worker"],
    department: "Government of Bihar",
    applicationLink: "https://skillmissionbihar.org/",
  },
  {
    id: "west-bengal-utkarsh",
    name: "West Bengal Utkarsh Bangla",
    description: "Skill development for marginal groups in West Bengal",
    benefits: "Focus on entrepreneurship and skill training",
    minAge: 18,
    maxAge: 35,
    genderEligibility: "Any",
    minEducation: "Class 8",
    area: "Any",
    state: "West Bengal",
    targetGroups: ["Student", "Unemployed", "Marginal Groups"],
    department: "Government of West Bengal",
    applicationLink: "https://pbssd.gov.in/",
  },

  // Employment & Rural Development - ANY GENDER
  {
    id: "mgnrega",
    name: "Mahatma Gandhi NREGA",
    description: "Rural employment guarantee scheme",
    benefits: "100 days of guaranteed wage employment per household per year",
    minAge: 18,
    maxAge: 65,
    genderEligibility: "Any",
    minEducation: "Any",
    area: "Rural",
    state: "Any",
    targetGroups: ["Rural Worker", "Unemployed"],
    department: "Ministry of Rural Development",
    applicationLink: "https://nrega.nic.in/",
  },

  // Entrepreneurship - ANY GENDER
  {
    id: "startup-india-seed-fund",
    name: "Startup India Seed Fund Scheme",
    description: "Funding support for startups and entrepreneurs",
    benefits: "Financial support for proof of concept and prototype development",
    minAge: 18,
    maxAge: 50,
    genderEligibility: "Any",
    minEducation: "Graduate",
    area: "Any",
    state: "Any",
    targetGroups: ["Entrepreneur", "Student", "Graduate"],
    department: "Department for Promotion of Industry and Internal Trade",
    applicationLink: "https://startupindia.gov.in/",
  },
  {
    id: "mudra-yojana",
    name: "Pradhan Mantri MUDRA Yojana",
    description: "Micro-finance scheme for small businesses",
    benefits: "Loans up to ₹10 lakh for micro and small enterprises",
    minAge: 18,
    maxAge: 65,
    genderEligibility: "Any",
    minEducation: "Class 10",
    area: "Any",
    state: "Any",
    targetGroups: ["Entrepreneur", "Small Business Owner"],
    department: "Ministry of Finance",
    applicationLink: "https://mudra.org.in/",
  },

  // Housing - ANY GENDER
  {
    id: "pm-awas-rural",
    name: "PM Awas Yojana - Gramin",
    description: "Housing scheme for rural areas",
    benefits: "Financial assistance for construction of pucca houses",
    minAge: 18,
    maxAge: 70,
    genderEligibility: "Any",
    minEducation: "Any",
    area: "Rural",
    state: "Any",
    targetGroups: ["Rural Worker", "Farmer", "BPL"],
    department: "Ministry of Rural Development",
    applicationLink: "https://pmayg.nic.in/",
  },
  {
    id: "pm-awas-urban",
    name: "PM Awas Yojana - Urban",
    description: "Housing scheme for urban areas",
    benefits: "Credit linked subsidy and affordable housing",
    minAge: 18,
    maxAge: 70,
    genderEligibility: "Any",
    minEducation: "Any",
    area: "Urban",
    state: "Any",
    targetGroups: ["Unemployed", "Small Business Owner", "Urban Worker"],
    department: "Ministry of Housing and Urban Affairs",
    applicationLink: "https://pmaymis.gov.in/",
  },

  // Social Security & Pension - ANY GENDER
  {
    id: "pension-scheme",
    name: "PM Shram Yogi Maan-dhan",
    description: "Pension scheme for unorganized workers",
    benefits: "Monthly pension of ₹3,000 after 60 years of age",
    minAge: 18,
    maxAge: 40,
    genderEligibility: "Any",
    minEducation: "Below Class 5",
    area: "Any",
    state: "Any",
    targetGroups: ["Rural Worker", "Unemployed", "Unorganized Worker"],
    department: "Ministry of Labour and Employment",
    applicationLink: "https://maandhan.in/",
  },
]

function calculateMatchScore(scheme: Omit<GovernmentScheme, "matchScore">, profile: UserProfile): number {
  let score = 0
  let maxScore = 0

  // Gender eligibility (CRITICAL - 25 points)
  maxScore += 25
  if (scheme.genderEligibility === "Any" || scheme.genderEligibility === profile.gender) {
    score += 25
  } else {
    // If gender doesn't match, return 0 to exclude this scheme completely
    return 0
  }

  // Age eligibility (20 points)
  maxScore += 20
  if (profile.age >= scheme.minAge && profile.age <= scheme.maxAge) {
    score += 20
  }

  // Area match (15 points)
  maxScore += 15
  if (scheme.area === "Any" || scheme.area === profile.area) {
    score += 15
  }

  // State match (10 points)
  maxScore += 10
  if (scheme.state === "Any" || scheme.state === profile.state) {
    score += 10
  }

  // Education eligibility (15 points)
  maxScore += 15
  if (scheme.minEducation === "Any" || isEducationEligible(profile.education, scheme.minEducation)) {
    score += 15
  }

  // Category/Target group match (15 points)
  maxScore += 15
  const categoryMatches = profile.categories.filter((cat) =>
    scheme.targetGroups.some(
      (target) => target.toLowerCase().includes(cat.toLowerCase()) || cat.toLowerCase().includes(target.toLowerCase()),
    ),
  ).length

  if (categoryMatches > 0) {
    score += Math.min(15, (categoryMatches / profile.categories.length) * 15)
  }

  return Math.round((score / maxScore) * 100)
}

function isEducationEligible(userEducation: string, requiredEducation: string): boolean {
  const educationHierarchy = [
    "Any",
    "Dropout",
    "Below Class 5",
    "Class 5",
    "Class 8",
    "Class 10",
    "Class 12",
    "Diploma",
    "Graduate",
    "Postgraduate",
    "Professional Degree",
  ]

  const userLevel = educationHierarchy.indexOf(userEducation)
  const requiredLevel = educationHierarchy.indexOf(requiredEducation)

  if (userLevel === -1 || requiredLevel === -1) return true // If not found, assume eligible
  return userLevel >= requiredLevel
}

export function getRecommendations(profile: UserProfile): GovernmentScheme[] {
  console.log("🔍 Getting recommendations for profile:", profile)

  const scoredSchemes = GOVERNMENT_SCHEMES.map((scheme) => ({
    ...scheme,
    matchScore: calculateMatchScore(scheme, profile),
  }))

  // Filter schemes with proper gender eligibility and at least 40% match
  const recommendations = scoredSchemes
    .filter((scheme) => {
      // Strict gender filtering
      const genderMatch = scheme.genderEligibility === "Any" || scheme.genderEligibility === profile.gender
      const scoreMatch = scheme.matchScore >= 40

      console.log(
        `📋 ${scheme.name}: Gender(${scheme.genderEligibility}) matches ${profile.gender}? ${genderMatch}, Score: ${scheme.matchScore}`,
      )

      return genderMatch && scoreMatch
    })
    .sort((a, b) => b.matchScore - a.matchScore)

  // For females aged 0-21, ensure Beti Bachao Beti Padhao is included
  if (profile.gender === "Female" && profile.age >= 0 && profile.age <= 21) {
    const betiBachaoExists = recommendations.some((s) => s.id === "beti-bachao")

    if (!betiBachaoExists) {
      const betiBachao = GOVERNMENT_SCHEMES.find((s) => s.id === "beti-bachao")
      if (betiBachao) {
        recommendations.unshift({
          ...betiBachao,
          matchScore: 100,
        })
        console.log("✅ Beti Bachao Beti Padhao force-added for eligible female")
      }
    }
  }

  // Return top 8 recommendations
  const finalRecommendations = recommendations.slice(0, 8)

  console.log(
    "🎯 Final recommendations:",
    finalRecommendations.map((r) => ({
      name: r.name,
      gender: r.genderEligibility,
      score: r.matchScore,
    })),
  )

  return finalRecommendations
}
