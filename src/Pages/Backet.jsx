import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../App'
import { 
  ShoppingCart, Plus, Minus, Trash2, User, Phone, MapPin, 
  CreditCard, Check, Map, X, Navigation, Package, Clock, 
  Star, ArrowRight, ShoppingBag, Truck, Shield, Sparkles,
  TrendingUp, ChevronRight, Zap, Award, Gift
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
      alert("Geolocation qo'llab-quvvatlanmaydi")
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
      alert("Barcha maydonlarni to'ldiring")
      return
    }
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 2000))
    setIsSubmitting(false)
    setOrderComplete(true)
    setCart([])
    localStorage.removeItem('cart')
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg text-center border border-emerald-100">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Buyurtma qabul qilindi! 🎉
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Tez orada operatorimiz siz bilan bog'lanadi
          </p>
          <button
            onClick={() => setOrderComplete(false)}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all active:scale-95 shadow-lg"
          >
            Asosiy sahifaga qaytish
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      {/* Modern Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                  {cart.length}
                </div>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Savatcha
                </h1>
                <p className="text-sm text-gray-500">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} ta mahsulot
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Tezkor yetkazish</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Jami summa</p>
                <p className="text-2xl lg:text-3xl font-bold text-blue-600">
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
            <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center animate-pulse">
              <ShoppingCart className="w-20 h-20 text-blue-400" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-10 h-10 text-yellow-400 animate-spin" />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            Savatchangiz bo'sh 🛒
          </h3>
          <p className="text-gray-600 mb-8 max-w-md text-lg">
            Ajoyib mahsulotlarni qo'shish uchun katalogga o'ting
          </p>
          <a
            href="/catalog"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-95 shadow-xl hover:shadow-2xl"
          >
            <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Katalogga o'tish
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col xl:flex-row xl:gap-8">
            {/* LEFT - Mahsulotlar */}
            <div className="xl:flex-1 order-2 xl:order-1">
              {/* Statistik kartalar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{cart.length}</p>
                      <p className="text-xs text-gray-500">Mahsulot</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {cart.reduce((s, i) => s + i.quantity, 0)}
                      </p>
                      <p className="text-xs text-gray-500">Jami soni</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Truck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">2 soat</p>
                      <p className="text-xs text-gray-500">Yetkazish</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">100%</p>
                      <p className="text-xs text-gray-500">Kafolat</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mahsulot kartalari */}
              <div className="space-y-4">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
                  >
                    <div className="flex gap-6">
                      <img
                        src={item.image || '/placeholder.jpg'}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-xl"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-2xl font-bold text-blue-600 mb-4">
                          {item.price?.toLocaleString()} so'm
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-3 hover:bg-blue-100 rounded-l-xl transition-colors"
                            >
                              <Minus className="w-5 h-5 text-gray-600" />
                            </button>
                            <span className="px-6 py-3 font-semibold text-gray-900 min-w-[60px] text-center text-lg">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-3 hover:bg-blue-100 rounded-r-xl transition-colors"
                            >
                              <Plus className="w-5 h-5 text-gray-600" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Jami:</span>
                      <span className="text-xl font-bold text-blue-600">
                        {(item.price * item.quantity).toLocaleString()} so'm
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT - Forma */}
            <div className="xl:w-96 xl:min-w-[400px] order-1 xl:order-2 mb-8 xl:mb-0 xl:sticky xl:top-24 xl:self-start">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Buyurtma ma'lumotlari
                  </h2>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 text-blue-600" />
                      Ismingiz
                    </label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={e => setUserData({ ...userData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                      placeholder="Ism-familyangiz"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={e => setUserData({ ...userData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                      placeholder="+998 XX XXX XX XX"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Manzil
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={location.address}
                        readOnly
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700"
                        placeholder="Manzil tanlanmagan"
                        required
                      />
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                        title="Mening joylashuvim"
                      >
                        <Navigation className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowMap(true)}
                        className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                        title="Xaritadan tanlash"
                      >
                        <Map className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">Xulosa</h3>
                    <div className="space-y-3">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-600 truncate max-w-[70%]">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium text-blue-700 whitespace-nowrap">
                            {(item.price * item.quantity).toLocaleString()} so'm
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-blue-200 mt-4 pt-4 flex justify-between items-center">
                      <span className="font-bold text-gray-900 text-lg">Jami:</span>
                      <span className="font-bold text-blue-700 text-xl">
                        {getTotalPrice().toLocaleString()} so'm
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-3 shadow-lg"
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

      {/* Map modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <Map className="w-6 h-6 text-blue-600" />
                Manzil tanlash
              </h3>
              <button
                onClick={() => setShowMap(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="h-80 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                Xarita bu yerda ko'rsatiladi
              </div>

              <div className="space-y-4">
                <button
                  onClick={getCurrentLocation}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2"
                >
                  <Navigation className="w-5 h-5" />
                  Joriy joylashuvni olish
                </button>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yoki manzilni qo'lda yozing:
                  </label>
                  <textarea
                    placeholder="To'liq manzilingiz..."
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
