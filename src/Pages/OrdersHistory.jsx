import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../App'
import { ShoppingCart, Package, Clock, MapPin, User, Phone, X, ArrowLeft } from 'lucide-react'

function OrdersHistory() {
  const { isAuthenticated } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    loadOrders()
  }, [])

  const loadOrders = () => {
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
    setLoading(false)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('uz-UZ', {
      timeZone: 'Asia/Tashkent',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'processing':
        return 'text-blue-600 bg-blue-50'
      case 'completed':
        return 'text-green-600 bg-green-50'
      case 'cancelled':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Kutilmoqda'
      case 'processing':
        return 'Ishlanmoqda'
      case 'completed':
        return 'Bajarildi'
      case 'cancelled':
        return 'Bekor qilindi'
      default:
        return 'Noma\'lum'
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tizimga kiring</h2>
          <p className="text-gray-600 mb-6">Buyurtmalar tarixini ko'rish uchun avval tizimga kiring</p>
          <a 
            href="/login" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Tizimga kirish
          </a>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Buyurtmalar yuklanmoqda...</p>
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
              <Package className="w-10 h-10" />
              Buyurtmalar tarixi
            </h1>
            <p className="text-blue-100 mt-2">Barcha buyurtmalaringizni shu yerda ko'rishingiz mumkin</p>
          </div>

          <div className="p-8">
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="w-32 h-32 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-600 mb-3">Sizda hali buyurtmalar yo'q</h3>
                <p className="text-gray-500 text-lg mb-6">
                  Birinchi buyurtmani berish uchun 
                  <a href="/catalog" className="text-blue-600 hover:text-blue-700 font-medium underline">
                    katalogni ko'ring
                  </a>
                </p>
                <a 
                  href="/catalog" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Katalogga o'tish
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Barcha buyurtmalar ({orders.length})
                  </h2>
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Hammasi
                    </button>
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      Faqat bajarilgan
                    </button>
                  </div>
                </div>

                <div className="grid gap-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status || 'completed')}`}></div>
                          <div>
                            <h3 className="font-bold text-gray-800">Buyurtma #{order.id}</h3>
                            <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Mijoz
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-sm"><strong>Ism:</strong> {order.customer?.name || 'Noma\'lum'}</p>
                              <p className="text-sm"><strong>Telefon:</strong> {order.customer?.phone || 'Noma\'lum'}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              Manzil
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-sm">{order.location?.address || 'Noma\'lum'}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                              Mahsulotlar
                            </h4>
                          </div>
                          <div className="space-y-2">
                            {order.items?.map((item, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center gap-3">
                                  <img 
                                    src={item.image || '/placeholder.jpg'} 
                                    alt={item.name} 
                                    className="w-12 h-12 object-cover rounded-lg"
                                  />
                                  <div>
                                    <p className="font-medium text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">x {item.quantity}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-blue-600">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">Buyurtma summasi</p>
                            <p className="text-2xl font-bold text-gray-800">{formatPrice(order.total)}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status || 'completed')}`}>
                            {getStatusText(order.status || 'completed')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersHistory
