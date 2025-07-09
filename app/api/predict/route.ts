import { NextResponse, type NextRequest } from "next/server"

const REMOTE_URL = "https://govt-scheme-api-c8a1.onrender.com/predict"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    console.log("Forwarding request to:", REMOTE_URL)
    console.log("Request body:", body)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    const response = await fetch(REMOTE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Government-Scheme-Finder/1.0",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    console.log("API Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error Response:", errorText)
      return NextResponse.json({ error: `API returned ${response.status}: ${errorText}` }, { status: response.status })
    }

    const data = await response.json()
    console.log("API Response data:", data)

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (err: any) {
    console.error("Proxy error:", err)

    if (err.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout - the API took too long to respond" }, { status: 408 })
    }

    return NextResponse.json({ error: "Failed to connect to the recommendation service" }, { status: 502 })
  }
}
