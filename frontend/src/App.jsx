import React, { useEffect, useState } from 'react'
import { fetchCities, fetchHostels } from './api'
import Nav from './components/Nav'
import HostelCard from './components/HostelCard'

export default function App() {
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [hostels, setHostels] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCities().then(setCities).catch(() => setCities([]))
  }, [])

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const data = await fetchHostels(selectedCity)
        setHostels(data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [selectedCity])

  return (
    <div className="app">
      <Nav />
      <main className="container">
        <section className="controls">
          <h1>Find Hostels</h1>
          <div className="controls-row">
            <label className="select">
              <span>City</span>
              <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                <option value="">All cities</option>
                {cities.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="grid">
          {loading && <div className="center">Loading…</div>}
          {!loading && hostels.length === 0 && <div className="center">No hostels found.</div>}
          {!loading && hostels.map(h => (
            <HostelCard key={h.id} hostel={h} />
          ))}
        </section>
      </main>
    </div>
  )
}
