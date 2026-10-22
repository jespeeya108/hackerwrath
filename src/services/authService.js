import { apiRequest } from './api'
import { demoUsers } from '../data/mockData'

const demoEnabled = import.meta.env.VITE_USE_DEMO_DATA !== 'false'
export async function signIn({ identifier, password, demoRole }) {
  if (!identifier || !password) throw new Error('Enter your university ID and password.')
  if (!demoEnabled) return apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ identifier, password }) })
  await new Promise((resolve) => setTimeout(resolve, 450))
  return { user: demoUsers[demoRole] || demoUsers.student, demo: true }
}
