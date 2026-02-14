import React, { useState, useEffect } from 'react'
import { User, ShoppingCart, Package, LogOut, Menu, X, TrendingUp, Users, DollarSign, ArrowRight, Plus, Edit, Trash2, Search, Filter, Calendar, Phone, Mail, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { products as defaultProducts } from './Products.js'

function Dashboard() {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0
  })
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    compatibility: ''
  })

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    console.log('Dashboard auth check:', { isLoggedIn, user })
    
    // Check for special user credentials (from client login)
    if (user.phone === '+998938573311' && user.password === '123456') {
      console.log('Special user access granted')
      // Special user - allow access without admin login
      // Set admin session for dashboard
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify({
        email: 'admin@monaer.com',
        name: 'Admin',
        role: 'admin'
      }))
      loadDashboardData()
      return
    }
    
    // Check for regular admin login
    if (!isLoggedIn || user.email !== 'admin@monaer.com') {
      console.log('Admin access denied, redirecting to login')
      // Clear any invalid session
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
      navigate('/dashboard-login')
      return
    }

    console.log('Admin access granted, loading dashboard')
    // Load dashboard data
    loadDashboardData()
  }, [navigate])

  const loadDashboardData = () => {
    // Load data from localStorage and real sources
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const savedProducts = JSON.parse(localStorage.getItem('dashboardProducts') || '[]')
    const savedUsersData = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const currentUserData = JSON.parse(localStorage.getItem('user') || '{}')
    
    // Create sample data if no data exists
    const initialSampleOrders = savedOrders.length > 0 ? savedOrders : [
      {
        id: 'ORD-001',
        customer: 'Ali Valiyev',
        phone: '+998901234567',
        product: 'Tormoz disklari Brembo',
        totalAmount: 450000,
        status: 'completed',
        date: '2024-02-12',
        address: 'Toshkent, Shayxontohur tumani'
      },
      {
        id: 'ORD-002',
        customer: 'Dilora Karimova',
        phone: '+998933456789',
        product: 'Motor moyi Mobil 1',
        totalAmount: 120000,
        status: 'processing',
        date: '2024-02-13',
        address: 'Toshkent, Yunusobod tumani'
      },
      {
        id: 'ORD-003',
        customer: 'Javlon Toshmatov',
        phone: '+998945678901',
        product: 'Akumulator Varta',
        totalAmount: 380000,
        status: 'pending',
        date: '2024-02-13',
        address: 'Toshkent, Chilonzor tumani'
      }
    ]
    
    const initialSampleUsers = savedUsersData.length > 0 ? savedUsersData : [
      {
        id: 1,
        name: 'Ali Valiyev',
        phone: '+998901234567',
        email: 'ali@example.com',
        registeredAt: '2024-02-10',
        totalOrders: 3
      },
      {
        id: 2,
        name: 'Dilora Karimova',
        phone: '+998933456789',
        email: 'dilora@example.com',
        registeredAt: '2024-02-11',
        totalOrders: 2
      },
      {
        id: 3,
        name: 'Javlon Toshmatov',
        phone: '+998945678901',
        email: 'javlon@example.com',
        registeredAt: '2024-02-12',
        totalOrders: 1
      }
    ]
    
    // Get all users from registration and login
    const allUsersList = []
    if (savedUsersData && typeof savedUsersData === 'object') {
      allUsersList.push({
        ...savedUsersData,
        registeredAt: new Date().toLocaleDateString(),
        type: 'registered'
      })
    }
    if (savedUsersData && Array.isArray(savedUsersData)) {
      savedUsersData.forEach(user => {
        allUsersList.push({
          ...user,
          registeredAt: user.registeredAt || new Date().toLocaleDateString(),
          type: 'registered'
        })
      })
    }
    
    // Enhanced sample orders with real product data
    const enhancedSampleOrders = [
      { 
        id: 'ORD-001', 
        customer: 'Ali Valiyev', 
        phone: '+998901234567',
        email: 'ali@example.com',
        items: [
          { id: 1, name: 'Monaer M1 Tormoz Kalodkasi', quantity: 2, price: 450000 },
          { id: 9, name: 'Toyota Camry 2015-2022 Motor Yog\'i', quantity: 1, price: 280000 }
        ],
        totalAmount: 1180000,
        status: 'completed', 
        date: '2024-02-13',
        address: 'Toshkent, Shayxontohur tumani, Beruniy ko\'chasi 45-uy',
        paymentMethod: 'Naqt pul',
        deliveryType: 'Kurier',
        createdAt: new Date('2024-02-13T10:30:00').toISOString()
      },
      { 
        id: 'ORD-002', 
        customer: 'Bekzod Karimov', 
        phone: '+998939876543',
        email: 'bekzod@example.com',
        items: [
          { id: 2, name: 'Novanta FZ Disk', quantity: 1, price: 1200000 }
        ],
        totalAmount: 1200000,
        status: 'pending', 
        date: '2024-02-13',
        address: 'Samarqand, Samarqand shahri, Registon mahallasi',
        paymentMethod: 'Plastik karta',
        deliveryType: 'Olib ketish',
        createdAt: new Date('2024-02-13T14:15:00').toISOString()
      },
      { 
        id: 'ORD-003', 
        customer: 'Gulnora Saidova', 
        phone: '+998945678901',
        email: 'gulnora@example.com',
        items: [
          { id: 5, name: 'Sport Disk 17"', quantity: 4, price: 1500000 },
          { id: 6, name: 'Universal Tormoz Kalodkasi', quantity: 2, price: 380000 }
        ],
        totalAmount: 6760000,
        status: 'processing', 
        date: '2024-02-12',
        address: 'Buxoro, Buxoro shahri, Markaziy shifoxona oldi',
        paymentMethod: 'Online tolov',
        deliveryType: 'Kurier',
        createdAt: new Date('2024-02-12T16:45:00').toISOString()
      }
    ]

    // Combine sample users with registered users
    const finalUsers = [...initialSampleUsers]
    if (savedUsersData && Array.isArray(savedUsersData)) {
      finalUsers.push(...savedUsersData)
    }
    
    // Use real products from Products.js and localStorage
    const dashboardSavedProducts = JSON.parse(localStorage.getItem('dashboardProducts') || '[]')
    const mainSavedProducts = JSON.parse(localStorage.getItem('products') || '[]')
    const allSavedProducts = JSON.parse(localStorage.getItem('allProducts') || '[]')
    const productsJsData = JSON.parse(localStorage.getItem('productsJsData') || '[]')
    
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
    
    // Also save to products.json file simulation
    localStorage.setItem('productsFile', JSON.stringify(allProductsForClient))
    
    const finalProducts = combinedProducts
    const finalOrders = enhancedSampleOrders

    // Calculate stats
    const totalRevenue = finalOrders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + order.totalAmount, 0)

    setStats({
      totalOrders: finalOrders.length,
      totalRevenue: totalRevenue,
      totalProducts: finalProducts.length,
      totalUsers: allUsersList.length
    })

    setOrders(finalOrders)
    setProducts(finalProducts)
    setUsers(allUsersList)

    setIsLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    navigate('/')
  }

  const handleAddProduct = () => {
    console.log('Adding product:', newProduct)
    
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
    
    console.log('Product added successfully:', product)
    console.log('Updated products count:', updatedProducts.length)

    // Show success message
    alert('Mahsulot muvaffaqiyatli qo\'shildi! Asosiy platformada ham paydo bo\'ladi.')
    
    // Debug: Show current localStorage state
    console.log('Current localStorage products:', {
      dashboardProducts: JSON.parse(localStorage.getItem('dashboardProducts') || '[]').length,
      productsJson: JSON.parse(localStorage.getItem('productsJson') || '[]').length,
      productsFile: JSON.parse(localStorage.getItem('productsFile') || '[]').length
    })
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
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Menu */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center gap-3 ml-4 lg:ml-0">
                <img
                  src="https://static.tildacdn.com/tild3463-3734-4963-a665-653363316531/Frame_2087327802.png"
                  alt="Monaer Dashboard"
                  className="h-8 rounded-lg"
                />
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <User size={16} />
                <span>Admin</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Chiqish</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen`}>
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <TrendingUp size={20} />
              <span>Asosiy</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ShoppingCart size={20} />
              <span>Buyurtmalar</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'products' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Package size={20} />
              <span>Mahsulotlar</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users size={20} />
              <span>Foydalanuvchilar</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShoppingCart className="text-blue-600" size={24} />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+12%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
                <p className="text-sm text-gray-600 mt-1">Jami buyurtmalar</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="text-green-600" size={24} />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+8%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()} so'm</h3>
                <p className="text-sm text-gray-600 mt-1">Jami daromad</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Package className="text-purple-600" size={24} />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+5%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalProducts}</h3>
                <p className="text-sm text-gray-600 mt-1">Mahsulotlar</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Users className="text-orange-600" size={24} />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+15%</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
                <p className="text-sm text-gray-600 mt-1">Foydalanuvchilar</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">So'nggi buyurtmalar</h2>
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
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Buyurtma ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mijoz
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Summa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Holat
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sana
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.totalAmount.toLocaleString()} so'm
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  <h2 className="text-lg font-semibold text-gray-900">Barcha buyurtmalar</h2>
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
                              <span>{order.customer}</span>
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
                            <p className="text-2xl font-bold text-gray-900">{order.totalAmount.toLocaleString()} so'm</p>
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
                    <h2 className="text-lg font-semibold text-gray-900">Mahsulotlar ({filteredProducts.length})</h2>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Product Image */}
                      <div className="relative h-48 bg-gray-100">
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
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Mavjud emas
                            </span>
                          </div>
                        )}
                        {product.discount && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
                            <p className="text-xs text-gray-500 mb-2">ID: {product.id}</p>
                          </div>
                        </div>
                      
                      <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Narx:</span>
                            <span className="font-semibold text-gray-900">{product.price.toLocaleString()} so'm</span>
                          </div>
                          
                          {product.oldPrice && (
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Eski narx:</span>
                              <span className="text-gray-400 line-through">{product.oldPrice.toLocaleString()} so'm</span>
                            </div>
                          )}
                          
                          {product.discount && (
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Chegirma:</span>
                              <span className="text-green-600 font-medium">-{product.discount}%</span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Kategoriya:</span>
                            <span className="text-gray-900 capitalize">{product.category}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Reyting:</span>
                            <span className="text-gray-900">⭐ {product.rating || 'N/A'}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-600 mb-2">
                            <strong>Moslashuvchanlik:</strong>
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {Array.isArray(product.compatibility) 
                              ? product.compatibility.slice(0, 3).map((brand, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                    {brand}
                                  </span>
                                ))
                              : product.compatibility?.split(',').slice(0, 3).map((brand, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                    {brand.trim()}
                                  </span>
                                ))
                            }
                            {((Array.isArray(product.compatibility) ? product.compatibility : product.compatibility?.split(',') || []).length > 3) && (
                              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                                +{((Array.isArray(product.compatibility) ? product.compatibility : product.compatibility?.split(',') || []).length - 3)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                          >
                            <Trash2 size={14} />
                            O'chirish
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
                <h2 className="text-lg font-semibold text-gray-900">Foydalanuvchilar</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ism
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Telefon
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ro'yxatdan o'tgan sana
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Holat
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name || 'Noma\'lum'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.registeredAt || new Date().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Faol
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mahsulot nomi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Narx</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Narx"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategoriya</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
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
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
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
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
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
                  onChange={(e) => setNewProduct({...newProduct, compatibility: e.target.value})}
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

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default Dashboard
