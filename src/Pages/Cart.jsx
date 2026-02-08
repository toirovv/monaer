import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  // Checkout formasi uchun state (oddiy misol)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    delivery: 'Kuryer (1-3 kun)',
    payment: 'Naqd pul',
    agree: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadCartItems = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const items = JSON.parse(savedCart);
          setCartItems(items);
          setShowCheckout(items.length > 0);
        } else {
          setCartItems([]);
          setShowCheckout(false);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
        setShowCheckout(false);
      }
    };

    loadCartItems();

    const handleCartUpdate = () => loadCartItems();
    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    const timer = setTimeout(() => setIsLoading(false), 400);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setShowCheckout(cartItems.length > 0);
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

  const getItemPrice = (item) => {
    return item.discount && item.discount > 0 ? item.price : item.oldPrice || item.price;
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + getItemPrice(item) * item.quantity;
    }, 0);
  };

  const getTotalDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.discount && item.oldPrice) {
        const discountAmount = item.oldPrice - item.price;
        return total + discountAmount * item.quantity;
      }
      return total;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckout = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }
    if (!formData.agree) {
      alert("Shartlarni qabul qilishingiz kerak!");
      return;
    }

    // Bu yerda real backendga so'rov jo'natish mumkin
    console.log('Buyurtma ma\'lumotlari:', {
      items: cartItems,
      total: getTotalPrice(),
      discount: getTotalDiscount(),
      ...formData,
    });

    // Kartani tozalash
    setCartItems([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));

    alert("Buyurtmangiz qabul qilindi! Tez orada aloqaga chiqamiz.");
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/catalog"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Katalogga qaytish</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Savatcha</h1>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <ShoppingBag size={20} />
            <span>{getTotalItems()} ta</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Savatchangiz bo'sh</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Hozircha hech qanday mahsulot qo'shmagansiz.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Katalogga o'tish
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || 'https://via.placeholder.com/150'}
                        alt={item.name}
                        className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-lg border"
                        onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.category || 'Ehtiyot qism'}
                          </p>
                          {item.compatibility && (
                            <p className="text-xs text-gray-500 mt-1">
                              Mos: {item.compatibility}
                            </p>
                          )}
                        </div>

                        <div className="text-right min-w-[140px]">
                          {item.discount && item.oldPrice ? (
                            <>
                              <p className="text-xl font-bold text-green-600">
                                {item.price.toLocaleString()} so'm
                              </p>
                              <p className="text-sm text-gray-500 line-through">
                                {item.oldPrice.toLocaleString()} so'm
                              </p>
                              <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full mt-1">
                                -{item.discount}%
                              </span>
                            </>
                          ) : (
                            <p className="text-xl font-bold">
                              {item.price.toLocaleString()} so'm
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-40"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={18} />
                          </button>
                          <span className="w-10 text-center font-semibold text-lg">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                          >
                            <Plus size={18} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          <Trash2 size={18} />
                          O'chirish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h3 className="text-xl font-semibold mb-5">Buyurtma xulosasi</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Mahsulotlar ({getTotalItems()} ta)</span>
                    <span>{(getTotalPrice() + getTotalDiscount()).toLocaleString()} so'm</span>
                  </div>

                  {getTotalDiscount() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Chegirma</span>
                      <span>-{getTotalDiscount().toLocaleString()} so'm</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-700">
                    <span>Yetkazib berish</span>
                    <span className="text-green-600 font-medium">Bepul</span>
                  </div>

                  <div className="border-t pt-4 mt-2">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Jami</span>
                      <span className="text-blue-700">
                        {getTotalPrice().toLocaleString()} so'm
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckout(!showCheckout)}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  {showCheckout ? "Yopish" : "Rasmiylashtirish"}
                </button>

                {showCheckout && (
                  <div className="mt-6 pt-6 border-t space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Ism *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ismingiz"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+998 XX XXX XX XX"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Manzil *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="To'liq manzilingiz"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Yetkazib berish usuli
                      </label>
                      <select
                        name="delivery"
                        value={formData.delivery}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Kuryer (1-3 kun)</option>
                        <option>Olib ketish (Sergeli)</option>
                        <option>Express yetkazib berish</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        To'lov usuli
                      </label>
                      <select
                        name="payment"
                        value={formData.payment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Naqd pul</option>
                        <option>Click</option>
                        <option>Payme</option>
                        <option>Uzum</option>
                      </select>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleInputChange}
                        className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300"
                        required
                      />
                      <label className="text-sm text-gray-600 leading-relaxed">
                        Buyurtma shartlari va maxfiylik siyosati bilan tanishdim va roziman
                      </label>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full bg-green-600 text-white py-3.5 rounded-lg hover:bg-green-700 font-medium transition-colors mt-2"
                    >
                      Buyurtmani tasdiqlash
                    </button>
                  </div>
                )}

                <Link
                  to="/catalog"
                  className="block text-center text-blue-600 hover:text-blue-700 mt-5 text-sm font-medium"
                >
                  Yana mahsulot qo‘shish →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;