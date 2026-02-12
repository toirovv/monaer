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
      <div className="bg-gradient-to-br from-teal-600/10 via-cyan-50/30 to-white pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-teal-100/80 backdrop-blur-sm px-6 py-3 rounded-full border border-teal-200 mb-8">
            <MessageSquare className="w-6 h-6 text-teal-700" />
            <span className="font-medium text-teal-800">Biz bilan bog‘laning</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Savollaringiz bormi? <span className="text-teal-600">Biz yordam beramiz</span>
          </h1>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Buyurtma, maslahat yoki hamkorlik bo‘yicha – yozing. 24 soat ichida javob beramiz.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
                <f.icon size={28} className="text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main – Forma + Kontaktlar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ">
          {/* Forma – chapda */}
          <div className="bg-white rounded-2xl shadow-md p-8 lg:p-10 border  border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Xabar yuboring</h2>
            <p className="text-gray-600 mb-8">Tez va qulay javob oling</p>

            {isSubmitted ? (
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-10 text-center">
                <CheckCircle className="w-16 h-16 text-teal-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-teal-800 mb-3">Muvaffaqiyatli yuborildi!</h3>
                <p className="text-teal-700">Tez orada siz bilan bog‘lanamiz. Rahmat!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ismingiz *</label>
                    <input
                      required name="name" value={formData.name} onChange={handleChange}
                      className="w-full px-5 py-3.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
                      placeholder="Ismingiz..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      required type="email" name="email" value={formData.email} onChange={handleChange}
                      className="w-full px-5 py-3.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
                      placeholder="email@misol.uz"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
                  <input
                    required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-5 py-3.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
                    placeholder="+998 XX XXX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Xabar matni *</label>
                  <textarea
                    required name="message" value={formData.message} onChange={handleChange} rows={5}
                    className="w-full px-5 py-3.5 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none resize-none transition"
                    placeholder="Savolingiz yoki buyurtmangiz haqida batafsil yozing..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-lg text-white font-medium flex items-center justify-center gap-3 transition-all
                    ${isSubmitting ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg'}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Xabarni yuborish
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* O‘ng taraf – kontaktlar, xarita, ijtimoiy */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contacts.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className="flex items-center gap-4 bg-white p-6 rounded-xl border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all"
                >
                  <c.icon size={28} className="text-teal-600" />
                  <div>
                    <div className="font-medium text-gray-900">{c.label}</div>
                    <div className="text-gray-600">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Bizning joylashuv</h3>
              </div>
              <div className="h-80 lg:h-[420px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3000.528166261393!2d69.212448!3d41.2320517!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae61947afb5fb3%3A0x4eb5241eda3b95f1!2sSergeli%20Moshina%20Bozor!5e0!3m2!1sru!2s!4v1770879712109!5m2!1sru!2s"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Ijtimoiy tarmoqlarda</h3>
              <div className="flex gap-4">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white transition shadow-sm ${s.color}`}
                  >
                    <s.icon size={22} />
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