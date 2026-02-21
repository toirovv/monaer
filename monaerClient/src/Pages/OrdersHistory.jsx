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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl lg:shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2 sm:gap-3 lg:gap-4">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
              Buyurtmalar tarixi
            </h1>
            <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base">Barcha buyurtmalaringizni shu yerda ko'rishingiz mumkin</p>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {orders.length === 0 ? (
              <div className="text-center py-8 sm:py-12 lg:py-16">
                <ShoppingCart className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-gray-300 mx-auto mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-600 mb-2 sm:mb-3">Sizda hali buyurtmalar yo'q</h3>
                <p className="text-gray-500 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                  Birinchi buyurtmani berish uchun 
                  <a href="/catalog" className="text-blue-600 hover:text-blue-700 font-medium underline">
                    katalogni ko'ring
                  </a>
                </p>
                <a 
                  href="/catalog" 
                  className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  Katalogga o'tish
                </a>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Barcha buyurtmalar ({orders.length})
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base">
                      Hammasi
                    </button>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm sm:text-base">
                      Faqat bajarilgan
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:gap-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 hover:shadow-lg transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getStatusColor(order.status || 'completed')}`}></div>
                          <div>
                            <h3 className="font-bold text-gray-800 text-sm sm:text-base">Buyurtma #{order.id}</h3>
                            <p className="text-xs sm:text-sm text-gray-500">{formatDate(order.date)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                              <User className="w-3 h-3 sm:w-4 sm:h-4" />
                              Mijoz
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 lg:p-4">
                              <p className="text-xs sm:text-sm"><strong>Ism:</strong> {order.customer?.name || 'Noma\'lum'}</p>
                              <p className="text-xs sm:text-sm"><strong>Telefon:</strong> {order.customer?.phone || 'Noma\'lum'}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                              Manzil
                            </h4>
                            <div className="bg-gray-50 rounded-lg p-2 sm:p-3 lg:p-4">
                              <p className="text-xs sm:text-sm">{order.location?.address || 'Noma\'lum'}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                            <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                            Mahsulotlar
                          </h4>
                          <div className="space-y-1.5 sm:space-y-2">
                            {order.items?.map((item, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2 sm:p-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <img 
                                    src={item.image || '/placeholder.jpg'} 
                                    alt={item.name} 
                                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-cover rounded-lg"
                                  />
                                  <div>
                                    <p className="font-medium text-gray-800 text-xs sm:text-sm line-clamp-2">{item.name}</p>
                                    <p className="text-xs text-gray-500">x {item.quantity}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-blue-600 text-xs sm:text-sm">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                          <div>
                            <p className="text-xs sm:text-sm text-gray-500">Buyurtma summasi</p>
                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{formatPrice(order.total)}</p>
                          </div>
                          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(order.status || 'completed')}`}>
                            {getStatusText(order.status || 'completed')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersHistory
