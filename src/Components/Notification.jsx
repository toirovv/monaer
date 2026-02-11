import React, { useState, useEffect } from 'react'
import { X, AlertCircle, User, LogIn, XCircle } from 'lucide-react'

function Notification({ 
  type = 'info', 
  message, 
  isVisible, 
  onClose, 
  duration = 5000,
  actionText,
  onAction 
}) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
        setTimeout(() => onClose(), 300)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const getNotificationStyles = () => {
    switch (type) {
      case 'auth':
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          iconBg: 'bg-blue-100',
          title: 'text-blue-800',
          button: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
        }
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          iconBg: 'bg-green-100',
          title: 'text-green-800',
          button: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
        }
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-amber-50 to-orange-50',
          border: 'border-amber-200',
          icon: 'text-amber-600',
          iconBg: 'bg-amber-100',
          title: 'text-amber-800',
          button: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
        }
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-50 to-slate-50',
          border: 'border-gray-200',
          icon: 'text-gray-600',
          iconBg: 'bg-gray-100',
          title: 'text-gray-800',
          button: 'bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600'
        }
    }
  }

  const styles = getNotificationStyles()

  const getIcon = () => {
    switch (type) {
      case 'auth':
        return <User size={20} />
      case 'success':
        return <AlertCircle size={20} />
      case 'warning':
        return <XCircle size={20} />
      default:
        return <AlertCircle size={20} />
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 xs:p-4 sm:p-6 pointer-events-none">
      <div 
        className={`
          relative w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl border-2 
          transform transition-all duration-300 ease-out pointer-events-auto
          ${isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'}
          ${styles.bg} ${styles.border}
        `}
      >
        {/* Gradient top border */}
        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${styles.button}`}></div>
        
        <div className="p-4 xs:p-5 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Icon */}
            <div className={`flex-shrink-0 w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center ${styles.iconBg}`}>
              <div className={styles.icon}>
                {getIcon()}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold text-sm xs:text-base sm:text-lg mb-1 sm:mb-2 ${styles.title}`}>
                {type === 'auth' ? 'Ro\'yxatdan o\'tish talab qilinadi' : 'Bildirishnoma'}
              </h3>
              <p className="text-gray-600 text-xs xs:text-sm sm:text-base leading-relaxed">
                {message}
              </p>
              
              {/* Action buttons */}
              {type === 'auth' && (
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <button
                    onClick={() => {
                      window.location.href = '/login'
                      onClose()
                    }}
                    className={`flex-1 text-white px-3 xs:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium text-xs xs:text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${styles.button}`}
                  >
                    <LogIn size={16} className="xs:size-4 sm:size-5" />
                    Tizimga kirish
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = '/register'
                      onClose()
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 px-3 xs:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium text-xs xs:text-sm sm:text-base hover:bg-gray-200 transition-colors"
                  >
                    Ro'yxatdan o'tish
                  </button>
                </div>
              )}
              
              {actionText && onAction && (
                <button
                  onClick={() => {
                    onAction()
                    onClose()
                  }}
                  className={`mt-3 sm:mt-4 text-white px-4 xs:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium text-xs xs:text-sm sm:text-base transition-all ${styles.button}`}
                >
                  {actionText}
                </button>
              )}
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 xs:top-4 xs:right-4 sm:top-5 sm:right-5 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={18} className="xs:size-4 sm:size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notification
