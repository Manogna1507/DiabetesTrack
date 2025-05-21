import React, { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Menu, X, Activity, User, LogOut, FileCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsOpen(false)
  }

  const isActive = path => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <Activity className="h-8 w-8 text-cyan-600 group-hover:text-cyan-700 transition-colors" />
              <span className="ml-2 text-xl font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors">
                DiabetesTrack
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive("/")
                  ? "text-cyan-600 bg-cyan-50"
                  : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md transition-colors ${
                    isActive("/dashboard")
                      ? "text-cyan-600 bg-cyan-50"
                      : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/lab-report"
                  className={`px-3 py-2 rounded-md transition-colors flex items-center ${
                    isActive("/lab-report")
                      ? "text-cyan-600 bg-cyan-50"
                      : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                  }`}
                >
                  <FileCheck className="h-5 w-5 mr-1" />
                  Health Check
                </Link>
                <div className="relative ml-3">
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        isActive("/profile")
                          ? "text-cyan-600 bg-cyan-50"
                          : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                      }`}
                      onClick={() => navigate("/profile")}
                    >
                      <User className="h-5 w-5 mr-1" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-5 w-5 mr-1" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/lab-report"
                  className="flex items-center px-4 py-2 rounded-md bg-cyan-100 text-cyan-700 hover:bg-cyan-200 transition-colors"
                >
                  <FileCheck className="h-5 w-5 mr-1" />
                  Quick Check
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-gray-700 hover:text-cyan-600 hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-cyan-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md ${
                  isActive("/")
                    ? "text-cyan-600 bg-cyan-50"
                    : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`block px-3 py-2 rounded-md ${
                      isActive("/dashboard")
                        ? "text-cyan-600 bg-cyan-50"
                        : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/lab-report"
                    className={`block px-3 py-2 rounded-md ${
                      isActive("/lab-report")
                        ? "text-cyan-600 bg-cyan-50"
                        : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Health Check
                  </Link>
                  <Link
                    to="/profile"
                    className={`block px-3 py-2 rounded-md ${
                      isActive("/profile")
                        ? "text-cyan-600 bg-cyan-50"
                        : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/lab-report"
                    className="block px-3 py-2 rounded-md text-cyan-700 bg-cyan-50 hover:bg-cyan-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Quick Health Check
                  </Link>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
