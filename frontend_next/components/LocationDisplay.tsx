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

type LocationDisplayProps = {
  lat: number
  lng: number
  hostelName: string
}

function MapContent({ lat, lng, hostelName }: { lat: number; lng: number; hostelName: string }) {
  return (
    <>
      <TileLayerComponent
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerComponent position={[lat, lng] as any}>
        <PopupComponent>{hostelName}</PopupComponent>
      </MarkerComponent>
    </>
  )
}

export default function LocationDisplay({ lat, lng, hostelName }: LocationDisplayProps) {
  const center = useMemo(() => {
    return [lat, lng] as [number, number]
  }, [lat, lng])

  return (
    <div className="w-full h-48 rounded-lg overflow-hidden">
      <MapContainerComponent 
        {...{ center: center as any, zoom: 15, style: { height: '100%', width: '100%' } } as any}
      >
        <MapContent lat={lat} lng={lng} hostelName={hostelName} />
      </MapContainerComponent>
    </div>
  )
}
