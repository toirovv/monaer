import React, { useEffect } from 'react'
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
  useEffect(() => {
    // Update page title dynamically
    const updatePageTitle = () => {
      const path = window.location.pathname;
      let title = 'Monaer - Avtomobil ehtiyot qismlari va zaxiralari';
      
      if (path === '/') {
        title = 'Monaer - Avtomobil ehtiyot qismlari va zaxiralari | Bosh sahifa';
      } else if (path === '/catalog') {
        title = 'Monaer - Katalog | Avtomobil ehtiyot qismlari';
      } else if (path === '/cart') {
        title = 'Monaer - Savatcha | Avtomobil ehtiyot qismlari';
      } else if (path === '/about') {
        title = 'Monaer - Biz haqimizda | Avtomobil ehtiyot qismlari';
      } else if (path === '/contact') {
        title = 'Monaer - Aloqa | Avtomobil ehtiyot qismlari';
      } else if (path.includes('/product/')) {
        title = 'Monaer - Mahsulot tafsilotlari | Avtomobil ehtiyot qismlari';
      }
      
      document.title = title;
      
      // Update meta description
      let description = 'Monaer - Yuqori sifatli avtomobil ehtiyot qismlari, zaxiralari va boshqa mahsulotlar. Keng assortiment, arzon narxlar va ishonchilik kafolati.';
      
      if (path === '/') {
        description = 'Monaer bosh sahifasi. Yuqori sifatli avtomobil ehtiyot qismlari, zaxiralar va boshqa mahsulotlar. Keng assortiment, arzon narxlar va ishonchilik kafolati.';
      } else if (path === '/catalog') {
        description = 'Monaer katalogi. Barcha turdagi avtomobil ehtiyot qismlari, zaxiralar va boshqa mahsulotlar. Qulay narxlar va keng assortiment.';
      } else if (path === '/cart') {
        description = 'Monaer savatchasi. Tanlangan mahsulotlarni ko\'ring va sotib oling. Xavfsiz va qulay to\'lov tizimi.';
      }
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    };
    
    updatePageTitle();
    
    // Listen for route changes
    const handleRouteChange = () => {
      updatePageTitle();
    };
    
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('pushstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('pushstate', handleRouteChange);
    };
  }, []);

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
