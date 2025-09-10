import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingCart, 
  Receipt, 
  CreditCard, 
  Truck, 
  FileCheck, 
  DollarSign, 
  RotateCcw,
  Package
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import CustomerInquiry from './components/CustomerInquiry';
import SalesOrder from './components/SalesOrder';
import ProformaInvoice from './components/ProformaInvoice';
import LCOpen from './components/LCOpen';
import DeliverySchedule from './components/DeliverySchedule';
import CommercialInvoice from './components/CommercialInvoice';
import SalesCollection from './components/SalesCollection';
import CustomerReturn from './components/CustomerReturn';
import ReturnShipment from './components/ReturnShipment';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: Dashboard },
  { id: 'inquiry', label: 'Customer Inquiry', icon: FileText, component: CustomerInquiry },
  { id: 'sales-order', label: 'Sales Order', icon: ShoppingCart, component: SalesOrder },
  { id: 'proforma', label: 'Proforma Invoice', icon: Receipt, component: ProformaInvoice },
  { id: 'lc-open', label: 'LC Open', icon: CreditCard, component: LCOpen },
  { id: 'delivery', label: 'Delivery Schedule', icon: Truck, component: DeliverySchedule },
  { id: 'commercial', label: 'Commercial Invoice', icon: FileCheck, component: CommercialInvoice },
  { id: 'collection', label: 'Sales Collection', icon: DollarSign, component: SalesCollection },
  { id: 'return-request', label: 'Return Request', icon: RotateCcw, component: CustomerReturn },
  { id: 'return-shipment', label: 'Return Shipment', icon: Package, component: ReturnShipment },
];

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');

  const ActiveComponent = menuItems.find(item => item.id === activeScreen)?.component || Dashboard;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Export Sales ERP</h1>
          <p className="text-sm text-gray-600 mt-1">Sales Management System</p>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
                  activeScreen === item.id 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <ActiveComponent />
      </div>
    </div>
  );
}

export default App;