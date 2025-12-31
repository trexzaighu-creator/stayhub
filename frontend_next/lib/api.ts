const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000') + '/api'
import { getToken } from './auth'

export async function fetcher(url: string, options: RequestInit = {}) {
  const token = getToken()
  const headers: Record<string,string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${url}`, { headers, ...options })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    let info: any = body
    try { info = JSON.parse(body) } catch {}
    throw new Error(typeof info === 'object' ? (info.detail || info.error || JSON.stringify(info)) : info || res.statusText)
  }
  return res.json()
}

export async function getHostels(city?: string) {
  const qs = city ? `?city=${encodeURIComponent(city)}` : ''
  return fetcher(`/hostels${qs}`)
}

export async function getOwnerHostels() {
  return fetcher('/owner/hostels')
}

export async function createHostel(data: any) {
  return fetcher('/owner/hostels', { method: 'POST', body: JSON.stringify(data) })
}

export async function createCheckoutSession(payload: any) {
  return fetcher('/create-checkout-session', { method: 'POST', body: JSON.stringify(payload) })
}
