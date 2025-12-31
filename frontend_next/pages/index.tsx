import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { getToken } from '../lib/auth'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = getToken()
    setIsLoggedIn(!!token)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-site text-gray-900">
      <Head>
        <title>StayHub - Find Your Perfect Hostel Stay in Pakistan</title>
        <meta name="description" content="Book affordable, quality hostels across Pakistan. Easy booking, secure payments, authentic travel experiences." />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight">
                Your Perfect Stay Awaits
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                Discover premium, comfortable hostels across Pakistan. Seamless booking, secure payments, and unforgettable experiences.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/hostels" className="px-8 py-4 btn-accent rounded-xl font-bold transition-all hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105">
                  Explore Hostels
                </Link>
                {!isLoggedIn && (
                  <Link href="/auth/login" className="px-8 py-4 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-xl font-bold hover:bg-purple-50 dark:hover:bg-purple-950 transition-all">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-20 blur-3xl rounded-full"></div>
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80" alt="Hostel" className="rounded-3xl shadow-2xl relative z-10 border-4 border-white/50 dark:border-slate-700/50" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 dark:from-slate-900 to-white dark:to-slate-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Why Choose Us</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-12">Experience premium hostel booking like never before</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="container-gloss p-8 rounded-2xl transition-all hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/30 hover:scale-105 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-3xl mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">🏠</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Premium Hostels</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Handpicked quality hostels with verified reviews and ratings from real travelers worldwide.</p>
              </div>

              <div className="container-gloss p-8 rounded-2xl transition-all hover:shadow-2xl hover:shadow-pink-500/20 dark:hover:shadow-pink-500/30 hover:scale-105 group">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-3xl mb-6 group-hover:shadow-lg group-hover:shadow-pink-500/50 transition-all">💳</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Secure Payments</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Stripe-powered checkout ensures your financial data is always protected with military-grade encryption.</p>
              </div>

              <div className="container-gloss p-8 rounded-2xl transition-all hover:shadow-2xl hover:shadow-cyan-500/20 dark:hover:shadow-cyan-500/30 hover:scale-105 group">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-3xl mb-6 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">⚡</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Instant Booking</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Reserve your stay in seconds. Instant confirmation and direct hostel contact details.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Cities Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Explore Popular Cities</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-12">Discover hostels in Pakistan's most vibrant cities</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {['Karachi', 'Lahore', 'Islamabad', 'Peshawar'].map((city) => (
                <Link key={city} href={`/hostels?city=${city}`}>
                  <div className="container-gloss p-8 rounded-2xl text-center cursor-pointer transition-all hover:shadow-2xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40 hover:-translate-y-2 group">
                    <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">🌍</div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">{city}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Browse premium hostels</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 dark:from-purple-800 dark:via-pink-800 dark:to-cyan-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h2 className="text-5xl font-black mb-6 text-white">Ready to Book?</h2>
            <p className="text-xl mb-10 text-white/90 font-medium">
              Join thousands of travelers exploring the best hostels across Pakistan
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/hostels" className="px-8 py-4 bg-white text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105">
                Browse Hostels
              </Link>
              {!isLoggedIn && (
                <Link href="/auth/register" className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm">
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">About</h4>
              <p className="text-sm">Your trusted platform for booking quality hostels across Pakistan.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Explore</h4>
              <ul className="text-sm space-y-2">
                <li><Link href="/hostels" className="hover:text-white">All Hostels</Link></li>
                <li><Link href="/owner/dashboard" className="hover:text-white">For Owners</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
            <div className="border-t border-gray-800 pt-8 text-sm text-center">
            © 2025 StayHub. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  )
}
