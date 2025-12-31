import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import MapView from '../components/MapView'
import { getHostels } from '../lib/api'
import Link from 'next/link'
import ImageCarousel from '../components/ImageCarousel'
import Rating from '../components/Rating'
import FavoriteButton from '../components/FavoriteButton'
import { getToken } from '../lib/auth'

export default function Hostels() {
  const [hostels, setHostels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('')
  const [feature, setFeature] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showMap, setShowMap] = useState(true)
  const [expandFilters, setExpandFilters] = useState(false)

  useEffect(() => {
    const token = getToken()
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    setLoading(true)
    getHostels(city).then((data) => {
      setHostels(data)
    }).catch(() => setHostels([])).finally(() => setLoading(false))
  }, [city])

  const features = useMemo(() => {
    const set = new Set<string>()
    hostels.forEach(h => (h.features || []).forEach((f: string) => set.add(f)))
    return Array.from(set)
  }, [hostels])

  const cities = useMemo(() => {
    const set = new Set<string>()
    hostels.forEach(h => set.add(h.city?.name || h.city))
    return Array.from(set)
  }, [hostels])

  const filtered = useMemo(() => {
    let result = hostels.filter(h => {
      const price = h.monthly_rent || 0
      const matchPrice = price >= priceRange[0] && price <= priceRange[1]
      const matchFeature = !feature || (h.features || []).includes(feature)
      return matchPrice && matchFeature
    })

    // Sort
    if (sortBy === 'price') {
      result.sort((a, b) => (a.monthly_rent || 0) - (b.monthly_rent || 0))
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [hostels, feature, sortBy, priceRange])

  return (
    <div className="min-h-screen bg-gradient-site text-gray-900">
      <Header />

      {/* Search Banner */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 dark:from-purple-800 dark:via-pink-800 dark:to-cyan-700 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-black mb-2">Find Your Perfect Stay</h1>
          <p className="text-white/80 mb-8 text-lg font-medium">Discover premium hostels across Pakistan</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">City</label>
              <input
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Search by city..."
                className="w-full px-4 py-3 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Price Range</label>
              <input
                type="range"
                min="0"
                max="50000"
                value={priceRange[1]}
                onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <p className="text-sm mt-1">Up to PKR {priceRange[1].toLocaleString()}/month</p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-900"
              >
                <option value="rating">Rating (High to Low)</option>
                <option value="price">Price (Low to High)</option>
                <option value="name">Name (A to Z)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white container-gloss p-6 rounded-xl sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Filters</h3>
                <button
                  onClick={() => setExpandFilters(!expandFilters)}
                  className="lg:hidden text-xl"
                >
                  {expandFilters ? '✕' : '≡'}
                </button>
              </div>

              {(expandFilters || true) && (
                <div className="space-y-6">
                  {/* Feature Filter */}
                  <div>
                    <h4 className="font-semibold mb-3">Amenities</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="feature"
                          value=""
                          checked={feature === ''}
                          onChange={e => setFeature(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">All Amenities</span>
                      </label>
                      {features.map(f => (
                        <label key={f} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="feature"
                            value={f}
                            checked={feature === f}
                            onChange={e => setFeature(e.target.value)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{f}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* City Filter */}
                  <div>
                    <h4 className="font-semibold mb-3">Cities</h4>
                    <div className="space-y-2">
                      {cities.map(c => (
                        <label key={c} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={city === c}
                            onChange={e => setCity(e.target.checked ? c : '')}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* View Mode */}
                  <div>
                    <h4 className="font-semibold mb-3">Display</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`flex-1 py-2 rounded ${
                          viewMode === 'grid'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200'
                        }`}
                      >
                        Grid
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`flex-1 py-2 rounded ${
                          viewMode === 'list'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200'
                        }`}
                      >
                        List
                      </button>
                    </div>
                  </div>

                  {/* Map Toggle */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showMap}
                        onChange={e => setShowMap(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-semibold">Show Map</span>
                    </label>
                  </div>

                  {/* Reset Filters */}
                  <button
                    onClick={() => {
                      setCity('')
                      setFeature('')
                      setSortBy('rating')
                      setPriceRange([0, 5000])
                    }}
                    className="w-full py-2 bg-gray-300 rounded font-semibold hover:bg-gray-400"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* Results Section */}
          <section className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-bold text-indigo-600">{filtered.length}</span> hostels
                {city && ` in ${city}`}
                {feature && ` with ${feature}`}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin">⏳</div>
                <p className="mt-4 text-gray-500">Loading hostels...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 bg-white container-gloss p-8 rounded-xl">
                <p className="text-xl text-gray-600">No hostels found matching your filters.</p>
                <button
                  onClick={() => {
                    setCity('')
                    setFeature('')
                    setPriceRange([0, 50000])
                  }}
                  className="mt-4 px-6 py-2 btn-accent rounded-lg text-white"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map(h => (
                  <div
                    key={h.id}
                    className="bg-white container-gloss hostel-card transition-smooth overflow-hidden"
                  >
                    <div className="flex flex-col h-full">
                      <div className="relative">
                        <ImageCarousel images={h.images || h.photos || []} />
                        <div className="absolute top-3 right-3">
                          <FavoriteButton hostelId={h.id} />
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-bold text-lg">{h.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{h.city?.name || h.city}</p>

                        <div className="mb-3">
                          {isLoggedIn ? (
                            <>
                              <Rating value={h.rating || 4.2} />
                              <p className="text-xs text-gray-500 mt-1">
                                {h.reviews_count || 0} reviews
                              </p>
                            </>
                          ) : (
                            <p className="text-xs text-gray-500">
                              <Link href="/auth/login" className="text-blue-600 hover:underline font-semibold">Sign in</Link> to see ratings
                            </p>
                          )}
                        </div>

                        {/* Availability Badge */}
                        <div className="mb-3">
                          {h.available_count > 0 ? (
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                              ✓ {h.available_count} seat{h.available_count > 1 ? 's' : ''} available
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                              ✕ Fully booked
                            </span>
                          )}
                        </div>

                        <div className="text-sm text-gray-700 mb-3 flex-1">
                          {(h.features || []).slice(0, 2).map((f: string) => (
                            <span
                              key={f}
                              className="inline-block mr-2 mb-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs"
                            >
                              {f}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="price-badge">PKR {(h.monthly_rent || 0).toLocaleString()}/month</div>
                          <Link
                            href={`/hostels/${h.id}`}
                            className="px-4 py-2 btn-accent rounded text-white text-sm disabled:opacity-50"
                            onClick={(e) => {
                              if (h.available_count === 0) e.preventDefault()
                            }}
                          >
                            {h.available_count > 0 ? 'View' : 'Full'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map(h => (
                  <div
                    key={h.id}
                    className="bg-white container-gloss p-6 rounded-xl flex gap-6 transition-smooth hover:shadow-lg"
                  >
                    <div className="w-48 flex-shrink-0">
                      <ImageCarousel images={h.images || h.photos || []} />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{h.name}</h3>
                            <p className="text-sm text-gray-500">{h.city?.name || h.city}</p>
                          </div>
                          <FavoriteButton hostelId={h.id} />
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          {isLoggedIn ? (
                            <>
                              <Rating value={h.rating || 4.2} />
                              <p className="text-xs text-gray-600">
                                {h.reviews_count || 0} reviews
                              </p>
                            </>
                          ) : (
                            <p className="text-xs text-gray-600">
                              <Link href="/auth/login" className="text-blue-600 hover:underline font-semibold">Sign in</Link> to see ratings
                            </p>
                          )}
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${
                            h.available_count > 0 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {h.available_count > 0 ? `${h.available_count} available` : 'Fully booked'}
                          </span>
                        </div>

                        <div className="text-sm text-gray-700">
                          {(h.features || []).slice(0, 5).map((f: string) => (
                            <span
                              key={f}
                              className="inline-block mr-2 mb-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex flex-col items-end justify-between">
                      <div className="price-badge text-lg">PKR {(h.monthly_rent || 0).toLocaleString()}</div>
                      <Link
                        href={`/hostels/${h.id}`}
                        className="px-6 py-2 btn-accent rounded text-white"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Map Section */}
        {showMap && filtered.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Hostels on Map</h2>
            <div className="bg-white container-gloss p-4 rounded-xl">
              <MapView
                hostels={filtered.map(h => ({
                  id: h.id,
                  name: h.name,
                  lat: h.lat,
                  lng: h.lng,
                }))}
              />
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
