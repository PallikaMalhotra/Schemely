export interface UserProfile {
  age: number
  gender: string
  education: string
  area: string
  state: string
  tags: string[]
  categories: string[]
}

export interface SchemeRecommendation {
  id: string
  schemeName: string
  state: string
  applicationLink: string
}

export interface GovernmentScheme {
  id: string
  name: string
  description: string
  benefits: string
  minAge: number
  maxAge: number
  genderEligibility: "Male" | "Female" | "Any"
  minEducation: string
  area: "Rural" | "Urban" | "Any"
  state: string
  targetGroups: string[]
  department: string
  applicationLink: string
  matchScore: number
}

export interface TrackedApplication {
  id: string
  schemeName: string
  state: string
  applicationLink: string
  status: "applied" | "in-progress" | "approved" | "rejected" | "pending-documents"
  appliedDate: string
  lastUpdated: string
  applicationNumber?: string
  notes?: string
  documents?: string[]
  nextSteps?: string
}
