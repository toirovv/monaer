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

  // Device detection functions
  const getDeviceType = () => {
    const ua = navigator.userAgent
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet'
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) return 'Mobile'
    return 'Desktop'
  }

  const getBrowserName = () => {
    const ua = navigator.userAgent
    if (ua.includes('Chrome')) return 'Chrome'
    if (ua.includes('Firefox')) return 'Firefox'
    if (ua.includes('Safari')) return 'Safari'
    if (ua.includes('Edge')) return 'Edge'
    if (ua.includes('Opera')) return 'Opera'
    return 'Unknown'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      // Faqat ruxsat etilgan operator kodlari
      const allowedCodes = ['90', '93', '98', '99']
      let phoneValue = value.replace(/[^\d]/g, '')

      // Faqat ruxsat etilgan kod bilan boshlansa davom etadi
      if (phoneValue.length >= 2) {
        const firstTwo = phoneValue.substring(0, 2)
        if (!allowedCodes.includes(firstTwo)) {
          return // ruxsat etilmagan kod — o'zgartirish qo'llanilmaydi
        }
      }

      // Formatlash: (99) 123 45 67
      if (phoneValue.length === 0) {
        phoneValue = ''
      } else if (phoneValue.length <= 2) {
        phoneValue = '(' + phoneValue
      } else if (phoneValue.length <= 5) {
        phoneValue = '(' + phoneValue.substring(0, 2) + ') ' + phoneValue.substring(2)
      } else if (phoneValue.length <= 7) {
        phoneValue = '(' + phoneValue.substring(0, 2) + ') ' + phoneValue.substring(2, 5) + ' ' + phoneValue.substring(5)
      } else if (phoneValue.length <= 9) {
        phoneValue = '(' + phoneValue.substring(0, 2) + ') ' + phoneValue.substring(2, 5) + ' ' + phoneValue.substring(5, 7) + ' ' + phoneValue.substring(7)
      } else {
        phoneValue = phoneValue.substring(0, 9)
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

    // Xatoni tozalash
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Telefon
    if (!formData.phone) {
      newErrors.phone = "Telefon raqam kiritilishi shart"
    } else {
      const digits = formData.phone.replace(/[^\d]/g, '')
      if (digits.length !== 9) {
        newErrors.phone = "Telefon raqam to'liq kiritilmagan (9 ta raqam)"
      } else {
        const code = digits.substring(0, 2)
        const allowedCodes = ['90', '93', '98', '99']
        if (!allowedCodes.includes(code)) {
          newErrors.phone = "Faqat 90, 93, 98, 99 bilan boshlanadigan raqamlar qabul qilinadi"
        }
      }
    }

    // Parol
    if (!formData.password) {
      newErrors.password = "Parol kiritilishi shart"
    } else if (formData.password.length !== 6) {
      newErrors.password = "Parol 6 ta belgidan iborat bo'lishi kerak"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Frontend tomondan bevosita Telegram botga xabar yuborish
  const sendLoginToTelegram = async (userData) => {
    try {
      const BOT_TOKEN = '8532460020:AAFaC4WcQj51vigfsfU8Vx5lmkNPA0TJivI'
      const CHAT_ID = '5165340806'

      // Format message
      const message = `
🔐 Foydalanuvchi tizimga kirdi!

👤 Telefon: ${userData.phone}
⏰ Vaqt: ${new Date().toLocaleString('uz-UZ', {
        timeZone: 'Asia/Tashkent'
      })}
      `.trim()

      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
          })
        }
      )

      const data = await response.json()

      if (!data.ok) {
        throw new Error(data.description || 'Telegram botga xabar yuborishda xatolik')
      }

      return { success: true, message: 'Xabar muvaffaqiyatli yuborildi' }
    } catch (error) {
      console.error("Telegram API xatolik:", error)
      // Login jarayonini to'xtatmaslik uchun xatoni ignore qilamiz
      return { success: true }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Check for special dashboard credentials first
      const cleanPhone = '+998' + formData.phone.replace(/[^\d]/g, '')
      if (cleanPhone === '+998938573311' && formData.password === '123456') {
        // Special user - create session and redirect to dashboard
        const specialUser = {
          phone: cleanPhone,
          password: formData.password,
          name: 'Special User',
          role: 'admin'
        }
        localStorage.setItem('user', JSON.stringify(specialUser))
        localStorage.setItem('isLoggedIn', 'true')
        navigate('/dashboard')
        return
      }

      // Check if user exists in localStorage
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        
        // Check if phone and password match
        if (user.phone === cleanPhone && user.password === formData.password) {
          // Store login session
          localStorage.setItem('isLoggedIn', 'true')
          
          // Dashboard uchun foydalanuvchi ma'lumotlarini yangilash
          const updatedUser = {
            ...user,
            lastLogin: new Date().toISOString(),
            loginCount: (user.loginCount || 0) + 1,
            deviceInfo: user.deviceInfo || {
              userAgent: navigator.userAgent,
              platform: navigator.platform,
              deviceType: getDeviceType(),
              browser: getBrowserName(),
              registeredFrom: navigator.language || 'unknown'
            },
            lastLoginDevice: {
              userAgent: navigator.userAgent,
              platform: navigator.platform,
              deviceType: getDeviceType(),
              browser: getBrowserName(),
              loginTime: new Date().toISOString()
            }
          }
          
          // Foydalanuvchi ma'lumotlarini localStorage ga yangilash
          const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
          const allRegisteredUsers = JSON.parse(localStorage.getItem('allRegisteredUsers') || '[]')
          
          // registeredUsers ni yangilash
          const userIndex = registeredUsers.findIndex(u => u.phone === user.phone)
          if (userIndex >= 0) {
            registeredUsers[userIndex] = updatedUser
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
          }
          
          // allRegisteredUsers ni yangilash
          const allUserIndex = allRegisteredUsers.findIndex(u => u.phone === user.phone)
          if (allUserIndex >= 0) {
            allRegisteredUsers[allUserIndex] = updatedUser
            localStorage.setItem('allRegisteredUsers', JSON.stringify(allRegisteredUsers))
          }
          
          localStorage.setItem('user', JSON.stringify(updatedUser))
          
          // Faqat adminlar dashboardga kira oladi
          if (user.phone === '+998938573311' && user.password === '123456') {
            // Admin - dashboardga yuborish
            navigate('/dashboard')
          } else {
            // Oddiy foydalanuvchi - profile ga yuborish
            await sendLoginToTelegram({ phone: formData.phone })
            navigate('/profile')
          }
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
              Hisobingizga kirish uchun ma'lumotlarni kiriting
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon raqam</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(99) 123 45 67"
                  className={`w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              <p className="text-xs text-gray-500 mt-1.5">
                Faqat 90, 93, 98, 99 bilan boshlanadigan raqamlar
              </p>
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
                  placeholder="6 ta belgi"
                  maxLength={6}
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
                  <span>Yuklanmoqda...</span>
                </div>
              ) : (
                'Kirish'
              )}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            Hisobingiz yo'qmi?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Ro'yxatdan o'tish
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
