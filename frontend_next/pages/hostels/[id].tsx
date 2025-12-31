import { useRouter } from 'next/router'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { getHostels } from '../../lib/api'
import ImageCarousel from '../../components/ImageCarousel'
import Rating from '../../components/Rating'
import FavoriteButton from '../../components/FavoriteButton'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const LocationDisplay = dynamic(() => import('../../components/LocationDisplay'), { ssr: false })

export default function HostelDetail() {
  const router = useRouter()
  const { id } = router.query
  const [hostel, setHostel] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getHostels().then((list) => {
      const found = list.find((h: any) => h.id === id)
      setHostel(found || null)
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-gradient-site">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin text-3xl">⏳</div>
        <p className="mt-4 text-gray-600">Loading hostel details...</p>
      </main>
    </div>
  )

  if (!hostel) return (
    <div className="min-h-screen bg-gradient-site">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-2xl text-gray-600">Hostel not found</p>
        <Link href="/hostels" className="mt-4 inline-block px-6 py-2 btn-accent rounded-lg text-white">
          Back to Hostels
        </Link>
      </main>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-site text-gray-900">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Title and Favorite */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Link href="/hostels" className="hover:text-indigo-600">Hostels</Link>
              <span>/</span>
              <span>{hostel.city?.name || hostel.city}</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{hostel.name}</h1>
            <div className="flex items-center gap-4">
              <Rating value={hostel.rating || 4.5} />
              <span className="text-sm text-gray-600">({hostel.reviews_count || 0} reviews)</span>
              <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">Verified</span>
            </div>
          </div>
          <FavoriteButton hostelId={hostel.id} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white container-gloss rounded-2xl overflow-hidden mb-6">
              <ImageCarousel images={hostel.images || hostel.photos || []} />
            </div>

            {/* About Section */}
            <div className="bg-white container-gloss p-8 rounded-2xl mb-6">
              <h2 className="text-2xl font-bold mb-4">About This Hostel</h2>
              <p className="text-gray-700 leading-relaxed">
                {hostel.description || 'A comfortable and affordable hostel offering quality accommodation and a welcoming atmosphere for travelers.'}
              </p>
            </div>

            {/* Amenities Section */}
            <div className="bg-white container-gloss p-8 rounded-2xl mb-6">
              <h2 className="text-2xl font-bold mb-4">Amenities & Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(hostel.features || []).map((feature: string) => (
                  <div key={feature} className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                    <span className="text-xl">✓</span>
                    <span className="font-medium text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-white container-gloss p-8 rounded-2xl mb-6">
              <h2 className="text-2xl font-bold mb-4">Room Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">{hostel.rooms || 1}</div>
                  <p className="text-gray-600">Total Rooms</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">{hostel.available_seats || 1}</div>
                  <p className="text-gray-600">Total Capacity</p>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${hostel.available_count > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {hostel.available_count || 0}
                  </div>
                  <p className="text-gray-600">Available Now</p>
                </div>
              </div>
              
              {hostel.available_count > 0 ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-semibold">✓ {hostel.available_count} seat{hostel.available_count > 1 ? 's' : ''} available now!</p>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-semibold">✕ Currently fully booked</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div>
            {/* Pricing Card */}
            <div className="bg-white container-gloss p-8 rounded-2xl sticky top-24 mb-6">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Monthly Rent</p>
                <div className="text-4xl font-bold text-indigo-600 mb-1">
                  PKR {(hostel.monthly_rent || 0).toLocaleString()}
                </div>
                <p className="text-sm text-gray-500">/month</p>
              </div>

              {/* Owner Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                <p className="text-xs text-gray-600 uppercase font-semibold mb-2">Managed by</p>
                <p className="font-semibold text-lg text-gray-900">{hostel.owner?.name || 'Hostel Owner'}</p>
                <p className="text-sm text-gray-600 mt-1">{hostel.owner?.email || 'Contact via platform'}</p>
              </div>

              {/* CTA Buttons */}
              <button 
                onClick={async ()=>{
                  try {
                    const token = localStorage.getItem('hb_token')
                    if (!token) {
                      router.push('/auth/login')
                      return
                    }
                    const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000') + '/api/create-checkout-session', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                      body: JSON.stringify({ hostelId: hostel.id })
                    })
                    if (!res.ok) throw new Error('Checkout failed')
                    const data = await res.json()
                    if (data.url) window.location.href = data.url
                  } catch (e) {
                    alert('Failed to create checkout session')
                  }
                }} 
                className="w-full px-6 py-3 btn-accent rounded-lg text-white font-semibold mb-3 hover:shadow-lg transition-smooth"
              >
                Book Now
              </button>
              
              <button className="w-full px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-smooth">
                Contact Owner
              </button>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700">
                  💡 <strong>Tip:</strong> You'll need to be logged in to complete a booking. Create a free account if you don't have one.
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white container-gloss p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-3">📍 Location</h3>
              <p className="text-gray-700 mb-4 font-medium">{hostel.city?.name || hostel.city}</p>
              {hostel.lat && hostel.lng ? (
                <LocationDisplay lat={hostel.lat} lng={hostel.lng} hostelName={hostel.name} />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-600">📍 Location not yet specified</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white container-gloss p-8 rounded-2xl mb-12">
          <h2 className="text-2xl font-bold mb-6">Guest Reviews ({hostel.reviews_count || 0})</h2>
          
          {hostel.reviews && hostel.reviews.length > 0 ? (
            <div className="space-y-6">
              {hostel.reviews.map((review: any) => (
                <div key={review.id} className="pb-6 border-b last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{review.user?.name}</p>
                      <p className="text-sm text-gray-600">{new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">
              <p className="text-lg">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>

        {/* Related Hostels */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Similar Hostels in {hostel.city?.name || hostel.city}</h2>
          <Link href={`/hostels?city=${encodeURIComponent(hostel.city?.name || hostel.city)}`}>
            <div className="text-center py-12 bg-white container-gloss rounded-2xl cursor-pointer hover:shadow-lg transition-smooth">
              <p className="text-lg font-semibold text-indigo-600">View more hostels in this city →</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
