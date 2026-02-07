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
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function Home() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('soft-gradient-bg');
    window.scrollTo(0, 0);

    // Initial loading for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    // Enhanced GSAP animations with brand-consistent effects
    const animateElements = () => {
      try {
        // Animate hero section with staggered entrance
        const heroElements = document.querySelectorAll('.hero-animate');
        gsap.fromTo(heroElements,
          {
            opacity: 0,
            y: 60,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: heroElements[0],
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animate sections on scroll with enhanced effects
        const sections = document.querySelectorAll('.animate-section');
        sections.forEach((section, index) => {
          gsap.fromTo(section,
            {
              opacity: 0,
              y: 80,
              rotationX: 15
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 1.5,
              ease: "power3.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        // Animate categories with 3D effects
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach((card, index) => {
          gsap.fromTo(card,
            {
              opacity: 0,
              scale: 0.7,
              rotationY: 45,
              z: -100
            },
            {
              opacity: 1,
              scale: 1,
              rotationY: 0,
              z: 0,
              duration: 1,
              ease: "back.out(1.7)",
              delay: index * 0.15,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Add hover animation for categories
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              rotationY: 5,
              z: 20,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              rotationY: 0,
              z: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });

        // Enhanced iOS-style animations for feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
          // Initial entrance animation with iOS spring effect
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 50,
              scale: 0.8,
              rotationY: -15,
              transformPerspective: 1000
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 0.8,
              ease: "back.out(1.2)",
              delay: index * 0.15,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // iOS-style hover interactions
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.05,
              y: -5,
              rotationY: 5,
              rotationX: 5,
              duration: 0.4,
              ease: "power2.out"
            });
            
            // Animate icon on hover
            const icon = card.querySelector('.monaer-pulse');
            if (icon) {
              gsap.to(icon, {
                scale: 1.2,
                rotation: 360,
                duration: 0.6,
                ease: "back.out(1.7)"
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              rotationY: 0,
              rotationX: 0,
              duration: 0.3,
              ease: "power2.inOut"
            });
            
            // Reset icon animation
            const icon = card.querySelector('.monaer-pulse');
            if (icon) {
              gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: "power2.inOut"
              });
            }
          });

          // Add subtle floating animation
          gsap.to(card, {
            y: -3,
            duration: 2 + index * 0.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2
          });
        });

        // Animate product grid with cascade effect
        const productGrids = document.querySelectorAll('.product-grid');
        productGrids.forEach(grid => {
          const products = grid.querySelectorAll('.product-card');
          gsap.fromTo(products,
            {
              opacity: 0,
              y: 60,
              scale: 0.8
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              stagger: {
                amount: 0.8,
                from: "center"
              },
              scrollTrigger: {
                trigger: grid,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        // Parallax background animation
        gsap.to('.soft-gradient-bg', {
          backgroundPosition: "100% 50%",
          duration: 20,
          ease: "none",
          repeat: -1,
          yoyo: true
        });

      } catch (error) {
        console.error('GSAP animation error:', error);
      }
    };

    // Delay animation to ensure DOM is ready
    const animationTimer = setTimeout(animateElements, 100);

    return () => {
      document.body.classList.remove('soft-gradient-bg');
      clearTimeout(timer);
      clearTimeout(animationTimer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading]);

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsLoading(true)
      setTimeout(() => {
        navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
        setIsLoading(false)
      }, 1000)
    }
  }

  // Get unique categories and count products
  const getCategories = () => {
    const categories = {}
    products.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = {
          name: product.category === 'brakes' ? 'Tormoz Tizimi' : 'G\'ildiraklar',
          count: 0,
          color: product.category === 'brakes' ? 'blue' : 'green',
          icon: product.category === 'brakes' ? '🔧' : '⚙️'
        }
      }
      categories[product.category].count++
    })
    return Object.values(categories)
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <div className='min-h-screen'>
      {isLoading && <LoadingSpinner />}
      <div className='max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mt-[40px]'>
          <Slider {...settings}>
            <div className="relative">
              {!imageLoaded && (
                <div className='w-full h-[350px] bg-gray-200 rounded-lg flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-[48px] w-[48px] border-b-2 border-blue-500'></div>
                </div>
              )}
              <img
                src={MonaerImg1}
                alt="Slide 1"
                className={`w-full h-auto rounded-lg shadow-lg outline-none ${imageLoaded ? 'block' : 'hidden'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <div className="relative">
              {!imageLoaded && (
                <div className='w-full h-[350px] bg-gray-200 rounded-lg flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-[48px] w-[48px] border-b-2 border-blue-500'></div>
                </div>
              )}
              <img
                src={MonaerImg1}
                alt="Slide 2"
                className={`w-full h-auto rounded-lg shadow-lg outline-none ${imageLoaded ? 'block' : 'hidden'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <div className="relative">
              {!imageLoaded && (
                <div className='w-full h-[350px] bg-gray-200 rounded-lg flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-[48px] w-[48px] border-b-2 border-blue-500'></div>
                </div>
              )}
              <img
                src={MonaerImg1}
                alt="Slide 3"
                className={`w-full h-auto rounded-lg shadow-lg outline-none ${imageLoaded ? 'block' : 'hidden'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </Slider>
        </div>

        <div className='text-center mt-[70px] mb-6 sm:mb-8 px-4 hero-animate'>
          <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold heading-brand mb-1 sm:mb-2'>
            Monaer tormoz kalodkalari – ishonchli va sifatli tanlov
          </h1>
          <p className='text-xs sm:text-sm md:text-base lg:text-lg text-monaer-gray max-w-[720px] mx-auto'>
            Monaer tormoz kalodkalari barcha turdagi avtomobillar uchun mos bo'lib,
            yuqori sifat, mustahkamlik va xavfsiz tormozlashni ta'minlaydi.
            Kundalik haydovdan tortib uzoq masofalargacha ishonchli tanlov.
          </p>
        </div>

        {/* FEATURES */}
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-6 mb-4 sm:mb-6 px-4'>
          <div className='text-center border-[1px] border-[#E5E7EB] rounded-[8px] sm:rounded-[12px] lg:rounded-[16px] p-2 sm:p-3 lg:p-4 hover:shadow-lg transition-all duration-300 feature-card card-monaer'>
            <div className='w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:w-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 monaer-pulse'>
              <ShieldCheck className='text-monaer-primary' size={12} sm:size={16} lg:size={20} />
            </div>
            <h3 className='text-xs sm:text-sm lg:text-base font-bold text-monaer-dark mb-1'>
              Original mahsulotlar
            </h3>
            <p className='text-xs sm:text-sm lg:text-base text-monaer-gray leading-relaxed'>
              Faqat original va sertifikatlangan Monaer mahsulotlari.
              Yuqori sifat va uzoq xizmat muddati kafolatlanadi.
            </p>
          </div>

          <div className='text-center border-[1px] border-[#E5E7EB] rounded-[8px] sm:rounded-[12px] lg:rounded-[16px] p-2 sm:p-3 lg:p-4 hover:shadow-lg transition-all duration-300 feature-card card-monaer'>
            <div className='w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:w-16 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 monaer-pulse'>
              <BadgeDollarSign className='text-monaer-accent' size={12} sm:size={16} lg:size={20} />
            </div>
            <h3 className='text-xs sm:text-sm lg:text-base font-bold text-monaer-dark mb-1'>
              Qulay narxlar
            </h3>
            <p className='text-xs sm:text-sm lg:text-base text-monaer-gray leading-relaxed'>
              Bozor narxlariga mos va hamyonbop takliflar.
              Sifat va narxning eng yaxshi muvozanati.
            </p>
          </div>

          <div className='text-center border-[1px] border-[#E5E7EB] rounded-[8px] sm:rounded-[12px] lg:rounded-[16px] p-2 sm:p-3 lg:p-4 hover:shadow-lg transition-all duration-300 feature-card card-monaer'>
            <div className='w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:w-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 monaer-pulse'>
              <Car className='text-monaer-secondary' size={12} sm:size={16} lg:size={20} />
            </div>
            <h3 className='text-xs sm:text-sm lg:text-base font-bold text-monaer-dark mb-1'>
              Keng assortiment
            </h3>
            <p className='text-xs sm:text-sm lg:text-base text-monaer-gray leading-relaxed'>
              Turli avtomobil modellari uchun ehtiyot qismlar.
              Sizga mos mahsulotni tez va oson topasiz.
            </p>
          </div>
        </div>

        <hr className="mb-[50px] h-[2px] bg-[#D1D5DB] border-0 rounded max-w-7xl mx-auto" />

        <div className='bg-gradient-to-r from-monaer-primary to-monaer-primary-light rounded-[10px] sm:rounded-[12px] lg:rounded-[14px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 glass-effect hero-animate'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6'>
            <div className='text-center sm:text-left'>
              <h2 className='text-white text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 heading-brand'>
                Monaer — avtomobilingiz uchun ishonchli ehtiyot qismlar
              </h2>
              <p className='text-[#E0F2FE] text-xs sm:text-sm lg:text-base'>
                Tormoz kalodkalari, disklar va boshqa sifatli auto ehtiyot qismlar.
                Tez yetkazib berish va kafolatlangan mahsulotlar.
              </p>
            </div>
            <div className='text-center sm:text-right'>
              <p className='text-[#BAE6FD] text-xs sm:text-sm mb-1'>
                Buyurtma va maslahat uchun
              </p>
              <p className='text-white text-lg sm:text-xl lg:text-2xl font-bold tracking-wide monaer-bounce'>
                +998 55 513 43 43
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center gap-2 sm:gap-3 mt-12 sm:mt-16 lg:mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <form onSubmit={handleSearch} className='relative w-full sm:w-[500px] lg:w-[700px] max-w-full'>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full border-[2px] border-[#CBD5E1] rounded-[10px] sm:rounded-[12px] lg:rounded-[14px]
                     py-2 sm:py-3 lg:py-4 pl-10 sm:pl-12 lg:pl-14 pr-24 sm:pr-32 lg:pr-40
                     text-xs sm:text-sm text-gray-700
                     outline-none
                     bg-white
                     focus:border-[#0067B2] focus:ring-2 sm:focus:ring-4 focus:ring-[#0067B2]/20
                     transition-all duration-300'
              type="text"
              placeholder='Avtomobil modeli, kalodka yoki ehtiyot qism nomini kiriting...'
            />
            <div className='absolute left-3 sm:left-4 top-1/2 -translate-y-1/2'>
              <Search className='text-[#64748B]' size={14} sm:size={16} lg:size={20} />
            </div>
            <button
              type='submit'
              className='absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium'
            >
              Qidirish
            </button>
          </form>
          <p className='mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 text-center max-w-[400px] sm:max-w-[560px]'>
            Birgina qidiruv orqali avtomobilingizga mos ehtiyot qismlarni toping.
          </p>
        </div>

        {/* PRODUCTS FROM PRODUCTS.JS */}
        <div className="max-w-7xl mx-auto py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Avtomobil Ehtiyot Qismlari
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-[600px] mx-auto">
              Professional auto parts for every vehicle type with warranty guarantee
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-6 sm:mt-0 lg:mt-0 product-grid">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-monaer-primary hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-auto sm:h-[320px] lg:h-[360px] hover:scale-105 product-card card-monaer">
                {/* Product Image */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-1 sm:p-2 lg:p-3 flex items-center justify-center h-20 sm:h-24 lg:h-28 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 p-2 sm:p-3 lg:p-4 space-y-1 sm:space-y-2 flex flex-col">
                  {/* Product Name */}
                  <div>
                    <h3 className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <span className="text-xs text-gray-500 font-mono bg-gray-100 px-1 sm:px-2 py-0.5 rounded">
                      KOD: MP{product.id}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="6"
                          height="6"
                          className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">
                      {product.rating}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-1">
                      {product.description}
                    </p>
                  </div>

                  {/* Price Section */}
                  <div className="border-t border-gray-200 pt-1 sm:pt-2">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs sm:text-sm lg:text-base font-bold text-gray-900">
                            {product.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">so'm</span>
                        </div>
                        {product.oldPrice && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400 line-through">
                              {product.oldPrice.toLocaleString()} so'm
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => window.location.href = `/product/${product.id}`}
                      className="w-full px-1 sm:px-2 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 cursor-pointer transform hover:scale-105 btn-primary"
                    >
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Savatga
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4 sm:mt-6">
            <Link to={'/catalog'}>
              <button className="cursor-pointer btn-primary px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 rounded-lg font-medium text-xs sm:text-sm sm:text-base">
                Ko'proq mahsulotlar
              </button>
            </Link>
          </div>

          <div className="relative mt-12 sm:mt-16 flex flex-col lg:flex-row items-center gap-[30px] lg:gap-[50px] justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          </div>
          <div className="max-w-7xl py-8 sm:py-12 lg:py-16 mx-auto px-4 sm:px-6 lg:px-8 animate-section">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8">Kategoriyalar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {getCategories().map((category) => (
                <div
                  key={category.name}
                  onClick={() => window.location.href = `/category/${category.name.toLowerCase().replace(' ', '-')}`}
                  className="category-card group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-4 sm:p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:scale-105"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl sm:text-2xl lg:text-3xl">{category.icon}</span>
                    </div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{category.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full">{category.count} mahsulot</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
