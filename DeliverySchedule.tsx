import React, { useState } from 'react';
import { Plus, Search, Filter, Truck, MapPin, Calendar, Package } from 'lucide-react';

const DeliverySchedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const deliveries = [
    {
      scheduleId: 'DS-2024-001',
      deliveryId: 'DL-2024-001',
      salesOrderId: 'SO-2024-001',
      deliveryNo: 'DEL001/2024',
      customerName: 'ABC Trading Corp',
      plannedDeliveryDate: '2024-02-15',
      actualDeliveryDate: '2024-02-14',
      quantityToDeliver: 100,
      deliveredQuantity: 100,
      transportMode: 'Ocean Freight',
      transporterName: 'Global Shipping Co.',
      blAwbNo: 'BL123456789',
      containerNo: 'CONT123456',
      trackingNo: 'TRK789012345',
      deliveryStatus: 'Delivered',
      progress: 100
    },
    {
      scheduleId: 'DS-2024-002',
      deliveryId: 'DL-2024-002',
      salesOrderId: 'SO-2024-002',
      deliveryNo: 'DEL002/2024',
      customerName: 'Global Exports Ltd',
      plannedDeliveryDate: '2024-02-20',
      actualDeliveryDate: '',
      quantityToDeliver: 75,
      deliveredQuantity: 0,
      transportMode: 'Air Freight',
      transporterName: 'Sky Logistics',
      blAwbNo: 'AWB987654321',
      containerNo: '',
      trackingNo: 'TRK345678901',
      deliveryStatus: 'In Transit',
      progress: 65
    },
    {
      scheduleId: 'DS-2024-003',
      deliveryId: 'DL-2024-003',
      salesOrderId: 'SO-2024-003',
      deliveryNo: 'DEL003/2024',
      customerName: 'International Traders',
      plannedDeliveryDate: '2024-02-25',
      actualDeliveryDate: '',
      quantityToDeliver: 150,
      deliveredQuantity: 0,
      transportMode: 'Road Transport',
      transporterName: 'Express Trucking',
      blAwbNo: '',
      containerNo: '',
      trackingNo: 'TRK567890123',
      deliveryStatus: 'Scheduled',
      progress: 25
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
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

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.deliveryNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || delivery.deliveryStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Delivery Schedule & Tracking</h1>
          <p className="text-gray-600 mt-2">Manage delivery schedules and track shipments</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Schedule Delivery
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
                placeholder="Search by customer name or delivery number..."
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
              <option value="Scheduled">Scheduled</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Delivery Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDeliveries.map((delivery, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{delivery.deliveryNo}</h3>
                <p className="text-sm text-gray-500">SO: {delivery.salesOrderId}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delivery.deliveryStatus)}`}>
                {delivery.deliveryStatus}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Customer</p>
              <p className="text-sm text-gray-900">{delivery.customerName}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Delivery Progress</span>
                <span className="text-sm text-gray-600">{delivery.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(delivery.progress)}`}
                  style={{ width: `${delivery.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Scheduled</span>
                <span>In Transit</span>
                <span>Delivered</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Planned Date
                </p>
                <p className="text-sm text-gray-900">{delivery.plannedDeliveryDate}</p>
              </div>
              {delivery.actualDeliveryDate && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Actual Date</p>
                  <p className="text-sm text-gray-900">{delivery.actualDeliveryDate}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center">
                  <Package className="w-3 h-3 mr-1" />
                  Quantity
                </p>
                <p className="text-sm text-gray-900">
                  {delivery.deliveredQuantity}/{delivery.quantityToDeliver}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center">
                  <Truck className="w-3 h-3 mr-1" />
                  Transport
                </p>
                <p className="text-sm text-gray-900">{delivery.transportMode}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Transporter</p>
              <p className="text-sm text-gray-900">{delivery.transporterName}</p>
            </div>

            {delivery.trackingNo && (
              <div className="mb-4 bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-500 mb-1">Tracking Information</p>
                <p className="text-sm text-gray-900 font-mono">
                  {delivery.trackingNo}
                </p>
                {delivery.blAwbNo && (
                  <p className="text-xs text-gray-600 mt-1">
                    BL/AWB: {delivery.blAwbNo}
                  </p>
                )}
                {delivery.containerNo && (
                  <p className="text-xs text-gray-600">
                    Container: {delivery.containerNo}
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

export default DeliverySchedule;