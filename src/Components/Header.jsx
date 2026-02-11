import React, { useEffect, useState, useContext } from 'react'
import { User, ShoppingCart } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../App'

const CartBadge = () => {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart')
      if (cart) {
        try {
          const items = JSON.parse(cart)
          const count = items.reduce((total, item) => total + (item.quantity || 0), 0)
          setCartCount(count)
        } catch {
          setCartCount(0)
        }
      } else {
        setCartCount(0)
      }
    }

    updateCartCount()
    window.addEventListener('storage', updateCartCount)
    window.addEventListener('cartUpdated', updateCartCount)

    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [])

  if (cartCount === 0) return null

  return (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
      {cartCount > 99 ? '99+' : cartCount}
    </span>
  )
}

function Header() {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useContext(AuthContext)
  
  // Check if user is registered (not just logged in)
  const [isRegistered, setIsRegistered] = useState(false)
  
  useEffect(() => {
    const checkRegistration = () => {
      const user = localStorage.getItem('user')
      setIsRegistered(!!user)
    }
    
    checkRegistration()
    window.addEventListener('storage', checkRegistration)
    window.addEventListener('cartUpdated', checkRegistration)
    
    return () => {
      window.removeEventListener('storage', checkRegistration)
      window.removeEventListener('cartUpdated', checkRegistration)
    }
  }, [])

  const navItems = [
    { path: '/', label: 'Bosh sahifa', activeColor: 'bg-blue-500' },
    { path: '/catalog', label: 'Katalog', activeColor: 'bg-emerald-500' },
    { path: '/about', label: 'Haqimizda', activeColor: 'bg-amber-500' },
    { path: '/contact', label: 'Aloqa', activeColor: 'bg-purple-500' },
  ]

  const renderNavLinks = (isMobile = false) =>
    navItems.map((item) => {
      const isActive = location.pathname === item.path
      return (
        <Link
          key={item.path}
          to={item.path}
          className={`
            relative flex items-center justify-center transition-all duration-200
            ${isMobile 
              ? 'flex-1 py-3 px-2 text-[11px] sm:text-sm' 
              : 'px-5 py-3 text-base'
            }
            ${isActive
              ? 'text-white font-medium'
              : isMobile
              ? 'text-gray-400 hover:text-gray-200'
              : 'text-gray-300 hover:text-white'
            }
          `}
        >
          {item.label}

          {isActive && (
            <span 
              className={`
                absolute bottom-0 left-1/2 -translate-x-1/2 
                w-6 h-0.5 rounded-full ${item.activeColor}
                transition-all duration-300
              `}
            />
          )}
        </Link>
      )
    })

  if (isLoading) {
    return (
      <header className="bg-[#1e293b] shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="w-12 h-8 bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-[#1e293b] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/">
          <img
            src="https://static.tildacdn.com/tild3463-3734-4963-a665-653363316531/Frame_2087327802.png"
            alt="Monaer Logo"
            className="h-8 outline-none sm:h-11 rounded-lg hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <nav className="hidden sm:flex flex-1 justify-center gap-x-4 md:gap-x-8 lg:gap-x-12">
          {renderNavLinks()}
        </nav>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/cart" className="text-white hover:text-blue-300 relative transition-colors">
            <ShoppingCart size={24} />
            <CartBadge />
          </Link>
          
          {isAuthenticated ? (
            <Link to="/profile" className="text-white hover:text-blue-300 transition-colors">
              <User size={24} />
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="  text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
            >
              <User size={24} />
            </Link>
          )}
        </div>
      </div>

      <nav className="sm:hidden bg-[#1e293b]/95 border-t border-gray-700/60">
        <div className="w-[350px] p-[10px] gap-[10px] flex items-center justify-around">
          {renderNavLinks(true)}
        </div>
      </nav>
    </header>
  )
}

export default Header