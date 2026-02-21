import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, ShoppingCart, Package, Calendar, Download, Filter } from 'lucide-react';

const ProfitPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [profitData, setProfitData] = useState({
    totalProfit: 0,
    totalRevenue: 0,
    totalCosts: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    profitMargin: 0
  });

  const [chartData, setChartData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    loadProfitData();
  }, [timeRange]);

  const loadProfitData = () => {
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

    // Mock profit calculation
    const mockOrders = generateMockOrders(uniqueProducts);
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
    const totalCosts = totalRevenue * 0.6; // Assume 60% cost
    const totalProfit = totalRevenue - totalCosts;
    const totalOrders = mockOrders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    setProfitData({
      totalProfit,
      totalRevenue,
      totalCosts,
      totalOrders,
      averageOrderValue,
      profitMargin
    });

    // Generate chart data based on time range
    const chartDays = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    const newChartData = generateChartData(chartDays);
    setChartData(newChartData);

    // Top products by revenue
    const productRevenue = {};
    mockOrders.forEach(order => {
      order.items.forEach(item => {
        if (!productRevenue[item.productId]) {
          productRevenue[item.productId] = {
            name: item.name,
            revenue: 0,
            quantity: 0
          };
        }
        productRevenue[item.productId].revenue += item.price * item.quantity;
        productRevenue[item.productId].quantity += item.quantity;
      });
    });

    const topProductsList = Object.values(productRevenue)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
    setTopProducts(topProductsList);

    // Recent transactions
    const recent = mockOrders
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
    setRecentTransactions(recent);
  };

  const generateMockOrders = (products) => {
    const orders = [];
    const orderCount = Math.floor(Math.random() * 50) + 30;
    
    for (let i = 0; i < orderCount; i++) {
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30));
      
      const itemCount = Math.floor(Math.random() * 3) + 1;
      const items = [];
      let total = 0;
      
      for (let j = 0; j < itemCount; j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        if (product) {
          const quantity = Math.floor(Math.random() * 3) + 1;
          items.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity
          });
          total += product.price * quantity;
        }
      }
      
      if (items.length > 0) {
        orders.push({
          id: `ORD-${Date.now()}-${i}`,
          date: orderDate.toISOString(),
          items,
          total,
          status: Math.random() > 0.1 ? 'completed' : 'pending'
        });
      }
    }
    
    return orders;
  };

  const generateChartData = (days) => {
    const data = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const revenue = Math.floor(Math.random() * 5000000) + 1000000;
      const profit = revenue * 0.4;
      
      data.push({
        date: date.toLocaleDateString('uz-UZ', { month: 'short', day: 'numeric' }),
        revenue,
        profit
      });
    }
    
    return data;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  const exportReport = () => {
    const reportData = {
      period: timeRange,
      generatedAt: new Date().toISOString(),
      summary: profitData,
      topProducts,
      transactions: recentTransactions
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profit-report-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Foyda</h1>
          <p className="text-gray-600 mt-2">Moliyaviy hisobotlar va tahlillar</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Oxirgi 7 kun</option>
            <option value="month">Oxirgi 30 kun</option>
            <option value="quarter">Oxirgi 3 oy</option>
          </select>
          
          <button
            onClick={exportReport}
            className="btn-secondary flex items-center gap-2"
          >
            <Download size={20} />
            Hisobot
          </button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Jami Foyda</p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {formatCurrency(profitData.totalProfit)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {profitData.profitMargin.toFixed(1)}% marja
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Jami Daromad</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {formatCurrency(profitData.totalRevenue)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Jami Buyurtmalar</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {profitData.totalOrders}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                O'rtacha: {formatCurrency(profitData.averageOrderValue)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <ShoppingCart size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Xarajatlar</p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {formatCurrency(profitData.totalCosts)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-100 text-red-600">
              <Package size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daromad va Foyda Grafigi</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {chartData.slice(-12).map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col gap-1">
                <div 
                  className="bg-blue-500 rounded-t"
                  style={{ 
                    height: `${(item.revenue / Math.max(...chartData.map(d => d.revenue))) * 180}px` 
                  }}
                ></div>
                <div 
                  className="bg-green-500 rounded-b"
                  style={{ 
                    height: `${(item.profit / Math.max(...chartData.map(d => d.revenue))) * 180}px` 
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 transform -rotate-45 origin-right">
                {item.date}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Daromad</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Foyda</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Eng ko'p sotilgan mahsulotlar</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.quantity} dona sotilgan</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">So'nggi tranzaktsiyalar</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.id}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('uz-UZ')}
                  </p>
                  <p className="text-xs text-gray-500">
                    {transaction.items.length} mahsulot
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(transaction.total)}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status === 'completed' ? 'Bajarildi' : 'Kutilmoqda'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitPage;
