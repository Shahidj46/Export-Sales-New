import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Eye, CheckCircle, XCircle } from 'lucide-react';

const SalesOrder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const salesOrders = [
    {
      salesOrderId: 'SO-2024-001',
      inquiryId: 'INQ-2024-001',
      customerName: 'ABC Trading Corp',
      orderDate: '2024-01-15',
      totalAmount: '$45,000',
      currency: 'USD',
      paymentTerms: '30 Days Net',
      deliveryTerms: 'FOB',
      shippingPort: 'Port of Los Angeles',
      approvalStatus: 'Pending',
      approvedBy: '',
      approvedDate: ''
    },
    {
      salesOrderId: 'SO-2024-002',
      inquiryId: 'INQ-2024-002',
      customerName: 'Global Exports Ltd',
      orderDate: '2024-01-14',
      totalAmount: '$32,500',
      currency: 'USD',
      paymentTerms: '45 Days Net',
      deliveryTerms: 'CIF',
      shippingPort: 'Port of Miami',
      approvalStatus: 'Approved',
      approvedBy: 'John Manager',
      approvedDate: '2024-01-15'
    },
    {
      salesOrderId: 'SO-2024-003',
      inquiryId: 'INQ-2024-003',
      customerName: 'International Traders',
      orderDate: '2024-01-13',
      totalAmount: '$78,900',
      currency: 'USD',
      paymentTerms: '60 Days Net',
      deliveryTerms: 'EXW',
      shippingPort: 'Port of Seattle',
      approvalStatus: 'Rejected',
      approvedBy: 'Jane Director',
      approvedDate: '2024-01-14'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending': return <Eye className="w-4 h-4 text-yellow-600" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Eye className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredOrders = salesOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.salesOrderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.approvalStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Orders</h1>
          <p className="text-gray-600 mt-2">Manage export sales orders and approvals</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          New Sales Order
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer name or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sales Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Port</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.salesOrderId}</div>
                    <div className="text-sm text-gray-500">Inquiry: {order.inquiryId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.orderDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.totalAmount}</div>
                    <div className="text-sm text-gray-500">{order.currency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.paymentTerms}</div>
                    <div className="text-sm text-gray-500">{order.deliveryTerms}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.shippingPort}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(order.approvalStatus)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.approvalStatus)}`}>
                        {order.approvalStatus}
                      </span>
                    </div>
                    {order.approvedBy && (
                      <div className="text-xs text-gray-500 mt-1">
                        By: {order.approvedBy}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesOrder;