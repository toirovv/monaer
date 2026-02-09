import React from "react";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Send, Truck, Shield, CreditCard } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "Biz haqimizda", href: "/about" },
      { name: "Kategoriyalar", href: "/catalog" },
      { name: "Blog", href: "/blog" },
      { name: "Aloqa", href: "/contact" },
    ],
    services: [
      { name: "Yetkazib berish", href: "#" },
      { name: "Qaytarish siyosati", href: "#" },
      { name: "Kafolat", href: "#" },
      { name: "FAQ", href: "#" },
    ],
    contact: [
      { icon: Phone, text: "+998 55 513 43 43", href: "tel:+998555134343" },
      { icon: Mail, text: "info@monaer.uz", href: "mailto:info@monaer.uz" },
      { icon: MapPin, text: "Sergeli, Mashina bozori", href: "#" },
      { icon: Clock, text: "Dush-Jum: 9:00 - 18:00", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
    { icon: Instagram, href: "#", color: "hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600" },
    { icon: Youtube, href: "#", color: "hover:bg-red-600" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-12 lg:py-16">
          
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <img
                src="https://static.tildacdn.com/tild3463-3734-4963-a665-653363316531/Frame_2087327802.png"
                alt="Monaer Logo"
                className="h-10 sm:h-12 rounded-lg mb-3 sm:mb-4"
              />
              <p className="text-gray-300 text-sm leading-relaxed">
                Monaer - O'zbekistondagi eng yirik avtomobil ehtiyot qismlari yetkazib beruvchi kompaniya. 
                Sifat, ishonch va mijozlarga xizmatlash bizning asosiy tamoyillarimiz.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Truck size={14} sm:size={18} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold">Tez yetkazish</h4>
                  <p className="text-xs text-gray-400 hidden sm:block">1-3 kun ichida</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <CreditCard size={14} sm:size={18} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold">Xavfsiz to'lov</h4>
                  <p className="text-xs text-gray-400 hidden sm:block">Har xil usullar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white text-center sm:text-left">Tezkor havolalar</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm flex items-center gap-2 group justify-center sm:justify-start"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white text-center sm:text-left">Xizmatlar</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm flex items-center gap-2 group justify-center sm:justify-start"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white text-center sm:text-left">Aloqa</h3>
            <div className="space-y-3 sm:space-y-4">
              {footerLinks.contact.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-start gap-2 sm:gap-3 text-gray-300 hover:text-white transition-colors duration-200 group justify-center sm:justify-start"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors">
                    <item.icon size={12} sm:size={16} className="text-blue-400" />
                  </div>
                  <span className="text-xs sm:text-sm">{item.text}</span>
                </a>
              ))}
            </div>

          </div>
        </div>



        {/* Bottom Section */}
        <div className="border-t border-white/10 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
            
            {/* Social Links */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full lg:w-auto text-center sm:text-left">
              <span className="text-xs sm:text-sm text-gray-400">Ijtimoiy tarmoqlar:</span>
              <div className="flex gap-2 justify-center sm:justify-start">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-200 ${social.color} hover:scale-110`}
                  >
                    <social.icon size={14} sm:size={18} className="text-white" />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center lg:text-right w-full lg:w-auto">
              <p className="text-xs sm:text-sm text-gray-400">
                © {currentYear} Monaer. Barcha huquqlar himoyalangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
