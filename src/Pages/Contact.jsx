import React, { useEffect, useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  CheckCircle
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LoadingSpinner from '../Components/LoadingSpinner'

/* ================= YANDEX MAP ================= */
const YandexMapComponent = () => {
  const mapRef = React.useRef(null)
  const [isMapLoaded, setIsMapLoaded] = React.useState(false)

  React.useEffect(() => {
    const loadYandexMap = () => {
      if (window.ymaps) {
        setIsMapLoaded(true)
        initializeMap()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_YANDEX_API_KEY&lang=ru_RU'
      script.type = 'text/javascript'
      script.onload = () => {
        window.ymaps.ready(() => {
          setIsMapLoaded(true)
          initializeMap()
        })
      }
      document.head.appendChild(script)
    }

    const initializeMap = () => {
      if (mapRef.current && window.ymaps) {
        const map = new window.ymaps.Map(mapRef.current, {
          center: [41.2587, 69.2233], // Sergeli Mashina Bozor koordinatalari
          zoom: 16,
          controls: ['zoomControl', 'fullscreenControl']
        })

        // Sergeli Mashina Bozor marker
        const placemark = new window.ymaps.Placemark([41.2587, 69.2233], {
          balloonContentHeader: 'Monaer',
          balloonContentBody: 'Avtomobil ehtiyot qismlari do\'koni<br>Sergeli Mashina Bozori<br>Telefon: +998 55 513 43 43',
          balloonContentFooter: 'Ish vaqti: 9:00 - 18:00',
          hintContent: 'Monaer - Sergeli Mashina Bozori'
        }, {
          preset: 'islands#redDotIcon',
          iconColor: '#0067B2'
        })

        map.geoObjects.add(placemark)
      }
    }

    loadYandexMap()
  }, [])

  if (!isMapLoaded) {
    return (
      <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Xarita yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg shadow-lg"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

gsap.registerPlugin(ScrollTrigger)

/* ================= CONTACT ================= */
function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitted(true)
    
    // Show notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-pulse'
    notification.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="font-medium">Xabaringiz yuborildi!</span>
    `
    document.body.appendChild(notification)
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.remove()
    }, 3000)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      e.target.reset()
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && <LoadingSpinner />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HERO */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-[90px] text-blue-600 mb-3">
            Biz bilan Bog'laning
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Savollar, maslahatlar yoki hamkorlik uchun biz bilan bog'laning
          </p>
        </div>

        {/* CONTACT CARDS */}
        {/* ✅ mobile: 2 ta | desktop o'zgarmadi */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">

          {[
            { icon: <Phone size={20} />, title: 'Telefon', text: '+998 55 513 43 43', color: 'blue' },
            { icon: <Mail size={20} />, title: 'Email', text: 'info@monaer.uz', color: 'green' },
            { icon: <MapPin size={20} />, title: 'Manzil', text: "Toshkent", color: 'purple' },
            { icon: <Clock size={20} />, title: 'Ish vaqti', text: '9:00 - 18:00', color: 'orange' }
          ].map((item, i) => (
            <div
              key={i}
              className="contact-card bg-white rounded-xl shadow-lg
              p-3 sm:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              <div className={`w-8 h-8 sm:w-12 sm:h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center mb-2 sm:mb-4`}>
                <div className={`text-${item.color}-600`}>
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-base lg:text-base text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* FORM + INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">

          {/* FORM */}
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-5 lg:p-8 border border-gray-100">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-blue-600">
              Xabar yuboring
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-blue-600">
                  Ism
                </label>
                <input 
                  className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="Ismingizni kiriting" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-blue-600">
                  Email
                </label>
                <input 
                  className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="Emailingizni kiriting" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 text-blue-600">
                  Xabar
                </label>
                <textarea 
                  className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg text-sm sm:text-base focus:border-blue-500 focus:outline-none transition-colors resize-none" 
                  rows="4" 
                  placeholder="Xabaringizni yozing..."
                ></textarea>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg flex justify-center gap-2 text-sm sm:text-base transition-colors">
                <Send size={16} sm:size={18} /> Yuborish
              </button>
            </form>
          </div>

          {/* INFO */}
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-5 lg:p-8 border border-gray-100">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-blue-600">
              Biz bilan bog'laning
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex gap-2 sm:gap-3 items-center text-sm sm:text-base p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Phone size={16} sm:size={18} className="text-blue-600" /> 
                <span className="text-gray-700 font-medium">+998 55 513 43 43</span>
              </div>
              <div className="flex gap-2 sm:gap-3 items-center text-sm sm:text-base p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Mail size={16} sm:size={18} className="text-blue-600" /> 
                <span className="text-gray-700 font-medium">info@monaer.uz</span>
              </div>
              <div className="flex gap-2 sm:gap-3 items-center text-sm sm:text-base p-3 bg-orange-50 rounded-lg border border-orange-200">
                <Clock size={16} sm:size={18} className="text-orange-600" /> 
                <div>
                  <span className="text-gray-700 font-medium block">Ish vaqti</span>
                  <span className="text-gray-600 text-xs">Dushanba - Juma: 9:00 - 18:00</span>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 items-center text-sm sm:text-base p-3 bg-purple-50 rounded-lg border border-purple-200">
                <MapPin size={16} sm:size={18} className="text-purple-600" /> 
                <div>
                  <span className="text-gray-700 font-medium block">Do'kon</span>
                  <span className="text-gray-600 text-xs">Sergeli mashina bozori, BIZNES MARKET 2-qavat</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors">
                <Facebook size={16} sm:size={20} />
              </a>
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center text-white transition-colors">
                <Instagram size={16} sm:size={20} />
              </a>
              <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-black hover:bg-gray-800 rounded-lg flex items-center justify-center text-white transition-colors">
                <Twitter size={16} sm:size={20} />
              </a>
            </div>
          </div>
        </div>

   

        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8 border border-gray-100 mt-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-600">
            Xarita
          </h2>
          
          <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden border-2 border-blue-200 mb-6">
            <YandexMapComponent />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Manzil</h3>
              <p className="text-gray-700">Sergeli tumani, Mashina bozori</p>
              <p className="text-gray-700">BIZNES MARKET, 2-qavat</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">Ish vaqti</h3>
              <p className="text-gray-700">Dushanba - Juma</p>
              <p className="text-gray-700">9:00 - 18:00</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact
