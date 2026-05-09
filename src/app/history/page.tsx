"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchHistory = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) return

    // 🔥 GET DEPOSITS
    const { data: deposits, error: depError } = await supabase
      .from("deposits")
      .select("*")
      .eq("user_id", user.id)

    if (depError) {
      console.log("Deposit error:", depError)
    }

    // 🔥 GET WITHDRAWALS
    const { data: withdrawals, error: witError } = await supabase
      .from("withdrawals")
      .select("*")
      .eq("user_id", user.id)

    if (witError) {
      console.log("Withdraw error:", witError)
    }

    // 🔥 COMBINE BOTH
    const all = [
      ...(deposits || []).map((d) => ({ ...d, type: "deposit" })),
      ...(withdrawals || []).map((w) => ({ ...w, type: "withdrawal" })),
    ]

    // 🔥 SORT BY DATE (LATEST FIRST)
    all.sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )

    setTransactions(all)
    setLoading(false)
  }

  useEffect(() => {
    fetchHistory()

    // 🔥 REAL-TIME UPDATE (BOTH TABLES)
    const channel = supabase
      .channel("all-transactions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "deposits" },
        fetchHistory
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "withdrawals" },
        fetchHistory
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050816] text-white p-4">

      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-400 mb-4"
      >
        ← Back
      </button>

      <h1 className="text-xl font-bold mb-4">
        Transaction History
      </h1>

      {loading && (
        <p className="text-gray-400">Loading...</p>
      )}

      {!loading && transactions.length === 0 && (
        <p className="text-gray-400">No transactions yet</p>
      )}

      {transactions.map((item) => (
        <div
          key={item.id}
          className="p-4 mb-3 bg-white/5 rounded-xl border border-white/10"
        >
          {/* TYPE */}
          <p className="text-sm text-gray-400">
            {item.type === "deposit" ? "Deposit" : "Withdrawal"}
          </p>

          {/* AMOUNT */}
          <p className="text-lg font-semibold">
            ${item.amount}
          </p>

          {/* STATUS */}
          <p
            className={
              item.status === "approved" || item.status === "completed"
                ? "text-green-400"
                : "text-yellow-400"
            }
          >
            {item.status === "approved" || item.status === "completed"
              ? "Successful"
              : "Processing"}
          </p>
        </div>
      ))}
    </div>
  )
}