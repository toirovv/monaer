import React, { useState, useEffect } from 'react'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCheckout, setShowCheckout] = useState(false)

  useEffect(() => {
    // Load cart items from localStorage
    const loadCartItems = () => {
      try {
        const savedCart = localStorage.getItem('cart')
        console.log('Loading cart from localStorage:', savedCart); // Debug
        
        if (savedCart) {
          const items = JSON.parse(savedCart)
          console.log('Parsed cart items:', items); // Debug
          setCartItems(items)
          setShowCheckout(items.length > 0)
        } else {
          console.log('No cart found in localStorage'); // Debug
          setCartItems([])
          setShowCheckout(false)
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
        setShowCheckout(false);
      }
    }

    loadCartItems()
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      console.log('Cart update event received');
      loadCartItems()
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('storage', handleCartUpdate)
    
    // Also refresh on focus to catch any localStorage changes
    const handleFocus = () => {
      console.log('Window focus event, reloading cart');
      loadCartItems()
    }
    
    window.addEventListener('focus', handleFocus)
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500)
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('storage', handleCartUpdate)
      window.removeEventListener('focus', handleFocus)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cartItems))
    setShowCheckout(cartItems.length > 0)
  }, [cartItems])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id)
      return
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discount ? item.price : item.oldPrice
      return total + (price * item.quantity)
    }, 0)
  }

  const getTotalDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.discount) {
        return total + ((item.oldPrice - item.price) * item.quantity)
      }
      return 0
    }, 0)
  }

  const handleCheckout = () => {
    // Clear cart after checkout
    setCartItems([]);
    localStorage.removeItem('cart');
    
    // Redirect to home page
    window.location.href = '/';
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/catalog" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Katalogga qaytish</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Savatcha</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ShoppingBag size={20} />
            <span>{getTotalItems()} mahsulot</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Savatchangiz bo'sh
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Siz hali hech qanday mahsulot qo'shmadingiz. Katalogdan mahsulotlarni tanlang va ularni savatchangizga qo'shing.
            </p>
            <Link 
              to="/catalog"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ShoppingBag size={20} />
              Katalogga o'tish
            </Link>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.category}
                          </p>
                          {item.compatibility && (
                            <p className="text-xs text-gray-500">
                              Mos: {item.compatibility}
                            </p>
                          )}
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          {item.discount ? (
                            <div>
                              <p className="text-lg font-bold text-green-600">
                                {item.price.toLocaleString()} so'm
                              </p>
                              <p className="text-sm text-gray-500 line-through">
                                {item.oldPrice.toLocaleString()} so'm
                              </p>
                              <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                                -{item.discount}%
                              </span>
                            </div>
                          ) : (
                            <p className="text-lg font-bold text-gray-900">
                              {item.price.toLocaleString()} so'm
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                          <span className="text-sm font-medium">O'chirish</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Buyurtma xulosasi
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Mahsulotlar ({getTotalItems()} ta)</span>
                    <span className="font-medium">
                      {(getTotalPrice() + getTotalDiscount()).toLocaleString()} so'm
                    </span>
                  </div>
                  
                  {getTotalDiscount() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Chegirma</span>
                      <span className="font-medium text-green-600">
                        -{getTotalDiscount().toLocaleString()} so'm
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Yetkazish</span>
                    <span className="font-medium text-green-600">Bepul</span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Jami</span>
                      <span className="text-lg font-bold text-blue-600">
                        {getTotalPrice().toLocaleString()} so'm
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Rasmiylashtirish
                </button>

                {/* Checkout Form - Only show when showCheckout is true */}
                {showCheckout && (
                  <div className="mt-6 space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ism
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ismingizni kiriting"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+998 XX XXX XX XX"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Manzil
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        placeholder="To'liq manzilingizni kiriting"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yetkazib berish usuli
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Kuryer (1-3 kun)</option>
                        <option>Olib ketish (Sergeli)</option>
                        <option>Express yetkazib berish</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        To'lov usuli
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Naqd pul</option>
                        <option>Click</option>
                        <option>Payme</option>
                        <option>Uzum</option>
                      </select>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-sm text-gray-600">
                        Men shartlarni qabul qilaman va buyurtmani rasmiylashtirishga roziman
                      </label>
                    </div>
                    
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Buyurtmani Rasmiylashtirish
                    </button>
                  </div>
                )}

                <Link 
                  to="/catalog"
                  className="block w-full mt-3 text-center text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                >
                  Savatchani to'ldirishda davom etish
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
