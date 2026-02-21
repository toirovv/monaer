import React, { useState, useEffect } from "react";

import { Star, ShoppingCart, Plus, Minus } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { gsap } from "gsap";
import Notification from './Notification';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const [cartQuantity, setCartQuantity] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const cardRef = React.useRef(null);

    useEffect(() => {
        const loadCartQuantity = () => {
            const cart = localStorage.getItem('cart');
            if (cart) {
                const items = JSON.parse(cart);
                const existingItem = items.find(item => item.id === product.id);
                setCartQuantity(existingItem ? existingItem.quantity : 0);
            }
        };

        loadCartQuantity();

        const handleCartUpdate = () => {
            loadCartQuantity();
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        window.addEventListener('storage', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
            window.removeEventListener('storage', handleCartUpdate);
        };
    }, [product.id]);

    useEffect(() => {
        const animateCard = () => {
            try {
                if (cardRef.current) {
                    gsap.fromTo(cardRef.current, 
                        {
                            opacity: 0,
                            y: 20
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.3,
                            delay: Math.random() * 0.1
                        }
                    );
                }
            } catch (error) {
                console.error('GSAP animation error:', error);
            }
        };

        const timer = setTimeout(animateCard, 50);
        return () => clearTimeout(timer);
    }, []);

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const updateCart = (newQuantity) => {
        if (newQuantity < 0) return;

        try {
            const cart = localStorage.getItem('cart');
            let cartItems = cart ? JSON.parse(cart) : [];

            console.log('Current cart before update:', cartItems);
            console.log('Product being added:', product);
            console.log('New quantity:', newQuantity);

            if (newQuantity === 0) {
                cartItems = cartItems.filter(item => item.id !== product.id);
            } else {
                const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

                if (existingItemIndex >= 0) {
                    cartItems[existingItemIndex].quantity = newQuantity;
                } else {
                    cartItems.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        oldPrice: product.oldPrice,
                        discount: product.discount,
                        image: product.image,
                        category: product.category,
                        compatibility: product.compatibility,
                        quantity: newQuantity
                    });
                }
            }

            console.log('Cart after update:', cartItems);
            localStorage.setItem('cart', JSON.stringify(cartItems));

            const savedCart = localStorage.getItem('cart');
            console.log('Saved cart verification:', savedCart);

            setCartQuantity(newQuantity);
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();

        const user = localStorage.getItem('user');
        if (!user) {
            setShowNotification(true);
            return;
        }

        try {
            gsap.to(e.target, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        } catch (error) {
            console.error('GSAP animation error:', error);
        }

        updateCart(cartQuantity + 1);
    };

    const handleIncreaseQuantity = (e) => {
        e.stopPropagation();
        updateCart(cartQuantity + 1);
    };

    const handleDecreaseQuantity = (e) => {
        e.stopPropagation();
        updateCart(cartQuantity - 1);
    };

    const handleCardHover = (isHovering) => {
        try {
            if (cardRef.current) {
                gsap.to(cardRef.current, {
                    y: isHovering ? -4 : 0,
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        } catch (error) {
            console.error('GSAP animation error:', error);
        }
    };

    return (
        <>
            <div
                ref={cardRef}
                onClick={handleCardClick}
                onMouseEnter={() => handleCardHover(true)}
                onMouseLeave={() => handleCardHover(false)}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-auto sm:h-[400px] lg:h-[430px]"
            >
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 flex items-center justify-center h-40">
                    {!product.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-10">
                            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
                                Yo'q
                            </span>
                        </div>
                    )}
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105 ${
                            !product.available ? 'opacity-50' : ''
                        }`}
                    />
                </div>
                <div className="flex-1 p-4 space-y-2 flex flex-col">
                    <div>
                        <h3 className="text-gray-900 font-bold text-base line-clamp-2 mb-1">
                            {product.name}
                        </h3>
                        <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                            KOD: {product.id}
                        </span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                            {product.description}
                        </p>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <div className="flex items-center gap-1">
                                    <span className="text-lg font-bold text-gray-900">
                                        {product.price.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-gray-500">so'm</span>
                                </div>
                                {product.oldPrice && (
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-gray-400 line-through">
                                            {product.oldPrice.toLocaleString()} so'm
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {cartQuantity > 0 ? (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleDecreaseQuantity}
                                className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="flex-1 text-center font-semibold text-gray-900 transition-all duration-300">
                                {cartQuantity}
                            </span>
                            <button
                                onClick={handleIncreaseQuantity}
                                className="w-8 h-8 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.available}
                            className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:scale-105 ${
                                product.available 
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <ShoppingCart size={14} />
                            {product.available ? 'Savatga' : 'Mavjud emas'}
                        </button>
                    )}
                </div>
            </div>

            <Notification
                type="auth"
                message="Mahsulotlarni savatchaga qo'shish uchun iltimos, platformaga ro'yxatdan o'ting yoki tizimga kiring."
                isVisible={showNotification}
                onClose={() => setShowNotification(false)}
                duration={6000}
            />
        </>
    );
}

export default ProductCard;
