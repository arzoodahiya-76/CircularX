import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const MOCK_USERS = [
  { id: '1', email: 'gargansh2207@gmail.com', password: '2207@Anshgarg', name: 'Ansh Garg', role: 'user' }
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('circularx_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  const login = (email, password) => {
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    )
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('circularx_user', JSON.stringify(userWithoutPassword))
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const register = (name, email, password) => {
    const exists = MOCK_USERS.find(u => u.email === email)
    if (exists) {
      return { success: false, error: 'Email already registered' }
    }
    
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      email,
      password,
      name,
      role: 'user'
    }
    MOCK_USERS.push(newUser)
    
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem('circularx_user', JSON.stringify(userWithoutPassword))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('circularx_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
