import React from 'react'
import { Home, Info, MessageSquare, Contact, LayoutGrid, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import MenuProps from './MenuProps'

function MobileNav({ isOpen, onClose }) {
  const location = useLocation()

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-start justify-center pt-[100px]'>
      <div className='bg-blue-600 rounded-2xl shadow-2xl w-[90%] max-w-md mx-4 overflow-hidden transform transition-all duration-300 scale-100'>
        {/* Header */}
        <div className='bg-blue-700 px-6 py-4 flex items-center justify-between'>
          <h2 className='text-white font-semibold text-lg'>Menu</h2>
          <button 
            onClick={onClose}
            className='text-white hover:bg-blue-800 rounded-lg p-2 transition-colors duration-200'
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <div className='px-4 py-4'>
          <div className='flex flex-col space-y-2'>
            <Link to={'/'} onClick={onClose}>
              <div className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'bg-blue-700 text-white shadow-lg' 
                  : 'text-white hover:bg-blue-700 hover:shadow-md'
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  location.pathname === '/' ? 'bg-blue-800' : 'bg-blue-500'
                }`}>
                  <Home size={20} />
                </div>
                <div className='flex-1'>
                  <span className="font-medium text-base">
                    <MenuProps Menu={'Bosh Sahifa'} isActive={location.pathname === '/'} />
                  </span>
                  {location.pathname === '/' && (
                    <div className='text-xs text-blue-200 mt-1'>Hozirgi sahifa</div>
                  )}
                </div>
              </div>
            </Link>

            <Link to={'about'} onClick={onClose}>
              <div className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 ${
                location.pathname === '/about' 
                  ? 'bg-blue-700 text-white shadow-lg' 
                  : 'text-white hover:bg-blue-700 hover:shadow-md'
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  location.pathname === '/about' ? 'bg-blue-800' : 'bg-blue-500'
                }`}>
                  <Info size={20} />
                </div>
                <div className='flex-1'>
                  <span className="font-medium text-base">
                    <MenuProps Menu={'Biz Haqimizda'} isActive={location.pathname === '/about'} />
                  </span>
                  {location.pathname === '/about' && (
                    <div className='text-xs text-blue-200 mt-1'>Hozirgi sahifa</div>
                  )}
                </div>
              </div>
            </Link>

            <Link to={'blog'} onClick={onClose}>
              <div className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 ${
                location.pathname === '/blog' 
                  ? 'bg-blue-700 text-white shadow-lg' 
                  : 'text-white hover:bg-blue-700 hover:shadow-md'
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  location.pathname === '/blog' ? 'bg-blue-800' : 'bg-blue-500'
                }`}>
                  <MessageSquare size={20} />
                </div>
                <div className='flex-1'>
                  <span className="font-medium text-base">
                    <MenuProps Menu={'Blog'} isActive={location.pathname === '/blog'} />
                  </span>
                  {location.pathname === '/blog' && (
                    <div className='text-xs text-blue-200 mt-1'>Hozirgi sahifa</div>
                  )}
                </div>
              </div>
            </Link>

            <Link to={'catalog'} onClick={onClose}>
              <div className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 ${
                location.pathname === '/catalog' 
                  ? 'bg-blue-700 text-white shadow-lg' 
                  : 'text-white hover:bg-blue-700 hover:shadow-md'
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  location.pathname === '/catalog' ? 'bg-blue-800' : 'bg-blue-500'
                }`}>
                  <LayoutGrid size={20} />
                </div>
                <div className='flex-1'>
                  <span className="font-medium text-base">
                    <MenuProps Menu={'Katalog'} isActive={location.pathname === '/catalog'} />
                  </span>
                  {location.pathname === '/catalog' && (
                    <div className='text-xs text-blue-200 mt-1'>Hozirgi sahifa</div>
                  )}
                </div>
              </div>
            </Link>

            <Link to={'contact'} onClick={onClose}>
              <div className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 ${
                location.pathname === '/contact' 
                  ? 'bg-blue-700 text-white shadow-lg' 
                  : 'text-white hover:bg-blue-700 hover:shadow-md'
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  location.pathname === '/contact' ? 'bg-blue-800' : 'bg-blue-500'
                }`}>
                  <Contact size={20} />
                </div>
                <div className='flex-1'>
                  <span className="font-medium text-base">
                    <MenuProps Menu={'Kontaktlar'} isActive={location.pathname === '/contact'} />
                  </span>
                  {location.pathname === '/contact' && (
                    <div className='text-xs text-blue-200 mt-1'>Hozirgi sahifa</div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className='bg-blue-700 px-6 py-3 border-t border-blue-600'>
          <div className='text-center text-blue-200 text-sm'>
            Monaer - Avtomobil ehtiyot qismlari
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav
