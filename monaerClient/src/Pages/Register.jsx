import React, { useState } from 'react'
import { User, Lock, Eye, EyeOff, Phone, ArrowLeft, CheckCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
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

  // Faqat ruxsat etilgan operator kodlari
  const allowedCodes = ['90', '93', '98', '99']

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === 'phone') {
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
        [name]: type === 'checkbox' ? checked : value
      }))
    }

    // Xatoni tozalash
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Ism familiya
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Ism familiya kiritilishi shart"
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Ism familiya kamida 3 ta belgidan iborat bo'lishi kerak"
    }

    // Telefon
    if (!formData.phone) {
      newErrors.phone = "Telefon raqam kiritilishi shart"
    } else {
      const digits = formData.phone.replace(/[^\d]/g, '')
      if (digits.length !== 9) {
        newErrors.phone = "Telefon raqam to'liq kiritilmagan (9 ta raqam)"
      } else {
        const code = digits.substring(0, 2)
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

    // Parol tasdiqlash
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Parollar mos kelmayapti"
    }

    // Shartlar bilan rozilik
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Shartlar bilan rozilik berishingiz kerak"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sendToTelegram = async (userData) => {
    try {
      const BOT_TOKEN = '8532460020:AAFaC4WcQj51vigfsfU8Vx5lmkNPA0TJivI'
      const CHAT_ID = '5165340806'

      const message = `
🆕 Yangi foydalanuvchi ro'yxatdan o'tdi!

👤 Ism: ${userData.fullName}
📱 Telefon: ${userData.phone}
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
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Backend orqali Telegramga xabar yuborish
      await sendToTelegram({ fullName: formData.fullName, phone: formData.phone })

      // localStorage ga saqlash
      const userData = {
        fullName: formData.fullName,
        phone: '+998' + formData.phone.replace(/[^\d]/g, ''),
        password: formData.password, // real loyihada hash qilinishi kerak!
        registeredAt: new Date().toISOString(),
        email: `${formData.fullName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        totalOrders: 0,
        totalSpent: 0,
        lastLogin: new Date().toISOString(),
        deviceInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          deviceType: getDeviceType(),
          browser: getBrowserName(),
          registeredFrom: navigator.language || 'unknown'
        }
      }
      
      localStorage.setItem('user', JSON.stringify(userData))

      // "Kirgan" holatini saqlash
      localStorage.setItem('isLoggedIn', 'true')

      // Dashboard uchun foydalanuvchi ma'lumotlarini saqlash
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const allRegisteredUsers = JSON.parse(localStorage.getItem('allRegisteredUsers') || '[]')
      
      // Tekshirish - bu foydalanuvchi avval ro'yxatdan o'tganmi
      const existingUser = registeredUsers.find(user => user.phone === userData.phone)
      if (!existingUser) {
        registeredUsers.push(userData)
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
      }
      
      // Barcha foydalanuvchilar ro'yxatini yangilash
      const existingAllUser = allRegisteredUsers.find(user => user.phone === userData.phone)
      if (!existingAllUser) {
        allRegisteredUsers.push(userData)
        localStorage.setItem('allRegisteredUsers', JSON.stringify(allRegisteredUsers))
      }
      
      // Trigger event to update dashboard
      window.dispatchEvent(new Event('usersUpdated'))
      
      // Send notification to admin about new user
      const adminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]')
      adminNotifications.push({
        id: Date.now(),
        type: 'new_user',
        title: 'Yangi foydalanuvchi ro\'yxatdan o\'tdi',
        message: `${userData.fullName || userData.name || userData.email} (${userData.phone}) tizimga qo\'shildi.`,
        timestamp: new Date().toISOString(),
        read: false,
        userData: userData
      })
      localStorage.setItem('adminNotifications', JSON.stringify(adminNotifications))
      
      // Trigger admin notification event
      window.dispatchEvent(new CustomEvent('adminNotification', {
        detail: {
          type: 'new_user',
          user: userData
        }
      }))
      
      setIsSuccess(true)

      // Regular users - go to home page, admin users - go to dashboard
      setTimeout(() => {
        // Check if user is admin
        if (userData.phone === '+998938573311' && userData.password === '123456') {
          navigate('/dashboard')
        } else {
          navigate('/')
        }
      }, 1500)

    } catch (error) {
      console.error('Ro\'yxatdan o\'tish xatosi:', error)
      if (error.message.includes('fetch')) {
        setErrors({ general: 'Serverga ulanishda xatolik. Iltimos, internet ulanishini tekshiring.' })
      } else {
        setErrors({ general: error.message || 'Xatolik yuz berdi. Qayta urinib ko\'ring.' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Muvaffaqiyat ekrani (qisqa ko'rinish uchun)
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-3 sm:p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              Muvaffaqiyatli!
            </h1>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Hisobingiz yaratildi. Bosh sahifaga o'tkazilyapsiz...
            </p>
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-green-600 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-md w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft size={16} />
          <span>Orqaga</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <img
              src="https://static.tildacdn.com/tild3463-3734-4963-a665-653363316531/Frame_2087327802.png"
              alt="Monaer Logo"
              className="h-8 sm:h-10 lg:h-12 mx-auto mb-3 sm:mb-4 rounded-lg"
            />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Ro'yxatdan o'tish</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Ma'lumotlarni kiriting</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Ism familiya */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">Ism familiya</label>
              <div className="relative">
                <User className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Ism familiyangiz"
                  className={`w-full pl-8 sm:pl-10 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">Telefon raqam</label>
              <div className="relative">
                <Phone className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(99) 123 45 67"
                  className={`w-full pl-8 sm:pl-10 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
              <p className="text-xs text-gray-500 mt-1 sm:mt-1.5">
                Faqat 90, 93, 98, 99 bilan boshlanadigan raqamlar
              </p>
            </div>

            {/* Parol */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">Parol</label>
              <div className="relative">
                <Lock className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="6 ta belgi"
                  maxLength={6}
                  autoComplete="new-password"
                  className={`w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Parol tasdiqlash */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">Parolni tasdiqlang</label>
              <div className="relative">
                <Lock className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Parolni qayta kiriting"
                  maxLength={6}
                  className={`w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Shartlar bilan rozilik */}
            <div className="flex items-start gap-2 sm:gap-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className={`mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 ${
                  errors.agreeToTerms ? 'border-red-500' : ''
                }`}
              />
              <span className="text-xs sm:text-sm text-gray-600">
                Men{' '}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  foydalanish shartlari
                </Link>{' '}
                va{' '}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  maxfiylik siyosati
                </Link>{' '}
                bilan roziman
              </span>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.agreeToTerms}</p>
            )}

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-2 sm:p-3 rounded-lg text-xs sm:text-sm">
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 sm:py-3.5 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2 sm:mt-3 text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Yuklanmoqda...</span>
                </div>
              ) : (
                'Ro‘yxatdan o‘tish'
              )}
            </button>
          </form>

          <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
            Hisobingiz bormi?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Kirish
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register