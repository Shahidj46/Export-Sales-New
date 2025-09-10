import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Eye, CreditCard, DollarSign } from 'lucide-react';

const LCOpen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const letterOfCredits = [
    {
      lcId: 'LC-2024-001',
      piId: 'PI-2024-001',
      lcNo: 'LC001/2024/ABC',
      lcIssuingBank: 'Chase Bank',
      lcDate: '2024-01-20',
      lcExpiryDate: '2024-04-20',
      lcAmount: '$45,000',
      currency: 'USD',
      beneficiaryName: 'Your Company Name',
      lcStatus: 'Active',
      remarks: 'Standard LC terms',
      charges: [
        { chargeId: 'CH001', chargeType: 'Opening Commission', amount: 450, currency: 'USD', dateCharged: '2024-01-20' },
        { chargeId: 'CH002', chargeType: 'Swift Charges', amount: 50, currency: 'USD', dateCharged: '2024-01-20' }
      ]
    },
    {
      lcId: 'LC-2024-002',
      piId: 'PI-2024-002',
      lcNo: 'LC002/2024/GEL',
      lcIssuingBank: 'Bank of America',
      lcDate: '2024-01-18',
      lcExpiryDate: '2024-03-18',
      lcAmount: '$32,500',
      currency: 'USD',
      beneficiaryName: 'Your Company Name',
      lcStatus: 'Pending',
      remarks: 'Awaiting documentation',
      charges: [
        { chargeId: 'CH003', chargeType: 'Opening Commission', amount: 325, currency: 'USD', dateCharged: '2024-01-18' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Utilized': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLCs = letterOfCredits.filter(lc => {
    const matchesSearch = lc.lcNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lc.lcIssuingBank.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lc.lcStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Letter of Credit</h1>
          <p className="text-gray-600 mt-2">Manage LC operations and charges</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Open New LC
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
                placeholder="Search by LC number or bank..."
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
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
              <option value="Utilized">Utilized</option>
            </select>
          </div>
        </div>
      </div>

      {/* Letter of Credit Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLCs.map((lc, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{lc.lcNo}</h3>
                <p className="text-sm text-gray-500">LC ID: {lc.lcId}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lc.lcStatus)}`}>
                {lc.lcStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Issuing Bank</p>
                <p className="text-sm text-gray-900">{lc.lcIssuingBank}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Amount</p>
                <p className="text-sm font-bold text-gray-900">{lc.lcAmount} {lc.currency}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">LC Date</p>
                <p className="text-sm text-gray-900">{lc.lcDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                <p className="text-sm text-gray-900">{lc.lcExpiryDate}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Beneficiary</p>
              <p className="text-sm text-gray-900">{lc.beneficiaryName}</p>
            </div>

            {lc.charges.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  LC Charges
                </h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  {lc.charges.map((charge, chargeIndex) => (
                    <div key={chargeIndex} className="flex justify-between items-center py-1">
                      <span className="text-sm text-gray-600">{charge.chargeType}</span>
                      <span className="text-sm font-medium text-gray-900">
                        ${charge.amount} {charge.currency}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Total Charges</span>
                      <span className="text-sm font-bold text-gray-900">
                        ${lc.charges.reduce((sum, charge) => sum + charge.amount, 0)} USD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {lc.remarks && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">Remarks</p>
                <p className="text-sm text-gray-700">{lc.remarks}</p>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button className="text-blue-600 hover:text-blue-900 p-2">
                <Edit className="w-4 h-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-900 p-2">
                <Eye className="w-4 h-4" />
              </button>
              <button className="text-green-600 hover:text-green-900 p-2">
                <CreditCard className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LCOpen;