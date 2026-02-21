import React, { useState } from 'react'
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle,
  Facebook, Instagram, Twitter, Truck, Shield, Headphones, Zap, MessageSquare
} from 'lucide-react'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1400))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const contacts = [
    { icon: Phone, label: 'Telefon', value: '+998 55 513 43 43', href: 'tel:+998555134343' },
    { icon: Mail, label: 'Email', value: 'info@monaer.uz', href: 'mailto:info@monaer.uz' },
    { icon: MapPin, label: 'Manzil', value: "Toshkent sh., Yangi Sergeli ko'chasi 7/27", href: 'https://yandex.uz/maps/-/CPQiURit' },
    { icon: Clock, label: 'Ish vaqti', value: 'Dushanba–Yakshanba: 09:00–18:00', href: '#' }
  ]

  const socials = [
    { icon: Facebook, href: 'https://facebook.com/monaer.uz', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: Instagram, href: 'https://instagram.com/monaer.uz', color: 'bg-teal-600 hover:bg-teal-700' },
    { icon: Twitter, href: 'https://twitter.com/monaer_uz', color: 'bg-cyan-600 hover:bg-cyan-700' }
  ]

  const features = [
    { icon: Truck, title: 'Tez yetkazib berish', desc: 'Butun O‘zbekiston bo‘ylab' },
    { icon: Shield, title: 'Sifat kafolati', desc: 'Ishonchli va original' },
    { icon: Headphones, title: '24/7 yordam', desc: 'Har doim yoningizda' },
    { icon: Zap, title: 'Keng assortiment', desc: 'Yuzlab tanlov' }
  ]

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero – sodda va katta */}
      <div className="bg-gradient-to-br from-teal-600/10 via-cyan-50/30 to-white pt-12 pb-8 sm:pt-14 sm:pb-10 md:pt-20 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100/80 backdrop-blur-sm px-4 py-2 rounded-full border border-teal-200 mb-4 sm:mb-6">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700" />
            <span className="font-medium text-teal-800 text-sm sm:text-base">Biz bilan bog'laning</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
            Savollaringiz bormi? <span className="text-teal-600">Biz yordam beramiz</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl sm:max-w-3xl mx-auto px-2">
            Buyurtma, maslahat yoki hamkorlik bo'yicha – yozing. 24 soat ichida javob beramiz.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-sm border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all duration-300"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-14 lg:w-14 lg:h-14 bg-teal-50 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                <f.icon size={16} className="text-teal-600 sm:size-20 md:size-24 lg:size-28" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 md:mb-3">{f.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main – Forma + Kontaktlar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Forma – chapda */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-200">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Xabar yuboring</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 lg:mb-8">Tez va qulay javob oling</p>

            {isSubmitted ? (
              <div className="bg-teal-50 border border-teal-100 rounded-lg sm:rounded-xl p-6 sm:p-8 lg:p-10 text-center">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-teal-600 mx-auto mb-3 sm:mb-4 lg:mb-6" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-800 mb-2 sm:mb-3">Muvaffaqiyatli yuborildi!</h3>
                <p className="text-sm sm:text-base text-teal-700">Tez orada siz bilan bog'lanamiz. Rahmat!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Ismingiz *</label>
                    <input
                      required name="name" value={formData.name} onChange={handleChange}
                      className="w-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition text-sm sm:text-base"
                      placeholder="Ismingiz..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email *</label>
                    <input
                      required type="email" name="email" value={formData.email} onChange={handleChange}
                      className="w-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition text-sm sm:text-base"
                      placeholder="email@misol.uz"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Telefon *</label>
                  <input
                    required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition text-sm sm:text-base"
                    placeholder="+998 XX XXX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Xabar matni *</label>
                  <textarea
                    required name="message" value={formData.message} onChange={handleChange} rows={4}
                    className="w-full px-3 sm:px-4 lg:px-5 py-2.5 sm:py-3 lg:py-3.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none resize-none transition text-sm sm:text-base"
                    placeholder="Savolingiz yoki buyurtmangiz haqida batafsil yozing..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-white font-medium flex items-center justify-center gap-2 sm:gap-3 transition-all text-sm sm:text-base
                    ${isSubmitting ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg'}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Send size={16} sm:size={20} />
                      Xabarni yuborish
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* O'ng taraf – kontaktlar, xarita, ijtimoiy */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {contacts.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className="flex items-center gap-2 sm:gap-3 lg:gap-4 bg-white p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all"
                >
                  <c.icon size={20} className="text-teal-600 sm:size-24 lg:size-28" />
                  <div>
                    <div className="font-medium text-gray-900 text-xs sm:text-sm">{c.label}</div>
                    <div className="text-gray-600 text-xs sm:text-sm">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Bizning joylashuv</h3>
              </div>
              <div className="h-60 sm:h-72 lg:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3000.528166261393!2d69.212448!3d41.2320517!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae61947afb5fb3%3A0x4eb5241eda3b95f1!2sSergeli%20Moshina%20Bozor!5e0!3m2!1sru!2s!4v1770879712109!5m2!1sru!2s"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 shadow-md border border-gray-200">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Ijtimoiy tarmoqlarda</h3>
              <div className="flex gap-2 sm:gap-3 lg:gap-4">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white transition shadow-sm ${s.color}`}
                  >
                    <s.icon size={16} sm:size={18} lg:size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact