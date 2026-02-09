import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MonaerImg1 from "../assets/images/MonaerImg1.png";
import { Search, ShieldCheck, BadgeDollarSign, Car } from 'lucide-react';
import { products } from './Products'; // o'z yo'lingizni saqlang
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
  const navigate = useNavigate();

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
    }, 1200);

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
      <div className="w-full px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-7xl xl:mx-auto">

        {/* ==================== SLIDER ==================== */}
        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
          <Slider {...settings}>
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="px-1">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  {!imageLoaded && (
                    <div className="w-full aspect-[4/2.5] sm:aspect-[4/2] md:aspect-[4/1.8] bg-gray-200 animate-pulse" />
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
        <div className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16 hero-animate">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Monaer tormoz kalodkalari – ishonchli tanlov
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Yuqori sifatli tormoz kalodkalari barcha avtomobillar uchun. Xavfsizlik va uzoq muddatli ishlash kafolati.
          </p>
        </div>

        {/* ==================== FEATURE KARTALAR (3 ta) ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 md:mt-14 max-w-5xl mx-auto">
          {[
            { icon: ShieldCheck, color: 'blue', title: 'Original mahsulotlar', text: 'Sertifikatlangan va tasdiqlangan' },
            { icon: BadgeDollarSign, color: 'green', title: 'Qulay narxlar', text: 'Eng yaxshi narx-sifat nisbati' },
            { icon: Car, color: 'purple', title: 'Keng assortiment', text: 'Ko‘p turdagi avtomobillar uchun' },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto flex items-center justify-center rounded-full bg-${item.color}-50 mb-4`}>
                <item.icon size={24} className={`text-${item.color}-600 sm:size-28`} />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>

        {/* ==================== QIDIRUV ==================== */}
        <div className="mt-10 sm:mt-12 md:mt-16 flex flex-col items-center">
          <form onSubmit={handleSearch} className="w-full max-w-lg sm:max-w-xl md:max-w-2xl px-2 sm:px-0">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-24 sm:pr-32 py-3 sm:py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base"
                placeholder="Avtomobil modeli yoki qism nomini kiriting..."
              />
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <button
                type="submit"
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Qidirish
              </button>
            </div>
          </form>
        </div>

        {/* ==================== MASHHUR MAHSULOTLAR ==================== */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">
            Mashhur mahsulotlar
          </h2>

          {/* MOBILDA 2 tadan, katta ekranda 4 tadan */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mx-auto max-w-7xl">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Barcha mahsulotlarni ko'rish tugmasi */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <Link
            to="/catalog"
            className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Barcha mahsulotlarni ko'rish
          </Link>
        </div>

        <div className="mt-16 md:mt-20 pb-12 md:pb-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">
            Kategoriyalar
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;