import { useState, useEffect } from 'react'

type Props = { hostelId: number }

export default function FavoriteButton({ hostelId }: Props) {
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFav(favs.includes(hostelId))
  }, [hostelId])

  const toggle = () => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (isFav) {
      const idx = favs.indexOf(hostelId)
      favs.splice(idx, 1)
    } else {
      favs.push(hostelId)
    }
    localStorage.setItem('favorites', JSON.stringify(favs))
    setIsFav(!isFav)
  }

  return (
    <button onClick={toggle} className="text-2xl transition-smooth hover:scale-125">
      {isFav ? '❤️' : '🤍'}
    </button>
  )
}
