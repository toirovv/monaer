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

  // Backend API orqali Telegram botga xabar yuborish
  const sendToTelegram = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: userData.fullName,
          phone: userData.phone
        })
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Xabar yuborishda xatolik')
      }

      return data
    } catch (error) {
      console.error("Backend API xatolik:", error)
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
      localStorage.setItem(
        'user',
        JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone.replace(/[^\d]/g, ''),
          password: formData.password, // real loyihada hash qilinishi kerak!
          registeredAt: new Date().toISOString(),
        })
      )

      // "Kirgan" holatini saqlash
      localStorage.setItem('isLoggedIn', 'true')

      setIsSuccess(true)

      // 1.5 soniyadan keyin to'g'ridan-to'g'ri Home sahifasiga o'tish
      setTimeout(() => {
        navigate('/')
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Muvaffaqiyatli!
            </h1>
            <p className="text-gray-600 mb-6">
              Hisobingiz yaratildi. Bosh sahifaga o'tkazilyapsiz...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Orqaga</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <img
              src="https://static.tildacdn.com/tild3463-3734-4963-a665-653363316531/Frame_2087327802.png"
              alt="Monaer Logo"
              className="h-12 mx-auto mb-4 rounded-lg"
            />
            <h1 className="text-2xl font-bold text-gray-900">Ro'yxatdan o'tish</h1>
            <p className="text-gray-600 mt-2">Ma'lumotlarni kiriting</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Ism familiya */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ism familiya</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Ism familiyangiz"
                  className={`w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Telefon */}
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

            {/* Parol */}
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

            {/* Parol tasdiqlash */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Parolni tasdiqlang</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Parolni qayta kiriting"
                  maxLength={6}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Shartlar bilan rozilik */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className={`mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 ${
                  errors.agreeToTerms ? 'border-red-500' : ''
                }`}
              />
              <span className="text-sm text-gray-600">
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
              <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
            )}

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
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
                'Ro‘yxatdan o‘tish'
              )}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
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