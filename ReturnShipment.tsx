import React, { useState } from 'react';
import { Plus, Search, Filter, Package, MapPin, Truck } from 'lucide-react';

const ReturnShipment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const returnShipments = [
    {
      returnShipmentId: 'RS-2024-001',
      returnRequestId: 'RR-2024-001',
      customerName: 'ABC Trading Corp',
      returnDate: '2024-02-12',
      transportMode: 'Ocean Freight',
      transporterName: 'Return Logistics Co.',
      blAwbNo: 'RBL123456789',
      containerNo: 'RCONT123456',
      trackingNo: 'RTRK789012345',
      returnStatus: 'Received',
      progress: 100
    },
    {
      returnShipmentId: 'RS-2024-002',
      returnRequestId: 'RR-2024-002',
      customerName: 'Global Exports Ltd',
      returnDate: '2024-02-09',
      transportMode: 'Air Freight',
      transporterName: 'Sky Return Logistics',
      blAwbNo: 'RAWB987654321',
      containerNo: '',
      trackingNo: 'RTRK345678901',
      returnStatus: 'In Transit',
      progress: 65
    },
    {
      returnShipmentId: 'RS-2024-003',
      returnRequestId: 'RR-2024-003',
      customerName: 'International Traders',
      returnDate: '2024-02-07',
      transportMode: 'Road Transport',
      transporterName: 'Express Return Trucking',
      blAwbNo: '',
      containerNo: '',
      trackingNo: 'RTRK567890123',
      returnStatus: 'Dispatched',
      progress: 25
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Received': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Dispatched': return 'bg-yellow-100 text-yellow-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const filteredShipments = returnShipments.filter(shipment => {
    const matchesSearch = shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.returnShipmentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || shipment.returnStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Return Shipment</h1>
          <p className="text-gray-600 mt-2">Track return shipments and logistics</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          New Return Shipment
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
                placeholder="Search by customer name or shipment ID..."
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
              <option value="Dispatched">Dispatched</option>
              <option value="In Transit">In Transit</option>
              <option value="Received">Received</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Return Shipment Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredShipments.map((shipment, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{shipment.returnShipmentId}</h3>
                <p className="text-sm text-gray-500">Request: {shipment.returnRequestId}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(shipment.returnStatus)}`}>
                {shipment.returnStatus}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Customer</p>
              <p className="text-sm text-gray-900">{shipment.customerName}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Return Progress</span>
                <span className="text-sm text-gray-600">{shipment.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(shipment.progress)}`}
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Dispatched</span>
                <span>In Transit</span>
                <span>Received</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Return Date</p>
                <p className="text-sm text-gray-900">{shipment.returnDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center">
                  <Truck className="w-3 h-3 mr-1" />
                  Transport Mode
                </p>
                <p className="text-sm text-gray-900">{shipment.transportMode}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Transporter</p>
              <p className="text-sm text-gray-900">{shipment.transporterName}</p>
            </div>

            {shipment.trackingNo && (
              <div className="mb-4 bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-500 mb-1">Tracking Information</p>
                <p className="text-sm text-gray-900 font-mono">
                  {shipment.trackingNo}
                </p>
                {shipment.blAwbNo && (
                  <p className="text-xs text-gray-600 mt-1">
                    BL/AWB: {shipment.blAwbNo}
                  </p>
                )}
                {shipment.containerNo && (
                  <p className="text-xs text-gray-600">
                    Container: {shipment.containerNo}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button className="text-blue-600 hover:text-blue-900 p-2" title="Track Shipment">
                <MapPin className="w-4 h-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-900 p-2" title="View Details">
                <Package className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReturnShipment;