import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
      </div>
    )
  }

  // Allow access to lab-report without authentication
  if (location.pathname === "/lab-report") {
    return <>{children}</>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

export default PrivateRoute
