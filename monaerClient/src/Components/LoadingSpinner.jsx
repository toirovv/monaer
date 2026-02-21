import React from 'react'

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white  flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-cyan-600 rounded-full animate-spin animation-delay-150"></div>
          <div className="absolute inset-3 w-14 h-14 border-4 border-transparent border-t-green-600 rounded-full animate-spin animation-delay-300"></div>
        </div>
        <p className="mt-6 text-gray-700 font-medium text-lg">Yuklanmoqda...</p>
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce animation-delay-0"></div>
          <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce animation-delay-150"></div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce animation-delay-300"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
