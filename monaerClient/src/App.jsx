import React, { useEffect, useState } from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import Blog from './Pages/Blog'
import Backet from './Pages/Backet'
import Contact from './Pages/Contact'
import Profile from './Pages/Profile'
import Catalog from './Pages/Catalog'
import ProductDetail from './Pages/ProductDetail'
import Layout from './Components/Layout'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import CategoryPage from './Pages/CategoryPage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NotFound from './Pages/NotFound'
import NotificationProvider from './Components/NotificationSystem'

// Auth context
export const AuthContext = React.createContext()

// Route protection component
function RequireAuth({ children }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const navigate = useNavigate()

  React.useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn')
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      
      // Check for admin credentials only
      if (user.phone === '+998938573311' && user.password === '123456') {
        // Admin - allow access
        setIsLoggedIn(true)
        setIsLoading(false)
        return
      }
      
      // Check for regular admin login
      if (!loggedIn || user.email !== 'admin@monaer.com') {
        // Clear invalid session and redirect to home
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('user')
        navigate('/')
        return
      }
      
      setIsLoggedIn(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return isLoggedIn ? children : null
}

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      const userData = localStorage.getItem('user')
      
      if (isLoggedIn && userData) {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    checkAuth()

    // Listen for auth changes
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('cartUpdated', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleStorageChange)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

function App() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    // Update page title dynamically
    const updatePageTitle = () => {
      const path = window.location.pathname;
      let title = 'Monaer - Avtomobil ehtiyot qismlari va zaxiralari';
      
      if (path === '/') {
        title = 'Monaer - Avtomobil ehtiyot qismlari va zaxiralari | Bosh sahifa';
      } else if (path === '/catalog') {
        title = 'Monaer - Katalog | Avtomobil ehtiyot qismlari';
      } else if (path === '/backet' || path === '/cart') {
        title = 'Monaer - Savatcha | Avtomobil ehtiyot qismlari';
      } else if (path === '/about') {
        title = 'Monaer - Biz haqimizda | Avtomobil ehtiyot qismlari';
      } else if (path === '/contact') {
        title = 'Monaer - Aloqa | Avtomobil ehtiyot qismlari';
      } else if (path === '/login') {
        title = 'Monaer - Tizimga kirish | Avtomobil ehtiyot qismlari';
      } else if (path === '/register') {
        title = 'Monaer - Ro\'yxatdan o\'tish | Avtomobil ehtiyot qismlari';
      } else if (path.includes('/product/')) {
        title = 'Monaer - Mahsulot tafsilotlari | Avtomobil ehtiyot qismlari';
      } else {
        title = 'Monaer - 404 | Sahifa topilmadi';
      }
      
      document.title = title;
      
      // Update meta description
      let description = 'Monaer - Yuqori sifatli avtomobil ehtiyot qismlari, zaxiralari va boshqa mahsulotlar. Keng assortiment, arzon narxlar va ishonchilik kafolati.';
      
      if (path === '/') {
        description = 'Monaer bosh sahifasi. Yuqori sifatli avtomobil ehtiyot qismlari, zaxiralar va boshqa mahsulotlar. Keng assortiment, arzon narxlar va ishonchilik kafolati.';
      } else if (path === '/catalog') {
        description = 'Monaer katalogi. Barcha turdagi avtomobil ehtiyot qismlari, zaxiralar va boshqa mahsulotlar. Qulay narxlar va keng assortiment.';
      } else if (path === '/backet' || path === '/cart') {
        description = 'Monaer savatchasi. Tanlangan mahsulotlarni ko\'ring va sotib oling. Xavfsiz va qulay to\'lov tizimi.';
      } else if (path === '/login') {
        description = 'Monaer tizimga kirish sahifasi. Hisobingizga kiring va to\'liq imkoniyatlardan foydalaning.';
      } else if (path === '/register') {
        description = 'Monaer ro\'yxatdan o\'tish sahifasi. Yangi hisob yarating va Monaer imkoniyatlaridan foydalaning.';
      } else {
        description = 'Monaer - 404 xatolik. Siz qidirayotgan sahifa mavjud emas. Bosh sahifaga qayting yoki katalogni ko\'ring.';
      }
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    };
    
    updatePageTitle();
    
    // Listen for route changes
    const handleRouteChange = () => {
      updatePageTitle();
    };
    
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('pushstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('pushstate', handleRouteChange);
    };
  }, [])

  return (
    <NotificationProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/catalog' element={<Catalog />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/category/:categoryName' element={<CategoryPage />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/backet' element={<Backet />} />
              <Route path='/contact' element={<Contact />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
                        <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default App
