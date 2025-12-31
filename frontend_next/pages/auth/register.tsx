import { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Link from 'next/link'
import { registerUser } from '../../lib/auth'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })
      setSuccess(true)
      // Redirect immediately since token is already stored
      setTimeout(() => router.push('/'), 1500)
    } catch (err: any) {
      setServerError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
              <h1 className="text-4xl font-black mb-2">Create Account</h1>
              <p className="text-white/80 text-lg">Join StayHub and discover amazing hostels</p>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {success ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h2 className="text-2xl font-bold text-green-600 mb-2">Welcome!</h2>
                  <p className="text-gray-600 mb-4">
                    Your account has been created successfully. Redirecting...
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  {serverError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {serverError}
                    </div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                        errors.name
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-gray-300 dark:border-slate-600 focus:ring-purple-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

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

                  {/* Confirm Password Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                        errors.confirmPassword
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-gray-300 dark:border-slate-600 focus:ring-purple-300'
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Account Type
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                        <input
                          type="radio"
                          name="role"
                          value="user"
                          checked={formData.role === 'user'}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <span className="ml-3 flex-1">
                          <span className="font-semibold text-gray-900">Traveler</span>
                          <p className="text-xs text-gray-600">Browse and book hostels</p>
                        </span>
                      </label>

                      <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                        <input
                          type="radio"
                          name="role"
                          value="owner"
                          checked={formData.role === 'owner'}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <span className="ml-3 flex-1">
                          <span className="font-semibold text-gray-900">Hostel Owner</span>
                          <p className="text-xs text-gray-600">Manage and list your properties</p>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 btn-accent rounded-lg text-white font-semibold mt-6 hover:shadow-lg disabled:opacity-70 transition-smooth"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>

                  {/* Login Link */}
                  <p className="text-center text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold hover:underline">
                      Sign In
                    </Link>
                  </p>

                  {/* Terms */}
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:underline font-semibold">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:underline font-semibold">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Info Cards */}
          {!success && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white container-gloss p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🏠</div>
                <p className="text-sm font-semibold text-gray-900">Best Hostels</p>
                <p className="text-xs text-gray-600">Choose from quality options</p>
              </div>
              <div className="bg-white container-gloss p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">💳</div>
                <p className="text-sm font-semibold text-gray-900">Secure Booking</p>
                <p className="text-xs text-gray-600">Safe payments with Stripe</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
