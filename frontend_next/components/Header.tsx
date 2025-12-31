import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getToken } from '../lib/auth'

export default function Header() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const t = getToken()
    setToken(t)
    
    if (t) {
      fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000') + '/api/me', {
        headers: { Authorization: `Bearer ${t}` }
      })
        .then(r => r.json())
        .then(data => setUser(data))
        .catch(() => {})
    }
  }, [])

  const isActive = (path: string) => {
    return router.pathname === path
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setShowDropdown(false)
    router.push('/')
  }

  const navItemClass = (path: string) => {
    return `relative transition-all duration-300 font-medium text-gray-700 dark:text-gray-300 ${
      isActive(path) ? 'text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text dark:from-purple-400 dark:to-pink-400' : 'hover:text-gray-900 dark:hover:text-gray-100'
    } after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all after:duration-300 ${
      isActive(path) ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
    }`
  }

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-purple-200 dark:border-purple-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">🏨</div>
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">StayHub</h1>
        </Link>

        <nav className="flex items-center gap-8 flex-1 justify-end">
          <Link href="/" className={navItemClass('/')}>
            Home
          </Link>
          <Link href="/hostels" className={navItemClass('/hostels')}>
            Hostels
          </Link>
          
          {token && user ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 hover:opacity-80 transition-all"
                >
                  <span className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-sm flex-shrink-0 text-white font-bold shadow-md">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline text-gray-700 dark:text-gray-300">{user?.name}</span>
                  <svg className={`w-4 h-4 text-gray-700 dark:text-gray-300 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-purple-200 dark:border-purple-900 overflow-hidden z-50">
                    <Link href="/profile" className="block px-4 py-3 hover:bg-purple-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium transition-colors border-b border-gray-200 dark:border-slate-700">
                      👤 My Profile
                    </Link>
                    {user?.role === 'owner' && (
                      <Link href="/owner/dashboard" className="block px-4 py-3 hover:bg-purple-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium transition-colors border-b border-gray-200 dark:border-slate-700">
                        📊 Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium transition-colors"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link href="/auth/login" className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/50">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
