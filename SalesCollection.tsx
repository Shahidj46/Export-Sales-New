import React, { useState } from 'react';
import { Plus, Search, Filter, DollarSign, CreditCard, TrendingUp } from 'lucide-react';

const SalesCollection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const collections = [
    {
      collectionId: 'COL-2024-001',
      ciId: 'CI-2024-001',
      customerName: 'ABC Trading Corp',
      collectionDate: '2024-02-05',
      amountCollected: '$45,000',
      totalAmount: '$45,000',
      outstandingAmount: '$0',
      currency: 'USD',
      paymentMode: 'Bank Transfer',
      bankReferenceNo: 'BT123456789',
      collectionStatus: 'Completed'
    },
    {
      collectionId: 'COL-2024-002',
      ciId: 'CI-2024-002',
      customerName: 'Global Exports Ltd',
      collectionDate: '2024-02-03',
      amountCollected: '$20,000',
      totalAmount: '$32,500',
      outstandingAmount: '$12,500',
      currency: 'USD',
      paymentMode: 'LC Payment',
      bankReferenceNo: 'LC987654321',
      collectionStatus: 'Partial'
    },
    {
      collectionId: 'COL-2024-003',
      ciId: 'CI-2024-003',
      customerName: 'International Traders',
      collectionDate: '',
      amountCollected: '$0',
      totalAmount: '$78,900',
      outstandingAmount: '$78,900',
      currency: 'USD',
      paymentMode: '',
      bankReferenceNo: '',
      collectionStatus: 'Pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Partial': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.collectionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || collection.collectionStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary statistics
  const totalCollected = collections.reduce((sum, col) => sum + parseFloat(col.amountCollected.replace('$', '').replace(',', '') || '0'), 0);
  const totalOutstanding = collections.reduce((sum, col) => sum + parseFloat(col.outstandingAmount.replace('$', '').replace(',', '') || '0'), 0);
  const totalAmount = collections.reduce((sum, col) => sum + parseFloat(col.totalAmount.replace('$', '').replace(',', '') || '0'), 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Collection</h1>
          <p className="text-gray-600 mt-2">Manage payment collections and outstanding balances</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Record Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Collected</p>
              <p className="text-2xl font-bold text-green-600">${totalCollected.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Outstanding Amount</p>
              <p className="text-2xl font-bold text-red-600">${totalOutstanding.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Collection Rate</p>
              <p className="text-2xl font-bold text-blue-600">{Math.round((totalCollected / totalAmount) * 100)}%</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer name or collection ID..."
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
              <option value="Completed">Completed</option>
              <option value="Partial">Partial</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Collections Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCollections.map((collection, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{collection.collectionId}</div>
                    <div className="text-sm text-gray-500">CI: {collection.ciId}</div>
                    {collection.collectionDate && (
                      <div className="text-sm text-gray-500">{collection.collectionDate}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{collection.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span className="font-medium">{collection.totalAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Collected:</span>
                        <span className="font-medium text-green-600">{collection.amountCollected}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Outstanding:</span>
                        <span className="font-medium text-red-600">{collection.outstandingAmount}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {collection.paymentMode ? (
                      <div>
                        <div className="text-sm text-gray-900">{collection.paymentMode}</div>
                        {collection.bankReferenceNo && (
                          <div className="text-sm text-gray-500 font-mono">{collection.bankReferenceNo}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(collection.collectionStatus)}`}>
                      {collection.collectionStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {collection.collectionStatus !== 'Completed' && (
                        <button className="text-green-600 hover:text-green-900" title="Record Payment">
                          <DollarSign className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <CreditCard className="w-4 h-4" />
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

export default SalesCollection;