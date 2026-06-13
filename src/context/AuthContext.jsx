import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  const login = useCallback((userData, jwt) => {
    let enrichedUser = { ...userData }
    try {
      const payload = JSON.parse(atob(jwt.split('.')[1]))
      if (payload.sucursal != null && enrichedUser.sucursal == null) {
        enrichedUser.sucursal = payload.sucursal
      }
    } catch { /* JWT mal formado — ignorar */ }

    localStorage.setItem('token', jwt)
    localStorage.setItem('user', JSON.stringify(enrichedUser))
    setToken(jwt)
    setUser(enrichedUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
