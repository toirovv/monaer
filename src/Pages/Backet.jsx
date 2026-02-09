import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../App';
import {
  ShoppingCart, Plus, Minus, Trash2, User, Phone, MapPin,
  CreditCard, Check, Map, X, Navigation, Package, Star,
  ArrowRight, ShoppingBag, Truck, Shield
} from 'lucide-react';

function Backet() {
  const { isAuthenticated } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState({ name: '', phone: '' });
  const [location, setLocation] = useState({ lat: '', lng: '', address: '' });
  const [showMap, setShowMap] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    if (isAuthenticated) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setUserData({
          name: user.name || user.fullName || '',
          phone: user.phone || ''
        });
      }
    }
  }, [isAuthenticated]);

  const updateQuantity = (id, change) => {
    setCart(prev => {
      const updated = prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = id => {
    setCart(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleLocationSelect = (locData) => {
    setLocation({
      lat: locData.lat || '',
      lng: locData.lng || '',
      address: locData.address || 'Tanlangan manzil'
    });
    setShowMap(false);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation qo‘llab-quvvatlanmaydi");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          address: `Joy: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`
        });
      },
      err => alert("Joylashuv xatosi: " + err.message)
    );
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!userData.name.trim() || !userData.phone.trim() || !location.address.trim()) {
      alert("Barcha maydonlarni to‘ldiring");
      return;
    }

    setIsSubmitting(true);

    const order = {
      id: Date.now(),
      items: cart,
      total: getTotalPrice(),
      customer: userData,
      location,
      date: new Date().toISOString()
    };

    try {
      // Telegram yuborish funksiyasi (oldingi koddan olingan)
      // await sendOrderToTelegram(order);

      // muvaffaqiyatli bo'lsa
      localStorage.removeItem('cart');
      setCart([]);
      setOrderComplete(true);
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi, lekin buyurtma saqlandi");
      setOrderComplete(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Buyurtma qabul qilindi!</h2>
          <p className="text-gray-600 mb-6 text-sm">Tez orada aloqaga chiqamiz</p>
          <button
            onClick={() => setOrderComplete(false)}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-xl font-medium text-sm hover:from-blue-600 hover:to-cyan-700"
          >
            Yangi buyurtma berish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Savatcha</h1>
              <p className="text-xs text-gray-500">{cart.length} ta</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Jami</p>
            <p className="text-lg font-bold text-blue-600">
              {getTotalPrice().toLocaleString()} so‘m
            </p>
          </div>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <ShoppingBag className="w-20 h-20 text-gray-300 mb-5" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Savatchangiz bo‘sh</h3>
          <p className="text-gray-600 text-sm mb-6">Mahsulot qo‘shish uchun katalogga o‘ting</p>
          <a
            href="/catalog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-blue-600 hover:to-cyan-600"
          >
            <ShoppingCart size={18} />
            Katalogga o‘tish
          </a>
        </div>
      ) : (
        <>
          {/* Mini statistika */}
          <div className="mx-4 mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-4 text-white shadow-md">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <Package size={20} className="mx-auto mb-1 opacity-90" />
                <p className="text-base font-bold">{cart.length}</p>
                <p className="text-[10px] opacity-80">Maxsulot</p>
              </div>
              <div>
                <Star size={20} className="mx-auto mb-1 text-yellow-300" />
                <p className="text-base font-bold">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </p>
                <p className="text-[10px] opacity-80">Soni</p>
              </div>
              <div>
                <Truck size={20} className="mx-auto mb-1" />
                <p className="text-base font-bold">24 soat</p>
                <p className="text-[10px] opacity-80">Yetkazish</p>
              </div>
              <div>
                <Shield size={20} className="mx-auto mb-1" />
                <p className="text-base font-bold">100%</p>
                <p className="text-[10px] opacity-80">Kafolat</p>
              </div>
            </div>
          </div>

          {/* Mahsulotlar */}
          <div className="px-4 py-5 space-y-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm p-3 border border-gray-100"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image || '/placeholder.jpg'}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-base font-bold text-blue-600 mb-2">
                      {item.price?.toLocaleString()} so‘m
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-2 text-blue-600"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 text-sm font-medium min-w-[36px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 py-2 text-blue-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 text-xs flex justify-between text-gray-600">
                  <span>Jami:</span>
                  <span className="font-medium text-blue-700">
                    {(item.price * item.quantity).toLocaleString()} so‘m
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Forma - pastki qismda yopishqoq */}
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-10 mt-6">
            <div className="px-4 pt-4 pb-5 max-w-3xl mx-auto">
              <h2 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                <CreditCard size={18} className="text-blue-600" />
                Buyurtma ma‘lumotlari
              </h2>

              <form onSubmit={handleOrderSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block flex items-center gap-1.5">
                    <User size={14} className="text-blue-600" />
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={e => setUserData({ ...userData, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                    placeholder="Ism-familyangiz"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block flex items-center gap-1.5">
                    <Phone size={14} className="text-blue-600" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={e => setUserData({ ...userData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                    placeholder="+998 XX XXX XX XX"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block flex items-center gap-1.5">
                    <MapPin size={14} className="text-blue-600" />
                    Yetkazib berish manzili
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={location.address}
                      readOnly
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700"
                      placeholder="Manzil tanlanmagan"
                      required
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="p-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <Navigation size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowMap(true)}
                      className="p-2.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                    >
                      <Map size={18} />
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 text-xs">
                  <h3 className="font-medium text-gray-800 mb-2">Xulosa</h3>
                  <div className="space-y-1.5 mb-2">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-gray-600 truncate max-w-[70%]">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium text-blue-700">
                          {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-blue-200 pt-2 flex justify-between font-medium text-sm">
                    <span>Jami summa:</span>
                    <span className="text-blue-700">
                      {getTotalPrice().toLocaleString()} so‘m
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3.5 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-cyan-700 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} />
                      Buyurtma berish
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Xarita oynasi */}
      {showMap && (
        <MapSelector
          onLocationSelect={handleLocationSelect}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
}

export default Backet;