import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Search, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 relative">
            404
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              404
            </span>
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Sahifa topilmadi
          </h2>
          <p className="text-gray-600 mb-2">
            Kechirasiz, siz qidirayotgan sahifa mavjud emas.
          </p>
          <p className="text-gray-500 text-sm">
            Ehtimol, manzil noto'g'ri yozilgan yoki sahifa o'chirilgan.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 mr-2" />
              Bosh sahifaga qaytish
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Orqaga qaytish
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-600 mb-3 text-sm">
              Mahsulot qidiryapsizmi?
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              <Search className="w-4 h-4 mr-2" />
              Katalogni ko'rish
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            Agar siz to'g'ri manzilga kirsangiz va bu xatolikni ko'rsangiz,
            iltimos, biz bilan <Link to="/contact" className="underline font-medium">aloqa</Link>ga chiqing.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
