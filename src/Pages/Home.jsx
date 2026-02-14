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
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 px-2">
            Monaer tormoz kalodkalari – ishonchli tanlov
          </h1>
          <p className="text-xs xs:text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed px-3 xs:px-4">
            Yuqori sifatli tormoz kalodkalari barcha avtomobillar uchun. Xavfsizlik va uzoq muddatli ishlash kafolati.
          </p>
        </div>

        {/* ==================== FEATURE KARTALAR (3 ta) ==================== */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 mt-6 sm:mt-8 md:mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
            {[
              { icon: ShieldCheck, color: 'blue', title: 'Original mahsulotlar', text: 'Sertifikatlangan va tasdiqlangan' },
              { icon: BadgeDollarSign, color: 'green', title: 'Qulay narxlar', text: 'Eng yaxshi narx-sifat nisbati' },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center bg-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mx-auto flex items-center justify-center rounded-full bg-${item.color}-50 mb-2 sm:mb-3`}>
                  <item.icon size={16} className={`text-${item.color}-600 xs:size-4 sm:size-5`} />
                </div>
                <h3 className="font-semibold text-xs xs:text-sm sm:text-base mb-1">{item.title}</h3>
                <p className="text-xs xs:text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
          
          {/* Third card centered */}
          <div className="text-center bg-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-sm">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mx-auto flex items-center justify-center rounded-full bg-purple-50 mb-2 sm:mb-3">
              <Car size={16} className="text-purple-600 xs:size-4 sm:size-5" />
            </div>
            <h3 className="font-semibold text-xs xs:text-sm sm:text-base mb-1">Keng assortiment</h3>
            <p className="text-xs xs:text-sm text-gray-600">Ko'p turdagi avtomobillar uchun</p>
          </div>
        </div>

        {/* ==================== QIDIRUV ==================== */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center">
          <form onSubmit={handleSearch} className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-3 xs:px-4 sm:px-0">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-20 sm:pr-24 md:pr-32 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm sm:text-base"
                placeholder="Avtomobil modeli yoki qism nomini kiriting..."
              />
              <Search className="absolute left-2.5 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <button
                type="submit"
                className="absolute right-1.5 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-md sm:rounded-lg font-medium hover:bg-blue-700 transition-colors text-xs sm:text-sm"
              >
                Qidirish
              </button>
            </div>
          </form>
        </div>

        {/* ==================== MASHHUR MAHSULOTLAR ==================== */}
        <div className="mt-10 sm:mt-12 md:mt-16">
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 md:mb-8">
            Mashhur mahsulotlar
          </h2>

          {/* MOBILDA 2 tadan, katta ekranda 4 tadan */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mx-auto max-w-7xl">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Barcha mahsulotlarni ko'rish tugmasi */}
        <div className="text-center mt-6 sm:mt-8 md:mt-10">
          <Link
            to="/catalog"
            className="inline-block bg-blue-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Barcha mahsulotlarni ko'rish
          </Link>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 pb-8 sm:pb-12 md:pb-16">
          
        </div>
      </div>
    </div>
  );
}

export default Home;