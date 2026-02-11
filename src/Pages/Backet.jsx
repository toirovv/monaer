import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../App'
import { 
  ShoppingCart, Plus, Minus, Trash2, User, Phone, MapPin, 
  CreditCard, Check, Map, X, Navigation, Package, Clock, 
  Star, ArrowRight, ShoppingBag, Truck, Shield, Sparkles,
  TrendingUp, ChevronRight
} from 'lucide-react'

function Backet() {
  const { isAuthenticated } = useContext(AuthContext)
  const [cart, setCart] = useState([])
  const [userData, setUserData] = useState({ name: '', phone: '' })
  const [location, setLocation] = useState({ lat: '', lng: '', address: '' })
  const [showMap, setShowMap] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    loadCart()
    if (isAuthenticated) loadUserData()
  }, [isAuthenticated])

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCart(JSON.parse(savedCart))
  }

  const loadUserData = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUserData({
        name: user.name || user.fullName || '',
        phone: user.phone || ''
      })
    }
  }

  const updateQuantity = (id, change) => {
    setCart(prev => {
      const updated = prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
      localStorage.setItem('cart', JSON.stringify(updated))
      return updated
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => {
      const updated = prev.filter(item => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(updated))
      return updated
    })
  }

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // ... sendOrderToTelegram funksiyasi o'zgarmagan deb hisoblaymiz ...

  const handleLocationSelect = (locData) => {
    setLocation({
      lat: locData.lat || '',
      lng: locData.lng || '',
      address: locData.address || 'Tanlangan manzil'
    })
    setShowMap(false)
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation qo‘llab-quvvatlanmaydi")
      return
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          address: `Joylashuv: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`
        })
      },
      err => alert("Joylashuv xatosi: " + err.message)
    )
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault()
    if (!userData.name || !userData.phone || !location.address) {
      alert("Barcha maydonlarni to‘ldiring")
      return
    }
    // qolgan qismi o'zgarmagan...
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-5 animate-pulse">
            <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
            Buyurtma qabul qilindi!
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
            Tez orada aloqaga chiqamiz
          </p>
          <button
            onClick={() => setOrderComplete(false)}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3.5 sm:py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all active:scale-95"
          >
            Yangi buyurtma
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Savatcha
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">{cart.length} ta mahsulot</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Tezkor yetkazish</span>
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm text-gray-500">Jami</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {getTotalPrice().toLocaleString()} so'm
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center relative z-10">
          <div className="relative mb-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center animate-pulse">
              <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Savatchangiz bo'sh 😔
          </h3>
          <p className="text-gray-600 mb-8 max-w-md text-base sm:text-lg">
            Ajoyib mahsulotlarni qo'shish uchun katalogga o'ting
          </p>
          <a
            href="/catalog"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all active:scale-95 shadow-xl hover:shadow-2xl"
          >
            <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Katalogga o'tish
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* LEFT - Mahsulotlar */}
            <div className="lg:flex-1 order-2 lg:order-1">
              {/* Statistik mini-kartalar */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-5 sm:p-6 text-white mb-6 shadow-lg">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div>
                    <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 opacity-90" />
                    <p className="text-xl sm:text-2xl font-bold">{cart.length}</p>
                    <p className="text-xs sm:text-sm opacity-80">Mahsulot</p>
                  </div>
                  <div>
                    <Star className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 text-yellow-300" />
                    <p className="text-xl sm:text-2xl font-bold">
                      {cart.reduce((s, i) => s + i.quantity, 0)}
                    </p>
                    <p className="text-xs sm:text-sm opacity-80">Jami soni</p>
                  </div>
                  <div>
                    <Truck className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1" />
                    <p className="text-xl sm:text-2xl font-bold">2 soat</p>
                    <p className="text-xs sm:text-sm opacity-80">Tezkor yetkazish</p>
                  </div>
                  <div>
                    <Shield className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1" />
                    <p className="text-xl sm:text-2xl font-bold">100%</p>
                    <p className="text-xs sm:text-sm opacity-80">Kafolat</p>
                  </div>
                </div>
              </div>

              {/* Mahsulot kartalari */}
              <div className="space-y-4 sm:space-y-5">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 border border-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image || '/placeholder.jpg'}
                        alt={item.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg sm:rounded-xl"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-1.5 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-lg sm:text-xl font-bold text-blue-600 mb-3">
                          {item.price?.toLocaleString()} so‘m
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-gray-50 rounded-lg border border-blue-200">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2.5 sm:p-3 hover:bg-blue-100 rounded-l-lg"
                            >
                              <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            </button>
                            <span className="px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-blue-700 min-w-[52px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2.5 sm:p-3 hover:bg-blue-100 rounded-r-lg"
                            >
                              <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-3 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">Jami:</span>
                      <span className="font-semibold text-blue-700">
                        {(item.price * item.quantity).toLocaleString()} so‘m
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT - Forma (sticky on large screens) */}
            <div className="lg:w-96 lg:min-w-[380px] order-1 lg:order-2 mb-6 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 border border-blue-50">
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    Buyurtma ma‘lumotlari
                  </h2>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                      <User className="w-4 h-4 text-blue-600" />
                      Ism
                    </label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={e => setUserData({ ...userData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-base"
                      placeholder="Ism-familyangiz"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                      <Phone className="w-4 h-4 text-blue-600" />
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={e => setUserData({ ...userData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all text-base"
                      placeholder="+998 XX XXX XX XX"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Manzil
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={location.address}
                        readOnly
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 text-base"
                        placeholder="Manzil tanlanmagan"
                        required
                      />
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                        title="Mening joylashuvim"
                      >
                        <Navigation className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowMap(true)}
                        className="p-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors"
                        title="Xaritadan tanlash"
                      >
                        <Map className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50/70 rounded-xl p-4 sm:p-5 mt-2">
                    <h3 className="font-semibold text-gray-800 mb-3">Xulosa</h3>
                    <div className="space-y-2 text-sm sm:text-base">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <span className="text-gray-600 truncate max-w-[65%]">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium text-blue-700 whitespace-nowrap">
                            {(item.price * item.quantity).toLocaleString()} so‘m
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-blue-200 mt-3 pt-3 flex justify-between font-bold text-lg sm:text-xl">
                      <span>Jami:</span>
                      <span className="text-blue-700">
                        {getTotalPrice().toLocaleString()} so‘m
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-cyan-700 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Yuborilmoqda...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Buyurtma berish
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Map modal - mobil uchun optimallashtirilgan */}
      {showMap && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg sm:max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="p-5 sm:p-6 border-b flex justify-between items-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Map className="w-6 h-6 text-blue-600" />
                Manzil tanlash
              </h3>
              <button
                onClick={() => setShowMap(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-7 h-7 text-gray-600" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
              {/* placeholder xarita joyi */}
              <div className="h-64 sm:h-80 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                Xarita bu yerda ko‘rsatiladi (Google/OpenStreetMap)
              </div>

              <div className="space-y-4">
                <button
                  onClick={getCurrentLocation}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3.5 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 flex items-center justify-center gap-2"
                >
                  <Navigation className="w-5 h-5" />
                  Joriy joylashuvni olish
                </button>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yoki manzilni qo‘lda yozing:
                  </label>
                  <textarea
                    placeholder="To‘liq manzilingiz..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 min-h-[100px] resize-none"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        const val = e.target.value.trim()
                        if (val) handleLocationSelect({ address: val })
                      }
                    }}
                  />
                  <button
                    onClick={e => {
                      const ta = e.target.parentElement.querySelector('textarea')
                      const val = ta?.value.trim()
                      if (val) handleLocationSelect({ address: val })
                    }}
                    className="mt-3 w-full bg-blue-100 text-blue-700 py-3 rounded-xl font-medium hover:bg-blue-200 transition-colors"
                  >
                    Manzilni saqlash
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Backet 