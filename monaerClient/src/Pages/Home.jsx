import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MonaerImg1 from "../assets/images/MonaerImg1.png";
import { Search, ShieldCheck, BadgeDollarSign, Car } from 'lucide-react';
import { products as defaultProducts } from './Products'; // o'z yo'lingizni saqlang
import ProductCard from '../Components/ProductCard';
import LoadingSpinner from '../Components/LoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Home() {

  const [imageLoaded, setImageLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Load products from products.json or fallback to default
  const loadProducts = () => {
    // First try to load from products.json file (updated by dashboard)
    const productsFile = JSON.parse(localStorage.getItem('productsFile') || '[]');
    
    if (productsFile.length > 0) {
      // Use products.json if it exists (has dashboard-added products)
      setProducts(productsFile);
      return;
    }
    
    // Fallback to productsJson
    const productsJson = JSON.parse(localStorage.getItem('productsJson') || '[]');
    
    if (productsJson.length > 0) {
      // Use productsJson if it exists (has dashboard-added products)
      setProducts(productsJson);
      return;
    }
    
    // Fallback to default products
    setProducts(defaultProducts);
  };

  useEffect(() => {
    loadProducts();
    
    // Listen for product updates from dashboard
    const handleProductsUpdate = () => {
      loadProducts();
    }
    window.addEventListener('productsUpdated', handleProductsUpdate);
    
    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
    }
  }, []);

  useEffect(() => {
    document.body.classList.add('soft-gradient-bg');
    window.scrollTo(0, 0);

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = localStorage.getItem('user');

    if (!userData && !isLoggedIn) {
      console.log('Birinchi marta kirish - Home page');
    } else if (!isLoggedIn && userData) {
      navigate('/register');
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    },);



    const animateElements = () => {
      gsap.fromTo(
        '.hero-animate',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    };

    const animationTimer = setTimeout(animateElements, 300);

    return () => {
      document.body.classList.remove('soft-gradient-bg');
      clearTimeout(timer);
      clearTimeout(animationTimer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
        setIsLoading(false);
      }, 800);
    }
  };

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      {/* Asosiy container – mobil da to‘liq kenglik, katta ekranda markazda */}
      <div className="w-full px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:max-w-7xl xl:mx-auto">

        {/* ==================== SLIDER ==================== */}
        <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8">
          <Slider {...settings}>
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="px-0.5">
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg">
                  {!imageLoaded && (
                    <div className="w-full aspect-[4/2.8] xs:aspect-[4/2.6] sm:aspect-[4/2.3] md:aspect-[4/2] lg:aspect-[4/1.8] bg-gray-200 animate-pulse" />
                  )}
                  <img
                    src={MonaerImg1}
                    alt={`Slide ${idx + 1}`}
                    className={`w-full h-auto object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* ==================== SARLAVHA ==================== */}
  <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 hero-animate">
  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 px-2">
    Monaer tormoz kalodkalari – ishonchli tanlov
  </h1>
  <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed px-3 xs:px-4">
    Yuqori sifatli tormoz kalodkalari barcha avtomobillar uchun. Xavfsizlik va uzoq muddatli ishlash kafolati.
  </p>
</div>

        {/* ==================== FEATURE KARTALAR (3 ta) ==================== */}
        <div className="mt-8 sm:mt-8 md:mt-10">
          <div className="grid grid-cols-2 gap-2 sm:gap-2 md:gap-4 lg:gap-6 md:grid-cols-3">
            {[
              { icon: ShieldCheck, color: 'blue', title: 'Original mahsulotlar', text: 'Sertifikatlangan va tasdiqlangan' },
              { icon: BadgeDollarSign, color: 'green', title: 'Qulay narxlar', text: 'Eng yaxshi narx-sifat nisbati' },
              { icon: Car, color: 'purple', title: 'Keng assortiment', text: "Ko'p turdagi avtomobillar uchun" },
            ].map((item, i) => (
              <div
                key={i}
                className={`text-center bg-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-2 md:p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300 ${
                  i === 2 ? 'col-span-2 md:col-span-1 max-w-xs mx-auto md:max-w-none md:mx-0' : ''
                }`}
              >
                <div className={`w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-12 lg:w-14 lg:h-14 mx-auto flex items-center justify-center rounded-full bg-${item.color}-50 mb-2 sm:mb-2 md:mb-3 lg:mb-4`}>
                  <item.icon size={16} className={`text-${item.color}-600 sm:size-4 md:size-5 lg:size-6`} />
                </div>
                <h3 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 hidden sm:block">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== QIDIRUV ==================== */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center">
          <form onSubmit={handleSearch} className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-3 xs:px-4 sm:px-0">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-20 sm:pr-24 md:pr-32 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-xs sm:text-sm"
                placeholder="Mahsulot qidirish..."
              />
              <Search className="absolute left-2.5 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <button
                type="submit"
                className="absolute right-1.5 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-md sm:rounded-lg font-medium hover:bg-blue-700 transition-colors text-xs"
              >
                Qidirish
              </button>
            </div>
          </form>
        </div>

        {/* ==================== AKSIYADAGI MAHSULOTLAR ==================== */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16">
          <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
              Aksiyadagi mahsulotlar
            </h2>
            <div className="flex items-center space-x-2">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold animate-pulse">
                🔥 Chegirma
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                Chegirma bilan
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3 md:gap-4 lg:gap-6 mx-auto max-w-7xl">
            {products.filter(product => product.discount && product.discount > 0).slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {products.filter(product => product.discount && product.discount > 0).length === 0 && (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-xl p-6 max-w-md mx-auto">
                <div className="text-4xl mb-4">🏷️</div>
                <p className="text-gray-600">Hozircha aksiyadagi mahsulotlar yo'q</p>
              </div>
            </div>
          )}
        </div>

        {/* ==================== MASHHUR MAHSULOTLAR ==================== */}
        <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
          <h2 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 md:mb-8">
            Mashhur mahsulotlar
          </h2>

          {/* MOBILDA 2 tadan, katta ekranda 4 tadan */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mx-auto max-w-7xl">
            {products.filter(product => !product.discount || product.discount === 0).slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Barcha mahsulotlarni ko'rish tugmasi */}
        <div className="text-center mt-6 sm:mt-8 md:mt-10">
          <Link
            to="/catalog"
            className="inline-block bg-blue-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:bg-blue-700 transition-colors text-xs sm:text-sm"
          >
            Barcha mahsulotlarni ko'rish
          </Link>
        </div>

        {/* ==================== MIJOZLAR FIKRLARI ==================== */}
        <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
          <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-14 shadow-lg">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-gray-800">
              Mijozlarimiz fikrlari
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  name: 'Alisher Karimov',
                  car: 'Toyota Camry 2021',
                  rating: 5,
                  text: 'Monaer tormoz kalodkalari haqiqatan ham yuqori sifatli. 2 oydan beri ishlataman, hech qanday muammo yo\'q. Tavsiya qilaman!',
                  date: '2 hafta oldin'
                },
                {
                  name: 'Dilora Rahimova',
                  car: 'Hyundai Sonata 2020',
                  rating: 5,
                  text: 'Tezkor yetkazish va professional o\'rnatish. Usta hammasini yaxshi bajardi. Narxi ham qulay edi.',
                  date: '1 oy oldin'
                },
                {
                  name: 'Bakhtiyor Toshev',
                  car: 'Nissan Patrol 2019',
                  rating: 5,
                  text: 'Yuk mashinam uchun topdim. Sifati a\'lo. Xizmat ham zo\'r. Raxmat Monaer jamoasi!',
                  date: '1.5 oy oldin'
                },
                {
                  name: 'Gulnora Azizova',
                  car: 'Kia Sportage 2022',
                  rating: 5,
                  text: 'Online buyurtma qilish juda qulay. Mahsulot original ekanligiga ishonch hosil qildim. 12 oy kafolati bor.',
                  date: '3 hafta oldin'
                },
                {
                  name: 'Jamshid Umarov',
                  car: 'Lexus RX350 2020',
                  rating: 5,
                  text: 'Premium mahsulotlar. Xizmat darajasi yuqori. Barcha do\'stlarimga tavsiya qilaman.',
                  date: '2 oy oldin'
                },
                {
                  name: 'Malika Saidova',
                  car: 'Mitsubishi Outlander 2021',
                  rating: 5,
                  text: 'Telefon orqali maslahat oldim. Juda foydali bo\'ldi. Endi faqat Monaerdan olaman.',
                  date: '4 hafta oldin'
                }
              ].map((review, index) => (
                <div key={index} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-gray-800">{review.name}</h4>
                        <p className="text-xs text-gray-500">{review.car}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{review.date}</span>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Foydali bo'ldi ✓
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 sm:mt-10 md:mt-12">
              <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-md">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gradient-to-br ${i === 1 ? 'from-blue-400 to-blue-600' : i === 2 ? 'from-green-400 to-green-600' : i === 3 ? 'from-purple-400 to-purple-600' : i === 4 ? 'from-red-400 to-red-600' : 'from-yellow-400 to-yellow-600'} flex items-center justify-center text-white text-xs font-semibold`}>
                      {i}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">5000+ mamnun mijoz</p>
                  <p className="text-xs text-gray-500">Haqiqiy fikrlar va baholar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 pb-8 sm:pb-12 md:pb-16">
          
        </div>
      </div>
    </div>
  );
}

export default Home;