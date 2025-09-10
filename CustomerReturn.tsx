import React, { useState } from 'react';
import { Plus, Search, Filter, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

const CustomerReturn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const returnRequests = [
    {
      returnRequestId: 'RR-2024-001',
      salesOrderId: 'SO-2024-001',
      customerName: 'ABC Trading Corp',
      requestDate: '2024-02-10',
      productCode: 'P001',
      productName: 'Steel Plates',
      quantity: 10,
      reasonForReturn: 'Damaged during transit',
      approvalStatus: 'Approved',
      approvedBy: 'John Manager',
      approvedDate: '2024-02-11'
    },
    {
      returnRequestId: 'RR-2024-002',
      salesOrderId: 'SO-2024-002',
      customerName: 'Global Exports Ltd',
      requestDate: '2024-02-08',
      productCode: 'P002',
      productName: 'Aluminum Sheets',
      quantity: 5,
      reasonForReturn: 'Quality issues - specification mismatch',
      approvalStatus: 'Pending',
      approvedBy: '',
      approvedDate: ''
    },
    {
      returnRequestId: 'RR-2024-003',
      salesOrderId: 'SO-2024-003',
      customerName: 'International Traders',
      requestDate: '2024-02-06',
      productCode: 'P003',
      productName: 'Copper Wires',
      quantity: 25,
      reasonForReturn: 'Wrong product shipped',
      approvalStatus: 'Rejected',
      approvedBy: 'Jane Director',
      approvedDate: '2024-02-07'
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
      case 'Pending': return <RotateCcw className="w-4 h-4 text-yellow-600" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <RotateCcw className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredRequests = returnRequests.filter(request => {
    const matchesSearch = request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.returnRequestId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || request.approvalStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (requestId: string) => {
    console.log(`Approving return request: ${requestId}`);
  };

  const handleReject = (requestId: string) => {
    console.log(`Rejecting return request: ${requestId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Return Requests</h1>
          <p className="text-gray-600 mt-2">Manage customer return requests and approvals</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          New Return Request
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
                placeholder="Search by customer name or request ID..."
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

      {/* Return Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.returnRequestId}</div>
                    <div className="text-sm text-gray-500">SO: {request.salesOrderId}</div>
                    <div className="text-sm text-gray-500">{request.requestDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{request.productName}</div>
                      <div className="text-gray-500">Code: {request.productCode}</div>
                      <div className="text-gray-500">Qty: {request.quantity}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={request.reasonForReturn}>
                      {request.reasonForReturn}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(request.approvalStatus)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.approvalStatus)}`}>
                        {request.approvalStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.approvedBy ? (
                      <div>
                        <div className="text-sm text-gray-900">{request.approvedBy}</div>
                        <div className="text-sm text-gray-500">{request.approvedDate}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {request.approvalStatus === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request.returnRequestId)}
                            className="text-green-600 hover:text-green-900"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(request.returnRequestId)}
                            className="text-red-600 hover:text-red-900"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <RotateCcw className="w-4 h-4" />
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

export default CustomerReturn;