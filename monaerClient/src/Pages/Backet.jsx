import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../App';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  User,
  Phone,
  MapPin,
  CreditCard,
  Check,
  Map,
  X,
  Navigation,
  Package,
  Clock,
  Star,
  ArrowRight,
  ShoppingBag,
  Truck,
  Shield,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Zap,
  Award,
  Gift,
  ArrowLeft,
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
    loadCart();
    if (isAuthenticated) loadUserData();
  }, [isAuthenticated]);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  };

  const loadUserData = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData({
        name: user.name || user.fullName || '',
        phone: user.phone || '',
      });
    }
  };

  const updateQuantity = (id, change) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation qo‘llab-quvvatlanmaydi');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          address: `Joylashuv: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`,
        });
      },
      (err) => alert('Joylashuv xatosi: ' + err.message)
    );
  };

  const handleAutoDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Get address from coordinates using reverse geocoding
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              if (data && data.display_name) {
                setLocation({
                  lat: latitude.toString(),
                  lng: longitude.toString(),
                  address: data.display_name
                });
              }
            })
            .catch(error => {
              console.error('Error getting address:', error);
              // Fallback to coordinates only
              setLocation({
                lat: latitude.toString(),
                lng: longitude.toString(),
                address: `${latitude}, ${longitude}`
              });
            });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert("Joylashuvni aniqlab bo'lmadi. Iltimos, xaritadan tanlang.");
        }
      );
    } else {
      alert("Brauzeringiz joylashuvni aniqlashni qo'llab-quvvatlamaydi.");
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name?.trim()) {
      alert('Iltimos, ismingizni kiriting');
      return;
    }
    if (!userData.phone?.trim()) {
      alert('Iltimos, telefon raqamingizni kiriting');
      return;
    }
    if (!location.address?.trim()) {
      alert('Iltimos, manzilni tanlang');
      return;
    }
    if (cart.length === 0) {
      alert('Savatchangiz bo‘sh');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current user email
      const currentUser = localStorage.getItem('user');
      const userEmail = currentUser ? JSON.parse(currentUser).email : 'guest@example.com';

      const order = {
        id: `ORD-${Date.now()}`,
        userEmail: userEmail, // Add user email for profile filtering
        customer: userData.name.trim(),
        phone: userData.phone.trim(),
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: getTotalPrice(),
        total: getTotalPrice(), // Add total for profile display
        status: 'pending',
        date: new Date().toLocaleDateString('uz-UZ'),
        address: location.address.trim(),
        location: {
          lat: location.lat,
          lng: location.lng,
          address: location.address
        },
        paymentMethod: 'Naqt pul',
        deliveryType: 'Kurier',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

      window.dispatchEvent(new Event('ordersUpdated'));

      // API ga yuborish simulyatsiyasi
      await new Promise((r) => setTimeout(r, 1800));

      setCart([]);
      localStorage.removeItem('cart');

      setUserData({ name: '', phone: '' });
      setLocation({ lat: '', lng: '', address: '' });

      setOrderComplete(true);
    } catch (error) {
      console.error('Buyurtma xatosi:', error);
      alert('Buyurtma berishda xatolik yuz berdi. Iltimos qayta urinib ko‘ring.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg text-center border border-emerald-100">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Buyurtma qabul qilindi! 🎉</h2>
          <p className="text-gray-600 mb-8 text-lg">Tez orada operatorimiz siz bilan bog‘lanadi</p>
          <button
            onClick={() => {
              setOrderComplete(false);
              window.location.href = '/catalog';
            }}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
          >
            Katalogga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative">
      {/* Fon pattern – xavfsiz usulda */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-2v-4h-2v4h-2v4h-2v4h-2v4h-2v4h-2v4h-2v4h-2v4h-2v4h-2v4h-2v4h-2v4h-2v4h-2v4h-2v4h-2v4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                {cart.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md animate-pulse">
                    {cart.length}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Savatcha</h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} ta mahsulot
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs sm:text-sm text-gray-500">Jami summa</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {getTotalPrice().toLocaleString('uz-UZ')} so'm
              </p>
            </div>
          </div>
        </div>
      </header>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center relative z-10">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md mx-auto border border-gray-100">
            <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Savatchangiz bo‘sh</h3>
            <p className="text-gray-600 mb-8">Mahsulotlarni qo‘shish uchun katalogga o‘ting</p>
            <a
              href="/catalog"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Katalogga o‘tish <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mahsulotlar */}
            <div className="lg:col-span-2 space-y-2 sm:space-y-3 lg:space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-3 sm:p-4 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="relative">
                      <img
                        src={item.image || 'https://via.placeholder.com/100'}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 flex-1">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <p className="text-base sm:text-lg font-bold text-gray-900">
                          {item.price.toLocaleString('uz-UZ')} so'm
                        </p>

                        <div className="flex items-center bg-gray-100 rounded-lg border border-gray-300">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 sm:px-3 py-1.5 sm:py-2 font-semibold text-gray-900 min-w-[30px] sm:min-w-[40px] text-center text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-gray-700 font-semibold text-xs sm:text-sm">Jami:</span>
                        <span className="text-base sm:text-lg font-bold text-gray-900">
                          {(item.price * item.quantity).toLocaleString('uz-UZ')} so'm
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buyurtma formasi */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-5 lg:p-6 lg:sticky lg:top-4">
                <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <CreditCard className="text-blue-600" size={16} />
                  Buyurtma ma'lumotlari
                </h2>

                <form onSubmit={handleOrderSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <User size={14} /> Ismingiz
                    </label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all text-sm sm:text-base"
                      placeholder="Ism va familiyangiz"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Phone size={14} /> Telefon
                    </label>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all text-sm sm:text-base"
                      placeholder="+998 XX XXX XX XX"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin size={14} /> Manzil
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={location.address}
                        readOnly
                        className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm sm:text-base"
                        placeholder="Manzil tanlanmagan"
                      />
                      <button
                        type="button"
                        onClick={handleAutoDetectLocation}
                        className="p-2 sm:p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                        title="Avtomatik joylashuvni aniqlash"
                      >
                        <Navigation size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowMap(true)}
                        className="p-2 sm:p-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                      >
                        <Map size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 sm:p-4 lg:p-5 rounded-xl border border-gray-200">
                    <h3 className="font-semibold mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base lg:text-lg">Xulosa</h3>
                    <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-xs sm:text-sm">
                          <span className="text-gray-600 truncate max-w-[60%] sm:max-w-[70%]">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium text-gray-900 whitespace-nowrap">
                            {(item.price * item.quantity).toLocaleString('uz-UZ')} so'm
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-300 mt-2 sm:mt-3 lg:mt-4 pt-2 sm:pt-3 lg:pt-4 flex justify-between items-center">
                      <span className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg">Jami:</span>
                      <span className="font-bold text-gray-900 text-base sm:text-lg lg:text-2xl">
                        {getTotalPrice().toLocaleString('uz-UZ')} so'm
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 sm:py-3 lg:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 shadow-lg text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 border-2 border-white border-t-transparent rounded-full" />
                        Yuborilmoqda...
                      </>
                    ) : (
                      <>
                        <CreditCard size={14} />
                        Buyurtma berish
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Xarita modal (oddiy placeholder) */}
      {showMap && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-5 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Map size={24} className="text-gray-700" />
                Manzil tanlash
              </h3>
              <button onClick={() => setShowMap(false)} className="p-2 hover:bg-gray-200 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 text-lg font-medium">
                Xarita komponenti bu yerga joylashtiriladi (masalan Google Maps yoki Yandex Maps)
              </div>

              <button
                onClick={() => {
                  getCurrentLocation();
                  setShowMap(false);
                }}
                className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-900 flex items-center justify-center gap-2"
              >
                <Navigation size={20} />
                Joriy joylashuvni ishlatish
              </button>

              <div>
                <label className="block text-sm font-medium mb-2">Yoki manzilni yozing:</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-xl min-h-[100px] focus:ring-2 focus:ring-gray-300 outline-none"
                  placeholder="To‘liq manzilingizni kiriting..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      const val = e.target.value.trim();
                      if (val) handleLocationSelect({ address: val });
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const ta = e.target.parentElement.querySelector('textarea');
                    const val = ta?.value.trim();
                    if (val) handleLocationSelect({ address: val });
                  }}
                  className="mt-3 w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 border border-gray-300"
                >
                  Manzilni saqlash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Backet;