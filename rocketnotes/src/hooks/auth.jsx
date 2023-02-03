import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [userData, setUserData] = useState({})

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { user, token } = response.data

      localStorage.setItem('@rocketnotes:user', JSON.stringify(user))
      localStorage.setItem('@rocketnotes:token', token)

      // api.defaults.headers.Authorization = `Bearer ${token}`
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUserData({ user, token })
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert('Não foi possível fazer o login, tente novamente mais tarde.')
      }
    }
  }

  function signOut() {
    localStorage.removeItem('@rocketnotes:user')
    localStorage.removeItem('@rocketnotes:token')

    setUserData({})
  }

  useEffect(() => {
    const token = localStorage.getItem('@rocketnotes:token')
    const user = localStorage.getItem('@rocketnotes:user')

    if (token && user) {
      // api.defaults.headers.Authorization = `Bearer ${token}`
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUserData({ token, user: JSON.parse(user) })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signIn, signOut, user: userData.user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
