"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  const ADMIN_EMAIL = "Chukwuebukauzuegbu@gmail.com"

  const [isAdmin, setIsAdmin] = useState(false)
  const [inputEmail, setInputEmail] = useState("")
  const [deposits, setDeposits] = useState<any[]>([])
  const [withdrawals, setWithdrawals] = useState<any[]>([])

  // =========================
  // ADMIN LOGIN CHECK (LOCAL)
  // =========================
  useEffect(() => {
    const saved = localStorage.getItem("isAdmin")
    if (saved === "true") {
      setIsAdmin(true)
    }
  }, [])

  // =========================
  // FETCH DEPOSITS
  // =========================
  const fetchDeposits = async () => {
    const { data, error } = await supabase
      .from("deposits")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.log("Deposit fetch error:", error.message)
      return
    }

    setDeposits(data || [])
  }

  // =========================
  // FETCH WITHDRAWALS
  // =========================
  const fetchWithdrawals = async () => {
    const { data, error } = await supabase
      .from("withdrawals")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.log("Withdraw fetch error:", error.message)
      return
    }

    setWithdrawals(data || [])
  }

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    if (isAdmin) {
      fetchDeposits()
      fetchWithdrawals()
    }
  }, [isAdmin])

  // =========================
  // LOGIN FUNCTION
  // =========================
  const handleLogin = () => {
    if (inputEmail === ADMIN_EMAIL) {
      localStorage.setItem("isAdmin", "true")
      setIsAdmin(true)
      router.push("/admin")
    } else {
      alert("Wrong admin email ❌")
    }
  }

  // =========================
  // APPROVE DEPOSIT
  // =========================
  const approveDeposit = async (deposit: any) => {
    try {
      await supabase
        .from("deposits")
        .update({ status: "approved" })
        .eq("id", deposit.id)

      const { data: profile } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", deposit.user_id)
        .maybeSingle()

      const newBalance =
        Number(profile?.balance || 0) + Number(deposit.amount)

      await supabase
        .from("profiles")
        .update({ balance: newBalance })
        .eq("id", deposit.user_id)

      alert("Deposit Approved ✅")
      fetchDeposits()
    } catch (err: any) {
      alert(err.message)
    }
  }

  // =========================
  // APPROVE WITHDRAWAL
  // =========================
  const handleLogout = async () => {
  localStorage.removeItem("isAdmin")
  await supabase.auth.signOut()
  setIsAdmin(false)
  router.push("/admin")
}
  const approveWithdrawal = async (withdrawal: any) => {
    try {
      await supabase
        .from("withdrawals")
        .update({ status: "completed" })
        .eq("id", withdrawal.id)

      const { data: profile } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", withdrawal.user_id)
        .maybeSingle()

      const newBalance =
        Number(profile?.balance || 0) - Number(withdrawal.amount)

      await supabase
        .from("profiles")
        .update({ balance: newBalance })
        .eq("id", withdrawal.user_id)

      alert("Withdrawal Approved ✅")
      fetchWithdrawals()
    } catch (err: any) {
      alert(err.message)
    }
  }

  // =========================
  // LOGIN SCREEN
  // =========================
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-4">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full max-w-sm">

          <h2 className="text-xl font-bold mb-4">
            Admin Login
          </h2>

          <input
            type="email"
            placeholder="Enter admin email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            className="w-full p-3 rounded bg-black/40 border border-white/10 mb-4"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 py-2 rounded"
          >
            Login
          </button>

        </div>
      </div>
    )
  }

  // =========================
  // ADMIN DASHBOARD
  // =========================
  return (
  <div className="min-h-screen bg-[#050816] text-white p-4">

    {/* HEADER */}
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-xl font-bold">
        Admin Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 px-3 py-1 rounded text-white"
      >
        Logout
      </button>
    </div>

    {/* DEPOSITS */}
    <h2 className="text-lg font-bold mb-2">Deposits</h2>

    {deposits.map((d) => (
      <div key={d.id} className="p-4 mb-3 bg-white/5 rounded-xl border border-white/10">
        <p>User: {d.user_id}</p>
        <p>Amount: ${d.amount}</p>
        <p>Status: {d.status}</p>

        {d.status === "pending" && (
          <button
            onClick={() => approveDeposit(d)}
            className="mt-2 bg-green-500 px-3 py-1 rounded"
          >
            Approve Deposit
          </button>
        )}
      </div>
    ))}

    {/* WITHDRAWALS */}
    <h2 className="text-lg font-bold mt-6 mb-2">
      Withdrawals
    </h2>

    {withdrawals.map((w) => (
      <div key={w.id} className="p-4 mb-3 bg-white/5 rounded-xl border border-white/10">
        <p>User: {w.user_id}</p>
        <p>Amount: ${w.amount}</p>
        <p>Status: {w.status}</p>

        {w.status === "pending" && (
          <button
            onClick={() => approveWithdrawal(w)}
            className="mt-2 bg-red-500 px-3 py-1 rounded"
          >
            Approve Withdrawal
          </button>
        )}
      </div>
    ))}

  </div>
)
}