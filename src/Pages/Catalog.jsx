import React, { useEffect, useState } from 'react'
import { Search, ShoppingBag, SlidersHorizontal, ArrowLeft, ArrowRight } from 'lucide-react'
import { products as defaultProducts } from './Products'
import ProductCard from '../Components/ProductCard'
import LoadingSpinner from '../Components/LoadingSpinner'
import {  useNavigate } from 'react-router-dom'

function Catalog() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 })
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])

  // Load products from all sources
  const loadProducts = () => {
    // First try to load from products.json file (updated by dashboard)
    const productsFile = JSON.parse(localStorage.getItem('productsFile') || '[]')
    
    if (productsFile.length > 0) {
      // Use products.json if it exists (has dashboard-added products)
      setProducts(productsFile)
      return
    }
    
    // Fallback to productsJson
    const productsJson = JSON.parse(localStorage.getItem('productsJson') || '[]')
    
    if (productsJson.length > 0) {
      // Use productsJson if it exists (has dashboard-added products)
      setProducts(productsJson)
      return
    }
    
    // Fallback to other sources
    const dashboardProducts = JSON.parse(localStorage.getItem('dashboardProducts') || '[]')
    const mainProducts = JSON.parse(localStorage.getItem('products') || '[]')
    const allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]')
    const productsJsData = JSON.parse(localStorage.getItem('productsJsData') || '[]')
    
    // Combine all products: default from Products.js + dashboard added + main platform
    const combinedProducts = [...defaultProducts]
    
    // Add dashboard products (avoid duplicates)
    dashboardProducts.forEach(product => {
      if (!combinedProducts.find(p => p.id === product.id)) {
        combinedProducts.push(product)
      }
    })
    
    // Add main platform products (avoid duplicates)
    mainProducts.forEach(product => {
      if (!combinedProducts.find(p => p.id === product.id)) {
        combinedProducts.push(product)
      }
    })
    
    // Add all products storage (avoid duplicates)
    allProducts.forEach(product => {
      if (!combinedProducts.find(p => p.id === product.id)) {
        combinedProducts.push(product)
      }
    })
    
    // Add productsJsData (avoid duplicates)
    productsJsData.forEach(product => {
      if (!combinedProducts.find(p => p.id === product.id)) {
        combinedProducts.push(product)
      }
    })
    
    setProducts(combinedProducts)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Load products from all sources
    loadProducts()

    const urlParams = new URLSearchParams(window.location.search)
    const search = urlParams.get('search')
    const category = urlParams.get('category')
    if (search) setSearchTerm(search)
    if (category) setSelectedCategory(category)

    const timer = setTimeout(() => setIsLoading(false), 1500)

    const handleClickOutside = (event) => {
      if (isFilterOpen && !event.target.closest('.filter-dropdown')) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    // Listen for product updates from dashboard
    const handleProductsUpdate = () => {
      loadProducts()
    }
    window.addEventListener('productsUpdated', handleProductsUpdate)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('productsUpdated', handleProductsUpdate)
    }
  }, [isFilterOpen])

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    // Update URL
    const params = new URLSearchParams()
    if (categoryId !== 'all') {
      params.set('category', categoryId)
    } else {
      params.delete('category')
    }
    if (searchTerm) {
      params.set('search', searchTerm)
    }
    const newUrl = params.toString() ? `/catalog?${params.toString()}` : '/catalog'
    navigate(newUrl, { replace: true })
  }

  const handleBackToCategories = () => {
    setSelectedCategory('all')
    navigate('/catalog', { replace: true })
  }

  const categories = [
    { id: 'brakes', name: 'Tormoz Tizimi', count: 8, image: '/images/categories/brakes.jpg' },
    { id: 'wheels', name: "G'ildiraklar", count: 3, image: '/images/categories/wheels.jpg' },
    { id: 'engine', name: 'Dvigatel', count: 12, image: '/images/categories/engine.jpg' },
    { id: 'suspension', name: 'Osma', count: 7, image: '/images/categories/suspension.jpg' },
    { id: 'transmission', name: 'Transmissiya', count: 5, image: '/images/categories/transmission.jpg' },
    { id: 'electrical', name: 'Elektrika', count: 9, image: '/images/categories/electrical.jpg' },
    { id: 'interior', name: 'Salon', count: 6, image: '/images/categories/interior.jpg' },
    { id: 'exterior', name: 'Tashqi', count: 4, image: '/images/categories/exterior.jpg' },
    { id: 'lighting', name: 'Chiroqlar', count: 11, image: '/images/categories/lighting.jpg' },
    { id: 'filters', name: 'Filtrlar', count: 15, image: '/images/categories/filters.jpg' },
    { id: 'belts', name: 'Remenlar', count: 6, image: '/images/categories/belts.jpg' },
    { id: 'body', name: 'Kuzov qismlari', count: 8, image: '/images/categories/body.jpg' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {isLoading && <LoadingSpinner />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Katalog</h1>
          </div>
          <p className="text-gray-600">Barcha mahsulotlarimiz</p>
        </div>
        {/* SEARCH & FILTER */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* SEARCH INPUT */}
            <div className="flex-1 relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Mahsulotlarni qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-[400px] pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="relative filter-dropdown w-full sm:w-auto">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer justify-center w-full sm:w-auto text-sm"
              >
                <SlidersHorizontal size={16} />
                <span>Filterlar</span>
              </button>

              <div
                className={`absolute top-full left-0 mt-2 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden transition-all duration-300 ease-in-out
      ${isFilterOpen ? 'max-h-96 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}
    `}
              >
                <button onClick={() => { setSortBy('name'); setIsFilterOpen(false) }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm">
                  Nomi bo'yicha
                </button>
                <button onClick={() => { setSortBy('price-low'); setIsFilterOpen(false) }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm">
                  Narx (arzon)
                </button>
                <button onClick={() => { setSortBy('price-high'); setIsFilterOpen(false) }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm">
                  Narx (qimmat)
                </button>
                <button onClick={() => { setSortBy('rating'); setIsFilterOpen(false) }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm">
                  Reyting
                </button>
              </div>
            </div>

          </div>
        </div>

        {selectedCategory === 'all' ? (
          <>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategoriyalar</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.filter(cat => cat.id !== 'all').map(category => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`category-card group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-3 sm:p-4 cursor-pointer hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:scale-105 ${
                      selectedCategory === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-lg sm:text-xl">
                          {category.id === 'brakes' && '🚗'}
                          {category.id === 'wheels' && '🛞'}
                          {category.id === 'engine' && '⚙️'}
                          {category.id === 'suspension' && '🛞'}
                          {category.id === 'transmission' && '⚡'}
                          {category.id === 'electrical' && '💡'}
                          {category.id === 'interior' && '🪑'}
                          {category.id === 'exterior' && '🎨'}
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">{category.name}</h3>
                      <p className="text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded-full">{category.count} mahsulot</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <button onClick={handleBackToCategories} className="flex items-center gap-2 mb-4">
              <ArrowLeft size={16} />
              <span>Orqaga</span>
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {products
                .filter((product) => product.category === selectedCategory)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Catalog