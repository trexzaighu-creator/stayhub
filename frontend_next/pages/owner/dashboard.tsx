import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { getOwnerHostels, createHostel } from '../../lib/api'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const LocationPicker = dynamic(() => import('../../components/LocationPicker'), { ssr: false })

export default function OwnerDashboard() {
  const [hostels, setHostels] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    monthly_rent: 0,
    description: '',
    features: [] as string[],
    rooms: 1,
    available_seats: 1,
    lat: undefined as number | undefined,
    lng: undefined as number | undefined
  })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(()=>{
    setLoading(true)
    getOwnerHostels().then(d=>setHostels(d)).catch(()=>setHostels([])).finally(()=>setLoading(false))
  },[])

  async function submit(e:any){
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    
    // Validation
    if (!formData.name.trim()) {
      setError('Hostel name is required')
      return
    }
    if (!formData.city.trim()) {
      setError('City is required')
      return
    }
    if (!formData.monthly_rent || formData.monthly_rent <= 0) {
      setError('Monthly rent must be greater than 0')
      return
    }
    if (!formData.available_seats || formData.available_seats <= 0) {
      setError('Available seats must be greater than 0')
      return
    }
    
    try{
      const payload = { 
        ...formData,
        monthly_rent: parseInt(formData.monthly_rent.toString()) || 0
      }
      await createHostel(payload)
      setSuccessMessage('Hostel created successfully!')
      const d = await getOwnerHostels()
      setHostels(d)
      setFormData({ name: '', city: '', monthly_rent: 0, description: '', features: [], rooms: 1, available_seats: 1, lat: undefined, lng: undefined })
      setShowForm(false)
      setTimeout(() => setSuccessMessage(''), 3000)
    }catch(err: any){
      setError(err.message || 'Failed to create hostel. Please try again.')
    }
  }

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const commonFeatures = ['WiFi', 'Kitchen', 'Laundry', 'Common Area', 'Hot Water', 'Parking', 'AC', 'Private Room Option']

  return (
    <div className="min-h-screen bg-gradient-site text-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Owner Dashboard</h1>
          <p className="text-gray-600">Manage your hostels, set pricing, and track bookings</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✓ {successMessage}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">{hostels.length}</div>
            <p className="text-gray-600">Total Hostels</p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">0</div>
            <p className="text-gray-600">Active Bookings</p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-cyan-600 mb-2">PKR 0</div>
            <p className="text-gray-600">This Month Revenue</p>
          </div>
          <div className="bg-white p-6 rounded-xl text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">4.5</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>

        {/* Create/Edit Hostel Form */}
        {showForm && (
          <div className="bg-white p-8 rounded-2xl mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{editingId ? 'Edit Hostel' : 'Create New Hostel'}</h2>
              <button 
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({ name: '', city: '', monthly_rent: 0, description: '', features: [], rooms: 1, available_seats: 1, lat: undefined, lng: undefined })
                  setError('')
                }}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                ✕ {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Hostel Name *</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="e.g., Cozy Downtown Hostel"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">City *</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="e.g., Karachi"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Monthly Rent (PKR) *</label>
                  <input 
                    required
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    placeholder="e.g., 15000"
                    value={formData.monthly_rent}
                    onChange={e => setFormData({...formData, monthly_rent: parseInt(e.target.value) || 0})}
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter the monthly rent in Pakistani Rupees</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Total Rooms</label>
                  <input 
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                    value={formData.rooms}
                    onChange={e => setFormData({...formData, rooms: parseInt(e.target.value) || 1})}
                  />
                </div>
              </div>

              {/* Room Capacity */}
              <div>
                <label className="block text-sm font-semibold mb-2">Available Seats (Total Capacity)</label>
                <input 
                  type="number"
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  placeholder="e.g., 8"
                  value={formData.available_seats}
                  onChange={e => setFormData({...formData, available_seats: parseInt(e.target.value) || 1})}
                />
                <p className="text-xs text-gray-500 mt-1">Total number of beds/seats available in the hostel</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  placeholder="Describe your hostel, what makes it special..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {/* Location Picker */}
              <div>
                <LocationPicker 
                  lat={formData.lat}
                  lng={formData.lng}
                  city={formData.city}
                  onChange={(lat, lng) => setFormData({...formData, lat, lng})}
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-semibold mb-4">Amenities & Features</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {commonFeatures.map(feature => (
                    <label key={feature} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-indigo-50 transition-smooth">
                      <input 
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => toggleFeature(feature)}
                        className="w-4 h-4 accent-indigo-600"
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4 border-t">
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 btn-accent rounded-lg text-white font-semibold hover:shadow-lg transition-smooth"
                >
                  {editingId ? 'Update Hostel' : 'Create Hostel'}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    setFormData({ name: '', city: '', monthly_rent: 0, description: '', features: [], rooms: 1, available_seats: 1, lat: undefined, lng: undefined })
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-smooth"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Create Hostel Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-12 px-6 py-3 btn-accent rounded-lg text-white font-semibold hover:shadow-lg transition-smooth"
          >
            + Create New Hostel
          </button>
        )}

        {/* Hostels List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Hostels</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin text-3xl">⏳</div>
              <p className="mt-4 text-gray-600">Loading your hostels...</p>
            </div>
          ) : hostels.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <p className="text-xl text-gray-600 mb-4">No hostels yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 btn-accent rounded-lg text-white"
              >
                Create Your First Hostel
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hostels.map(h => (
                <div key={h.id} className="bg-white rounded-2xl overflow-hidden p-6 hover:shadow-lg transition-smooth border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{h.name}</h3>
                      <p className="text-sm text-gray-600">{h.city?.name || h.city}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  </div>

                  {/* Pricing Display */}
                  <div className="bg-indigo-50 p-4 rounded-lg mb-4 border border-indigo-200">
                    <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Monthly Rent</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      PKR {(h.monthly_rent || 0).toLocaleString()}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <p className="text-gray-600">Total Rooms</p>
                      <p className="font-semibold text-lg">{h.rooms || 1}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Available Seats</p>
                      <p className="font-semibold text-lg">{h.available_seats || 1}</p>
                    </div>
                  </div>

                  {/* Features */}
                  {h.features && h.features.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs text-gray-600 uppercase font-semibold mb-2">Amenities</p>
                      <div className="flex flex-wrap gap-2">
                        {h.features.slice(0, 3).map((f: string) => (
                          <span key={f} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                            {f}
                          </span>
                        ))}
                        {h.features.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            +{h.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                    <button 
                      onClick={() => {
                        setFormData({
                          name: h.name,
                          city: h.city?.name || h.city,
                          monthly_rent: h.monthly_rent || 0,
                          description: h.description || '',
                          features: h.features || [],
                          rooms: h.rooms || 1,
                          available_seats: h.available_seats || 1,
                          lat: h.lat,
                          lng: h.lng
                        })
                        setEditingId(h.id)
                        setShowForm(true)
                      }}
                      className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-semibold text-sm transition-smooth"
                    >
                      Edit
                    </button>
                    <Link href={`/hostels/${h.id}`}>
                      <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold text-sm transition-smooth">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
