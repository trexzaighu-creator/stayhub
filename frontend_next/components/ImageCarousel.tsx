import { useState } from 'react'

type Props = { images?: string[] }

export default function ImageCarousel({ images = [] }: Props) {
  const [index, setIndex] = useState(0)
  const display = images.length ? images[index] : '/placeholder.jpg'

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md">
        <img src={display} alt="hostel" className="thumbnail w-full" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-2">
          {images.slice(0,5).map((img, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`w-16 h-10 rounded-sm overflow-hidden border ${i===index? 'border-indigo-500':'border-gray-200'}`}>
              <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
