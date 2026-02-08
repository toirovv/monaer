import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MonaerImg1 from "../assets/images/MonaerImg1.png"
import { Search, ShieldCheck, BadgeDollarSign, Car } from 'lucide-react'
import { products } from './Products'
import ProductCard from '../Components/ProductCard'
import LoadingSpinner from '../Components/LoadingSpinner'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Home() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('soft-gradient-bg')
    window.scrollTo(0, 0)

    // Foydalanuvchi kirganligini tekshirish
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const userData = localStorage.getItem('user')

    // Agar birinchi marta kirayotgan bo'lsa (hech narsa bo'lmasa) - Home da qolish
    if (!userData && !isLoggedIn) {
      // Birinchi marta - hech qayerga yo'naltirmaslik
      console.log('Birinchi marta kirish - Home page')
    } else if (!isLoggedIn && userData) {
      // Ro'yxatdan o'tgan lekin kirilmagan bo'lsa - Register ga yuborish
      navigate('/register')
      return
    }

    // Agar kirgan bo'lsa — sahifani yuklaymiz
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    // Animatsiyalarni ishga tushirish
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
      )
    }

    const animationTimer = setTimeout(animateElements, 300)

    return () => {
      document.body.classList.remove('soft-gradient-bg')
      clearTimeout(timer)
      clearTimeout(animationTimer)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [navigate])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsLoading(true)
      setTimeout(() => {
        navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
        setIsLoading(false)
      }, 800)
    }
  }

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">

        {/* Slider */}
        <div className="mt-5 md:mt-8 lg:mt-10">
          <Slider {...settings}>
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="px-1 md:px-2">
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg">
                  {!imageLoaded && (
                    <div className="w-full aspect-[4/2.2] md:aspect-[4/1.8] bg-gray-200 animate-pulse" />
                  )}
                  <img
                    src={MonaerImg1}
                    alt={`Slide ${idx + 1}`}
                    className={`w-full h-auto object-cover rounded-xl md:rounded-2xl transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Sarlavha */}
        <div className="text-center mt-10 md:mt-14 lg:mt-16 hero-animate px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3 md:mb-4">
            Monaer tormoz kalodkalari – ishonchli tanlov
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Yuqori sifatli tormoz kalodkalari barcha avtomobillar uchun. Xavfsizlik va uzoq muddatli ishlash kafolati.
          </p>
        </div>

        {/* Feature kartalar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mt-10 md:mt-14 max-w-5xl mx-auto">
          {[
            { icon: ShieldCheck, color: 'blue', title: 'Original mahsulotlar', text: 'Sertifikatlangan va tasdiqlangan' },
            { icon: BadgeDollarSign, color: 'green', title: 'Qulay narxlar', text: 'Eng yaxshi narx-sifat nisbati' },
            { icon: Car, color: 'purple', title: 'Keng assortiment', text: 'Ko‘p turdagi avtomobillar uchun' },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center bg-white border rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-${item.color}-50 mb-4`}>
                <item.icon size={28} className={`text-${item.color}-600`} />
              </div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Qidiruv */}
        <div className="mt-12 md:mt-16 flex flex-col items-center">
          <form onSubmit={handleSearch} className="w-full max-w-xl lg:max-w-2xl">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-28 py-3.5 md:py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-base"
                placeholder="Avtomobil modeli yoki qism nomini kiriting..."
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Qidirish
              </button>
            </div>
          </form>
        </div>

        <div className="mt-14 md:mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
            Mashhur mahsulotlar
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {products.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10 md:mt-14">
            <Link
              to="/catalog"
              className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Barcha mahsulotlarni ko‘rish
            </Link>
          </div>
        </div>

        <div className="mt-16 md:mt-20 pb-10 md:pb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
            Kategoriyalar
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home