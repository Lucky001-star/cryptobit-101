"use client"

import { useRouter } from "next/navigation"

export default function InvestPage() {
  const router = useRouter()

  const plans = [
    {
      name: "Starter",
      level: "Beginner",
      price: "$100 - $1,000",
      roi: "5–8%",
      duration: 15,
      gradient: "from-green-500 to-emerald-700",
    },
    {
      name: "Professional ⭐",
      level: "Advanced",
      price: "$1,500 - $10,000",
      roi: "15–25%",
      duration: 25,
      gradient: "from-blue-500 to-indigo-700",
    },
    {
      name: "Enterprise",
      level: "Pro Level",
      price: "$11K - $20K",
      roi: "30–45%",
      duration: 30,
      gradient: "from-purple-500 to-pink-700",
    },
    {
      name: "Gold",
      level: "Elite",
      price: "$25K - $40K",
      roi: "30%",
      duration: 30,
      gradient: "from-yellow-400 to-orange-600",
    },
    {
      name: "Elon Musk 🚀",
      level: "Unlimited",
      price: "$45K+",
      roi: "30%",
      duration: 30,
      gradient: "from-cyan-400 to-blue-700",
    },
  ]

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">

      {/* BACK */}
      <button
        onClick={() => window.history.back()}
        className="text-gray-400 mb-4 hover:text-white transition"
      >
        ← Back
      </button>

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-2">
        Investment Plans
      </h1>

      <p className="text-gray-400 mb-6">
        Choose a plan and grow your capital.
      </p>

      {/* PLANS */}
      <div className="space-y-6">

        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-5 rounded-2xl bg-gradient-to-br ${plan.gradient} shadow-xl`}
          >

            {/* NAME */}
            <h2 className="text-xl font-bold">
              {plan.name}
            </h2>

            {/* LEVEL */}
            <p className="text-sm opacity-80">
              {plan.level}
            </p>

            {/* PRICE */}
            <p className="mt-3 text-lg font-semibold">
              {plan.price}
            </p>

            {/* ROI + DAYS */}
            <div className="flex items-center justify-between mt-2 text-sm">
              <span className="bg-black/30 px-3 py-1 rounded">
                ROI: {plan.roi}
              </span>

              <span className="bg-black/30 px-3 py-1 rounded">
                {plan.duration} Days
              </span>
            </div>

            {/* ✅ FIXED BUTTON */}
            <button
              onClick={() =>
                router.push(
                  `/invest/start?name=${encodeURIComponent(plan.name)}&roi=${encodeURIComponent(plan.roi)}&days=${plan.duration}`
                )
              }
              className="mt-5 w-full bg-black/40 py-2 rounded-lg hover:bg-black/60 transition"
            >
              Invest
            </button>

          </div>
        ))}

      </div>
    </div>
  )
}