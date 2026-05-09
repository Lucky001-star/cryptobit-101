"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {
  const router = useRouter()
  const [name, setName] = useState("")
const [balance, setBalance] = useState(0)
const [investments, setInvestments] = useState<any[]>([])
const checkUser = async () => {
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    router.push("/login")
  } else {
    const userName = data.user.user_metadata?.name || "User"
    setName(userName)
  }
}
const getTimeLeft = (endDate: string) => {
  const total = Date.parse(endDate) - Date.now()

  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((total / 1000 / 60) % 60)

  return `${days}d ${hours}h ${minutes}m`
}
const calculateProgress = (start: string, end: string) => {
  const total = Date.parse(end) - Date.parse(start)
  const elapsed = Date.now() - Date.parse(start)

  const progress = (elapsed / total) * 100
  return Math.min(Math.max(progress, 0), 100)
}
useEffect(() => {
  const fetchBalance = async () => {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) return

    const { data, error } = await supabase
      .from("profiles")
      .select("balance")
      .eq("id", userData.user.id)
      .single()

    if (error) {
      console.log(error)
      return
    }

    setBalance(data.balance || 0)
  }

  fetchBalance()
}, [])
const fetchInvestments = async () => {
  const { data: userData } = await supabase.auth.getUser()
  const user = userData.user

  if (!user) return

  const { data } = await supabase
    .from("investments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  setInvestments(data || [])
}
useEffect(() => {
  const handleFocus = () => {
    fetchInvestments()
  }

  window.addEventListener("focus", handleFocus)

  return () => window.removeEventListener("focus", handleFocus)
}, [])
  const navItems = [
    { name: "Home", path: "/dashboard" },
    { name: "Markets", path: "/markets" },
    { name: "Invest", path: "/invest" },
    { name: "History", path: "/history" },
    { name: "Profile", path: "/profile" },
  ]

  useEffect(() => {
  const init = async () => {
    await checkUser()
    await fetchInvestments()
  }

  init()
}, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1437] to-[#050816] text-white pb-20">

      {/* HEADER */}
      <div className="flex justify-between items-center p-4">
        <div>
          <p className="text-gray-400 text-sm">Welcome back 👋</p>
          <h1 className="text-xl font-bold">Hello {name}</h1>
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={async () => {
              await supabase.auth.signOut()
              router.push("/login")
            }}
            className="text-sm bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
            CB
          </div>

        </div>
      </div>

      {/* BALANCE CARD */}
      <div className="mx-4 mt-4 p-5 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
        <p className="text-gray-400 text-sm">Total Balance</p>
        <h2 className="text-2xl font-bold mt-1">
  ${balance}
</h2>
        <p className="text-green-400 text-sm mt-1">+0.00% ROI</p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 gap-4 mx-4 mt-6">
        {["Deposit", "Withdraw"].map((item) => (
          <div
            key={item}
            onClick={() => {
              if (item === "Deposit") router.push("/deposit")
              if (item === "Withdraw") router.push("/withdraw")
            }}
            className="p-4 rounded-xl bg-white/5 border border-white/10 text-center cursor-pointer hover:bg-white/10 transition"
          >
            {item}
          </div>
        ))}
      </div>

      {/* INVESTMENTS */}
<div className="mx-4 mt-6">
  <h2 className="text-lg font-semibold mb-3">My Investments</h2>

  {investments.length === 0 && (
    <p className="text-gray-400">No active investments</p>
  )}

  {investments.map((inv) => (
    <div
      key={inv.id}
      className="p-4 mb-3 bg-white/5 rounded-xl border border-white/10"
    >
      <p><b>Plan:</b> {inv.plan_name}</p>
      <p><b>Amount:</b> ${inv.amount}</p>
      <p><b>ROI:</b> {inv.roi_percent}%</p>
      <p><b>Expected:</b> ${inv.expected_return}</p>

      <p className="text-blue-400 mt-2">
        Duration: {inv.duration_days} days
      </p>

      <p className="text-green-400 text-sm mt-1">
        {new Date(inv.created_at).toLocaleString()}
      </p>

      {/* ⏳ COUNTDOWN */}
      <p className="text-yellow-400 mt-1">
        ⏳ Time Left: {getTimeLeft(inv.end_date)}
      </p>

      {/* 📊 ROI BAR */}
      <div className="w-full bg-gray-700 h-2 rounded mt-2">
        <div
          className="bg-green-500 h-2 rounded"
          style={{
            width: `${calculateProgress(inv.start_date, inv.end_date)}%`,
          }}
        />
      </div>
    </div>
  ))}
</div>

      {/* BOTTOM NAV */}
<div className="fixed bottom-0 left-0 right-0 bg-[#0b1437] border-t border-white/10 flex justify-around py-3 text-sm">

  {navItems.map((item) => (
    <button
      key={item.name}
      onClick={() => router.push(item.path)}
      className="hover:text-blue-400 transition"
    >
      {item.name}
    </button>
  ))}

</div>
</div>
)
}