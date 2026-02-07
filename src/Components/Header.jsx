import React, { useState, useEffect } from 'react'

import Logo from '../assets/icons/logo.jpg'

import MenuProps from './MenuProps'

import { Contact, Home, Info, MessageSquare, ShoppingCart, User, LayoutGrid, Menu, X } from 'lucide-react'

import { Link, useLocation } from 'react-router-dom'

import MobileNav from './MobileNav'




const CartBadge = () => {

  const [cartCount, setCartCount] = useState(0)



  useEffect(() => {

    const updateCartCount = () => {

      const cart = localStorage.getItem('cart')

      if (cart) {

        const items = JSON.parse(cart)

        const count = items.reduce((total, item) => total + item.quantity, 0)

        setCartCount(count)

      }
    }
    updateCartCount()
    const handleStorageChange = () => {
      updateCartCount()
    }
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('cartUpdated', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleStorageChange)
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)



  const toggleMobileMenu = () => {

    setIsMobileMenuOpen(!isMobileMenuOpen)

  }



  const closeMobileMenu = () => {

    setIsMobileMenuOpen(false)

  }



  return (

    <>

      <header className='bg-[#1e293b] p-[20px] shadow-lg sticky top-0 z-50 transition-all'>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className='flex items-center justify-between'>

            <img className=' ml-[7px] rounded-[10px] hover:scale-105 transition-transform duration-300 ios-hardware-accelerated' width={180} src='https://static.tildacdn.com/tild3463-3734-4963-a665-653363316531/Frame_2087327802.png' alt="" />




            <ul className='hidden sm:flex items-center gap-[10px] lg:gap-[20px]'>



              <Link to={'/'} onClick={closeMobileMenu}>

                <div className={`flex items-center gap-[6px] cursor-pointer px-2 py-1.5 lg:px-4 lg:py-2 rounded-lg transition-all duration-300 ${location.pathname === '/' ? 'bg-black/20 text-white' : 'text-white hover:bg-black/20'

                  }`}>

                  <Home className="hover:text-blue-300 transition-colors duration-300 text-white" size={20} />

                  <span className="hidden sm:inline text-sm lg:text-base">

                    <MenuProps Menu={'Bosh Sahifa'} isActive={location.pathname === '/'} />

                  </span>

                </div>

              </Link>

              <Link to={'about'} onClick={closeMobileMenu}>

                <div className={`flex items-center gap-[6px] cursor-pointer px-2 py-1.5 lg:px-4 lg:py-2 rounded-lg transition-all duration-300 ${location.pathname === '/about' ? 'bg-black/20 text-white' : 'text-white hover:bg-black/20'

                  }`}>

                  <Info className="hover:text-blue-300 transition-colors duration-300 text-white" size={20} />

                  <span className="hidden sm:inline text-sm lg:text-base">

                    <MenuProps Menu={'Biz Haqimizda'} isActive={location.pathname === '/about'} />

                  </span>

                </div>

              </Link>

              <Link to={'blog'} onClick={closeMobileMenu}>

                <div className={`flex items-center gap-[6px] px-2 py-1.5 lg:px-4 lg:py-2 cursor-pointer rounded-lg transition-all duration-300 ${location.pathname === '/blog' ? 'bg-black/20 text-white' : 'text-white hover:bg-black/20'

                  }`}>

                  <MessageSquare className="hover:text-blue-300 transition-colors duration-300 text-white" size={20} />

                  <span className="hidden sm:inline text-sm lg:text-base">

                    <MenuProps Menu={'Blog'} isActive={location.pathname === '/blog'} />

                  </span>

                </div>

              </Link>

              <Link to={'catalog'} onClick={closeMobileMenu}>

                <div className={`flex items-center gap-[6px] px-2 py-1.5 lg:px-4 lg:py-2 cursor-pointer rounded-lg transition-all duration-300 ${location.pathname === '/catalog' ? 'bg-black/20 text-white' : 'text-white hover:bg-black/20'

                  }`}>

                  <LayoutGrid className="hover:text-blue-300 transition-colors duration-300 text-white" size={20} />

                  <span className="hidden sm:inline text-sm lg:text-base">

                    <MenuProps Menu={'Katalog'} isActive={location.pathname === '/catalog'} />

                  </span>

                </div>

              </Link>

              <Link to={'contact'} onClick={closeMobileMenu}>

                <div className={`flex items-center gap-[6px] px-2 py-1.5 lg:px-4 lg:py-2 cursor-pointer rounded-lg transition-all duration-300 ${location.pathname === '/contact' ? 'bg-black/20 text-white' : 'text-white hover:bg-black/20'

                  }`}>

                  <Contact className="hover:text-blue-300 transition-colors duration-300 text-white" size={20} />

                  <span className="hidden sm:inline text-sm lg:text-base">

                    <MenuProps Menu={'Kontaktlar'} isActive={location.pathname === '/contact'} />

                  </span>

                </div>

              </Link>

            </ul>



            {/* Desktop Right Side */}

            <div className='hidden sm:flex text-white items-center gap-[10px] lg:gap-[20px] mr-[15px] lg:mr-[20px]'>



              <Link to={'/profile'} onClick={closeMobileMenu}>

                <div className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-lg hover:bg-black/20 transition-colors duration-300 cursor-pointer ${location.pathname === '/profile' ? 'bg-black/20' : ''}`}>

                  <User className="hover:text-blue-300 transition-colors duration-300 text-white" size={20} />

                </div>

              </Link>

              <Link to={'/cart'} onClick={closeMobileMenu}>

                <div className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-lg hover:bg-black/20 transition-colors duration-300 cursor-pointer relative ${location.pathname === '/cart' ? 'bg-black/20' : ''}`}>

                  <ShoppingCart className="hover:text-blue-300 transition-colors duration-300 text-white" size={20} />

                  <CartBadge />

                </div>

              </Link>

            </div>



            {/* Mobile Menu Button */}

            <div className='sm:hidden flex items-center gap-[10px] mr-[15px]'>

              <Link to={'/profile'} onClick={closeMobileMenu}>

                <div className={`flex items-center justify-center w-10 h-10 rounded-lg hover:bg-black/20 transition-colors duration-300 cursor-pointer ${location.pathname === '/profile' ? 'bg-black/20' : ''}`}>

                  <User className="hover:text-blue-300 transition-colors duration-300 text-white" size={20} />

                </div>

              </Link>

              <Link to={'/cart'} onClick={closeMobileMenu}>

                <div className={`flex items-center justify-center w-10 h-10 rounded-lg hover:bg-black/20 transition-colors duration-300 cursor-pointer relative ${location.pathname === '/cart' ? 'bg-black/20' : ''}`}>

                  <ShoppingCart className="hover:text-blue-300 transition-colors duration-300 text-white" size={20} />

                  <CartBadge />

                </div>

              </Link>

              <button

                onClick={toggleMobileMenu}

                className='flex items-center justify-center w-10 h-10 rounded-lg hover:bg-black/20 transition-colors duration-300 cursor-pointer'

              >

                {isMobileMenuOpen ? (

                  <X className="text-white hover:text-blue-300 transition-colors duration-300" size={20} />

                ) : (

                  <Menu className="text-white hover:text-blue-300 transition-colors duration-300" size={20} />

                )}

              </button>

            </div>

          </div>

        </div>

      </header>



      {/* Mobile Navigation Component */}

      <MobileNav isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

    </>

  )

}



export default Header

