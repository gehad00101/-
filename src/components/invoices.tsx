
'use client';

import React, { useState, useMemo } from 'react';
import { Plus, Eye, Edit, Printer, Mail, Save, XCircle, Trash, Download, Filter } from 'lucide-react';

const customersSuppliers = [
  { id: 'C001', name: 'شركة البن الفاخر', type: 'customer' },
  { id: 'C002', name: 'مقهى السعادة', type: 'customer' },
  { id: 'S001', name: 'المورد الرئيسي للبن', type: 'supplier' },
  { id: 'S002', name: 'شركة الأكواب المحدودة', type: 'supplier' },
  { id: 'P001', name: 'عميل نقدي', type: 'customer' }, // For cash sales
];

const productsServices = [
  { id: 'P101', name: 'بن محمّص وسط', unit: 'كجم', defaultPrice: 45, type: 'product' },
  { id: 'P102', name: 'بن محمّص غامق', unit: 'كجم', defaultPrice: 50, type: 'product' },
  { id: 'P103', name: 'حليب كامل الدسم', unit: 'لتر', defaultPrice: 6, type: 'product' },
  { id: 'P104', name: 'أكواب ورقية 8 أونصة', unit: 'كرتون', defaultPrice: 1.5, type: 'product' },
  { id: 'S201', name: 'خدمة استشارية', unit: 'ساعة', defaultPrice: 150, type: 'service' },
  { id: 'S202', name: 'تصميم شعار', unit: 'مرة واحدة', defaultPrice: 500, type: 'service' },
];

const paymentMethods = [
  { value: 'cash', label: 'نقدًا' },
  { value: 'transfer', label: 'تحويل بنكي' },
  { value: 'credit', label: 'آجل' },
  { value: 'card', label: 'بطاقة ائتمان' },
];

const invoiceStatuses = [
    { value: 'paid', label: 'مدفوعة', color: 'bg-green-100 text-green-800' },
    { value: 'unpaid', label: 'غير مدفوعة', color: 'bg-red-100 text-red-800' },
    { value: 'partially_paid', label: 'مدفوعة جزئيًا', color: 'bg-yellow-100 text-yellow-800' },
];

const TAX_RATE = 0.05; // 5% VAT

