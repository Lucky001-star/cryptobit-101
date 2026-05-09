"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Zap, BarChart3, UserPlus, Wallet, Star, TrendingUp, ArrowDownCircle, Crown, Rocket } from "lucide-react"

export default function Home() {
const router = useRouter()
 const coins = [
  {
    id: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    current_price: 68432,
    price_change_percentage_24h: 2.45,
    total_volume: 2847392834,
    market_cap: 1348293847234,
  },
  {
    id: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    current_price: 3124,
    price_change_percentage_24h: -1.32,
    total_volume: 1839201923,
    market_cap: 834829384723,
  },
  {
    id: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    current_price: 142,
    price_change_percentage_24h: 4.12,
    total_volume: 928392834,
    market_cap: 23829384723,
  },
  {
    id: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
    current_price: 0.58,
    price_change_percentage_24h: 1.05,
    total_volume: 38293823,
    market_cap: 1829384723,
  }
]
  return (
    <main className="min-h-screen bg-[#050816] text-white">

      {/* NAVBAR */}
      <header className="flex justify-between items-center px-8 py-5 border-b border-white/10">
        <h1 className="text-2xl font-bold text-blue-400">CryptoBit 🚀</h1>

       <nav className="hidden md:flex gap-6 text-sm text-gray-300">
  <a href="#features" className="hover:text-white">Features</a>
  <a href="#market" className="hover:text-white">Market</a>
  <a href="#how-it-works" className="hover:text-white">How it Works</a>
  <a href="#plans" className="hover:text-white">Plans</a>
</nav>

        <div className="flex gap-3">
 <Link href="/login">
  <button className="px-4 py-2 bg-white text-black rounded-lg">
    Login
  </button>
</Link>

  <Link href="/signup">
  <button className="px-4 py-2 bg-blue-500 rounded-lg">
    Get Started
  </button>
</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center gap-10 mt-20 px-4 md:px-10">
        <div>
          <p className="text-blue-400 text-sm tracking-widest">
            LIVE TRADING • 24/7 MARKETS
          </p>

          <h1 className="text-5xl font-bold mt-4 leading-tight">
            Invest in Crypto <br /> with Confidence
          </h1>

          <p className="text-gray-400 mt-4">
            Experience the future of digital asset investment. Secure, fast,
            and intelligent trading powered by cutting-edge technology.
          </p>

          <div className="flex gap-4 mt-6">
            <Link href="/signup">
    <button className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600">
      Get Started Free
    </button>
  </Link>

  <button className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10">
    Watch Demo
  </button>

</div>
        </div>

        {/* GRAPH */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
          <p className="text-gray-400 text-sm mb-4">Market Growth</p>

          <svg viewBox="0 0 300 120" className="w-full h-40">
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              points="0,100 30,90 60,95 90,60 120,70 150,40 180,60 210,30 240,50 270,20 300,40"
            />
          </svg>

          <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
            <div>
              <p className="text-gray-400">Total Value Locked</p>
              <h3 className="font-bold text-lg">$2.4B+</h3>
              <span className="text-green-400 text-xs">+12.5%</span>
            </div>

            <div>
              <p className="text-gray-400">Active Users</p>
              <h3 className="font-bold text-lg">500K+</h3>
            </div>

            <div>
              <p className="text-gray-400">Countries</p>
              <h3 className="font-bold text-lg">150+</h3>
            </div>

            <div>
              <p className="text-gray-400">Uptime</p>
              <h3 className="font-bold text-lg">99.9%</h3>
            </div>
          </div>
        </div>
      </section>

    {/* LIVE MARKET DATA */}
<section id="market" className="mt-24 px-4 md:px-10">
  <h2 className="text-3xl font-bold text-center">
    Live Market Data
  </h2>
  <p className="text-center text-gray-400 mt-2">
    Real-time cryptocurrency prices and market data.
  </p>
  <div className="mt-10">

    {/* DESKTOP TABLE */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left border border-white/10 rounded-xl overflow-hidden">
        <thead className="bg-white/5 text-gray-300 text-sm">
          <tr>
            <th className="p-3">Asset</th>
            <th>Price</th>
            <th>24h</th>
            <th>Volume</th>
            <th>Market Cap</th>
          </tr>
        </thead>

        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} className="border-t border-white/10">
              <td className="p-3 flex items-center gap-2">
                <img
  src={coin.image}
  alt={coin.name}
  className="w-6 h-6 rounded-full bg-white p-[2px]"
/>
                {coin.name}
              </td>

              <td>${coin.current_price}</td>

              <td className={coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>

              <td>${coin.total_volume}</td>

              <td>${coin.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* 📱 MOBILE VIEW */}
    <div className="grid gap-4 md:hidden">
      {coins.map((coin) => (
        <div key={coin.id} className="bg-white/5 border border-white/10 p-4 rounded-xl">

          <div className="flex items-center gap-2 mb-2">
            <img
  src={coin.image}
  alt={coin.name}
  className="w-6 h-6 rounded-full bg-white p-[2px]"
/>
            <h3 className="font-bold">{coin.name}</h3>
          </div>

          <p className="text-sm text-gray-400">
            Price: <span className="text-white">${coin.current_price}</span>
          </p>

          <p className={`text-sm ${coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}>
            24h: {coin.price_change_percentage_24h?.toFixed(2)}%
          </p>

          <p className="text-sm text-gray-400">
            Volume: ${coin.total_volume}
          </p>

          <p className="text-sm text-gray-400">
            Market Cap: ${coin.market_cap}
          </p>

        </div>
      ))}
    </div>
  </div>
</section>

      {/* WHY CHOOSE US */}
      <section id="features" className="mt-24 px-4 md:px-10">
        <h2 className="text-3xl font-bold text-center mb-2">
          Why Choose Us
        </h2>

        <p className="text-center text-gray-400 mb-10">
          Built for performance, security, and modern investors
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <Shield className="w-10 h-10 text-blue-400 mb-3" />
            <h3 className="font-bold">Secure Wallet</h3>
            <p className="text-gray-400 text-sm mt-2">
              Military-grade encryption protects your assets.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <Zap className="w-10 h-10 text-yellow-400 mb-3" />
            <h3 className="font-bold">Fast Execution</h3>
            <p className="text-gray-400 text-sm mt-2">
              Near-instant trade execution.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <BarChart3 className="w-10 h-10 text-green-400 mb-3" />
            <h3 className="font-bold">Real-Time Data</h3>
            <p className="text-gray-400 text-sm mt-2">
              Live crypto analytics and insights.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
<section id="how-it-works" className="mt-24 px-4 md:px-10">
        <h2 className="text-3xl font-bold text-center">
          How It Works
        </h2>

        <p className="text-center text-gray-400 mt-2 mb-10">
          Get started in minutes. Our streamlined process makes crypto investing accessible to everyone.
        </p>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            ["Step 01", "Create Account", UserPlus],
            ["Step 02", "Deposit Funds", Wallet],
            ["Step 03", "Start Investing", TrendingUp],
            ["Step 04", "Withdraw Profits", ArrowDownCircle],
          ].map(([step, title, Icon]: any, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 transition">
              <Icon className="mx-auto mb-3 text-blue-400" size={28} />
              <p className="text-blue-400 text-sm">{step}</p>
              <h3 className="font-bold mt-2">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PLANS */}
      {/* PLANS */}
<section id="plans" className="mt-24 px-4 md:px-10">
  <h2 className="text-3xl font-bold text-center">
    Choose Your Path
  </h2>

  <p className="text-center text-gray-400 mt-2">
    Flexible plans designed for every investor.
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">

    {/* STARTER */}
    <div className="group bg-gradient-to-b from-white/5 to-white/0 border border-white/10 p-6 rounded-2xl hover:scale-105 transition duration-300 hover:border-blue-500/50">
      <h3 className="text-xl font-bold">Starter</h3>
      <p className="text-gray-400 text-sm mt-1">Perfect for beginners</p>

      <p className="text-2xl text-blue-400 font-bold mt-4">$100 - $1,000</p>

      <ul className="mt-4 space-y-2 text-sm text-gray-300">
        <li>ROI: 5–8%</li>
        <li>50+ cryptocurrencies</li>
        <li>Basic analytics</li>
        <li>Email support</li>
      </ul>

      <button
  onClick={() => router.push("/signup")}
  className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600"
>
  Get Started 
</button>
    </div>

    {/* PROFESSIONAL */}
    <div className="group relative bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-400 p-6 rounded-2xl scale-105 shadow-lg shadow-blue-500/20">
      
      <span className="absolute top-3 right-3 text-xs bg-blue-500 px-2 py-1 rounded-full">
        Most Popular
      </span>

      <h3 className="text-xl font-bold">Professional ⭐</h3>
      <p className="text-gray-300 text-sm mt-1">Serious investors</p>

      <p className="text-2xl text-blue-400 font-bold mt-4">$1,500 - $10,000</p>

      <ul className="mt-4 space-y-2 text-sm text-gray-200">
        <li>ROI: 15–25%</li>
        <li>200+ cryptocurrencies</li>
        <li>AI insights</li>
        <li>24/7 priority support</li>
      </ul>

      <button
  onClick={() => router.push("/signup")}
  className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600"
>
  Get Started 
</button>
    </div>

    {/* ENTERPRISE */}
    <div className="group bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-400/30 p-6 rounded-2xl hover:scale-105 transition">
      <h3 className="text-xl font-bold">Enterprise</h3>
      <p className="text-gray-400 text-sm mt-1">Advanced investors</p>

      <p className="text-2xl text-purple-400 font-bold mt-4">$11K - $20K</p>

      <ul className="mt-4 space-y-2 text-sm text-gray-300">
        <li>ROI: 30–45%</li>
        <li>Custom strategies</li>
        <li>Dedicated manager</li>
        <li>Advanced security</li>
      </ul>

      <button
  onClick={() => router.push("/signup")}
  className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600"
>
  Get Started
</button>
    </div>

    {/* GOLD */}
    <div className="group bg-gradient-to-b from-yellow-400/10 to-transparent border border-yellow-400/30 p-6 rounded-2xl hover:scale-105 transition">
      <h3 className="text-xl font-bold text-yellow-300">Gold</h3>
      <p className="text-gray-400 text-sm mt-1">Elite investors</p>

      <p className="text-2xl text-yellow-400 font-bold mt-4">$25K - $40K</p>

      <ul className="mt-4 space-y-2 text-sm text-gray-300">
        <li>VIP trading tools</li>
        <li>Premium analytics</li>
        <li>Faster withdrawals</li>
        <li>Exclusive deals</li>
      </ul>

      <button
  onClick={() => router.push("/signup")}
  className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600"
>
  Get Started
</button>
    </div>

    {/* ELON */}
    <div className="group bg-gradient-to-b from-pink-500/10 to-transparent border border-pink-400/30 p-6 rounded-2xl hover:scale-105 transition">
      <h3 className="text-xl font-bold text-pink-400">Elon Musk 🚀</h3>
      <p className="text-gray-400 text-sm mt-1">Unlimited power</p>

      <p className="text-2xl text-pink-400 font-bold mt-4">$45K+</p>

      <ul className="mt-4 space-y-2 text-sm text-gray-300">
        <li>Unlimited investments</li>
        <li>Private trading desk</li>
        <li>Direct expert access</li>
        <li>Institutional-grade tools</li>
      </ul>

      <button className="mt-6 w-full py-2 bg-pink-500 rounded-lg hover:bg-pink-600">
        Go Elite
      </button>
    </div>

  </div>
</section>
  {/* ✅ NEW: SECURITY NOTE */}
<section className="mt-16 px-4 md:px-10 text-center">
  <p className="text-gray-400 text-sm">
    All plans include SSL encryption, 2FA security, and regulatory compliance.
    <span className="text-blue-400 cursor-pointer ml-2 hover:underline">
      Learn more about our security
    </span>
  </p>
</section>

{/* ✅ NEW: TESTIMONIALS */}
<section className="mt-24 px-4 md:px-10">

  <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
    <Star className="text-yellow-400 w-6 h-6" />
    Trusted by 500K+ Users
  </h2>

  <p className="text-center text-gray-400 mt-2 mb-10">
    What Our Users Say
  </p>

  <div className="grid md:grid-cols-2 gap-6">

    {/* CARD 1 */}
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:scale-[1.02] transition">

      {/* ⭐⭐⭐⭐⭐ */}
      <div className="flex gap-1 mb-4 justify-center md:justify-start">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      <p className="text-gray-300 italic">
        “Cryptobit transformed my trading experience. The real-time analytics
        and lightning-fast execution have helped me maximize returns consistently.”
      </p>

      <div className="flex items-center gap-3 mt-6">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
          AC
        </div>
        <div>
          <h4 className="font-bold">Alex Chen</h4>
          <p className="text-gray-400 text-sm">Crypto Trader</p>
        </div>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:scale-[1.02] transition">

      {/* ⭐⭐⭐⭐⭐ */}
      <div className="flex gap-1 mb-4 justify-center md:justify-start">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      <p className="text-gray-300 italic">
        “The institutional-grade security gives me peace of mind. I’ve been managing
        over $2M in assets through Cryptobit for the past year with zero issues.”
      </p>

      <div className="flex items-center gap-3 mt-6">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold">
          SM
        </div>
        <div>
          <h4 className="font-bold">Sarah Mitchell</h4>
          <p className="text-gray-400 text-sm">Portfolio Manager</p>
        </div>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:scale-[1.02] transition">

      {/* ⭐⭐⭐⭐⭐ */}
      <div className="flex gap-1 mb-4 justify-center md:justify-start">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      <p className="text-gray-300 italic">
        “Finally, a crypto platform that feels premium. The UI is beautiful,
        support is exceptional, and the auto-invest feature is a game-changer.”
      </p>

      <div className="flex items-center gap-3 mt-6">
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold">
          DP
        </div>
        <div>
          <h4 className="font-bold">David Park</h4>
          <p className="text-gray-400 text-sm">Tech Entrepreneur</p>
        </div>
      </div>
    </div>

    {/* CARD 4 */}
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:scale-[1.02] transition">

      {/* ⭐⭐⭐⭐⭐ */}
      <div className="flex gap-1 mb-4 justify-center md:justify-start">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      <p className="text-gray-300 italic">
        “The detailed reporting and tax tools have saved me countless hours.
        Cryptobit is the most sophisticated platform I’ve used in 5 years of crypto trading.”
      </p>

      <div className="flex items-center gap-3 mt-6">
        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold">
          EW
        </div>
        <div>
          <h4 className="font-bold">Emma Williams</h4>
          <p className="text-gray-400 text-sm">Financial Analyst</p>
        </div>
      </div>
    </div>

  </div>

</section>    
   {/* ✅ STATS */}
<section className="mt-24 px-4 md:px-10">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-2xl font-bold">4.9/5</h3>
      <p className="text-gray-400 text-sm">App Store Rating</p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-2xl font-bold">500K+</h3>
      <p className="text-gray-400 text-sm">Active Users</p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-2xl font-bold">$2.4B+</h3>
      <p className="text-gray-400 text-sm">Assets Managed</p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-2xl font-bold">150+</h3>
      <p className="text-gray-400 text-sm">Countries Served</p>
    </div>

  </div>
</section>

{/* ✅ NEWSLETTER */}
<section className="mt-24 px-4 md:px-10 text-center">

  <h2 className="text-3xl font-bold">
    Stay Ahead of the Market
  </h2>

  <p className="text-gray-400 mt-3 max-w-xl mx-auto">
    Get exclusive insights, market updates, and early access to new features.
    Join 100,000+ subscribers.
  </p>

  <div className="flex flex-col md:flex-row justify-center gap-4 mt-6 max-w-xl mx-auto">
    <input
      type="email"
      placeholder="Enter your email"
      className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none w-full"
    />

    <button className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600">
      Subscribe
    </button>
  </div>

</section>

{/* ✅ FOOTER */}
<footer className="mt-24 px-4 md:px-10 py-12 border-t border-white/10">

  <div className="grid md:grid-cols-5 gap-10">

    {/* LOGO */}
    <div>
      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center font-bold mb-3">
        CB
      </div>
      <h3 className="font-bold text-lg">Cryptobit</h3>
      <p className="text-gray-400 text-sm mt-2">
        The next generation crypto investment platform. Secure, fast, and intelligent trading for everyone.
      </p>
    </div>

    {/* PRODUCT */}
    <div>
      <h4 className="font-bold mb-3">Product</h4>
      <ul className="text-gray-400 text-sm space-y-2">
        <li>Features</li>
        <li>Pricing</li>
        <li>Security</li>
        <li>API</li>
      </ul>
    </div>

    {/* COMPANY */}
    <div>
      <h4 className="font-bold mb-3">Company</h4>
      <ul className="text-gray-400 text-sm space-y-2">
        <li>About</li>
        <li>Careers</li>
        <li>Blog</li>
        <li>Press</li>
      </ul>
    </div>

    {/* RESOURCES */}
    <div>
      <h4 className="font-bold mb-3">Resources</h4>
      <ul className="text-gray-400 text-sm space-y-2">
        <li>Documentation</li>
        <li>Help Center</li>
        <li>Community</li>
        <li>Contact</li>
      </ul>
    </div>

    {/* LEGAL */}
    <div>
      <h4 className="font-bold mb-3">Legal</h4>
      <ul className="text-gray-400 text-sm space-y-2">
        <li>Privacy Policy</li>
        <li>Terms of Service</li>
        <li>Cookie Policy</li>
        <li>Compliance</li>
      </ul>
    </div>

  </div>

  {/* ✅ COPYRIGHT (moved OUTSIDE grid, NOT another footer) */}
  <div className="text-center text-gray-500 mt-16 text-sm">
    © 2026 CryptoBit. All rights reserved.
  </div>

</footer>
    </main>
  )
}