"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function Withdraw() {
  const router = useRouter()

  // ✅ STEP 1 — STATES
  const [amount, setAmount] = useState("")
  const [address, setAddress] = useState("")
  const [network, setNetwork] = useState("USDT (TRC20)")

  // ✅ STEP 2 — HANDLE WITHDRAW
  const handleWithdraw = async () => {
    if (!amount || !address) {
      alert("Enter amount and address")
      return
    }

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) {
      alert("Not logged in")
      return
    }

    // 🔥 INSERT WITH ADDRESS (FIXED)
    const { error } = await supabase.from("withdrawals").insert([
      {
        user_id: user.id,
        amount: Number(amount),
        address: address,
        network: network, // ✅ ADD THIS LINE
        status: "pending",
      },
    ])

    if (error) {
      alert("Withdraw failed: " + error.message)
      console.log(error)
      return
    }

    alert("Withdrawal request submitted ✅")
    setAmount("")
    setAddress("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1437] to-[#050816] text-white p-4">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="text-gray-400">
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Withdraw</h1>
        <div></div>
      </div>

      {/* CARD */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

        <h2 className="text-lg font-semibold mb-4">
          Withdraw Funds
        </h2>

        {/* AMOUNT INPUT */}
       <input
       type="number"
       placeholder="Enter amount (USD)"
       value={amount}
       onChange={(e) => setAmount(e.target.value)}
      className="w-full p-4 rounded-xl bg-black/40 border border-white/10 outline-none mb-4"
        />
        {/* 🔥 ADD THIS HERE (NETWORK SELECT) */}
        <select
        value={network}
        onChange={(e) => setNetwork(e.target.value)}
        className="w-full p-4 rounded-xl bg-black/40 border border-white/10 outline-none mb-4"
>
  <option>USDT (TRC20)</option>
  <option>BTC</option>
  <option>BNB (BEP20)</option>
</select>

        {/* 🔥 ADDRESS INPUT (THIS WAS MISSING) */}
      <input
  type="text"
  placeholder={`Enter ${network} wallet address`}
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  className="w-full p-4 rounded-xl bg-black/40 border border-white/10 outline-none mb-4"
        />

        {/* BUTTON */}
        <button
          onClick={handleWithdraw}
          className="w-full py-3 bg-red-500 hover:bg-red-600 rounded-xl font-semibold"
        >
          Request Withdrawal
        </button>

      </div>
    </div>
  )
}