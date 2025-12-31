import { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Link from 'next/link'
import { login } from '../../lib/auth'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function submit(e: any) {
    e.preventDefault()
    setServerError(null)

    if (!validateForm()) return

    setLoading(true)
    try {
      await login(formData.email, formData.password)
      router.push('/')
    } catch (err: any) {
      setServerError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-site">
      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-slate-800 container-gloss rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 dark:from-purple-800 dark:via-pink-800 dark:to-cyan-700 px-8 py-12 text-white">
              <h1 className="text-4xl font-black mb-2">Welcome Back</h1>
              <p className="text-white/80 text-lg">Sign in to your StayHub account</p>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <form onSubmit={submit} className="space-y-5">
                {serverError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {serverError}
                  </div>
                )}

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                      errors.email
                        ? 'border-red-400 focus:ring-red-300'
                        : 'border-gray-300 dark:border-slate-600 focus:ring-purple-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                      errors.password
                        ? 'border-red-400 focus:ring-red-300'
                        : 'border-gray-300 dark:border-slate-600 focus:ring-purple-300'
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Remember me</span>
                  </label>
                  <a href="#" className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent hover:underline font-semibold">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 btn-accent rounded-lg text-white font-bold mt-6 hover:shadow-lg disabled:opacity-70 transition-all"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>

                {/* Register Link */}
                <p className="text-center text-gray-600 mt-6">
                  Don't have an account?{' '}
                  <Link href="/auth/register" className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold hover:underline">
                    Create one
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 bg-white container-gloss p-4 rounded-lg">
            <p className="text-xs text-gray-600 text-center font-semibold mb-3">Demo Credentials</p>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-gray-50 rounded">
                <p className="font-semibold text-gray-900">Traveler:</p>
                <p className="text-gray-600">user@example.com / password</p>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <p className="font-semibold text-gray-900">Owner:</p>
                <p className="text-gray-600">owner@example.com / password</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
