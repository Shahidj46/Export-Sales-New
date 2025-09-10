import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, Download, Eye } from 'lucide-react';

const CommercialInvoice = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const commercialInvoices = [
    {
      ciId: 'CI-2024-001',
      salesOrderId: 'SO-2024-001',
      ciNo: 'CI001/2024',
      ciDate: '2024-02-01',
      customerName: 'ABC Trading Corp',
      totalAmount: '$45,000',
      currency: 'USD',
      documentType: 'Original',
      status: 'Generated',
      products: [
        { code: 'P001', description: 'Steel Plates', quantity: 100, unitPrice: 450 }
      ]
    },
    {
      ciId: 'CI-2024-002',
      salesOrderId: 'SO-2024-002',
      ciNo: 'CI002/2024',
      ciDate: '2024-01-28',
      customerName: 'Global Exports Ltd',
      totalAmount: '$32,500',
      currency: 'USD',
      documentType: 'Copy',
      status: 'Sent',
      products: [
        { code: 'P002', description: 'Aluminum Sheets', quantity: 75, unitPrice: 433.33 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated': return 'bg-blue-100 text-blue-800';
      case 'Sent': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvoices = commercialInvoices.filter(ci => {
    const matchesSearch = ci.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ci.ciNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ci.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Commercial Invoice</h1>
          <p className="text-gray-600 mt-2">Generate and manage commercial invoices and documents</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Generate CI
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
                placeholder="Search by customer name or CI number..."
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
              <option value="Draft">Draft</option>
              <option value="Generated">Generated</option>
              <option value="Sent">Sent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Commercial Invoices Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CI Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((ci, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ci.ciNo}</div>
                    <div className="text-sm text-gray-500">{ci.ciDate}</div>
                    <div className="text-sm text-gray-500">SO: {ci.salesOrderId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ci.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ci.totalAmount}</div>
                    <div className="text-sm text-gray-500">{ci.currency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {ci.documentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ci.status)}`}>
                      {ci.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="Preview">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Edit">
                        <FileText className="w-4 h-4" />
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

export default CommercialInvoice;