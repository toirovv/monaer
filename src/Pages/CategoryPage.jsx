import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from './Products'
import ProductCard from '../Components/ProductCard'
import { Search, Grid, List } from 'lucide-react'

const CategoryPage = () => {
  const { categoryName } = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  const categoryProducts = products.filter(product => product.category === categoryName)

  const filteredProducts = categoryProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryName = (category) => {
    const names = {
      'brakes': 'Tormoz Tizimi',
      'wheels': 'G\'ildiraklar'
    }
    return names[category] || category
  }

  if (categoryProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Kategoriya topilmadi
          </h1>
          <p className="text-gray-600">
            Bu kategoriyada mahsulotlar mavjud emas.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getCategoryName(categoryName)}
          </h1>
          <p className="text-gray-600">
            {categoryProducts.length} ta mahsulot
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Mahsulotlarni qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
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

export default CategoryPage
