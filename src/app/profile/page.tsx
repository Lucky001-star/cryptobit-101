"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function Profile() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [balance, setBalance] = useState(0)

  useEffect(() => {
  const getUser = async () => {
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      router.push("/login")
    } else {
      setName(data.user.user_metadata?.name || "User")
      setEmail(data.user.email || "")

      // ✅ FETCH BALANCE HERE
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", data.user.id)
        .single()

      if (!error && profile) {
        setBalance(profile.balance || 0)
      }
    }
  }

  getUser()
}, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1437] to-[#050816] text-white p-4 pb-24">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="text-gray-400"
        >
          ← Back
        </button>

        <h1 className="text-lg font-semibold">
          Profile
        </h1>

        <div></div>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

        {/* AVATAR */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-blue-500/30">
            CB
          </div>
        </div>

        {/* INFO */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">
            {name}
          </h2>

          <p className="text-gray-400 mt-1">
            {email}
          </p>
        </div>

        {/* BALANCE */}
        <div className="mt-6 bg-black/30 rounded-2xl p-4 border border-white/10">
          <p className="text-gray-400 text-sm">
            Total Balance
          </p>

         <h2 className="text-3xl font-bold mt-2">
        ${balance}
        </h2>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 space-y-3">

          <button
            className="w-full py-3 rounded-xl bg-white/10"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl bg-red-500"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  )
} 
