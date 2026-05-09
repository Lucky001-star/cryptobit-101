"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Login failed: " + error.message)
      return
    }

    alert("Login successful 🚀")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#0b1437] to-[#050816] text-white">

      {/* CARD */}
      <div className="w-[350px] bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/30">
            CB
          </div>

          <h1 className="text-xl font-bold mt-3">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Login to CryptoBit</p>
        </div>

        {/* INPUTS */}
        <input
          placeholder="Email"
          className="w-full p-3 mb-3 rounded-lg bg-black/40 border border-white/10 text-white outline-none focus:border-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-white/10 text-white outline-none focus:border-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition"
        >
          Login
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Secure login powered by CryptoBit
        </p>
      </div>
    </div>
  )
}