import React, { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const res = await axios.get("/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUser(res.data)
        } catch (err) {
          localStorage.removeItem("token")
          console.error("Auth check failed:", err)
        }
      }
      setLoading(false)
    }

    checkUser()
  }, [])

  const login = async (email, password) => {
    setError(null)
    try {
      const res = await axios.post("/api/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      setUser(res.data.user)
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
      throw new Error(err.response?.data?.message || "Login failed")
    }
  }

  const signup = async (name, email, password) => {
    setError(null)
    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password
      })
      localStorage.setItem("token", res.data.token)
      setUser(res.data.user)
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed")
      throw new Error(err.response?.data?.message || "Signup failed")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
