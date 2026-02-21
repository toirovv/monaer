import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';           // yoki qayerda bo'lsa shu yo'l
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/Users';
import ProductsPage from './pages/Products';
import ProfitPage from './pages/Profit';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/"          element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users"     element={<UsersPage />} />
          <Route path="/products"  element={<ProductsPage />} />
          <Route path="/profit"    element={<ProfitPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;