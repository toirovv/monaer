import React, { useEffect, useState } from 'react'
import { Users, Target, Award, Clock, MapPin, Phone, Mail, CheckCircle, Star, TrendingUp, Shield, Heart, X } from 'lucide-react'
import photo1 from '../assets/images/photo_2025-04-19_18-43-44.jpg'
import photo2 from '../assets/images/photo_2025-04-19_18-43-48.jpg'
import photo3 from '../assets/images/photo_2025-04-19_18-43-54.jpg'
import photo4 from '../assets/images/photo_2025-04-19_18-44-00.jpg'
import photo5 from '../assets/images/photo_2025-04-19_18-44-06.jpg'

function About() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Simple instant scroll
    window.scrollTo(0, 0);
    
    // Handle ESC key to close modal
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeImageModal();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  const openImageModal = (imageSrc, alt) => {
    setSelectedImage({ src: imageSrc, alt: alt });
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
    setTimeout(() => {
      setSelectedImage(null);
    }, 300); // Wait for transition to complete
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="text-center mb-8 sm:mb-12">
          <h1 className="mt-[80px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-3 sm:mb-4">
            Biz Haqimizda
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Monaer - O'zbekistondagi eng yirik avtomobil ehtiyot qismlari yetkazib beruvchi kompaniyalardan biri.
            Sifat, ishonch va mijozlarga xizmatlash bizning asosiy tamoyillarimiz.
          </p>
        </div>



        {/* ABOUT CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-4">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-3 sm:p-4 lg:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 mx-auto">
              <Users className="text-blue-600" size={16} sm:size={24} lg:size={32} />
            </div>
            <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 text-center">10+ Yillik Tajriba</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center">Uzoq yillik tajriba va mutaxassislar jamoasi</p>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-3 sm:p-4 lg:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 mx-auto">
              <Target className="text-green-600" size={16} sm:size={24} lg:size={32} />
            </div>
            <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 text-center">50,000+ Mahsulot</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center">Keng assortiment va har qanday ehtiyot qismlar</p>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-3 sm:p-4 lg:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 mx-auto">
              <Award className="text-purple-600" size={16} sm:size={24} lg:size={32} />
            </div>
            <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 text-center">Sifat Kafolati</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center">Faqat original va sifatli mahsulotlar</p>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-3 sm:p-4 lg:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 mx-auto">
              <Clock className="text-orange-600" size={16} sm:size={24} lg:size={32} />
            </div>
            <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 text-center">Tez Yetkazish</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center">O'zbekiston bo'ylab tezkor yetkazib berish</p>
          </div>
        </div>

        {/* ABOUT US SECTION */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-12 mx-2 sm:mx-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-3 sm:mb-4 lg:mb-6 text-center">Biz Haqimizda</h2>
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg leading-relaxed">
              The British Monaer Group - avtomobil ehtiyot qismlari va avtomobil texnik xizmatlarini taqdim etuvchi 
              global korxona. Monaer guruhining mahsulotlari global modellarni qamrab oladi va 
              keng iste'molchilar bozorining ehtiyojlarini qondiradi. Xalqaro standartlashtirish sertifikatlari 
              mahsulot sifatining barqarorligi va ishonchliligini ta'minlaydi, mijozlarga dunyo miqyosidagi 
              mahsulotlar va xizmatlarni taqdim etadi.
            </p>
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg leading-relaxed">
              Guruhning ro'yxatga olingan ofisi Buyuk Britaniyaning London shahrida joylashgan. 
              2005-yildan beri sotilgandan keyingi mahsulotlar Xitoy bozoriga eksport qilinmoqda. 
              2015-yilda Monaer Xitoy materikida joylashishni boshladi va Xitoyda to'liq 
              sotildan keyingi bozor tizimini qurdi. Kompaniyaning Xitoy materikidagi operatsion shtab-kvartirasi 
              go'zal sohil shahri Qingdaoda joylashgan.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4 lg:mt-6 justify-center">
              <div className="flex items-center gap-1 sm:gap-2">
                <CheckCircle className="text-green-600" size={14} sm:size={16} lg:size={20} />
                <span className="text-gray-700 text-xs sm:text-sm lg:text-base">Global qamrov</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <CheckCircle className="text-green-600" size={14} sm:size={16} lg:size={20} />
                <span className="text-gray-700 text-xs sm:text-sm lg:text-base">Xalqaro sertifikatlar</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <CheckCircle className="text-green-600" size={14} sm:size={16} lg:size={20} />
                <span className="text-gray-700 text-xs sm:text-sm lg:text-base">Dunyo miqyosidagi sifat</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <CheckCircle className="text-green-600" size={14} sm:size={16} lg:size={20} />
                <span className="text-gray-700 text-xs sm:text-sm lg:text-base">15+ yillik tajriba</span>
              </div>
            </div>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 px-4">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">10+</div>
            <div className="text-gray-600 text-sm sm:text-base">Yillik Tajriba</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">50K+</div>
            <div className="text-gray-600 text-sm sm:text-base">Mahsulotlar</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">15K+</div>
            <div className="text-gray-600 text-sm sm:text-base">Mijozlar</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-gray-600 text-sm sm:text-base">Mijozlar Mamnuniyati</div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-12 mx-2 sm:mx-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-4 sm:mb-6 lg:mb-8 text-center">Nega Monaer?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <div className="flex gap-2 sm:gap-3 lg:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="text-blue-600" size={16} sm:size={20} lg:size={24} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Yuqori Sifat</h3>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Faqat original va sertifikatlangan mahsulotlar</p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 lg:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="text-green-600" size={16} sm:size={20} lg:size={24} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Raqobatbardosh Narxlar</h3>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Bozordagi eng qulay narxlar</p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 lg:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="text-purple-600" size={16} sm:size={20} lg:size={24} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Kafolat</h3>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Barcha mahsulotlar uchun kafolat</p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 lg:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="text-orange-600" size={16} sm:size={20} lg:size={24} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Professional Jamoa</h3>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Tajribali mutaxassislar jamoasi</p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 lg:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="text-red-600" size={16} sm:size={20} lg:size={24} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Mijozlarga G'amxo'rlik</h3>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Har bir mijozga individual yondashuv</p>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 lg:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="text-indigo-600" size={16} sm:size={20} lg:size={24} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Tezkor Xizmat</h3>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Tez va samarali xizmat ko'rsatish</p>
              </div>
            </div>
          </div>
        </div>

        {/* ADDITIONAL IMAGES */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 mx-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 sm:mb-8 text-center">Bizning Faoliyatimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="relative group cursor-pointer" onClick={() => openImageModal(photo5, "Sifatli Xizmat")}>
              <img
                src={photo5}
                alt="Qo'shimcha rasm 1"
                className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                  <p className="font-semibold text-sm sm:text-base">Sifatli Xizmat</p>
                  <p className="text-xs sm:text-sm">Mijozlar mamnuniyati</p>
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer" onClick={() => openImageModal(photo1, "Keng Assortiment")}>
              <img
                src={photo1}
                alt="Qo'shimcha rasm 2"
                className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                  <p className="font-semibold text-sm sm:text-base">Keng Assortiment</p>
                  <p className="text-xs sm:text-sm">Har qanday ehtiyot qismlar</p>
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer" onClick={() => openImageModal(photo2, "Professional Jamoa")}>
              <img
                src={photo2}
                alt="Qo'shimcha rasm 3"
                className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                  <p className="font-semibold text-sm sm:text-base">Professional Jamoa</p>
                  <p className="text-xs sm:text-sm">Tajribali mutaxassislar</p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* IMAGE MODAL */}
      {(selectedImage || isModalOpen) && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            isModalOpen ? 'bg-black bg-opacity-95' : 'bg-black bg-opacity-0'
          }`}
          onClick={closeImageModal}
        >
          <div
            className={`relative w-full h-full flex items-center justify-center transform transition-all duration-300 ${
              isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
          >
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-3 z-10 hover:bg-opacity-70"
              title="Yopish (ESC)"
            >
              <X size={24} />
            </button>
            {selectedImage && (
              <>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-8 left-8 right-8 text-center bg-black bg-opacity-70 rounded-lg px-6 py-3">
                  <p className="text-white text-xl font-medium">{selectedImage.alt}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default About
