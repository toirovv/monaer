import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../App'
import { ShoppingCart, Plus, Minus, Trash2, User, Phone, MapPin, CreditCard, Check, X, Map } from 'lucide-react'
import UkraineMap from '../Components/UkraineMap'
import YandexMap from '../Components/YandexMap'

function Backet() {
  const { isAuthenticated } = useContext(AuthContext)
  const [cart, setCart] = useState([])
  const [userData, setUserData] = useState({ name: '', phone: '' })
  const [location, setLocation] = useState({ id: '', address: '' })
  const [showMap, setShowMap] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    loadCart()
    if (isAuthenticated) {
      loadUserData()
    }
  }, [isAuthenticated])

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }

  const loadUserData = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUserData({
        name: user.name || '',
        phone: user.phone || ''
      })
    }
  }

  const updateQuantity = (id, change) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const sendOrderToTelegram = async (orderData) => {
    try {
      const BOT_TOKEN = '8284427869:AAEgj3neufLi5MYMsiAXV18JO6_wsMGm7do'
      const CHAT_ID = '5165340806'

      const message = `
🛒 YANGI BUYURTMA!

👤 Mijoz ma'lumotlari:
🏷 Ism: ${orderData.customer.name}
📞 Telefon: ${orderData.customer.phone}

📍 Yetkazib berish manzili:
🏠 ${orderData.location.address}

📦 Buyurtma tafsilotlari:
${orderData.items.map((item, index) => `${index + 1}. ${item.name} x ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} so'm`).join('\n')}

💰 Jami summa: ${orderData.total.toLocaleString()} so'm
⏰ Buyurtma vaqti: ${new Date().toLocaleString('uz-UZ', {
        timeZone: 'Asia/Tashkent'
      })}
🆔 Buyurtma ID: ${Date.now()}
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

  const handleOrderSubmit = async (e) => {
    e.preventDefault()
    if (!userData.name || !userData.phone || !location.address) {
      alert('Iltimos, barcha maydonlarni to\'ldiring')
      return
    }

    const order = {
      id: Date.now(),
      items: cart,
      total: getTotalPrice(),
      customer: userData,
      location: location,
      date: new Date().toISOString()
    }

    try {
      // Telegramga yuborish
      await sendOrderToTelegram(order)

      // Local storage ga saqlash
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      orders.push(order)
      localStorage.setItem('orders', JSON.stringify(orders))

      localStorage.removeItem('cart')
      setCart([])
      setOrderComplete(true)
      setShowCheckout(false)
    } catch (error) {
      console.error('Xatolik:', error)
      // Agar Telegram ishlamasa, local storage ga saqlaymiz
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      orders.push(order)
      localStorage.setItem('orders', JSON.stringify(orders))

      localStorage.removeItem('cart')
      setCart([])
      setOrderComplete(true)
      setShowCheckout(false)
    }
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Buyurtmangiz qabul qilindi!</h2>
          <p className="text-gray-600 mb-6">Tez orada siz bilan bog'lanamiz</p>
          <button
            onClick={() => setOrderComplete(false)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Asosiy sahifaga qaytish
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white p-8">
            <h1 className="text-4xl font-bold flex items-center gap-4">
              <ShoppingCart className="w-10 h-10" />
              Buyurtma berish
            </h1>
            <p className="text-blue-100 mt-2">Mahsulotlarni tanlang va buyurtmangizni rasmiylashtiring</p>
          </div>

          <div className="p-8">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="w-32 h-32 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-600 mb-3">Savatchangiz bo'sh</h3>
                <p className="text-gray-500 text-lg">Mahsulotlarni qo'shish uchun katalogni ko'ring</p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Mahsulotlar</h2>
                  {cart.map((item) => (
                    <div key={item.id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 flex items-center justify-between border border-gray-200 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-6">
                        <img src={item.image || '/placeholder.jpg'} alt={item.name} className="w-24 h-24 object-cover rounded-xl shadow-md" />
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                          <p className="text-2xl font-bold text-blue-600">{item.price?.toLocaleString()} so'm</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-white rounded-xl border-2 border-gray-300 shadow-inner">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-3 hover:bg-blue-50 transition-colors rounded-l-xl border-r border-gray-300"
                          >
                            <Minus className="w-5 h-5 text-gray-700" />
                          </button>
                          <span className="px-6 py-3 font-bold text-xl bg-gray-50 min-w-[60px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-3 hover:bg-blue-50 transition-colors rounded-r-xl border-l border-gray-300"
                          >
                            <Plus className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-4 text-red-500 hover:bg-red-50 rounded-xl transition-all hover:scale-110"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white sticky top-8">
                    <h3 className="text-2xl font-bold mb-6">Buyurtma ma'lumotlari</h3>

                    <form onSubmit={handleOrderSubmit} className="space-y-6">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-blue-100 mb-3">
                          <User className="w-4 h-4" />
                          Ism
                        </label>
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          className="w-full px-4 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/60 text-lg"
                          placeholder="Ismingiz"
                          required
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-blue-100 mb-3">
                          <Phone className="w-4 h-4" />
                          Telefon raqam
                        </label>
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          className="w-full px-4 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/60 text-lg"
                          placeholder="+998 XX XXX-XX-XX"
                          required
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-blue-100 mb-3">
                          <MapPin className="w-4 h-4" />
                          Yetkazib berish manzili
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={location.address}
                            readOnly
                            className="flex-1 px-4 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-white/60"
                            placeholder="Manzilni tanlang"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowMap(true)}
                            className="px-4 py-4 bg-white/20 backdrop-blur text-white rounded-xl hover:bg-white/30 transition-all border border-white/30"
                          >
                            <Map className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-white/20 pt-6">
                        <div className="space-y-3 mb-6">
                          {cart.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm text-blue-100">
                              <span>{item.name} x {item.quantity}</span>
                              <span className="font-medium">{(item.price * item.quantity).toLocaleString()} so'm</span>
                            </div>
                          ))}
                          <div className="border-t border-white/20 pt-3">
                            <div className="flex justify-between text-xl font-bold">
                              <span>Jami:</span>
                              <span className="text-2xl">{getTotalPrice().toLocaleString()} so'm</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-[310px] bg-white text-blue-600 p-[10px] rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3"
                        >
                          <CreditCard className="w-6 h-6" />
                          Rasmiylashtirish
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Backet
