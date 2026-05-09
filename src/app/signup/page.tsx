"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function Signup() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSignup = async () => {
    console.log("Button clicked")

    if (!name || !email || !password) {
      alert("Please fill all fields")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name, // 👈 saves name for dashboard
        },
      },
    })

    if (error) {
      alert(error.message)
      return
    }

    alert("Signup successful 🚀")

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#0b1437] to-[#050816] text-white">

      <div className="w-[350px] bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">

        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/30">
            CB
          </div>
          <h1 className="text-xl font-bold mt-3">Create Account</h1>
          <p className="text-gray-400 text-sm">Join CryptoBit today</p>
        </div>

        <input
          placeholder="Name"
          className="w-full p-3 mb-3 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full p-3 mb-3 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full p-3 mb-3 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          placeholder="Confirm Password"
          type="password"
          className="w-full p-3 mb-4 rounded-lg bg-black/40 border border-white/10 text-white outline-none"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition"
        >
          Create Account
        </button>

      </div>
    </div>
  )
}