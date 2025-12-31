import dynamic from 'next/dynamic'
import { useMemo } from 'react'

const MapContainerComponent = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
)
const TileLayerComponent = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
)
const MarkerComponent = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
)
const PopupComponent = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
)

import 'leaflet/dist/leaflet.css'

type Hostel = {
  id: string
  name: string
  lat?: number
  lng?: number
}

export default function MapView({ hostels }: { hostels: Hostel[] }) {
  const center = useMemo(() => {
    const first = hostels.find(h => h.lat && h.lng)
    return first ? [first.lat as number, first.lng as number] : [30.3753, 69.3451]
  }, [hostels])

  return (
    <div className="h-96 w-full rounded overflow-hidden shadow">
      <MapContainerComponent center={center as [number, number]} zoom={6} style={{ height: '100%', width: '100%' }}>
        <TileLayerComponent
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hostels.map(h => h.lat && h.lng ? (
          <MarkerComponent key={h.id} position={[h.lat as number, h.lng as number]}>
            <PopupComponent>{h.name}</PopupComponent>
          </MarkerComponent>
        ) : null)}
      </MapContainerComponent>
    </div>
  )
}
