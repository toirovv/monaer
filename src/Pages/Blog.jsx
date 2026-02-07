import React, { useEffect, useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Calendar, User, Clock, Eye } from 'lucide-react'

function Blog() {
  const [isPlaying, setIsPlaying] = useState({})
  const [isMuted, setIsMuted] = useState({})
  const videoRefs = useRef({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const togglePlay = (videoId) => {
    const video = videoRefs.current[videoId]
    if (video) {
      if (video.paused) {
        video.play()
        setIsPlaying(prev => ({ ...prev, [videoId]: true }))
      } else {
        video.pause()
        setIsPlaying(prev => ({ ...prev, [videoId]: false }))
      }
    }
  }

  const toggleMute = (videoId) => {
    const video = videoRefs.current[videoId]
    if (video) {
      video.muted = !video.muted
      setIsMuted(prev => ({ ...prev, [videoId]: !prev[videoId] }))
    }
  }

  const videos = [
    {
      id: 1,
      title: "Monaer Avtomobil Ehtiyot Qismlari - To'liq Ko'rik",
      description: "Bizning do'konimizdagi eng sifatli avtomobil ehtiyot qismlari to'g'risida to'liq ma'lumot",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop",
      videoUrl: "https://monaer.uz/assets/monaer-video-1-Cin71Pw1.MP4",
      date: "2024-01-15",
      author: "Monaer Team",
      duration: "5:32",
      views: "1,234"
    },
    {
      id: 2,
      title: "Sergeli Mashina Bozori - Monaer Do'koni",
      description: "Sergeli mashina bozoridagi Monaer do'koni va xizmatlari haqida video",
      thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=450&fit=crop",
      videoUrl: "https://monaer.uz/assets/monaer-video-2-CN2bzvDK.MP4",
      date: "2024-01-10",
      author: "Monaer Team",
      duration: "3:45",
      views: "892"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
            Monaer avtomobil ehtiyot qismlari haqida eng so'nggi yangiliklar va ma'lumotlar
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Video Container */}
              <div className="relative aspect-video bg-black">
                <video
                  ref={el => videoRefs.current[video.id] = el}
                  className="w-full h-full object-cover"
                  poster={video.thumbnail}
                  onClick={() => togglePlay(video.id)}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Sizning brauzeringiz video elementini qo'llab-quvvatlamaydi.
                </video>

                {/* Video Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  {/* Play/Pause Button */}
                  <button
                    onClick={() => togglePlay(video.id)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-4 transition-all duration-300 hover:scale-110"
                  >
                    {isPlaying[video.id] ? (
                      <Pause size={24} />
                    ) : (
                      <Play size={24} className="ml-1" />
                    )}
                  </button>

                  {/* Mute/Unmute Button */}
                  <button
                    onClick={() => toggleMute(video.id)}
                    className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-all duration-300"
                  >
                    {isMuted[video.id] ? (
                      <VolumeX size={20} />
                    ) : (
                      <Volume2 size={20} />
                    )}
                  </button>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                    {video.duration}
                  </div>
                </div>

                {/* Thumbnail Overlay (when not playing) */}
                {!isPlaying[video.id] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="bg-white/90 hover:bg-white text-gray-900 rounded-full p-4 transition-all duration-300 hover:scale-110">
                        <Play size={32} className="ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{video.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{video.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{video.views} ko'rilgan</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {video.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {video.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{video.author}</span>
                  </div>

                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    Batafsil →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Content */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Nega Monaerni Tanlashingiz Kerak?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Video Darsliklar</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Mahsulotlarni to'g'ri tanlash va o'rnatish bo'yicha video darsliklar
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">To'liq Ko'rik</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Har bir mahsulotning detayl ko'rigi va xususiyatlari
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Mutaxassis Maslahati</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Professional maslahatlar va tavsiyalar videolar
              </p>
            </div>
          </div>
        </div>

        {/* More Videos Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Monaer Videolari
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Monaer Kompaniyasi
              </h3>
              <p className="text-gray-600 mb-4">
                Monaer kompaniyasi tarixi, faoliyati va yutuqlari haqida to'liq ma'lumot
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>2024-yil</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>10:00</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>2,156 ko'rilgan</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Mahsulotlar Ko'rgazmasi
              </h3>
              <p className="text-gray-600 mb-4">
                Sergeli mashina bozoridagi Monaer do'koni va mahsulotlar ko'rgazmasi
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>2024-yil</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>15:30</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>1,847 ko'rilgan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
