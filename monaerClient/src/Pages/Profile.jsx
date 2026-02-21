import React, { useEffect, useState } from 'react'
import { User, Mail, Phone, MapPin, ShoppingBag, LogOut, Edit2, Save, X, Package, Clock, Star, Settings, Map } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function Profile() {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [orders, setOrders] = useState([])
  const [showAdminButton, setShowAdminButton] = useState(false)
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
      
      // Check if user has admin credentials
      if (parsedUser.phone === '+998938573311' && parsedUser.password === '123456') {
        setShowAdminButton(true)
      }
    } catch (error) {
      console.error('Error parsing user data:', error)
      navigate('/login')
    }
  }, [navigate])

  // Separate useEffect for orders that depends on user
  useEffect(() => {
    // Load real orders from localStorage
    const loadOrders = () => {
      if (!user || !user.email) {
        setOrders([])
        return
      }
      
      const ordersData = localStorage.getItem('orders')
      if (ordersData) {
        try {
          const parsedOrders = JSON.parse(ordersData)
          // Filter orders for current user
          const userOrders = parsedOrders.filter(order => order.userEmail === user.email)
          setOrders(userOrders)
        } catch (error) {
          console.error('Error parsing orders:', error)
          setOrders([])
        }
      } else {
        setOrders([])
      }
    }

    loadOrders()

    // Listen for order updates
    const handleOrderUpdate = () => {
      loadOrders()
    }
    window.addEventListener('ordersUpdated', handleOrderUpdate)

    return () => {
      window.removeEventListener('ordersUpdated', handleOrderUpdate)
    }
  }, [user])

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
                  
                  {/* Admin Dashboard Button - only for admin users */}
                  {showAdminButton && (
                    <Link
                      to="/dashboard"
                      className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mt-2"
                    >
                      <Settings size={16} />
                      <span>Admin paneliga o'tish</span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Orders Only */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} className="text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Buyurtmalar</h2>
                </div>
              </div>

              <div className="p-6">
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
                              {order.total ? order.total.toLocaleString() : '0'} so'm
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.items && order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-600">{item.name} x{item.quantity}</span>
                              <span className="text-gray-900">{(item.price * item.quantity).toLocaleString()} so'm</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Map Display */}
                        {order.location && order.location.lat && order.location.lng && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin size={16} className="text-blue-600" />
                              <span className="text-sm font-medium text-gray-700">Yetkazib berish manzili</span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-sm text-gray-600 mb-2">{order.location.address}</p>
                              <a 
                                href={`https://www.google.com/maps?q=${order.location.lat},${order.location.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                <Map size={14} />
                                Xaritada ko'rish
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
