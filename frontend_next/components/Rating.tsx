type Props = { value?: number }

export default function Rating({ value = 4.2 }: Props) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  const stars = Array.from({ length: 5 }).map((_, i) => {
    if (i < full) return 'full'
    if (i === full && half) return 'half'
    return 'empty'
  })

  return (
    <div className="flex items-center gap-1 text-sm text-yellow-500">
      {stars.map((s, i) => (
        <span key={i} className="leading-none">{s === 'full' ? '★' : s === 'half' ? '☆' : '☆'}</span>
      ))}
      <span className="ml-2 text-xs text-gray-600">{value.toFixed(1)}</span>
    </div>
  )
}
