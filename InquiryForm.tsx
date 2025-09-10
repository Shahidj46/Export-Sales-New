import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface Product {
  productCode: string;
  productName: string;
  quantity: string;
  unit: string;
  specifications: string;
}

interface InquiryFormProps {
  inquiry?: any;
  onClose: () => void;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ inquiry, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: inquiry?.customerName || '',
    customerCode: inquiry?.customerCode || '',
    contactPerson: inquiry?.contactPerson || '',
    contactEmail: inquiry?.contactEmail || '',
    contactPhone: inquiry?.contactPhone || '',
    orderReference: inquiry?.orderReference || '',
    expectedDelivery: inquiry?.expectedDelivery || '',
    remarks: inquiry?.remarks || '',
    status: inquiry?.status || 'New'
  });

  const [products, setProducts] = useState<Product[]>(inquiry?.products || [
    { productCode: '', productName: '', quantity: '', unit: '', specifications: '' }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index: number, field: string, value: string) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([...products, { productCode: '', productName: '', quantity: '', unit: '', specifications: '' }]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting inquiry:', { ...formData, products });
    onClose();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {inquiry ? 'Edit Customer Inquiry' : 'New Customer Inquiry'}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Code *</label>
              <input
                type="text"
                name="customerCode"
                value={formData.customerCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order Reference No</label>
              <input
                type="text"
                name="orderReference"
                value={formData.orderReference}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
            <button
              type="button"
              onClick={addProduct}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center text-sm transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Product
            </button>
          </div>
          
          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-700">Product {index + 1}</h4>
                  {products.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Code</label>
                    <input
                      type="text"
                      value={product.productCode}
                      onChange={(e) => handleProductChange(index, 'productCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      value={product.productName}
                      onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="text"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select
                      value={product.unit}
                      onChange={(e) => handleProductChange(index, 'unit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Unit</option>
                      <option value="pcs">Pieces</option>
                      <option value="kg">Kilograms</option>
                      <option value="lbs">Pounds</option>
                      <option value="tons">Tons</option>
                      <option value="boxes">Boxes</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
                    <input
                      type="text"
                      value={product.specifications}
                      onChange={(e) => handleProductChange(index, 'specifications', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter product specifications..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Delivery Date</label>
              <input
                type="date"
                name="expectedDelivery"
                value={formData.expectedDelivery}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="New">New</option>
                <option value="In Review">In Review</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter any additional remarks or notes..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {inquiry ? 'Update Inquiry' : 'Create Inquiry'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;