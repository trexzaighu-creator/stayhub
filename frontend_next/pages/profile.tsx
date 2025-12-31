import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Link from 'next/link'
import { getToken } from '../lib/auth'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings')

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push('/auth/login')
      return
    }

    setLoading(true)
    Promise.all([
      fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000') + '/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(r => r.json()),
      fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000') + '/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(r => r.json()),
    ])
      .then(([userData, bookingsData]) => {
        setUser(userData)
        setBookings(Array.isArray(bookingsData) ? bookingsData : [])
      })
      .catch(() => {
        router.push('/auth/login')
      })
      .finally(() => setLoading(false))
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-site">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-3xl">⏳</div>
            <p className="mt-4 text-gray-600">Loading your profile...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-site">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-2xl text-gray-600">Please log in to view your profile</p>
        </main>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    checked_in: 'bg-blue-100 text-blue-700',
    checked_out: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <div className="min-h-screen bg-gradient-site">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">My Account</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white container-gloss p-8 rounded-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white">{user.name?.charAt(0).toUpperCase()}</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                {user.role === 'owner' ? '🏢 Hostel Owner' : '🎒 Traveler'}
              </span>
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Account Status</p>
                <p className="text-green-600 font-semibold flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Active
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white container-gloss p-6 rounded-2xl">
              <p className="text-gray-600 text-sm uppercase font-semibold mb-2">Total Bookings</p>
              <p className="text-4xl font-bold text-indigo-600">{bookings.length}</p>
            </div>
            <div className="bg-white container-gloss p-6 rounded-2xl">
              <p className="text-gray-600 text-sm uppercase font-semibold mb-2">Active Bookings</p>
              <p className="text-4xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'confirmed' || b.status === 'checked_in').length}
              </p>
            </div>
            <div className="bg-white container-gloss p-6 rounded-2xl">
              <p className="text-gray-600 text-sm uppercase font-semibold mb-2">Total Spent</p>
              <p className="text-4xl font-bold text-cyan-600">
                PKR {bookings.reduce((sum, b) => sum + (b.amount || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-white container-gloss p-6 rounded-2xl">
              <p className="text-gray-600 text-sm uppercase font-semibold mb-2">Member Since</p>
              <p className="text-lg font-semibold">
                {new Date(user.date_joined || new Date()).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-3 font-semibold border-b-2 transition-smooth ${
                activeTab === 'bookings'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              📅 My Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 font-semibold border-b-2 transition-smooth ${
                activeTab === 'profile'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white container-gloss rounded-2xl overflow-hidden">
            {bookings.length === 0 ? (
              <div className="text-center py-12 px-6">
                <p className="text-2xl text-gray-600 mb-4">No bookings yet</p>
                <Link href="/hostels">
                  <button className="px-6 py-2 btn-accent rounded-lg text-white">
                    Explore Hostels
                  </button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hostel</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Dates</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Booked On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {bookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">{booking.hostel?.name}</p>
                            <p className="text-sm text-gray-600">{booking.hostel?.city?.name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {booking.from_date} to {booking.to_date}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          PKR {(booking.amount || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              statusColors[booking.status] || 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {booking.status?.replace('_', ' ').charAt(0).toUpperCase() +
                              booking.status?.replace('_', ' ').slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(booking.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white container-gloss p-8 rounded-2xl max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">{user.email}</p>
                <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Account Type</label>
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                  {user.role === 'owner' ? '🏢 Hostel Owner' : '🎒 Traveler'}
                </p>
              </div>

              <div className="pt-6 border-t">
                <button className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-semibold transition-smooth">
                  🚪 Logout
                </button>
              </div>

              {user.role === 'owner' && (
                <div className="pt-6 border-t">
                  <Link href="/owner/dashboard">
                    <button className="px-6 py-3 btn-accent rounded-lg text-white font-semibold">
                      Go to Owner Dashboard
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
