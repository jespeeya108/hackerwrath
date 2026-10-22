import { createContext, useContext, useMemo, useState } from 'react'
import { signIn } from '../services/authService'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const login = async (values) => { setIsLoading(true); try { const result = await signIn(values); setUser(result.user); return result } finally { setIsLoading(false) } }
  const value = useMemo(() => ({ user, isLoading, login, logout: () => setUser(null) }), [user, isLoading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
