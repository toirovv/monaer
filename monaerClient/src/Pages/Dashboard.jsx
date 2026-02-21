import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { products as defaultProducts } from './Products.js'
import { useNotification, NotificationContainer } from '../Components/NotificationSystem'
import { Menu, X, User, LogOut, TrendingUp, ShoppingCart, Package, Users, Search, DollarSign, Eye, CreditCard, CheckCircle, Clock, AlertCircle, XCircle, ArrowRight, Phone, Mail, MapPin, Plus, Trash2, Edit, Bell } from 'lucide-react'

function Dashboard() {
  const navigate = useNavigate()
  const { addNotification } = useNotification()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [productStep, setProductStep] = useState(1)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingPayments: 0,
    cartValue: 0,
    totalViews: 0,
    activeUsers: 0,
    completedOrders: 0,
    processingOrders: 0,
    pendingOrders: 0,
    totalCards: 0,
    totalPayments: 0
  })
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    compatibility: '',
    available: true
  })
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    // Check for admin credentials only
    if (user.phone === '+998938573311' && user.password === '123456') {
      // Admin - allow access to dashboard
      loadDashboardData()
      return
    }

    // Check for regular admin login
    if (!isLoggedIn || user.email !== 'admin@monaer.com') {
      // Clear any invalid session
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
      navigate('/dashboard-login')
      return
    }

    // Load dashboard data
    loadDashboardData()

    // Load admin notifications
    loadNotifications()

    // Auto-refresh data every 5 seconds
    const refreshInterval = setInterval(() => {
      loadDashboardData()
      loadNotifications()
    }, 5000)

    // Listen for order updates, user registrations, and new notifications
    window.addEventListener('ordersUpdated', loadDashboardData)
    window.addEventListener('usersUpdated', loadDashboardData)
    window.addEventListener('adminNotification', handleNewNotification)

    return () => {
      clearInterval(refreshInterval)
      window.removeEventListener('ordersUpdated', loadDashboardData)
      window.removeEventListener('usersUpdated', loadDashboardData)
      window.removeEventListener('adminNotification', handleNewNotification)
    }
  }, [navigate])

  const loadDashboardData = () => {
    // Load comprehensive data from all localStorage sources
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const savedProducts = JSON.parse(localStorage.getItem('dashboardProducts') || '[]')
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const allRegisteredUsers = JSON.parse(localStorage.getItem('allRegisteredUsers') || '[]')
    const currentUserData = JSON.parse(localStorage.getItem('user') || '{}')
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]')
    const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]')
    const userCards = JSON.parse(localStorage.getItem('userCards') || '[]')
    const productViews = JSON.parse(localStorage.getItem('productViews') || '[]')


    // Combine all registered users from different sources
    const allUsers = [...registeredUsers]
    if (Array.isArray(allRegisteredUsers)) {
      allUsers.push(...allRegisteredUsers)
    }
    if (currentUserData && Object.keys(currentUserData).length > 0) {
      allUsers.push({
        ...currentUserData,
        registeredAt: currentUserData.registeredAt || new Date().toLocaleDateString(),
        type: 'current'
      })
    }

    // Also add users from main registration system
    const mainRegisteredUsers = JSON.parse(localStorage.getItem('users') || '[]')
    if (Array.isArray(mainRegisteredUsers)) {
      allUsers.push(...mainRegisteredUsers)
    }

    // Remove duplicates based on phone number
    const uniqueUsers = allUsers.filter((user, index, self) =>
      index === self.findIndex(u => u.phone === user.phone)
    )


    // Only use real orders, no test data
    const enhancedOrders = savedOrders

    // Use real products from all sources
    const dashboardSavedProducts = JSON.parse(localStorage.getItem('dashboardProducts') || '[]')
    const mainSavedProducts = JSON.parse(localStorage.getItem('products') || '[]')
    const allSavedProducts = JSON.parse(localStorage.getItem('allProducts') || '[]')
    const productsJsData = JSON.parse(localStorage.getItem('productsJsData') || '[]')
    const productDetailViews = JSON.parse(localStorage.getItem('productDetailViews') || '[]')

    // Combine all products: default from Products.js + dashboard added + main platform
    const combinedProducts = [...defaultProducts]

    // Add dashboard products (avoid duplicates)
    dashboardSavedProducts.forEach(product => {
      if (!combinedProducts.find(p => p.id === product.id)) {
        combinedProducts.push(product)
      }
    })

    // Add main platform products (avoid duplicates)
    mainSavedProducts.forEach(product => {
      if (!combinedProducts.find(p => p.id === product.id)) {
        combinedProducts.push(product)
      }
    })

    // Add all products storage (avoid duplicates)
    allSavedProducts.forEach(product => {
      if (!combinedProducts.find(p => p.id === product.id)) {
        combinedProducts.push(product)
      }
    })

    // Add productsJsData (avoid duplicates)
    productsJsData.forEach(product => {
      if (!combinedProducts.find(p => p.id === product.id)) {
        combinedProducts.push(product)
      }
    })

    // Save all products to JSON format for client platform
    const allProductsForClient = [...defaultProducts, ...combinedProducts]
    localStorage.setItem('productsJson', JSON.stringify(allProductsForClient))
    localStorage.setItem('productsFile', JSON.stringify(allProductsForClient))

    const finalProducts = combinedProducts
    const finalOrders = enhancedOrders

    // Calculate comprehensive statistics
    const totalRevenue = finalOrders
      .filter(order => order.status === 'completed' && order.paymentStatus === 'paid')
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0)

    const totalPendingPayments = finalOrders
      .filter(order => order.paymentStatus === 'pending')
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0)

    const totalCartValue = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    // Enhanced stats with comprehensive data
    const enhancedStats = {
      totalOrders: finalOrders.length,
      totalRevenue: totalRevenue,
      totalProducts: finalProducts.length,
      totalUsers: allUsers.length,
      pendingPayments: totalPendingPayments,
      cartValue: totalCartValue,
      totalViews: productViews.length,
      activeUsers: allUsers.filter(user => user.lastLogin).length,
      completedOrders: finalOrders.filter(order => order.status === 'completed').length,
      processingOrders: finalOrders.filter(order => order.status === 'processing').length,
      pendingOrders: finalOrders.filter(order => order.status === 'pending').length,
      totalCards: userCards.length,
      totalPayments: paymentHistory.length
    }

    setStats(enhancedStats)

    setOrders(finalOrders)
    setProducts(finalProducts)
    setUsers(allUsers)

    setIsLoading(false)
  }

  const loadNotifications = () => {
    const adminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]')
    setNotifications(adminNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
    setUnreadCount(adminNotifications.filter(n => !n.read).length)
  }

  const handleNewNotification = (event) => {
    loadNotifications()
    // Show toast notification for real-time updates
    addNotification({
      type: 'info',
      title: 'Yangi bildirishnoma',
      message: event.detail?.user ? `${event.detail.user.fullName || event.detail.user.name || event.detail.user.email} ro'yxatdan o'tdi` : 'Yangi yangilanik',
      duration: 5000
    })
  }

  const markNotificationAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    )
    setNotifications(updatedNotifications)
    localStorage.setItem('adminNotifications', JSON.stringify(updatedNotifications))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }))
    setNotifications(updatedNotifications)
    localStorage.setItem('adminNotifications', JSON.stringify(updatedNotifications))
    setUnreadCount(0)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    navigate('/')
  }

  const handleEditUser = (user) => {
    const newName = prompt('Yangi ism familiya:', user.fullName || user.name || '')
    if (newName && newName.trim()) {
      const updatedUser = { ...user, fullName: newName.trim() }

      // Update in all storage locations
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const allRegisteredUsers = JSON.parse(localStorage.getItem('allRegisteredUsers') || '[]')

      // Update registeredUsers
      const regIndex = registeredUsers.findIndex(u => u.phone === user.phone)
      if (regIndex >= 0) {
        registeredUsers[regIndex] = updatedUser
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
      }

      // Update allRegisteredUsers
      const allIndex = allRegisteredUsers.findIndex(u => u.phone === user.phone)
      if (allIndex >= 0) {
        allRegisteredUsers[allIndex] = updatedUser
        localStorage.setItem('allRegisteredUsers', JSON.stringify(allRegisteredUsers))
      }

      // Update current user if it's the same
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      if (currentUser.phone === user.phone) {
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }

      addNotification({
        type: 'success',
        title: 'Foydalanuvchi tahrirlandi',
        message: `${user.fullName || user.name} ma'lumotlari yangilandi`,
        duration: 3000
      })

      // Reload data
      loadDashboardData()
    }
  }

  const handleDeleteUser = (user) => {
    if (confirm(`${user.fullName || user.name || 'Foydalanuvchi'}ni o'chirishni tasdiqlaysizmi?`)) {
      // Remove from all storage locations
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const allRegisteredUsers = JSON.parse(localStorage.getItem('allRegisteredUsers') || '[]')

      // Remove from registeredUsers
      const filteredRegistered = registeredUsers.filter(u => u.phone !== user.phone)
      localStorage.setItem('registeredUsers', JSON.stringify(filteredRegistered))

      // Remove from allRegisteredUsers
      const filteredAll = allRegisteredUsers.filter(u => u.phone !== user.phone)
      localStorage.setItem('allRegisteredUsers', JSON.stringify(filteredAll))

      // Clear current user if it's the same
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      if (currentUser.phone === user.phone) {
        localStorage.removeItem('user')
        localStorage.removeItem('isLoggedIn')
      }

      addNotification({
        type: 'success',
        title: 'Foydalanuvchi o\'chirildi',
        message: `${user.fullName || user.name || 'Foydalanuvchi'} tizimdan o'chirildi`,
        duration: 3000
      })

      // Reload data
      loadDashboardData()
    }
  }

  const handleAddProduct = () => {

    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert('Iltimos, mahsulotning asosiy ma\'lumotlarini to\'ldiring')
      return
    }

    const product = {
      id: Date.now(), // Use numeric ID like in Products.js
      name: newProduct.name,
      oldPrice: parseInt(newProduct.price) * 1.2, // Add 20% old price for discount effect
      price: parseInt(newProduct.price),
      discount: 20,
      available: true,
      rating: 4.5,
      description: newProduct.description || 'Yangi mahsulot',
      image: newProduct.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      category: newProduct.category,
      compatibility: newProduct.compatibility ? newProduct.compatibility.split(',').map(c => c.trim()) : ['Barcha avtomobillar'],
      specifications: {
        material: 'Yuqori sifatli material',
        warranty: '1 yil'
      }
    }

    // Update dashboard products
    const updatedProducts = [...products, product]
    setProducts(updatedProducts)
    localStorage.setItem('dashboardProducts', JSON.stringify(updatedProducts))

    // Add to main platform products (this will be used by the client platform)
    const mainProducts = JSON.parse(localStorage.getItem('products') || '[]')
    mainProducts.push(product)
    localStorage.setItem('products', JSON.stringify(mainProducts))

    // Also add to the Products.js data structure for consistency
    const allProducts = [...defaultProducts, ...mainProducts]
    localStorage.setItem('allProducts', JSON.stringify(allProducts))

    // Add to Products.js simulation storage (for ProductDetail page)
    const productsJsData = JSON.parse(localStorage.getItem('productsJsData') || '[]')
    const updatedProductsJsData = [...productsJsData, product]
    localStorage.setItem('productsJsData', JSON.stringify(updatedProductsJsData))

    // Save to productsJson for client platform
    const existingProductsJson = JSON.parse(localStorage.getItem('productsJson') || '[]')
    const updatedProductsJson = [...existingProductsJson, product]
    localStorage.setItem('productsJson', JSON.stringify(updatedProductsJson))

    // Also save to products.json file simulation
    localStorage.setItem('productsFile', JSON.stringify(updatedProductsJson))

    // Reset form
    setNewProduct({
      name: '',
      price: '',
      category: '',
      description: '',
      image: '',
      compatibility: ''
    })
    setShowAddProductModal(false)

    // Update stats
    setStats(prev => ({ ...prev, totalProducts: prev.totalProducts + 1 }))

    // Trigger event to refresh client pages
    window.dispatchEvent(new Event('productsUpdated'))


    // Show success message
    alert('Mahsulot muvaffaqiyatli qo\'shildi! Asosiy platformada ham paydo bo\'ladi.')

  }

  const handleDeleteProduct = (productId) => {
    if (confirm('Mahsulotni o\'chirishni istaysizmi?')) {
      // Update dashboard state
      const updatedProducts = products.filter(p => p.id !== productId)
      setProducts(updatedProducts)

      // Remove from dashboard products storage
      const dashboardProducts = JSON.parse(localStorage.getItem('dashboardProducts') || '[]')
      const filteredDashboardProducts = dashboardProducts.filter(p => p.id !== productId)
      localStorage.setItem('dashboardProducts', JSON.stringify(filteredDashboardProducts))

      // Remove from main platform products
      const mainProducts = JSON.parse(localStorage.getItem('products') || '[]')
      const filteredMainProducts = mainProducts.filter(p => p.id !== productId)
      localStorage.setItem('products', JSON.stringify(filteredMainProducts))

      // Remove from all products storage
      const allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]')
      const filteredAllProducts = allProducts.filter(p => p.id !== productId)
      localStorage.setItem('allProducts', JSON.stringify(filteredAllProducts))

      // Remove from productsJsData storage
      const productsJsData = JSON.parse(localStorage.getItem('productsJsData') || '[]')
      const filteredProductsJsData = productsJsData.filter(p => p.id !== productId)
      localStorage.setItem('productsJsData', JSON.stringify(filteredProductsJsData))

      // Remove from productsJson storage
      const productsJson = JSON.parse(localStorage.getItem('productsJson') || '[]')
      const filteredProductsJson = productsJson.filter(p => p.id !== productId)
      localStorage.setItem('productsJson', JSON.stringify(filteredProductsJson))

      // Remove from productsFile storage
      const productsFile = JSON.parse(localStorage.getItem('productsFile') || '[]')
      const filteredProductsFile = productsFile.filter(p => p.id !== productId)
      localStorage.setItem('productsFile', JSON.stringify(filteredProductsFile))

      setStats(prev => ({ ...prev, totalProducts: prev.totalProducts - 1 }))

      // Trigger event to refresh client pages
      window.dispatchEvent(new Event('productsUpdated'))

      alert('Mahsulot o\'chirildi va asosiy platformadan ham olindi tashlandi.')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Bajarilgan'
      case 'pending':
        return 'Kutilmoqda'
      case 'processing':
        return 'Ishlanmoqda'
      case 'cancelled':
        return 'Bekor qilingan'
      default:
        return status
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />
      case 'pending':
        return <Clock size={16} />
      case 'processing':
        return <AlertCircle size={16} />
      case 'cancelled':
        return <XCircle size={16} />
      default:
        return null
    }
  }

  const filteredOrders = orders.filter(order =>
    (typeof order.customer === 'object' ? order.customer.name : (order.customer || '')).toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.id || '').toString().toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredProducts = products.filter(product =>
    (product.name || '').toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category || '').toString().toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredUsers = users.filter(user =>
    (user.fullName || user.name || '').toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.phone || '').toString().toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo and Menu */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex items-center gap-2 sm:gap-3 ml-3 sm:ml-4 lg:ml-0">
                <img
                  src="https://static.tildacdn.com/tild3463-3734-4963-a665-653363316531/Frame_2087327802.png"
                  alt="Monaer Dashboard"
                  className="h-6 sm:h-8 rounded-lg"
                />
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Dashboard</h1>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                <User size={14} />
                <span>Admin</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-1.5 sm:p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Bell size={16} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 sm:max-h-96 overflow-y-auto">
                    <div className="p-3 sm:p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Bildirishnomalar</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-xs sm:text-sm text-blue-600 hover:text-blue-700"
                          >
                            Hammasini o'qilgan deb belgilash
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-60 sm:max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-3 sm:p-4 text-center text-gray-500">
                          <Bell size={24} className="mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">Bildirishnomalar yo'q</p>
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`p-3 sm:p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 sm:mt-2 ${!notification.read ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-xs sm:text-sm">{notification.title}</h4>
                                <p className="text-gray-600 text-xs sm:text-sm mt-1">{notification.message}</p>
                                <p className="text-gray-400 text-xs mt-1 sm:mt-2">
                                  {new Date(notification.timestamp).toLocaleString('uz-UZ')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Chiqish</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-56 sm:w-60 lg:w-64 bg-white shadow-sm border-r border-gray-200 fixed lg:relative lg:top-0 top-14 sm:top-16 z-40 lg:z-0 h-screen lg:h-auto overflow-y-auto`}>
          <nav className="p-2 sm:p-3 lg:p-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-1.5 sm:gap-2 lg:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-colors text-xs sm:text-sm ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <TrendingUp size={14} />
              <span className="inline">Asosiy</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-1.5 sm:gap-2 lg:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-colors text-xs sm:text-sm ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <ShoppingCart size={14} />
              <span className="inline">Buyurtmalar</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-1.5 sm:gap-2 lg:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-colors text-xs sm:text-sm ${activeTab === 'products' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Package size={14} />
              <span className="inline">Mahsulotlar</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-1.5 sm:gap-2 lg:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-colors text-xs sm:text-sm ${activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <Users size={14} />
              <span className="inline">Foydalanuvchilar</span>
            </button>
            
            {/* Go to Client Panel Button */}
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-1.5 sm:gap-2 lg:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-colors text-xs sm:text-sm bg-green-50 text-green-600 hover:bg-green-100"
            >
              <ArrowRight size={14} />
              <span className="inline">Klient paneliga o'tish</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-2 sm:p-3 lg:p-6 lg:ml-0 mt-14 sm:mt-16 lg:mt-0 min-h-screen lg:min-h-auto">
          {/* Search Bar */}
          <div className="mb-4 sm:mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 lg:p-4 border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2 lg:mb-3">
                    <div className="p-1 sm:p-1.5 lg:p-2 bg-blue-600 rounded-lg sm:rounded-xl shadow-md">
                      <ShoppingCart className="text-white" size={10} />
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-green-600 font-bold">+12%</span>
                      <p className="text-xs text-gray-500">oylik</p>
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">{stats.totalOrders}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Jami buyurtmalar</p>
                  <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-blue-200">
                    <div className="flex justify-between text-xs">
                      <span className="text-green-600 font-medium">Bajarilgan: {stats.completedOrders || 0}</span>
                      <span className="text-yellow-600 font-medium">Jarayonda: {stats.processingOrders || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 lg:p-4 border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2 lg:mb-3">
                    <div className="p-1 sm:p-1.5 lg:p-2 bg-green-600 rounded-lg sm:rounded-xl shadow-md">
                      <DollarSign className="text-white" size={10} />
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-green-600 font-bold">+8%</span>
                      <p className="text-xs text-gray-500">oylik</p>
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">{stats.totalRevenue.toLocaleString()} so'm</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Jami daromad</p>
                  <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-green-200">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Kutilayotgan to'lovlar: {stats.pendingPayments || 0} so'm</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 lg:p-4 border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2 lg:mb-3">
                    <div className="p-1 sm:p-1.5 lg:p-2 bg-purple-600 rounded-lg sm:rounded-xl shadow-md">
                      <Package className="text-white" size={10} />
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-green-600 font-bold">+5%</span>
                      <p className="text-xs text-gray-500">oylik</p>
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">{stats.totalProducts}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Mahsulotlar</p>
                  <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-purple-200">
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-600 font-medium">Savatchadagi mahsulotlar: {stats.cartValue || 0} so'm</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg sm:rounded-xl shadow-md p-2 sm:p-3 lg:p-4 border border-orange-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2 lg:mb-3">
                    <div className="p-1 sm:p-1.5 lg:p-2 bg-orange-600 rounded-lg sm:rounded-xl shadow-md">
                      <Users className="text-white" size={10} />
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-green-600 font-bold">+15%</span>
                      <p className="text-xs text-gray-500">oylik</p>
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">{stats.totalUsers}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Foydalanuvchilar</p>
                  <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-orange-200">
                    <div className="flex justify-between text-xs">
                      <span className="text-green-600 font-medium">Aktiv: {stats.activeUsers || 0}</span>
                      <span className="text-blue-600 font-medium">Kartalar: {stats.totalCards || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-lg p-4 sm:p-6 border border-indigo-200">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-indigo-600 rounded-lg">
                      <Eye className="text-white" size={16} />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">{stats.totalViews || 0}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Mahsulot ko'rishlar</p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl shadow-lg p-4 sm:p-6 border border-pink-200">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-pink-600 rounded-lg">
                      <CreditCard className="text-white" size={16} />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">{stats.totalPayments || 0}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">To'lovlar amaliyoti</p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl shadow-lg p-4 sm:p-6 border border-teal-200">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="p-1.5 sm:p-2 bg-teal-600 rounded-lg">
                      <TrendingUp className="text-white" size={16} />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">{stats.pendingOrders || 0}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Kutilayotgan buyurtmalar</p>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">So'nggi buyurtmalar</h2>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      Barchasini ko'rish
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Buyurtma ID
                        </th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mijoz
                        </th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Summa
                        </th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Holat
                        </th>
                        <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sana
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOrders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {typeof order.customer === 'object' ? order.customer.name : order.customer}
                          </td>
                          <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                            {(order.totalAmount || 0).toLocaleString()} so'm
                          </td>
                          <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-4 whitespace-nowrap">
                            <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </td>
                          <td className="px-2 sm:px-3 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                            {order.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Barcha buyurtmalar</h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Order Header */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-semibold text-gray-900">{order.id}</span>
                            <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              {getStatusText(order.status)}
                            </span>
                            <span className="text-xs text-gray-500">{order.date}</span>
                          </div>

                          {/* Customer Info */}
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>{typeof order.customer === 'object' ? order.customer.name : order.customer}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone size={14} />
                              <span>{order.phone}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail size={14} />
                              <span>{order.email}</span>
                            </div>
                          </div>

                          {/* Products */}
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-700 mb-2">Mahsulotlar:</h4>
                            <div className="space-y-1">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                                  <span className="font-medium text-gray-900">{item.name}</span>
                                  <span className="text-gray-600">x{item.quantity} × {item.price.toLocaleString()} so'm</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Delivery & Payment Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin size={14} />
                              <span>{order.address}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-600">
                                <span className="font-medium">Tolov:</span> {order.paymentMethod}
                              </span>
                              <span className="text-gray-600">
                                <span className="font-medium">Yetkazish:</span> {order.deliveryType}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Total Amount */}
                        <div className="flex flex-col items-end justify-center">
                          <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Jami summa:</p>
                            <p className="text-2xl font-bold text-gray-900">{(order.totalAmount || 0).toLocaleString()} so'm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredOrders.length === 0 && (
                  <div className="p-12 text-center">
                    <ShoppingCart className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">Buyurtmalar topilmadi</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Mahsulotlar ({filteredProducts.length})</h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowAddProductModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus size={16} />
                        Yangi mahsulot
                      </button>
                      <button
                        onClick={() => {
                          // Test add product with sample data
                          setNewProduct({
                            name: 'Test Mahsulot',
                            price: '100000',
                            category: 'brakes',
                            description: 'Test mahsulot tavsifi',
                            image: '',
                            compatibility: 'Toyota, Honda'
                          })
                          setTimeout(() => handleAddProduct(), 100)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus size={16} />
                        Test Qo'shish
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Product Image */}
                      <div className="relative h-32 sm:h-48 bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
                          }}
                        />
                        {!product.available && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Mavjud emas
                            </span>
                          </div>
                        )}
                        {product.discount && (
                          <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold">
                            -{product.discount}%
                          </div>
                        )}
                      </div>

                      <div className="p-3 sm:p-4">
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1 line-clamp-2">{product.name}</h3>
                            <p className="text-xs text-gray-500 mb-1 sm:mb-2">ID: {product.id}</p>
                          </div>
                        </div>

                        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Narx:</span>
                            <span className="font-semibold text-gray-900">{product.price.toLocaleString()} so'm</span>
                          </div>

                          {product.oldPrice && (
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Eski narx:</span>
                              <span className="text-gray-400 line-through text-xs">{product.oldPrice.toLocaleString()} so'm</span>
                            </div>
                          )}

                          {product.discount && (
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Chegirma:</span>
                              <span className="text-green-600 font-medium text-xs">-{product.discount}%</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Kategoriya:</span>
                            <span className="text-gray-900 capitalize text-xs">{product.category}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Reyting:</span>
                            <span className="text-gray-900 text-xs">⭐ {product.rating || 'N/A'}</span>
                          </div>
                        </div>

                        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-600 mb-1 sm:mb-2">
                            <strong>Moslashuvchanlik:</strong>
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {Array.isArray(product.compatibility)
                              ? product.compatibility.slice(0, 2).map((brand, index) => (
                                <span key={index} className="px-1 sm:px-2 py-0.5 sm:py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                  {brand}
                                </span>
                              ))
                              : product.compatibility?.split(',').slice(0, 2).map((brand, index) => (
                                <span key={index} className="px-1 sm:px-2 py-0.5 sm:py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                  {brand.trim()}
                                </span>
                              ))
                            }
                            {((Array.isArray(product.compatibility) ? product.compatibility : product.compatibility?.split(',') || []).length > 2) && (
                              <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-gray-50 text-gray-600 text-xs rounded">
                                +{((Array.isArray(product.compatibility) ? product.compatibility : product.compatibility?.split(',') || []).length - 2)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-3">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex-1 flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs sm:text-sm"
                          >
                            <Trash2 size={12} />
                            <span className="hidden xs:inline">O'chirish</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="p-12 text-center">
                    <Package className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">Mahsulotlar topilmadi</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Foydalanuvchilar ({filteredUsers.length})</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ism familiya
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Telefon
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Parol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qurilma
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ro'yxatdan o'tgan sana
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Holat
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amallar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.fullName || user.name || 'Noma\'lum'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.password || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="text-xs">
                            <div className="font-medium">{user.deviceInfo?.deviceType || 'Unknown'}</div>
                            <div className="text-gray-500">{user.deviceInfo?.browser || 'Unknown'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : new Date().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Faol
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                              title="Tahrir qilish"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="O'chirish"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="p-12 text-center">
                  <Users className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500">Foydalanuvchilar topilmadi</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yangi mahsulot qo'shish</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mahsulot nomi</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mahsulot nomi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Narx</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Narx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriya</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Kategoriyani tanlang</option>
                  <option value="brakes">Tormoz tizimi</option>
                  <option value="engine">Dvigatel</option>
                  <option value="suspension">Osma</option>
                  <option value="electrical">Elektrika</option>
                  <option value="filters">Filtrlar</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tavsif</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Mahsulot tavsifi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mahsulot rasmi URL</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg (ixtiyoriy)"
                />
                <p className="text-xs text-gray-500 mt-1">Rasm URL'sini kiriting yoki bo'sh qoldiring (standart rasm ishlatiladi)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Moslashuvchanlik</label>
                <input
                  type="text"
                  value={newProduct.compatibility}
                  onChange={(e) => setNewProduct({ ...newProduct, compatibility: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masalan: Toyota, Honda, Nissan"
                />
                <p className="text-xs text-gray-500 mt-1">Vergul bilan ajratib yozing</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddProduct}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Qo'shish
              </button>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <NotificationContainer />
    </div>
  )
}

export default Dashboard