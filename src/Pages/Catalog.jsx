import React, { useEffect, useState } from 'react'
import { Search, ShoppingBag, SlidersHorizontal } from 'lucide-react'
import { products } from './Products'
import ProductCard from '../Components/ProductCard'
import LoadingSpinner from '../Components/LoadingSpinner'

function Catalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 })
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)

    const urlParams = new URLSearchParams(window.location.search)
    const search = urlParams.get('search')
    if (search) setSearchTerm(search)

    const timer = setTimeout(() => setIsLoading(false), 2000)

    const handleClickOutside = (event) => {
      if (isFilterOpen && !event.target.closest('.filter-dropdown')) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFilterOpen])

  const categories = [
    { id: 'all', name: 'Barchasi', count: products.length },
    { id: 'brakes', name: 'Tormoz Tizimi', count: 8 },
    { id: 'wheels', name: "G'ildiraklar", count: 3 },
  ]

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
      const matchesAvailability = !onlyAvailable || product.available
      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {isLoading && <LoadingSpinner />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
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
                className="w-full sm:w-[240px] pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* FILTER BUTTON */}
            <div className="relative filter-dropdown w-full sm:w-auto">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer justify-center w-full sm:w-auto text-sm"
              >
                <SlidersHorizontal size={16} />
                <span>Filterlar</span>
              </button>

              {/* DROPDOWN WITH TRANSITION */}
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


        {/* CATEGORIES */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategoriyalar</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 text-sm cursor-pointer ${selectedCategory === category.id
                  ? 'bg-blue-500 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                  }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
