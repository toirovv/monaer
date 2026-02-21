import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { products as defaultProducts } from "./Products";

import { Star, ShoppingCart, Plus, Minus, Truck, Shield, Clock, MapPin } from "lucide-react";



function ProductDetail() {

  const { id } = useParams();

  const [allProducts, setAllProducts] = useState([]);

  const [product, setProduct] = useState(null);

  // Load products from all sources
  const loadAllProducts = () => {
    const dashboardProducts = JSON.parse(localStorage.getItem('dashboardProducts') || '[]');
    const mainProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const allProductsStorage = JSON.parse(localStorage.getItem('allProducts') || '[]');
    const productsJsData = JSON.parse(localStorage.getItem('productsJsData') || '[]');
    
    // Combine all products: default from Products.js + dashboard added + main platform
    const combinedProducts = [...defaultProducts];
    
    // Add dashboard products (avoid duplicates)
    dashboardProducts.forEach(product => {
      if (!combinedProducts.find(p => p.id === product.id)) {
        combinedProducts.push(product);
      }
    });
    
    // Add main platform products (avoid duplicates)
    mainProducts.forEach(product => {
      if (!combinedProducts.find(p => p.id === product.id)) {
        combinedProducts.push(product);
      }
    });
    
    // Add all products storage (avoid duplicates)
    allProductsStorage.forEach(product => {
      if (!combinedProducts.find(p => p.id === product.id)) {
        combinedProducts.push(product);
      }
    });
    
    // Add productsJsData (avoid duplicates)
    productsJsData.forEach(product => {
      if (!combinedProducts.find(p => p.id === product.id)) {
        combinedProducts.push(product);
      }
    });
    
    setAllProducts(combinedProducts);
    
    // Find the specific product
    const foundProduct = combinedProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }

  const [cartQuantity, setCartQuantity] = useState(0);



  useEffect(() => {

    window.scrollTo(0, 0);

    // Load all products
    loadAllProducts();

    // Track product view for dashboard analytics
    if (product) {
      const productViews = JSON.parse(localStorage.getItem('productViews') || '[]');
      const productDetailViews = JSON.parse(localStorage.getItem('productDetailViews') || '[]');
      
      // Add to general product views
      const existingViewIndex = productViews.findIndex(view => view.productId === product.id);
      if (existingViewIndex >= 0) {
        productViews[existingViewIndex].viewCount += 1;
        productViews[existingViewIndex].lastViewed = new Date().toISOString();
      } else {
        productViews.push({
          productId: product.id,
          productName: product.name,
          viewCount: 1,
          firstViewed: new Date().toISOString(),
          lastViewed: new Date().toISOString()
        });
      }
      
      // Add to detailed product views
      const detailViewIndex = productDetailViews.findIndex(view => view.productId === product.id);
      if (detailViewIndex >= 0) {
        productDetailViews[detailViewIndex].viewCount += 1;
        productDetailViews[detailViewIndex].lastViewed = new Date().toISOString();
      } else {
        productDetailViews.push({
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          productCategory: product.category,
          viewCount: 1,
          firstViewed: new Date().toISOString(),
          lastViewed: new Date().toISOString(),
          viewDuration: 0,
          userId: JSON.parse(localStorage.getItem('user') || '{}').id || 'anonymous'
        });
      }
      
      localStorage.setItem('productViews', JSON.stringify(productViews));
      localStorage.setItem('productDetailViews', JSON.stringify(productDetailViews));
    }

    // Load cart quantity

    const loadCartQuantity = () => {

      const cart = localStorage.getItem('cart');

      if (cart) {

        const items = JSON.parse(cart);

        const existingItem = items.find(item => item.id === product?.id);

        setCartQuantity(existingItem ? existingItem.quantity : 0);

      }

    };



    loadCartQuantity();



    // Listen for cart updates

    const handleCartUpdate = () => {

      loadCartQuantity();

    };



    window.addEventListener('cartUpdated', handleCartUpdate);

    window.addEventListener('storage', handleCartUpdate);



    return () => {

      window.removeEventListener('cartUpdated', handleCartUpdate);

      window.removeEventListener('storage', handleCartUpdate);

    };

  }, [id]);



  const updateCart = (newQuantity) => {

    if (newQuantity < 0) return;



    const cart = localStorage.getItem('cart');

    let cartItems = cart ? JSON.parse(cart) : [];



    if (newQuantity === 0) {

      // Remove from cart

      cartItems = cartItems.filter(item => item.id !== product.id);

    } else {

      // Add or update in cart

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



    localStorage.setItem('cart', JSON.stringify(cartItems));

    setCartQuantity(newQuantity);



    // Trigger custom event to notify other components

    window.dispatchEvent(new Event('cartUpdated'));

  };



  const handleAddToCart = () => {

    updateCart(cartQuantity + 1);

  };



  const handleIncreaseQuantity = () => {

    updateCart(cartQuantity + 1);

  };



  const handleDecreaseQuantity = () => {

    updateCart(cartQuantity - 1);

  };



  // Get related products (same car model)

  const relatedProducts = product?.carModel 

    ? allProducts.filter(p => p.carModel === product.carModel && p.id !== product.id)

    : [];



  // Delivery info

  const deliveryInfo = {

    freeShipping: product.price >= 500000,

    deliveryTime: '1-3 kun',

    deliveryAreas: ['Toshkent', 'Sergeli', 'Chilonzor', 'Yunusobod', 'Mirzo Ulugbek'],

    pickupAvailable: true

  };



  if (!product) {

    return (

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">

          Mahsulot topilmadi

        </h1>

        <p className="text-gray-600">

          Siz qidirgan mahsulot mavjud emas.

        </p>

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-gray-50 py-8 lg:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">



        <div className="bg-white rounded-xl p-4 lg:p-6 flex items-center justify-center shadow-sm">

          <img

            src={product.image}

            alt={product.name}

            className="max-h-[300px] lg:max-h-[420px] w-full object-contain"

          />

        </div>



        <div className="space-y-4 lg:space-y-6">

          <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-2 lg:mb-3">

            {product.name}

          </h1>



          <div className="flex items-center gap-2 mb-3 lg:mb-4">

            <div className="flex">

              {Array.from({ length: 5 }).map((_, i) => (

                <Star

                  key={i}

                  size={16}

                  className={

                    i < Math.floor(product.rating)

                      ? "fill-yellow-400 text-yellow-400"

                      : "text-gray-300"

                  }

                />

              ))}

            </div>

            <span className="text-xs lg:text-sm text-gray-600">

              {product.rating} (3 ta baho)

            </span>

          </div>



          <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 mb-4 lg:mb-5">

            <span className="text-2xl lg:text-3xl font-extrabold text-green-600">

              {new Intl.NumberFormat("uz-UZ").format(product.price)} so'm

            </span>



            {product.oldPrice && (

              <span className="text-sm lg:text-lg text-gray-400 line-through">

                {new Intl.NumberFormat("uz-UZ").format(product.oldPrice)} so'm

              </span>

            )}

          </div>



          {/* Car Model Info */}

          {product.carModel && (

            <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-blue-50 rounded-lg border border-blue-200">

              <h3 className="font-semibold text-blue-900 mb-2 text-sm lg:text-base">

                Avtomobil modeli

              </h3>

              <p className="text-blue-800 font-medium text-sm lg:text-base">{product.carModel}</p>

              {product.carYears && (

                <p className="text-blue-700 text-xs lg:text-sm mt-1">

                  Yillar: {product.carYears.join(' - ')}

                </p>

              )}

            </div>

          )}



          {/* Delivery Info */}

          <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-green-50 rounded-lg border border-green-200">

            <h3 className="font-semibold text-green-900 mb-3 text-sm lg:text-base flex items-center gap-2">

              <Truck size={16} />

              Yetkazib berish

            </h3>

            <div className="space-y-2 text-xs lg:text-sm">

              <div className="flex items-center gap-2 text-green-800">

                <Clock size={14} />

                <span>{deliveryInfo.deliveryTime}</span>

              </div>

              <div className="flex items-center gap-2 text-green-800">

                <MapPin size={14} />

                <span>Toshkent bo'ylab</span>

              </div>

              <div className="flex items-center gap-2 text-green-800">

                <Shield size={14} />

                <span>{deliveryInfo.freeShipping ? 'Bepul yetkazib berish' : 'Yetkazib berish: 30,000 so\'m'}</span>

              </div>

            </div>

          </div>



          {/* Cart Actions */}

          <div className="mb-6 lg:mb-8">

            {cartQuantity > 0 ? (

              /* Quantity controls */

              <div className="flex items-center gap-3">

                <button

                  onClick={handleDecreaseQuantity}

                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-all duration-300 transform hover:scale-105"

                >

                  <Minus size={18} />

                </button>

                <span className="flex-1 text-center font-semibold text-gray-900 text-lg lg:text-xl transition-all duration-300">

                  {cartQuantity}

                </span>

                <button

                  onClick={handleIncreaseQuantity}

                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition-all duration-300 transform hover:scale-105"

                >

                  <Plus size={18} />

                </button>

              </div>

            ) : (

              /* Add to cart button */

              <button

                onClick={handleAddToCart}

                disabled={!product.available}

                className={`w-full h-12 lg:h-14 rounded-xl flex items-center justify-center gap-3

                  font-semibold text-base lg:text-lg transition-all duration-300 cursor-pointer transform hover:scale-105

                  ${product.available

                    ? "bg-blue-600 text-white hover:bg-blue-700"

                    : "bg-gray-200 text-gray-400 cursor-not-allowed"

                  }`}

              >

                <ShoppingCart size={20} />

                Savatga qo'shish

              </button>

            )}

          </div>

        </div>

      </div>



      {/* Product Description */}

      <div className="mt-8 lg:mt-12 bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm">

        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4">

          Mahsulot haqida

        </h3>

        <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">

          {product.description}

        </p>

      </div>



      {/* Specifications */}

      {product.specifications && (

        <div className="mt-6 lg:mt-8 bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm">

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4">

            Texnik xususiyatlari

          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {Object.entries(product.specifications).map(([key, value]) => (

              <div key={key} className="flex justify-between py-2 border-b border-gray-100">

                <span className="text-gray-600 capitalize text-sm sm:text-base lg:text-base">

                  {key.replace(/_/g, ' ')}:

                </span>

                <span className="font-medium text-gray-900 text-sm sm:text-base lg:text-base">

                  {value}

                </span>

              </div>

            ))}

          </div>

        </div>

      )}



      {/* Related Products */}

      {relatedProducts.length > 0 && (

        <div className="mt-8 lg:mt-12">

          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-6">

            {product.carModel} uchun boshqa mahsulotlar

          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

            {relatedProducts.map((relatedProduct) => (

              <div key={relatedProduct.id} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">

                <img

                  src={relatedProduct.image}

                  alt={relatedProduct.name}

                  className="w-full h-32 sm:h-40 lg:h-48 object-contain mb-4"

                />

                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base lg:text-lg line-clamp-2">

                  {relatedProduct.name}

                </h4>

                <div className="flex items-center justify-between">

                  <span className="text-lg sm:text-xl font-bold text-green-600">

                    {new Intl.NumberFormat("uz-UZ").format(relatedProduct.price)} so'm

                  </span>

                  <button

                    onClick={() => window.location.href = `/product/${relatedProduct.id}`}

                    className="text-blue-600 hover:text-blue-700 text-sm sm:text-base font-medium"

                  >

                    Ko'rish

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

      </div>

    </div>

  );

}



export default ProductDetail;

