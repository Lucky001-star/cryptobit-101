"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Markets() {
  const router = useRouter()
  const [coins, setCoins] = useState([])

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/prices")
const data = await res.json()

        const formatted = data.map((coin: any) => ({
          name: coin.name,
          pair: coin.symbol.toUpperCase() + "/USD",
          price: `$${coin.current_price.toLocaleString()}`,
          change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
          positive: coin.price_change_percentage_24h >= 0,
        }))

        setCoins(formatted)
      } catch (error) {
        console.error("Error fetching prices:", error)
      }
    }

    fetchPrices()

    // 🔁 auto refresh every 10 seconds
    const interval = setInterval(fetchPrices, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1437] to-[#050816] text-white p-4 pb-24">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="text-gray-400">
          ← Back
        </button>

        <h1 className="text-lg font-semibold">Markets</h1>

        <div></div>
      </div>

      {/* HERO */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-6 backdrop-blur-xl">
        <p className="text-gray-400 text-sm">
          Crypto Market Overview
        </p>

        <h2 className="text-3xl font-bold mt-2">
          Live Market Prices 📈
        </h2>
      </div>

      {/* MARKET CARDS */}
      <div className="space-y-4">

        {coins.map((coin: any, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl hover:bg-white/10 transition"
          >
            <div className="flex items-center justify-between">

              <div>
                <h2 className="font-semibold text-lg">
                  {coin.pair}
                </h2>

                <p className="text-gray-400 text-sm">
                  {coin.name}
                </p>
              </div>

              <div className="text-right">
                <h2 className="font-bold text-lg">
                  {coin.price}
                </h2>

                <p
                  className={`text-sm ${
                    coin.positive
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {coin.change}
                </p>
              </div>

            </div>

            {/* MINI CHART LOOK */}
            <div className="mt-4 h-14 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent flex items-center px-3">
              <div className="w-full h-[2px] bg-green-400 rounded-full"></div>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}