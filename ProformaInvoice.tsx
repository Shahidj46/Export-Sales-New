import React, { useState } from 'react';
import { Plus, Search, Filter, FileText, Download, Eye } from 'lucide-react';

const ProformaInvoice = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [selectedPI, setSelectedPI] = useState(null);

  const proformaInvoices = [
    {
      piId: 'PI-2024-001',
      salesOrderId: 'SO-2024-001',
      piDate: '2024-01-16',
      piNo: 'PI001/2024',
      customerName: 'ABC Trading Corp',
      totalAmount: '$45,000',
      currency: 'USD',
      approvalStatus: 'Approved',
      approvedBy: 'John Manager',
      approvedDate: '2024-01-17',
      products: [
        { code: 'P001', description: 'Steel Plates', quantity: 100, unitPrice: 450 }
      ]
    },
    {
      piId: 'PI-2024-002',
      salesOrderId: 'SO-2024-002',
      piDate: '2024-01-15',
      piNo: 'PI002/2024',
      customerName: 'Global Exports Ltd',
      totalAmount: '$32,500',
      currency: 'USD',
      approvalStatus: 'Pending',
      approvedBy: '',
      approvedDate: '',
      products: [
        { code: 'P002', description: 'Aluminum Sheets', quantity: 75, unitPrice: 433.33 }
      ]
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

  const handlePreviewPDF = (pi: any) => {
    setSelectedPI(pi);
    setShowPDFPreview(true);
  };

  const handleDownloadPDF = (pi: any) => {
    console.log(`Downloading PDF for ${pi.piId}`);
    // In a real application, this would trigger a PDF download
  };

  const filteredInvoices = proformaInvoices.filter(pi => {
    const matchesSearch = pi.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pi.piId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || pi.approvalStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proforma Invoice</h1>
          <p className="text-gray-600 mt-2">Generate and manage proforma invoices</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Generate PI
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
                placeholder="Search by customer name or PI ID..."
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

      {/* Proforma Invoices Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PI Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((pi, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{pi.piId}</div>
                    <div className="text-sm text-gray-500">{pi.piNo}</div>
                    <div className="text-sm text-gray-500">{pi.piDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{pi.customerName}</div>
                    <div className="text-sm text-gray-500">SO: {pi.salesOrderId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{pi.totalAmount}</div>
                    <div className="text-sm text-gray-500">{pi.currency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pi.approvalStatus)}`}>
                      {pi.approvalStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {pi.approvedBy ? (
                      <div>
                        <div className="text-sm text-gray-900">{pi.approvedBy}</div>
                        <div className="text-sm text-gray-500">{pi.approvedDate}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePreviewPDF(pi)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Preview PDF"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(pi)}
                        className="text-green-600 hover:text-green-900"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
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

      {/* PDF Preview Modal */}
      {showPDFPreview && selectedPI && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowPDFPreview(false)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Proforma Invoice Preview - {selectedPI.piNo}</h3>
                  <button
                    onClick={() => setShowPDFPreview(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="bg-white px-6 py-8">
                {/* PDF Preview Content */}
                <div className="border border-gray-300 rounded-lg p-8 bg-white">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">PROFORMA INVOICE</h1>
                    <p className="text-gray-600 mt-2">No: {selectedPI.piNo}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">From:</h3>
                      <p className="text-gray-700">
                        Your Company Name<br />
                        123 Business Street<br />
                        City, State 12345<br />
                        Phone: (555) 123-4567
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">To:</h3>
                      <p className="text-gray-700">
                        {selectedPI.customerName}<br />
                        Customer Address<br />
                        City, Country<br />
                        Date: {selectedPI.piDate}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <table className="w-full border border-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 border text-left">Product Code</th>
                          <th className="px-4 py-2 border text-left">Description</th>
                          <th className="px-4 py-2 border text-right">Quantity</th>
                          <th className="px-4 py-2 border text-right">Unit Price</th>
                          <th className="px-4 py-2 border text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPI.products.map((product, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-2 border">{product.code}</td>
                            <td className="px-4 py-2 border">{product.description}</td>
                            <td className="px-4 py-2 border text-right">{product.quantity}</td>
                            <td className="px-4 py-2 border text-right">${product.unitPrice}</td>
                            <td className="px-4 py-2 border text-right">${product.quantity * product.unitPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan="4" className="px-4 py-2 border text-right font-semibold">Total Amount:</td>
                          <td className="px-4 py-2 border text-right font-semibold">{selectedPI.totalAmount}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>This proforma invoice is valid for 30 days from the date of issue.</p>
                    <p>Payment terms: As per sales agreement</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button
                  onClick={() => handleDownloadPDF(selectedPI)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
                <button
                  onClick={() => setShowPDFPreview(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProformaInvoice;