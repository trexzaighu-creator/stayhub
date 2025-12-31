import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function authHeaders(token) {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
}

export async function fetchCities() {
  const res = await axios.get(`${API}/api/cities`)
  return res.data
}

export async function fetchHostels(city) {
  const res = await axios.get(`${API}/api/hostels`, { params: { city } })
  return res.data
}

export async function register({ name, email, password, role }) {
  const res = await axios.post(`${API}/api/auth/register`, { name, email, password, role })
  return res.data
}

export async function me(token) {
  const res = await axios.get(`${API}/api/me`, authHeaders(token))
  return res.data
}

export async function fetchOwnerHostels(token) {
  const res = await axios.get(`${API}/api/owner/hostels`, authHeaders(token))
  return res.data
}

export async function createOwnerHostel(data, token) {
  const res = await axios.post(`${API}/api/owner/hostels`, data, authHeaders(token))
  return res.data
}

export async function uploadImage(file, token) {
  const form = new FormData()
  form.append('file', file)
  const cfg = {
    headers: { ...authHeaders(token).headers, 'Content-Type': 'multipart/form-data' }
  }
  const res = await axios.post(`${API}/api/upload`, form, cfg)
  return res.data
}

export async function login({ email, password }) {
  const res = await axios.post(`${API}/api/auth/login`, { email, password })
  return res.data
}

export async function createCheckoutSession({ hostelId, fromDate, toDate, token }) {
  const res = await axios.post(`${API}/api/create-checkout-session`, { hostelId, fromDate, toDate }, authHeaders(token))
  return res.data
}

export async function confirmBooking(sessionId, token) {
  const res = await axios.post(`${API}/api/bookings/confirm`, { sessionId }, authHeaders(token))
  return res.data
}

export async function fetchBookings(token) {
  const res = await axios.get(`${API}/api/bookings`, authHeaders(token))
  return res.data
}

export async function fetchOwnerBookings(token) {
  const res = await axios.get(`${API}/api/owner/bookings`, authHeaders(token))
  return res.data
}

