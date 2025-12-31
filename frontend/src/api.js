import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {}
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

export async function login({ email, password }) {
  const res = await axios.post(`${API}/api/auth/login`, { email, password })
  return res.data
}

export default {
  fetchCities,
  fetchHostels,
  register,
  login,
}
