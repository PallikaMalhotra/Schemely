import { type NextRequest, NextResponse } from "next/server"
import type { UserProfile } from "@/types/scheme"

const REMOTE_URL = "https://govt-scheme-api-c8a1.onrender.com/predict"

export async function POST(request: NextRequest) {
  try {
    const profile: UserProfile = await request.json()

    if (
      !profile.age ||
      !profile.gender ||
      !profile.education ||
      !profile.area ||
      !profile.state ||
      !profile.categories?.length
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await new Promise((res) => setTimeout(res, 1000)) // simulate delay

    const response = await fetch(REMOTE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Scheme-Finder-Frontend",
      },
      body: JSON.stringify({
        age: profile.age,
        gender: profile.gender,
        education: profile.education,
        area: profile.area,
        state: profile.state,
        tags: profile.categories, // this must match what backend expects
      }),
    })

    if (!response.ok) {
      console.error("❌ Render API call failed:", response.statusText)
      return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 502 })
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      recommendations: data.recommendations || [],
      total: data.recommendations?.length || 0,
      profile,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
