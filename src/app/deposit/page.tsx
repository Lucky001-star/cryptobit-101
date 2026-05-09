"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function Deposit() {
  const router = useRouter()

  const [amount, setAmount] = useState("")
  const [coin, setCoin] = useState("USDT (TRC20)")
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  alert("Address copied ✅")
}
  const handleDeposit = async () => {
  if (!amount) {
    alert("Enter amount")
    return
  }

  const { data: userData } = await supabase.auth.getUser()
  const user = userData.user

  console.log("USER:", user)

  if (!user) {
    alert("Not logged in")
    return
  }

  const { error } = await supabase.from("deposits").insert([
    {
      user_id: user?.id || "test-user", // TEMP FIX HERE
      amount: Number(amount),
      status: "pending",
    },
  ])

  if (error) {
    alert("Error: " + error.message)
    console.log("ERROR DETAILS:", error)
    return
  }

  alert("Deposit request submitted ✅")
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1437] to-[#050816] text-white p-4">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="text-sm text-gray-400">
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Deposit</h1>
        <div></div>
      </div>

      {/* CARD */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-xl">

        <h2 className="text-lg font-semibold mb-4">
          How much do you want to deposit?
        </h2>

        {/* AMOUNT INPUT */}
        <input
          type="number"
          placeholder="Enter amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-4 rounded-xl bg-black/40 border border-white/10 outline-none mb-4 text-lg"
        />

        {/* COIN SELECT */}
        <select
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          className="w-full p-4 rounded-xl bg-black/40 border border-white/10 outline-none mb-4"
        >
          <option>USDT (TRC20)</option>
          <option>BTC</option>
          <option>BNB (BEP20)</option>
        </select>

        {/* WALLET DISPLAY (STATIC FOR NOW) */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-sm mb-4">

  <p className="text-gray-400 mb-2">Deposit Address:</p>

  {coin === "USDT (TRC20)" && (
    <div className="flex justify-between items-center gap-3">
      <p className="break-all">
        TKLgyAoMd8vrPAQ2WvQrXwBrMdffowuwVy
      </p>

      <button
        onClick={() =>
          copyToClipboard("TKLgyAoMd8vrPAQ2WvQrXwBrMdffowuwVy")
        }
        className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20"
      >
        Copy
      </button>
    </div>
  )}

  {coin === "BTC" && (
    <div className="flex justify-between items-center gap-3">
      <p className="break-all">
        1Jbpjm6yc4E59TwCLEdanEo4uRwaEM4644
      </p>

      <button
        onClick={() =>
          copyToClipboard("1Jbpjm6yc4E59TwCLEdanEo4uRwaEM4644")
        }
        className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20"
      >
        Copy
      </button>
    </div>
  )}

  {coin === "BNB (BEP20)" && (
    <div className="flex justify-between items-center gap-3">
      <p className="break-all">
        0x10b7ba4158ba74780ca0ce92aa6758bdbedfc920
      </p>

      <button
        onClick={() =>
          copyToClipboard("0x10b7ba4158ba74780ca0ce92aa6758bdbedfc920")
        }
        className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20"
      >
        Copy
      </button>
    </div>
  )}

</div>

        {/* BUTTON */}
        <button
          onClick={handleDeposit}
          className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold"
        >
          Confirm Deposit
        </button>

      </div>
    </div>
  )
}