let cache: any = null
let lastFetch = 0

export async function GET() {
  try {
    const now = Date.now()

    // 🧠 cache for 20 seconds
    if (cache && now - lastFetch < 20000) {
      return Response.json(cache)
    }

    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana"
    )

    const data = await res.json()

    // safety check
    if (!Array.isArray(data)) {
      return Response.json([])
    }

    cache = data
    lastFetch = now

    return Response.json(data)
  } catch (err) {
    console.log("API error:", err)
    return Response.json([])
  }
}