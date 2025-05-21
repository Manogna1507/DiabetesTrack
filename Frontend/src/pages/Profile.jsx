import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"
import { User, Mail, Calendar, Activity, Save, AlertCircle } from "lucide-react"

const Profile = () => {
  const { user, logout } = useAuth()
  const [name, setName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [gender, setGender] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    // Load user profile data
    if (user) {
      setName(user.name || "")

      // In a real app, you would fetch the full profile from the backend
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem("token")
          // This would be a real API call in a production app
          // const response = await axios.get('/api/users/profile', {
          //   headers: {
          //     Authorization: `Bearer ${token}`
          //   }
          // });
          // const profileData = response.data;
          // setDateOfBirth(profileData.dateOfBirth || '');
          // setGender(profileData.gender || '');
          // setPhoneNumber(profileData.phoneNumber || '');

          // For demo purposes, we'll use mock data
          setDateOfBirth("1985-05-15")
          setGender("Female")
          setPhoneNumber("(555) 123-4567")
        } catch (err) {
          console.error("Error fetching profile:", err)
        }
      }

      fetchProfile()
    }
  }, [user])

  const handleSaveProfile = async () => {
    setError("")
    setSuccessMessage("")
    setIsSaving(true)

    try {
      // Validate input
      if (!name.trim()) {
        setError("Name is required")
        setIsSaving(false)
        return
      }

      // In a real app, you would save the profile to the backend
      const token = localStorage.getItem("token")

      // This would be a real API call in a production app
      // await axios.put('/api/users/profile', {
      //   name,
      //   dateOfBirth,
      //   gender,
      //   phoneNumber
      // }, {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSuccessMessage("Profile updated successfully!")
      setIsEditing(false)
    } catch (err) {
      console.error("Error updating profile:", err)
      setError("Failed to update profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your personal information and account preferences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white shadow overflow-hidden rounded-lg"
        >
          {/* Profile header */}
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-cyan-700 to-cyan-500">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-cyan-600">
                  <User className="h-8 w-8" />
                </div>
              </div>
              <div className="ml-4 text-white">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p>{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Profile content */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
                {successMessage}
              </div>
            )}

            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <div className="flex items-center text-sm font-medium text-gray-500">
                  <User className="h-4 w-4 mr-2" />
                  <span>Full Name</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{name}</p>
                )}
              </div>

              <div>
                <div className="flex items-center text-sm font-medium text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Email Address</span>
                </div>
                <p className="mt-1 text-gray-900">{user?.email}</p>
                <p className="mt-1 text-xs text-gray-500">
                  (Cannot be changed)
                </p>
              </div>

              <div>
                <div className="flex items-center text-sm font-medium text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Date of Birth</span>
                </div>
                {isEditing ? (
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">
                    {dateOfBirth && new Date(dateOfBirth).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center text-sm font-medium text-gray-500">
                  <Activity className="h-4 w-4 mr-2" />
                  <span>Gender</span>
                </div>
                {isEditing ? (
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <p className="mt-1 text-gray-900">{gender}</p>
                )}
              </div>

              <div>
                <div className="flex items-center text-sm font-medium text-gray-500">
                  <span>Phone Number</span>
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{phoneNumber}</p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    {isSaving ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Account Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 bg-white shadow overflow-hidden rounded-lg"
        >
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">
              Account Management
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Sign out from all devices
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    This will sign you out from all devices where you're
                    currently logged in.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
