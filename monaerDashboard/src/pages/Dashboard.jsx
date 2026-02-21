import React, { useEffect, useState } from 'react';
import { Users, Package, TrendingUp, DollarSign, Eye, ShoppingCart } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalProfit: 0,
    totalOrders: 0,
    totalViews: 0,
    cartItems: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Load data from localStorage
    const loadDashboardData = () => {
      // Get users from monaerClient
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Get products from all sources
      const dashboardProducts = JSON.parse(localStorage.getItem('dashboardProducts') || '[]');
      const mainProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const allProductsStorage = JSON.parse(localStorage.getItem('allProducts') || '[]');
      const productsJsData = JSON.parse(localStorage.getItem('productsJsData') || '[]');
      
      // Combine all products
      const allProducts = [...dashboardProducts, ...mainProducts, ...allProductsStorage, ...productsJsData];
      const uniqueProducts = allProducts.filter((product, index, self) => 
        index === self.findIndex((p) => p.id === product.id)
      );
      
      // Get cart items
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Get product views
      const productViews = JSON.parse(localStorage.getItem('productViews') || '[]');
      const totalViews = productViews.reduce((sum, view) => sum + view.viewCount, 0);
      
      // Calculate profit (simplified calculation)
      const totalProfit = uniqueProducts.reduce((sum, product) => {
        const soldCount = Math.floor(Math.random() * 10); // Mock data
        return sum + (product.price * soldCount);
      }, 0);

      setStats({
        totalUsers: users.length,
        totalProducts: uniqueProducts.length,
        totalProfit: totalProfit,
        totalOrders: Math.floor(Math.random() * 100) + 50, // Mock data
        totalViews: totalViews,
        cartItems: cart.reduce((sum, item) => sum + item.quantity, 0)
      });

      // Recent activity (mock data)
      const activities = [
        { id: 1, type: 'user', message: 'Yangi foydalanuvchi qo\'shildi', time: '2 daqiqa oldin' },
        { id: 2, type: 'product', message: 'Yangi mahsulot qo\'shildi', time: '5 daqiqa oldin' },
        { id: 3, type: 'order', message: 'Yangi buyurtma tushdi', time: '10 daqiqa oldin' },
        { id: 4, type: 'view', message: 'Mahsulot ko\'rildi', time: '15 daqiqa oldin' },
      ];
      setRecentActivity(activities);
    };

    loadDashboardData();
    
    // Set up interval to refresh data
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: 'Jami Foydalanuvchilar',
      value: stats.totalUsers,
      icon: Users,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Jami Mahsulotlar',
      value: stats.totalProducts,
      icon: Package,
      color: 'green',
      change: '+8%'
    },
    {
      title: 'Jami Foyda',
      value: new Intl.NumberFormat('uz-UZ').format(stats.totalProfit),
      icon: DollarSign,
      color: 'yellow',
      change: '+23%'
    },
    {
      title: 'Jami Buyurtmalar',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'purple',
      change: '+15%'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Biznesningingiz umumiy ko\'rinishi</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs font-medium text-green-600">{stat.change}</span>
                    <span className="text-xs text-gray-500">oyga nisbatan</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="stat-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Jami Ko'rishlar</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats.totalViews}</p>
            </div>
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
              <Eye size={20} />
            </div>
          </div>
        </div>

        <div className="stat-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Savatchadagi Mahsulotlar</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stats.cartItems}</p>
            </div>
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
              <ShoppingCart size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">So\'nggi Faoliyat</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'product' ? 'bg-green-500' :
                  activity.type === 'order' ? 'bg-yellow-500' : 'bg-gray-500'
                }`}></div>
                <span className="text-sm text-gray-700">{activity.message}</span>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
