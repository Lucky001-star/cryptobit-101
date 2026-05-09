"use client"
export const dynamic = "force-dynamic"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function InvestStartPage() {
  const router = useRouter()
const searchParams = useSearchParams()

const [planName, setPlanName] = useState("")
const [roi, setRoi] = useState("")
const [days, setDays] = useState("")
useEffect(() => {
  setPlanName(searchParams.get("name") || "")
  setRoi(searchParams.get("roi") || "")
  setDays(searchParams.get("days") || "")
}, [searchParams])
  
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInvest = async () => {
    setLoading(true)

    try {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user

      if (!user) {
        alert("Please login first")
        router.push("/login")
        return
      }

      const investAmount = Number(amount)

      if (!investAmount || investAmount <= 0) {
        alert("Enter valid amount")
        return
      }

      // GET USER BALANCE
      const { data: profile } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", user.id)
        .single()

      const balance = Number(profile?.balance || 0)

      if (balance < investAmount) {
        alert("Insufficient funds ❌")
        return
      }

      // ROI CALC
      const roiNumber =
        Number(
          roi?.replace("%", "").split("–")[1] ||
          roi?.replace("%", "") ||
          10
        )

      const expectedReturn =
        investAmount + (investAmount * roiNumber) / 100

      // ✅ ONLY ONE DATE SYSTEM (FIXED)
      const startDate = new Date()

      const endDate = new Date(
        Date.now() + Number(days || 15) * 24 * 60 * 60 * 1000
      )

      // DEDUCT BALANCE
      await supabase
        .from("profiles")
        .update({
          balance: balance - investAmount
        })
        .eq("id", user.id)

      // SAVE INVESTMENT
      const { error } = await supabase.from("investments").insert([
  {
    user_id: user.id,
    plan_name: planName,
    amount: investAmount,
    roi_percent: roiNumber,
    duration_days: Number(days),
    expected_return: expectedReturn,
    status: "active",
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
  },
])
      if (error) {
        console.log(error)
        alert("Failed to create investment")
        return
      }

      alert("Investment successful 🚀")
      router.push("/dashboard")

    } catch (err) {
      console.log(err)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6">

      <button
        onClick={() => router.back()}
        className="text-gray-400 mb-4 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">
        Start Investment
      </h1>

      <p className="text-gray-400 mb-6">
        Plan: <span className="text-white">{planName}</span> | ROI: {roi} | Duration: {days} days
      </p>

      <div className="bg-white/5 p-4 rounded-xl border border-white/10">

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-3 rounded bg-black/40 border border-white/10"
        />

        <button
          onClick={handleInvest}
          disabled={loading}
          className="w-full mt-4 bg-blue-500 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm Investment"}
        </button>

      </div>
    </div>
  )
}