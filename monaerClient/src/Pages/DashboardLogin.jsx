import React, { useState } from 'react'
import { User, Lock, Eye, EyeOff, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function DashboardLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: 'admin@monaer.com',
    password: '1234566'
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email kiritilishi shart"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email noto'g'ri formatda"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Parol kiritilishi shart"
    } else if (formData.password.length < 4) {
      newErrors.password = "Parol kamida 4 ta belgidan iborat bo'lishi kerak"
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
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Debug: Log form d ata
      console.log('Login attempt:', formData)
      
      // Simple authentication - hardcoded credentials
      if (formData.email === 'admin@monaer.com' && formData.password === '1234566') {
        // Store login session
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          name: 'Admin',
          role: 'admin'
        }))
        
        console.log('Login successful, navigating to dashboard')
        navigate('/dashboard')
      } else {
        console.log('Login failed - credentials mismatch')
        setErrors({ general: 'Email yoki parol noto\'g\'ri' })
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
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="https://static.tildacdn.com/tild3463-3734-4963-a665-653363316531/Frame_2087327802.png"
              alt="Monaer Dashboard"
              className="h-12 mx-auto mb-4 rounded-lg"
            />
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboardga kirish
            </h1>
            <p className="text-gray-600 mt-2">
              Admin paneliga kirish uchun ma'lumotlarni kiriting
            </p>
          </div>

          {/* Login Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Test login:</strong><br />
              Email: admin@monaer.com<br />
              Parol: 1234566
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@monaer.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Parol</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Parol"
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-3"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Kirilmoqda...</span>
                </div>
              ) : (
                'Kirish'
              )}
            </button>
            
            {/* Auto-login button for testing */}
            <button
              type="button"
              onClick={() => {
                setFormData({
                  email: 'admin@monaer.com',
                  password: '1234566'
                })
                setTimeout(() => {
                  document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }))
                }, 100)
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-all mt-2 text-sm"
            >
              Tez kirish (Admin)
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            <a href="/" className="text-blue-600 hover:underline font-medium">
              Asosiy sahifaga qaytish
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLogin
