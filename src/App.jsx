import React from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import Blog from './Pages/Blog'
import Backet from './Pages/Backet'
import Contact from './Pages/Contact'
import Profile from './Pages/Profile'
import Catalog from './Pages/Catalog'
import Cart from './Pages/Cart'
import ProductDetail from './Pages/ProductDetail'
import Layout from './Components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CategoryPage from './Pages/CategoryPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/backet' element={<Backet />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/category/:categoryName' element={<CategoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
