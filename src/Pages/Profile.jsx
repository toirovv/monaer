import React, { useEffect, useState } from 'react'
import { User, Mail, Phone, MapPin, ShoppingBag, Heart, Settings, LogOut, Edit2, Save, X, Package, Clock, Star } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function Profile() {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [favorites, setFavorites] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const userData = localStorage.getItem('user')
    
    if (!isLoggedIn || !userData) {
      navigate('/login')
      return
    }

    // Load user data from localStorage
    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setEditForm(parsedUser)
    } catch (error) {
      console.error('Error parsing user data:', error)
      navigate('/login')
    }

    // Load mock orders
    const mockOrders = [
      {
        id: 'ORD-001',
        date: '2024-01-15',
        status: 'delivered',
        total: 2500000,
        items: [
          { name: 'Tormoz kalodkalari', quantity: 2, price: 1200000 },
          { name: 'G\'ildirak', quantity: 1, price: 1300000 }
        ]
      },
      {
        id: 'ORD-002',
        date: '2024-01-20',
        status: 'processing',
        total: 1800000,
        items: [
          { name: 'Akumulyator', quantity: 1, price: 1800000 }
        ]
      }
    ]
    setOrders(mockOrders)

    // Load mock favorites
    const mockFavorites = [
      {
        id: 1,
        name: 'Tormoz tizimi',
        price: 1200000,
        image: 'https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=Product',
        rating: 4.5
      },
      {
        id: 2,
        name: 'G\'ildiraklar to\'plami',
        price: 3500000,
        image: 'https://via.placeholder.com/150x150/10B981/FFFFFF?text=Product',
        rating: 4.8
      }
    ]
    setFavorites(mockFavorites)
  }, [navigate])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(editForm))
    setUser(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(user)
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
    navigate('/')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Yetkazib berildi'
      case 'processing':
        return 'Jarayonda'
      case 'pending':
        return 'Kutilmoqda'
      default:
        return 'Noma\'lum'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut size={20} />
              <span>Chiqish</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={40} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.fullName || user.email}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>

              {/* Edit Profile */}
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ism familiya
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={editForm.fullName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save size={16} />
                      <span>Saqlash</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <X size={16} />
                      <span>Bekor qilish</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-gray-400" />
                    <span className="text-gray-700">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="text-gray-400" />
                      <span className="text-gray-700">{user.phone}</span>
                    </div>
                  )}
                  {user.fullName && (
                    <div className="flex items-center gap-3">
                      <User size={20} className="text-gray-400" />
                      <span className="text-gray-700">{user.fullName}</span>
                    </div>
                  )}
                  <button
                    onClick={handleEdit}
                    className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Edit2 size={16} />
                    <span>Tahrirlash</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm ${
                      activeTab === 'orders'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ShoppingBag size={16} />
                    <span>Buyurtmalar</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('favorites')}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm ${
                      activeTab === 'favorites'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Heart size={16} />
                    <span>Saralanganlar</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm ${
                      activeTab === 'settings'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Settings size={16} />
                    <span>Sozlamalar</span>
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Sizda hali buyurtmalar yo'q</p>
                        <Link 
                          to="/catalog"
                          className="inline-block mt-4 text-blue-600 hover:text-blue-700"
                        >
                          Katalogga o'tish
                        </Link>
                      </div>
                    ) : (
                      orders.map(order => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">Buyurtma #{order.id}</h3>
                              <p className="text-sm text-gray-600">{order.date}</p>
                            </div>
                            <div className="text-right">
                              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                              <p className="text-sm font-semibold text-gray-900 mt-1">
                                {order.total.toLocaleString()} so'm
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-gray-600">{item.name} x{item.quantity}</span>
                                <span className="text-gray-900">{(item.price * item.quantity).toLocaleString()} so'm</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'favorites' && (
                  <div className="space-y-4">
                    {favorites.length === 0 ? (
                      <div className="text-center py-8">
                        <Heart size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Sizda hali saralangan mahsulotlar yo'q</p>
                        <Link 
                          to="/catalog"
                          className="inline-block mt-4 text-blue-600 hover:text-blue-700"
                        >
                          Katalogga o'tish
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {favorites.map(item => (
                          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                <div className="flex items-center gap-1 mb-2">
                                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm text-gray-600">{item.rating}</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900">
                                  {item.price.toLocaleString()} so'm
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hisob sozlamalari</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Email bildirishnomalari</p>
                            <p className="text-sm text-gray-600">Buyurtmalar va yangiliklar haqida email olish</p>
                          </div>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">SMS bildirishnomalari</p>
                            <p className="text-sm text-gray-600">Buyurtmalar holati haqida SMS olish</p>
                          </div>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Xavfsizlik</h3>
                      <div className="space-y-4">
                        <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <p className="font-medium text-gray-900">Parolni o'zgartirish</p>
                          <p className="text-sm text-gray-600">Hisobingiz parolini yangilang</p>
                        </button>
                        <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <p className="font-medium text-gray-900">Ikki faktorli autentifikatsiya</p>
                          <p className="text-sm text-gray-600">Qo'shimcha xavfsizlik qo'shing</p>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
