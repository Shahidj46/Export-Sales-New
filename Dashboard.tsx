import React from 'react';
import { TrendingUp, TrendingDown, Clock, CheckCircle, Package, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const kpiData = [
    {
      title: 'Total Orders',
      value: '247',
      change: '+12.5%',
      trend: 'up',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending PIs',
      value: '18',
      change: '-8.3%',
      trend: 'down',
      icon: Clock,
      color: 'bg-amber-500'
    },
    {
      title: 'Active LCs',
      value: '32',
      change: '+15.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Collections',
      value: '$2.4M',
      change: '+23.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  const recentOrders = [
    { id: 'SO-2024-001', customer: 'ABC Trading Corp', amount: '$45,000', status: 'In Progress', date: '2024-01-15' },
    { id: 'SO-2024-002', customer: 'Global Exports Ltd', amount: '$32,500', status: 'Approved', date: '2024-01-14' },
    { id: 'SO-2024-003', customer: 'International Traders', amount: '$78,900', status: 'Pending', date: '2024-01-13' },
    { id: 'SO-2024-004', customer: 'Maritime Solutions', amount: '$56,200', status: 'Completed', date: '2024-01-12' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the Export Sales Management System</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          const trendColor = kpi.trend === 'up' ? 'text-green-600' : 'text-red-600';
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center ${trendColor}`}>
                  <TrendIcon className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">{kpi.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <p className="text-gray-600 text-sm">{kpi.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Sales Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;