import dynamic from 'next/dynamic'
import { useMemo, useEffect, useState, useRef } from 'react'

const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
)

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
})

type LocationPickerProps = {
  lat?: number
  lng?: number
  city?: string
  onChange: (lat: number, lng: number) => void
}

// Pakistani cities with coordinates
const CITY_COORDINATES: Record<string, [number, number]> = {
  'karachi': [24.8607, 67.0011],
  'lahore': [31.5497, 74.3436],
  'islamabad': [33.6844, 73.0479],
  'peshawar': [34.0151, 71.5249],
  'quetta': [30.1798, 67.0070],
  'multan': [30.1575, 71.4454],
  'faisalabad': [31.4181, 72.9881],
  'hyderabad': [25.3960, 68.4717],
  'gujranwala': [32.1814, 74.1855],
  'rawalpindi': [33.5731, 73.2794],
}

// Pakistan bounds (prevent zooming out)
const PAKISTAN_BOUNDS: [[number, number], [number, number]] = [
  [23.6345, 61.4699],  // Southwest corner
  [36.8534, 77.1229]   // Northeast corner
]

function MapContent({ lat, lng }: { lat?: number; lng?: number }) {
  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {lat && lng && (
        <Marker position={[lat, lng]}>
          <Popup>
            Selected Location<br/>
            Lat: {lat.toFixed(4)}<br/>
            Lng: {lng.toFixed(4)}
          </Popup>
        </Marker>
      )}
    </>
  )
}

export default function LocationPicker({ lat, lng, city, onChange }: LocationPickerProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([30.3753, 69.3451])
  const [zoom, setZoom] = useState(5)
  const mapRef = useRef<any>(null)

  // Update map center when city changes
  useEffect(() => {
    if (city) {
      const cityKey = city.toLowerCase().trim()
      const cityCoords = CITY_COORDINATES[cityKey]
      if (cityCoords) {
        setMapCenter(cityCoords)
        setZoom(13)
      }
    } else {
      setZoom(5)
    }
  }, [city])

  // If user has selected a location, use it; otherwise use city center
  const center = useMemo(() => {
    return (lat && lng) ? [lat, lng] : mapCenter
  }, [lat, lng, mapCenter]) as [number, number]

  useEffect(() => {
    if (mapRef.current?.leafletElement) {
      mapRef.current.leafletElement.on('click', (e: any) => {
        onChange(e.latlng.lat, e.latlng.lng)
      })
    }
  }, [onChange])

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold">Location (Click on map to select)</label>
      <p className="text-xs text-gray-500">Map is centered on {city || 'Pakistan'}. Click anywhere to mark location.</p>
      <div className="h-96 w-full rounded-lg overflow-hidden border-2 border-gray-300">
        <MapContainer 
          ref={mapRef}
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          maxBounds={PAKISTAN_BOUNDS}
        >
          <MapContent lat={lat} lng={lng} />
        </MapContainer>
      </div>
      {lat && lng && (
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          📍 Location: <strong>{lat.toFixed(4)}</strong>, <strong>{lng.toFixed(4)}</strong>
        </div>
      )}
    </div>
  )
}
