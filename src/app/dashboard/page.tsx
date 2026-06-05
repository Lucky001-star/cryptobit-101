"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import {
  Wallet,
  TrendingUp,
  ArrowDownCircle,
  ArrowUpCircle,
  BarChart3,
  User,
  Home,
  History,
} from "lucide-react"
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts"
export default function Dashboard() {
  const router = useRouter()
  const [name, setName] = useState("")
const [balance, setBalance] = useState(0)
const [investments, setInvestments] = useState<any[]>([])
const totalInvested = investments.reduce(
  (sum, inv) => sum + Number(inv.amount || 0),
  0
)

const totalProfit = investments.reduce(
  (sum, inv) =>
    sum +
    (Number(inv.expected_return || 0) -
      Number(inv.amount || 0)),
  0
)

const activeAssets = investments.length
const chartData = [
  { value: balance * 0.2 },
  { value: balance * 0.4 },
  { value: balance * 0.6 },
  { value: balance * 0.8 },
  { value: balance },
]
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
    { name: "Home", path: "/dashboard", icon: Home },
    { name: "Markets", path: "/markets", icon: BarChart3 },
    { name: "Invest", path: "/invest", icon: TrendingUp},
    { name: "History", path: "/history", icon: History },
    { name: "Profile", path: "/profile", icon: User},
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

    {/* PREMIUM HEADER */}
<div className="px-5 pt-6 flex justify-between items-center">

  <div>
    <p className="text-gray-400 text-sm">
      Welcome Back
    </p>

    <h1 className="text-2xl font-bold mt-1">
      {name} 👋
    </h1>
  </div>

  <div className="flex items-center gap-3">

    <button
      onClick={async () => {
        await supabase.auth.signOut()
        router.push("/login")
      }}
      className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl"
    >
      Logout
    </button>

    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center font-bold">
      CB
     </div>
    </div>
    </div>
  {/* PREMIUM WALLET CARD */}
<div className="mx-4 mt-6">

  <div className="rounded-3xl p-6 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-2xl">

    <p className="text-white/80 text-sm">
      Total Portfolio Balance
    </p>

    <h2 className="text-4xl font-bold mt-2">
      ${balance}
    </h2>

    <div className="flex justify-between mt-6">

      <div>
        <p className="text-white/70 text-xs">
          Active Investments
        </p>

        <h3 className="font-bold">
          {investments.length}
        </h3>
      </div>

      <div>
        <p className="text-white/70 text-xs">
          Status
        </p>

        <h3 className="font-bold text-green-200">
          Active
        </h3>
      </div>
      </div>
      </div>
      </div>
  
  {/* STATS GRID */}

<div className="grid grid-cols-3 gap-3 mx-4 mt-4">

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
    <p className="text-gray-400 text-xs">
      Invested
    </p>

    <h3 className="font-bold text-lg mt-1">
      ${totalInvested.toFixed(2)}
    </h3>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
    <p className="text-gray-400 text-xs">
      Profit
    </p>

    <h3 className="font-bold text-lg mt-1 text-green-400">
      ${totalProfit.toFixed(2)}
    </h3>
  </div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
    <p className="text-gray-400 text-xs">
      Assets
    </p>

    <h3 className="font-bold text-lg mt-1 text-blue-400">
      {activeAssets}
    </h3>
  </div>

</div>
{/* PORTFOLIO PERFORMANCE */}

<div className="mx-4 mt-6">

  <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

    <div className="flex justify-between items-center mb-4">

      <div>
        <h2 className="font-bold text-lg">
          Portfolio Performance
        </h2>

        <p className="text-gray-400 text-sm">
          Based on account balance
        </p>
      </div>

      <TrendingUp className="text-green-400" />
    </div>

    <div className="h-44">

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>

          <Line
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>

  </div>

</div>
      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 gap-4 mx-4 mt-6">
     <button
    onClick={() => router.push("/deposit")}
    className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5"
  >
    <ArrowDownCircle size={28} className="mx-auto mb-2 text-green-400" />

    <p>Deposit</p>
    </button>
    <button
    onClick={() => router.push("/withdraw")}
    className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5"
  >
    <ArrowUpCircle size={28} className="mx-auto mb-2 text-red-400" />

    <p>Withdraw</p>
  </button>
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