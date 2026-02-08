import React, { useState } from 'react'
import { User, Lock, Eye, EyeOff, Phone, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      // Format: (90) 123 32 32
      let phoneValue = value.replace(/[^\d]/g, '')
      
      // Check if it starts with valid Uzbekistan codes
      if (phoneValue.length >= 2) {
        const firstTwo = phoneValue.substring(0, 2)
        const validCodes = ['90', '91', '93', '94', '95', '97', '98', '99']
        
        if (!validCodes.includes(firstTwo)) {
          return // Don't update if invalid code
        }
      }
      
      // Format the phone number
      if (phoneValue.length === 0) {
        phoneValue = ''
      } else if (phoneValue.length <= 3) {
        phoneValue = '(' + phoneValue
      } else if (phoneValue.length <= 5) {
        phoneValue = '(' + phoneValue.substring(0, 3) + ') ' + phoneValue.substring(3)
      } else if (phoneValue.length <= 7) {
        phoneValue = '(' + phoneValue.substring(0, 3) + ') ' + phoneValue.substring(3, 5) + ' ' + phoneValue.substring(5)
      } else {
        phoneValue = '(' + phoneValue.substring(0, 3) + ') ' + phoneValue.substring(3, 5) + ' ' + phoneValue.substring(5, 7)
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: phoneValue
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.phone || formData.phone === '' || formData.phone.length < 9) {
      newErrors.phone = 'Telefon raqam to\'liq kiriting'
    } else {
      // Check if it's valid Uzbekistan number
      const digits = formData.phone.replace(/[^\d]/g, '')
      if (digits.length !== 9) {
        newErrors.phone = 'Telefon raqam noto\'g\'ri formatda'
      } else {
        const firstTwo = digits.substring(0, 2)
        const validCodes = ['90', '91', '93', '94', '95', '97', '98', '99']
        if (!validCodes.includes(firstTwo)) {
          newErrors.phone = "Faqat O'zbekiston telefon raqamlari qabul qilinadi (90, 91, 93, 94, 95, 97, 98, 99)"
        }
      }
    }

    if (!formData.password) {
      newErrors.password = 'Parol maydoni to\'ldirilishi shart'
    } else if (formData.password.length !== 6) {
      newErrors.password = 'Parol 6 ta belgidan iborat bo\'lishi kerak'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Check if user exists in localStorage
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        
        // Check if phone and password match
        if (user.phone === formData.phone && user.password === formData.password) {
          // Store login session
          localStorage.setItem('isLoggedIn', 'true')
          navigate('/profile')
        } else {
          setErrors({ general: 'Telefon raqam yoki parol noto\'g\'ri' })
        }
      } else {
        setErrors({ general: 'Bu telefon raqami bilan ro\'yxatdan o\'tilmagan. Ro\'yxatdan o\'ting.' })
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ general: 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Orqaga qaytish</span>
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="https://static.tildacdn.com/tild3463-3734-4963-a665-653363316531/Frame_2087327802.png"
              alt="Monaer Logo"
              className="h-12 mx-auto mb-4 rounded-lg"
            />
            <h1 className="text-2xl font-bold text-gray-900">
              Tizimga kirish
            </h1>
            <p className="text-gray-600 mt-2">
              Hisobingizga kirish uchun ma\'lumotlarni kiriting
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon raqam
              </label>
              <div className="relative">
                <Phone 
                  size={20} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(90) 123 32 32"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Faqat O\'zbekiston raqamlari: 90, 91, 93, 94, 95, 97, 98, 99
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parol
              </label>
              <div className="relative">
                <Lock 
                  size={20} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="6 ta belgi"
                  maxLength={6}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                6 ta belgidan iborat bo'lishi kerak
              </p>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Kirilmoqda...</span>
                </div>
              ) : (
                <span>Tizimga kirish</span>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Hisobingiz yo'qmi?
              <Link 
                to="/register" 
                className="ml-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Ro'yxatdan o'ting
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
