const TOKEN_KEY = 'hb_token'
const API_URL = typeof window !== 'undefined' ? (window.location.hostname === 'localhost' ? 'http://localhost:8000' : window.location.origin) : 'http://localhost:8000'

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export function getToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null
}

export function authHeaders() {
  const t = getToken()
  return t ? { Authorization: `Bearer ${t}` } : {}
}

export async function login(email: string, password: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/login`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ detail: 'Login failed' }))
      throw new Error(errData.detail || errData.error || 'Login failed')
    }
    
    const data = await res.json()
    const token = data.access || data.token
    if (token) setToken(token)
    return data
  } catch (err: any) {
    console.error('Login error:', err)
    throw new Error(err.message || 'Failed to connect to server. Please ensure the backend is running.')
  }
}

export async function registerUser(payload: { name?: string; email: string; password: string; role?: string }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/register`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ detail: 'Registration failed' }))
      const errorMsg = errData.detail || errData.email?.[0] || errData.error || 'Registration failed'
      throw new Error(errorMsg)
    }
    
    const data = await res.json()
    const token = data.access || data.token
    if (token) setToken(token)
    return data
  } catch (err: any) {
    console.error('Registration error:', err)
    throw new Error(err.message || 'Failed to connect to server. Please ensure the backend is running.')
  }
}
