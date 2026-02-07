import React from "react";
import Logo from "../assets/icons/logo.jpg";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { siGoogleplay, siAppstore } from "simple-icons/icons";

// Fix for missing payment images
const PaymentIcons = () => {
  return (
    <>
      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">VISA</div>
      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">PP</div>
      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">SK</div>
      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">KL</div>
    </>
  );
};

function Footer() {
  const Icon = ({ path, color = "#000", size = 24 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d={path} />
    </svg>
  );
  return (
    <footer className="bg-gradient-to-b from-[#0B1224] to-[#070D1B] text-gray-300 pt-8 sm:pt-10 lg:pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pb-6 sm:pb-8 lg:pb-10 border-b border-white/10">
          <div>
            <h3 className="text-white text-xs sm:text-sm lg:text-base font-semibold mb-2 sm:mb-3 lg:mb-4">
              Contact Us
            </h3>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-xs text-gray-400 mb-1">Phone Number</p>
              <p className="text-xs sm:text-sm lg:text-sm text-white">+998 55 513 43 43</p>
            </div>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-xs text-gray-400 mb-1">E-Mail</p>
              <p className="text-xs sm:text-sm lg:text-sm text-white">info@monaer.uz</p>
            </div>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-xs text-gray-400 mb-1">Address</p>
              <p className="text-xs sm:text-sm lg:text-sm text-white leading-relaxed">
                Sergeli tumani, Mashina bozori
              </p>
            </div>

            <div className="mt-2 sm:mt-3 lg:mt-4">
              <p className="text-xs text-gray-400 mb-1">Help Guide</p>
              <p className="text-xs text-gray-500">
                Seek expert help for inquiries and concerns.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-white text-xs sm:text-sm lg:text-base font-semibold mb-2 sm:mb-3 lg:mb-4">
              Help Guide
            </h3>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-xs text-gray-400 mb-1">Customer Service</p>
              <p className="text-xs sm:text-sm lg:text-sm text-white">
                Mon-Fri: 9AM-6PM
              </p>
            </div>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-xs text-gray-400 mb-1">Returns</p>
              <p className="text-xs sm:text-sm lg:text-sm text-white">
                30-day return policy
              </p>
            </div>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-xs text-gray-400 mb-1">Track Order</p>
              <p className="text-xs sm:text-sm lg:text-sm text-white">
                Track your order status
              </p>
            </div>

            <div className="mt-2 sm:mt-3 lg:mt-4">
              <p className="text-xs text-gray-400 mb-1">Get Help</p>
              <p className="text-xs text-gray-500">
                Contact our support team
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-white text-xs sm:text-sm lg:text-base font-semibold mb-2 sm:mb-3 lg:mb-4">
              Customer Service
            </h3>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-xs text-gray-400 mb-1">24/7 Support</p>
              <p className="text-xs sm:text-sm lg:text-sm text-white">
                Available anytime
              </p>
            </div>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-xs text-gray-400 mb-1">Live Chat</p>
              <p className="text-xs sm:text-sm lg:text-sm text-white">
                Chat with experts
              </p>
            </div>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-xs text-gray-400 mb-1">FAQ</p>
              <p className="text-xs sm:text-sm lg:text-sm text-white">
                Common questions
              </p>
            </div>

            <div className="mt-2 sm:mt-3 lg:mt-4">
              <p className="text-xs text-gray-400 mb-1">Contact</p>
              <p className="text-xs text-gray-500">
                Get in touch
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-white text-xs sm:text-sm lg:text-base font-semibold mb-2 sm:mb-3 lg:mb-4">
              Get to Know Us
            </h3>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-xs text-gray-400 mb-1">About</p>
              <p className="text-xs sm:text-sm lg:text-sm text-white">
                Company information
              </p>
            </div>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-xs text-gray-400 mb-1">Careers</p>
              <p className="text-xs sm:text-sm lg:text-sm text-white">
                Join our team
              </p>
            </div>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-xs text-gray-400 mb-1">Press</p>
              <p className="text-xs sm:text-sm lg:text-sm text-white">
                Media resources
              </p>
            </div>

            <div className="mt-2 sm:mt-3 lg:mt-4">
              <p className="text-xs text-gray-400 mb-1">Partners</p>
              <p className="text-xs text-gray-500">
                Partner with us
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-6 py-4 sm:py-6 lg:py-8 border-b border-white/10">

          <img src={Logo} alt="Logo" className="w-12 sm:w-16 lg:w-20 rounded-lg" />

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 lg:gap-4">
            <span className="text-xs sm:text-sm lg:text-sm text-gray-400">Follow Us:</span>
            <div className="flex gap-2 sm:gap-3 lg:gap-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 cursor-pointer transition-colors">
                <Facebook size={12} sm:size={14} className="text-white" />
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 cursor-pointer transition-colors">
                <Twitter size={12} sm:size={14} className="text-white" />
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 cursor-pointer transition-colors">
                <Instagram size={12} sm:size={14} className="text-white" />
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 cursor-pointer transition-colors">
                <Youtube size={12} sm:size={14} className="text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 lg:gap-6">
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 cursor-pointer">
              <Icon path={siGoogleplay.path} color="white" size={14} sm:size={16} lg:size={18} />
              <p className="text-xs sm:text-sm lg:text-base">Google Play</p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 cursor-pointer">
              <Icon path={siAppstore.path} color="#0D96F6" size={14} sm:size={16} lg:size={18} />
              <p className="text-xs sm:text-sm lg:text-base">App Store</p>
            </div>
          </div>

        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 sm:gap-3 lg:gap-4 py-3 sm:py-4 lg:py-6 text-xs sm:text-sm lg:text-sm text-gray-500">

          <p> 2026 Monaer Theme. All rights reserved.</p>

          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <PaymentIcons />
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
