import type { TrackedApplication } from "@/types/scheme"

const STORAGE_KEY = "tracked-applications"

export function getTrackedApplications(): TrackedApplication[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error loading tracked applications:", error)
    return []
  }
}

export function saveTrackedApplications(applications: TrackedApplication[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  } catch (error) {
    console.error("Error saving tracked applications:", error)
  }
}

export function addTrackedApplication(scheme: { schemeName: string; state: string; applicationLink: string }): void {
  const applications = getTrackedApplications()

  // Check if already tracked
  if (applications.some((app) => app.schemeName === scheme.schemeName)) {
    return
  }

  const newApplication: TrackedApplication = {
    id: Date.now().toString(),
    schemeName: scheme.schemeName,
    state: scheme.state,
    applicationLink: scheme.applicationLink,
    status: "applied",
    appliedDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  }

  applications.push(newApplication)
  saveTrackedApplications(applications)
}

export function updateTrackedApplication(id: string, updates: Partial<TrackedApplication>): void {
  const applications = getTrackedApplications()
  const index = applications.findIndex((app) => app.id === id)

  if (index !== -1) {
    applications[index] = {
      ...applications[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    }
    saveTrackedApplications(applications)
  }
}

export function removeTrackedApplication(id: string): void {
  const applications = getTrackedApplications()
  const filtered = applications.filter((app) => app.id !== id)
  saveTrackedApplications(filtered)
}

export function isSchemeTracked(schemeName: string): boolean {
  const applications = getTrackedApplications()
  return applications.some((app) => app.schemeName === schemeName)
}
