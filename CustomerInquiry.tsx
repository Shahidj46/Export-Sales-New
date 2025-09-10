import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import InquiryForm from './forms/InquiryForm';
import Modal from './common/Modal';

const CustomerInquiry = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const inquiries = [
    {
      inquiryId: 'INQ-2024-001',
      customerName: 'ABC Trading Corp',
      customerCode: 'ABC001',
      contactPerson: 'John Smith',
      contactEmail: 'john@abctrading.com',
      contactPhone: '+1-555-0123',
      orderReference: 'REF-ABC-001',
      expectedDelivery: '2024-03-15',
      status: 'New',
      createdDate: '2024-01-15',
      remarks: 'Urgent requirement for Q1 delivery'
    },
    {
      inquiryId: 'INQ-2024-002',
      customerName: 'Global Exports Ltd',
      customerCode: 'GEL002',
      contactPerson: 'Sarah Johnson',
      contactEmail: 'sarah@globalexports.com',
      contactPhone: '+1-555-0124',
      orderReference: 'REF-GEL-002',
      expectedDelivery: '2024-04-01',
      status: 'In Review',
      createdDate: '2024-01-14',
      remarks: 'Bulk order for international markets'
    },
    {
      inquiryId: 'INQ-2024-003',
      customerName: 'International Traders',
      customerCode: 'INT003',
      contactPerson: 'Mike Chen',
      contactEmail: 'mike@inttraders.com',
      contactPhone: '+1-555-0125',
      orderReference: 'REF-INT-003',
      expectedDelivery: '2024-03-30',
      status: 'Closed',
      createdDate: '2024-01-13',
      remarks: 'Follow-up order from previous month'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'In Review': return <Eye className="w-4 h-4 text-yellow-600" />;
      case 'Closed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Review': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.inquiryId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (inquiryId: string) => {
    console.log(`Approving inquiry: ${inquiryId}`);
  };

  const handleReject = (inquiryId: string) => {
    console.log(`Rejecting inquiry: ${inquiryId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Inquiry</h1>
          <p className="text-gray-600 mt-2">Manage customer inquiries and work orders</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Inquiry
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
                placeholder="Search by customer name or inquiry ID..."
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
              <option value="New">New</option>
              <option value="In Review">In Review</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiry ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Delivery</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInquiries.map((inquiry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{inquiry.inquiryId}</div>
                    <div className="text-sm text-gray-500">{inquiry.createdDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{inquiry.customerName}</div>
                    <div className="text-sm text-gray-500">{inquiry.customerCode}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inquiry.contactPerson}</div>
                    <div className="text-sm text-gray-500">{inquiry.contactEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inquiry.expectedDelivery}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(inquiry.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {inquiry.status === 'New' && (
                        <>
                          <button
                            onClick={() => handleApprove(inquiry.inquiryId)}
                            className="text-green-600 hover:text-green-900"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(inquiry.inquiryId)}
                            className="text-red-600 hover:text-red-900"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      <Modal isOpen={showForm || !!selectedInquiry} onClose={() => {setShowForm(false); setSelectedInquiry(null);}}>
        <InquiryForm 
          inquiry={selectedInquiry} 
          onClose={() => {setShowForm(false); setSelectedInquiry(null);}} 
        />
      </Modal>
    </div>
  );
};

export default CustomerInquiry;