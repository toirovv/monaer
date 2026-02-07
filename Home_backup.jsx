import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MonaerImg1 from "../assets/images/MonaerImg1.png"
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Search, ShieldCheck, BadgeDollarSign, Car, ShoppingCart, Heart, Star } from 'lucide-react'
import { products } from './Products'
import ProductCard from '../Components/ProductCard'
import CardMonaerImg from '../assets/images/ChatGPT Image 23 янв. 2026 г., 15_41_19.png'

function Home() {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const [sound1, setSound1] = useState(false);
  const [sound2, setSound2] = useState(false);
  const [playing1, setPlaying1] = useState(true);
  const [playing2, setPlaying2] = useState(true);

  const toggleSound1 = () => {
    if (videoRef1.current) {
      videoRef1.current.muted = sound1;
      setSound1(!sound1);
    }
  };

  const toggleSound2 = () => {
    if (videoRef2.current) {
      videoRef2.current.muted = sound2;
      setSound2(!sound2);
    }
  };

  const togglePlay1 = () => {
    if (videoRef1.current) {
      if (playing1) {
        videoRef1.current.pause();
      } else {
        videoRef1.current.play();
      }
      setPlaying1(!playing1);
    }
  };

  const togglePlay2 = () => {
    if (videoRef2.current) {
      if (playing2) {
        videoRef2.current.pause();
      } else {
        videoRef2.current.play();
      }
      setPlaying2(!playing2);
    }
  };

  useEffect(() => {
    document.body.classList.add('soft-gradient-bg');

    // Simple instant scroll
    window.scrollTo(0, 0);

    return () => {
      document.body.classList.remove('soft-gradient-bg');
    };
  }, []);


  const [imageLoaded, setImageLoaded] = useState(false)

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }


  return (
    <div className='container mx-auto max-w-[100%]'>

      <div className='w-full max-w-[900px] mx-auto mt-[70px]'>
        <Slider {...settings}>
          <div className="relative">
            {!imageLoaded && (
              <div className='w-full h-[384px] bg-gray-200 rounded-lg flex items-center justify-center'>
                <div className='animate-spin rounded-full h-[48px] w-[48px] border-b-2 border-blue-500'></div>
              </div>
            )}
            <img
              src={MonaerImg1}
              alt="Slide 1"
              className={`w-full h-auto rounded-lg shadow-lg outline-none ${imageLoaded ? 'block' : 'hidden'
                }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="relative">
            {!imageLoaded && (
              <div className='w-full h-[384px] bg-gray-200 rounded-lg flex items-center justify-center'>
                <div className='animate-spin rounded-full h-[48px] w-[48px] border-b-2 border-blue-500'></div>
              </div>
            )}
            <img
              src={MonaerImg1}
              alt="Slide 2"
              className={`w-full h-auto rounded-lg shadow-lg outline-none ${imageLoaded ? 'block' : 'hidden'
                }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="relative">
            {!imageLoaded && (
              <div className='w-full h-[384px] bg-gray-200 rounded-lg flex items-center justify-center'>
                <div className='animate-spin rounded-full h-[48px] w-[48px] border-b-2 border-blue-500'></div>
              </div>
            )}
            <img
              src={MonaerImg1}
              alt="Slide 3"
              className={`w-full h-auto rounded-lg shadow-lg outline-none ${imageLoaded ? 'block' : 'hidden'
                }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </Slider>
      </div>

      <div className='text-center mt-[48px] mb-[32px]'>
        <h2 className='text-[30px] font-bold text-gray-800 mb-[16px]'>
          Monaer tormoz kalodkalari – ishonchli va sifatli tanlov
        </h2>
        <p className='text-[16px] text-gray-600 max-w-[720px] mx-auto'>
          Monaer tormoz kalodkalari barcha turdagi avtomobillar uchun mos bo'lib,
          yuqori sifat, mustahkamlik va xavfsiz tormozlashni ta'minlaydi.
          Kundalik haydovdan tortib uzoq masofalargacha ishonchli tanlov.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-[32px] mt-[80px] mb-[80px] max-w-[1200px] mx-auto px-[20px]'>

        <div className='text-center border-[1px] border-[#E5E7EB] rounded-[16px] p-[32px] hover:shadow-lg transition-all duration-300'>
          <div className='w-[72px] h-[72px] bg-[#E0F2FE] rounded-full flex items-center justify-center mx-auto mb-[20px]'>
            <ShieldCheck className='text-[#0284C7]' size={34} />
          </div>
          <h3 className='text-[20px] font-bold text-gray-800 mb-[12px]'>
            Original mahsulotlar
          </h3>
          <p className='text-[14px] text-gray-600 leading-relaxed'>
            Faqat original va sertifikatlangan Monaer mahsulotlari.
            Yuqori sifat va uzoq xizmat muddati kafolatlanadi.
          </p>
        </div>

        <div className='text-center border-[1px] border-[#E5E7EB] rounded-[16px] p-[32px] hover:shadow-lg transition-all duration-300'>
          <div className='w-[72px] h-[72px] bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto mb-[20px]'>
            <BadgeDollarSign className='text-[#16A34A]' size={34} />
          </div>
          <h3 className='text-[20px] font-bold text-gray-800 mb-[12px]'>
            Qulay narxlar
          </h3>
          <p className='text-[14px] text-gray-600 leading-relaxed'>
            Bozor narxlariga mos va hamyonbop takliflar.
            Sifat va narxning eng yaxshi muvozanati.
          </p>
        </div>

        <div className='text-center border-[1px] border-[#E5E7EB] rounded-[16px] p-[32px] hover:shadow-lg transition-all duration-300'>
          <div className='w-[72px] h-[72px] bg-[#F3E8FF] rounded-full flex items-center justify-center mx-auto mb-[20px]'>
            <Car className='text-[#7C3AED]' size={34} />
          </div>
          <h3 className='text-[20px] font-bold text-gray-800 mb-[12px]'>
            Keng assortiment
          </h3>
          <p className='text-[14px] text-gray-600 leading-relaxed'>
            Turli avtomobil modellari uchun ehtiyot qismlar.
            Sizga mos mahsulotni tez va oson topasiz.
          </p>
        </div>

      </div>
      <hr className="mb-[50px] h-[2px] bg-[#D1D5DB] border-0 rounded w-[1000px] justify-center flex mx-auto" />

      <div className='bg-[#0067B2] rounded-[14px] w-[1280px] mx-auto px-[40px] py-[28px]'>
        <div className='flex items-center justify-between'>

          <div className='max-w-[700px]'>
            <h2 className='text-white text-[28px] font-bold mb-[8px]'>
              Monaer — avtomobilingiz uchun ishonchli ehtiyot qismlar
            </h2>
            <p className='text-[#E0F2FE] text-[16px]'>
              Tormoz kalodkalari, disklar va boshqa sifatli auto ehtiyot qismlar.
              Tez yetkazib berish va kafolatlangan mahsulotlar.
            </p>
          </div>

          <div className='text-right'>
            <p className='text-[#BAE6FD] text-[14px] mb-[4px]'>
              Buyurtma va maslahat uchun
            </p>
            <p className='text-white text-[24px] font-bold tracking-wide'>
              +998 55 513 43 43
            </p>
          </div>

        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-[10px] mt-[100px]'>

        <div className='relative w-[700px] max-w-full'>
          <input
            className='w-full border-[2px] border-[#CBD5E1] rounded-[14px]
                 py-[14px] pl-[52px] pr-[140px]
                 text-[15px] text-gray-700
                 outline-none
                 bg-white
                 focus:border-[#0067B2] focus:ring-4 focus:ring-[#0067B2]/20
                 transition-all duration-300'
            type="text"
            placeholder='Avtomobil modeli, kalodka yoki ehtiyot qism nomini kiriting...'
          />

          <div className='absolute left-[18px] top-1/2 -translate-y-1/2'>
            <Search className='text-[#64748B]' size={20} />
          </div>


        </div>

        <p className='text-[14.5px] text-gray-500 text-center max-w-[560px]'>
          Birgina qidiruv orqali avtomobilingizga mos ehtiyot qismlarni toping.
        </p>

      </div>
      
      {/* ONLY IMPROVED PRODUCT CARDS SECTION */}
      <div className="max-w-[1400px] mx-auto py-[60px] px-[20px]">
        <h2 className="text-3xl font-bold text-center mb-8">Mahsulotlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="relative mt-[100px] flex flex-col lg:flex-row items-center gap-[50px] lg:gap-[100px] justify-center">
        <div className="relative">
          <video
            ref={videoRef1}
            src="https://monaer.uz/assets/monaer-video-1-Cin71Pw1.MP4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-[500px] rounded-xl cursor-pointer"
            onClick={togglePlay1}
          >
          </video>
          <button
            onClick={(e) => { e.stopPropagation(); toggleSound1(); }}
            className="absolute  cursor-pointer top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
          >
            {sound1 ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay1(); }}
            className="absolute cursor-pointer top-4 left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
          >
            {playing1 ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>
        <div className="relative">
          <video
            ref={videoRef2}
            src="https://monaer.uz/assets/monaer-video-2-CN2bzvDK.MP4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-[500px] rounded-xl cursor-pointer"
            onClick={togglePlay2}
          >
          </video>
          <button
            onClick={(e) => { e.stopPropagation(); toggleSound2(); }}
            className="absolute cursor-pointer top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
          >
            {sound2 ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay2(); }}
            className="absolute cursor-pointer top-4 left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-300"
          >
            {playing2 ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>
      </div>
      <div>
        <div className="max-w-[1220px] py-[60px] mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Kategoriyalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              onClick={() => window.location.href = '/category/brakes'}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <img 
                src="https://ir.ozone.ru/s3/multimedia-1-y/c1000/7635012838.jpg" 
                alt="Brakes" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-lg font-semibold text-center">Tormoz Tizimi</p>
              <p className="text-sm text-gray-600 text-center mt-2">5 mahsulot</p>
            </div>
            <div 
              onClick={() => window.location.href = '/category/wheels'}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              
              <img 
                src="https://ir.ozone.ru/s3/multimedia-1-y/c1000/7635012838.jpg" 
                alt="Wheels" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-lg font-semibold text-center">G'ildiraklar</p>
              <p className="text-sm text-gray-600 text-center mt-2">3 mahsulot</p>
            </div>
            <div 
              onClick={() => window.location.href = '/category/brakes'}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <img 
                src="https://ir.ozone.ru/s3/multimedia-1-y/c1000/7635012838.jpg" 
                alt="Brakes" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-lg font-semibold text-center">Premium Tormozlar</p>
              <p className="text-sm text-gray-600 text-center mt-2">5 mahsulot</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
