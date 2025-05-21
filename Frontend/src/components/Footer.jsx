import React from "react"
import { Heart, Activity } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Activity className="h-6 w-6 text-cyan-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">
              DiabetesTrack
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} DiabetesTrack. All rights reserved.
            </p>
            <div className="flex items-center mt-2 md:mt-0 md:ml-4">
              <span className="text-gray-600 text-sm mx-2">Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-gray-600 text-sm ml-2">
                for better health
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