const InvoiceListView = ({ invoices, onAddInvoice, onEditInvoice, onViewInvoice }) => {
  const [filterDate, setFilterDate] = useState('');
  const [filterCustomerSupplier, setFilterCustomerSupplier] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterInvoiceType, setFilterInvoiceType] = useState('');

  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesDate = filterDate ? invoice.date === filterDate : true;
      const matchesCustomerSupplier = filterCustomerSupplier ?
        invoice.customerSupplierName.includes(filterCustomerSupplier) : true;
      const matchesStatus = filterStatus ? invoice.status === filterStatus : true;
      const matchesInvoiceType = filterInvoiceType ? invoice.type === filterInvoiceType : true;

      return matchesDate && matchesCustomerSupplier && matchesStatus && matchesInvoiceType;
    });
  }, [invoices, filterDate, filterCustomerSupplier, filterStatus, filterInvoiceType]);

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">قائمة الفواتير</h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse">
          <button
            onClick={() => onAddInvoice('sales')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-colors duration-200 text-lg"
          >
            <Plus size={24} className="ml-2" />
            فاتورة بيع جديدة
          </button>
          <button
            onClick={() => onAddInvoice('purchase')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-colors duration-200 text-lg"
          >
            <Plus size={24} className="ml-2" />
            فاتورة شراء جديدة
          </button>
        </div>
      </div>

      <div className="p-6 rounded-xl mb-6 border border-gray-200 bg-gray-50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><Filter size={20} className="ml-2" /> أدوات الفلترة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="filterDate" className="block text-sm font-medium text-gray-700">التاريخ</label>
            <input
              type="date"
              id="filterDate"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="filterCustomerSupplier" className="block text-sm font-medium text-gray-700">العميل/المورد</label>
            <input
              type="text"
              id="filterCustomerSupplier"
              value={filterCustomerSupplier}
              onChange={(e) => setFilterCustomerSupplier(e.target.value)}
              placeholder="اسم العميل أو المورد"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              dir="rtl"
            />
          </div>
          <div>
            <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700">الحالة</label>
            <select
              id="filterStatus"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            >
              <option value="">الكل</option>
              {invoiceStatuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filterInvoiceType" className="block text-sm font-medium text-gray-700">نوع الفاتورة</label>
            <select
              id="filterInvoiceType"
              value={filterInvoiceType}
              onChange={(e) => setFilterInvoiceType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            >
              <option value="">الكل</option>
              <option value="sales">بيع</option>
              <option value="purchase">شراء</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl shadow-md mb-6 overflow-x-auto border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 جدول الفواتير</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العميل/المورد</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجمالي</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map(invoice => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.customerSupplierName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    invoice.type === 'sales' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {invoice.type === 'sales' ? 'بيع' : 'شراء'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.finalTotal.toFixed(2)} ر.س</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    invoiceStatuses.find(s => s.value === invoice.status)?.color || 'bg-gray-100 text-gray-800'
                  }`}>
                    {invoiceStatuses.find(s => s.value === invoice.status)?.label || invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button title="عرض" onClick={() => onViewInvoice(invoice)} className="text-blue-600 hover:text-blue-900 ml-2">
                    <Eye size={18} />
                  </button>
                  <button title="تعديل" onClick={() => onEditInvoice(invoice)} className="text-indigo-600 hover:text-indigo-900 ml-2">
                    <Edit size={18} />
                  </button>
                  <button title="طباعة" onClick={() => alert('ميزة الطباعة قيد التطوير!')} className="text-gray-600 hover:text-gray-900 ml-2">
                    <Printer size={18} />
                  </button>
                  <button title="إرسال بالبريد" onClick={() => alert('ميزة الإرسال بالبريد قيد التطوير!')} className="text-green-600 hover:text-green-900">
                    <Mail size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-3 space-x-reverse">
        <button
          onClick={() => alert('ميزة تصدير PDF قيد التطوير!')}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md shadow-sm flex items-center transition-colors duration-200"
        >
          <Download size={20} className="ml-2" />
          تصدير PDF
        </button>
        <button
          onClick={() => alert('ميزة تصدير Excel قيد التطوير!')}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md shadow-sm flex items-center transition-colors duration-200"
        >
          <Download size={20} className="ml-2" />
          تصدير Excel
        </button>
      </div>
    </div>
  );
};

const CreateEditInvoiceForm = ({ initialInvoice, onSave, onCancel, allInvoices, onGenerateJournalEntry }) => {
  const [invoice, setInvoice] = useState(() => initialInvoice || {
    id: '',
    date: new Date().toISOString().split('T')[0],
    customerSupplierName: '',
    customerSupplierId: '',
    type: 'sales',
    paymentMethod: 'cash',
    items: [{ name: '', quantity: 1, unitPrice: 0, total: 0 }],
    discount: 0,
    subtotal: 0,
    taxAmount: 0,
    finalTotal: 0,
    status: 'unpaid',
  });

  React.useEffect(() => {
    const calculatedSubtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const calculatedDiscountedSubtotal = calculatedSubtotal - (invoice.discount || 0);
    const calculatedTaxAmount = calculatedDiscountedSubtotal * TAX_RATE;
    const calculatedFinalTotal = calculatedDiscountedSubtotal + calculatedTaxAmount;

    setInvoice(prev => ({
      ...prev,
      subtotal: calculatedSubtotal,
      taxAmount: calculatedTaxAmount,
      finalTotal: calculatedFinalTotal,
    }));
  }, [invoice.items, invoice.discount]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = invoice.items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };
        updatedItem.total = (updatedItem.quantity || 0) * (updatedItem.unitPrice || 0);
        return updatedItem;
      }
      return item;
    });
    setInvoice(prev => ({ ...prev, items: updatedItems }));
  };

  const handleAddItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, unitPrice: 0, total: 0 }],
    }));
  };

  const handleRemoveItem = (index) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSaveInvoice = () => {
    if (!invoice.customerSupplierName || !invoice.date || invoice.items.length === 0 || invoice.finalTotal <= 0) {
      alert('الرجاء ملء جميع الحقول المطلوبة وإضافة منتجات صحيحة.');
      return;
    }

    const invoiceToSave = { ...invoice };
    if (!invoiceToSave.id) {
      const newId = `INV-${(allInvoices.length + 1).toString().padStart(4, '0')}`;
      invoiceToSave.id = newId;
    }
    
    onSave(invoiceToSave);
    onCancel();
  };


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialInvoice.id ? `تعديل فاتورة ${initialInvoice.type === 'sales' ? 'بيع' : 'شراء'} رقم ${initialInvoice.id}` : `إنشاء فاتورة ${invoice.type === 'sales' ? 'بيع' : 'شراء'} جديدة`}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700">رقم الفاتورة:</label>
            <input type="text" value={invoice.id || 'يُولد تلقائيًا'} readOnly className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2.5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">التاريخ:</label>
            <input type="date" value={invoice.date} onChange={(e) => setInvoice(prev => ({ ...prev, date: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">العميل/المورد:</label>
            <select
              value={invoice.customerSupplierId}
              onChange={(e) => {
                const selected = customersSuppliers.find(cs => cs.id === e.target.value);
                setInvoice(prev => ({
                  ...prev,
                  customerSupplierId: e.target.value,
                  customerSupplierName: selected ? selected.name : '',
                }));
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5"
            >
              <option value="">اختر عميل/مورد</option>
              {customersSuppliers.filter(cs => initialInvoice ? true : (invoice.type === 'sales' ? cs.type === 'customer' : cs.type === 'supplier')).map(cs => (
                <option key={cs.id} value={cs.id}>{cs.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">نوع الفاتورة:</label>
            <div className="mt-1 flex items-center space-x-4 space-x-reverse">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="invoiceType"
                  value="sales"
                  checked={invoice.type === 'sales'}
                  onChange={(e) => setInvoice(prev => ({ ...prev, type: e.target.value }))}
                  disabled={!!initialInvoice.id}
                />
                <span className="mr-2 text-gray-700">بيع</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-purple-600"
                  name="invoiceType"
                  value="purchase"
                  checked={invoice.type === 'purchase'}
                  onChange={(e) => setInvoice(prev => ({ ...prev, type: e.target.value }))}
                  disabled={!!initialInvoice.id}
                />
                <span className="mr-2 text-gray-700">شراء</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">طريقة الدفع:</label>
            <select
              value={invoice.paymentMethod}
              onChange={(e) => setInvoice(prev => ({ ...prev, paymentMethod: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5"
            >
              {paymentMethods.map(method => (
                <option key={method.value} value={method.value}>{method.label}</option>
              ))}
            </select>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-4">جدول المنتجات / الخدمات</h3>
        <div className="space-y-4 mb-6">
          {invoice.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">الصنف:</label>
                <select
                  value={item.name}
                  onChange={(e) => {
                    const selectedProduct = productsServices.find(p => p.name === e.target.value);
                    handleItemChange(index, 'name', e.target.value);
                    if (selectedProduct) {
                      handleItemChange(index, 'unitPrice', selectedProduct.defaultPrice);
                    }
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5"
                >
                  <option value="">اختر صنف</option>
                  {productsServices.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">الكمية:</label>
                <input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5" min="1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">السعر للوحدة:</label>
                <input type="number" value={item.unitPrice} onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5" step="0.01" min="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">الإجمالي:</label>
                <input type="text" value={item.total.toFixed(2)} readOnly className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2.5" />
              </div>
              <div className="flex items-center justify-end">
                <button onClick={() => handleRemoveItem(index)} className="text-red-600 hover:text-red-800">
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleAddItem} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-sm flex items-center transition-colors duration-200 mb-6">
          <Plus size={20} className="ml-2" />
          إضافة صنف/خدمة
        </button>

        <div className="bg-gray-100 p-6 rounded-lg mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">المجموع الفرعي:</label>
              <input type="text" value={invoice.subtotal.toFixed(2)} readOnly className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2.5 text-lg font-bold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الخصم:</label>
              <input type="number" value={invoice.discount} onChange={(e) => setInvoice(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2.5" step="0.01" min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الضريبة ({TAX_RATE * 100}%):</label>
              <input type="text" value={invoice.taxAmount.toFixed(2)} readOnly className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2.5 text-lg font-bold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الإجمالي النهائي:</label>
              <input type="text" value={invoice.finalTotal.toFixed(2)} readOnly className="mt-1 block w-full rounded-md bg-blue-100 border-blue-300 shadow-sm p-2.5 text-lg font-bold text-blue-800" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-3 md:space-x-reverse">
          <button
            onClick={handleSaveInvoice}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-colors duration-200 text-lg"
          >
            <Save size={24} className="ml-2" />
            حفظ الفاتورة
          </button>
          <button
            onClick={() => alert('ميزة الطباعة قيد التطوير!')}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-colors duration-200 text-lg"
          >
            <Printer size={24} className="ml-2" />
            طباعة
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-colors duration-200 text-lg"
          >
            <XCircle size={24} className="ml-2" />
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};


const ViewInvoiceDetailsModal = ({ invoice, onClose }) => {
    if (!invoice) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">تفاصيل الفاتورة #{invoice.id}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <XCircle size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div>
                        <p className="text-sm font-medium text-gray-700">رقم الفاتورة:</p>
                        <p className="text-lg font-bold text-gray-900">{invoice.id}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">التاريخ:</p>
                        <p className="text-lg font-bold text-gray-900">{invoice.date}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">العميل/المورد:</p>
                        <p className="text-lg font-bold text-gray-900">{invoice.customerSupplierName}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">نوع الفاتورة:</p>
                        <p className="text-lg font-bold text-gray-900">{invoice.type === 'sales' ? 'بيع' : 'شراء'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">طريقة الدفع:</p>
                        <p className="text-lg font-bold text-gray-900">
                            {paymentMethods.find(m => m.value === invoice.paymentMethod)?.label || invoice.paymentMethod}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">الحالة:</p>
                        <p className="text-lg font-bold text-gray-900">
                            <span className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                                invoiceStatuses.find(s => s.value === invoice.status)?.color || 'bg-gray-100 text-gray-800'
                            }`}>
                                {invoiceStatuses.find(s => s.value === invoice.status)?.label || invoice.status}
                            </span>
                        </p>
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-4">المنتجات / الخدمات</h3>
                <table className="min-w-full divide-y divide-gray-200 mb-6">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الصنف</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكمية</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">السعر للوحدة</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجمالي</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {invoice.items.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unitPrice.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.total.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-700">المجموع الفرعي:</p>
                            <p className="text-lg font-bold text-gray-900">{invoice.subtotal.toFixed(2)} ر.س</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">الخصم:</p>
                            <p className="text-lg font-bold text-gray-900">{invoice.discount.toFixed(2)} ر.س</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">الضريبة ({TAX_RATE * 100}%):</p>
                            <p className="text-lg font-bold text-gray-900">{invoice.taxAmount.toFixed(2)} ر.س</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">الإجمالي النهائي:</p>
                            <p className="text-2xl font-bold text-blue-800">{invoice.finalTotal.toFixed(2)} ر.س</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm flex items-center transition-colors duration-200"
                    >
                        <XCircle size={20} className="ml-2" />
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
};

export const Invoices = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-0001', date: '2025-07-14', customerSupplierName: 'شركة البن الفاخر', customerSupplierId: 'C001', type: 'sales', paymentMethod: 'transfer',
      items: [{ name: 'بن محمّص وسط', quantity: 10, unitPrice: 45, total: 450 }, { name: 'أكواب ورقية 8 أونصة', quantity: 20, unitPrice: 1.5, total: 30 }],
      discount: 0, subtotal: 480, taxAmount: 24, finalTotal: 504, status: 'paid',
    },
    {
      id: 'INV-0002', date: '2025-07-12', customerSupplierName: 'المورد الرئيسي للبن', customerSupplierId: 'S001', type: 'purchase', paymentMethod: 'credit',
      items: [{ name: 'بن محمّص غامق', quantity: 50, unitPrice: 30, total: 1500 }],
      discount: 0, subtotal: 1500, taxAmount: 75, finalTotal: 1575, status: 'unpaid',
    },
    {
      id: 'INV-0003', date: '2025-07-10', customerSupplierName: 'مقهى السعادة', customerSupplierId: 'C002', type: 'sales', paymentMethod: 'cash',
      items: [{ name: 'حليب كامل الدسم', quantity: 100, unitPrice: 6, total: 600 }],
      discount: 10, subtotal: 600, taxAmount: 29.5, finalTotal: 619.5, status: 'partially_paid',
    },
  ]);
  const [showCreateEditInvoiceModal, setShowCreateEditInvoiceModal] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState(null);
  const [invoiceToView, setInvoiceToView] = useState(null);

  const handleAddInvoice = (type) => {
    setInvoiceToEdit({
      id: '',
      date: new Date().toISOString().split('T')[0],
      customerSupplierName: '',
      customerSupplierId: '',
      type: type,
      paymentMethod: 'cash',
      items: [{ name: '', quantity: 1, unitPrice: 0, total: 0 }],
      discount: 0,
      subtotal: 0,
      taxAmount: 0,
      finalTotal: 0,
      status: 'unpaid',
    });
    setShowCreateEditInvoiceModal(true);
  };

  const handleEditInvoice = (invoice) => {
    setInvoiceToEdit(invoice);
    setShowCreateEditInvoiceModal(true);
  };

  const handleViewInvoice = (invoice) => {
    setInvoiceToView(invoice);
  };

  const handleSaveInvoice = (savedInvoice) => {
    if (savedInvoice.id && invoices.some(inv => inv.id === savedInvoice.id)) {
      setInvoices(prev => prev.map(inv => inv.id === savedInvoice.id ? savedInvoice : inv));
    } else {
      setInvoices(prev => [...prev, savedInvoice]);
    }
    setShowCreateEditInvoiceModal(false);
    setInvoiceToEdit(null);
  };

  const handleGenerateJournalEntry = (journalEntry) => {
    console.log("Generated Journal Entry:", journalEntry);
    alert(`تم توليد قيد محاسبي تلقائي: ${journalEntry.description}`);
  };

  return (
    <div className="p-4 md:p-6">
      <InvoiceListView
        invoices={invoices}
        onAddInvoice={handleAddInvoice}
        onEditInvoice={handleEditInvoice}
        onViewInvoice={handleViewInvoice}
      />

      {showCreateEditInvoiceModal && (
        <CreateEditInvoiceForm
          initialInvoice={invoiceToEdit}
          onSave={handleSaveInvoice}
          onCancel={() => setShowCreateEditInvoiceModal(false)}
          allInvoices={invoices}
          onGenerateJournalEntry={handleGenerateJournalEntry}
        />
      )}

      <ViewInvoiceDetailsModal
        invoice={invoiceToView}
        onClose={() => setInvoiceToView(null)}
      />
    </div>
  );
};

    