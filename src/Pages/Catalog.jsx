import React, { useEffect, useState } from 'react'
import { Search, Filter, Grid, List, ShoppingBag, SlidersHorizontal, ArrowUpDown, Star } from 'lucide-react'
import { products } from './Products'
import ProductCard from '../Components/ProductCard'
import LoadingSpinner from '../Components/LoadingSpinner'

function Catalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 })
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0);
    // Get URL search params
    const urlParams = new URLSearchParams(window.location.search)
    const search = urlParams.get('search')
    if (search) {
      setSearchTerm(search)
    }
    
    // Initial loading for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (isFilterOpen && !event.target.closest('.filter-dropdown')) {
        setIsFilterOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [isFilterOpen]);

  const categories = [
    { id: 'all', name: 'Barchasi', count: products.length },
    { id: 'brakes', name: 'Tormoz Tizimi', count: 8 },
    { id: 'wheels', name: 'G\'ildiraklar', count: 3 },
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
    const matchesAvailability = !onlyAvailable || product.available
    return matchesSearch && matchesCategory && matchesPrice && matchesAvailability
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  const averageRating = products.reduce((acc, product) => acc + product.rating, 0) / products.length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {isLoading && <LoadingSpinner />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Katalog</h1>
          </div>
          <p className="text-gray-600">Barcha mahsulotlarimiz</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Mahsulotlarni qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="relative filter-dropdown">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  <SlidersHorizontal size={16} />
                  <span className="text-sm">Filterlar</span>
                  <div className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6L6 9L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                
                {/* Dropdown menu */}
                {isFilterOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => { setSortBy('name'); setIsFilterOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 cursor-pointer text-sm"
                    >
                      Nomi bo'yicha
                    </button>
                    <button
                      onClick={() => { setSortBy('price-low'); setIsFilterOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 cursor-pointer text-sm"
                    >
                      Narx (arzon)
                    </button>
                    <button
                      onClick={() => { setSortBy('price-high'); setIsFilterOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 cursor-pointer text-sm"
                    >
                      Narx (qimmat)
                    </button>
                    <button
                      onClick={() => { setSortBy('rating'); setIsFilterOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 cursor-pointer text-sm"
                    >
                      Reyting
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Narx diapazoni
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 2000000})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyAvailable}
                      onChange={(e) => setOnlyAvailable(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Faqat mavjud mahsulotlar</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategoriyalar</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 text-sm cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm hover:transform hover:scale-105'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:transform hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Jami mahsulotlar</p>
                <p className="text-lg font-semibold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:transform hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">O'rtacha reyting</p>
                <p className="text-lg font-semibold text-gray-900">{averageRating.toFixed(1)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:transform hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <ArrowUpDown className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Topilgan mahsulotlar</p>
                <p className="text-lg font-semibold text-gray-900">{filteredProducts.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Mahsulotlar ({filteredProducts.length})
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500">Mahsulotlar topilmadi</p>
          </div>
        ) : (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Catalog
