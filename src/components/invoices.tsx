"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Eye, Edit, Printer, Mail, Filter, Save, XCircle, Trash, Download } from 'lucide-react';
import { customersSuppliers, productsServices, paymentMethods, invoiceStatuses, TAX_RATE, chartOfAccounts } from '@/lib/data';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from './ui/dialog';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import type { Invoice, InvoiceItem, JournalEntry } from '@/types';


const InvoiceListView = ({ invoices, onAddInvoice, onEditInvoice, onViewInvoice }) => {
    const [filterDate, setFilterDate] = useState('');
    const [filterCustomerSupplier, setFilterCustomerSupplier] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterInvoiceType, setFilterInvoiceType] = useState('');
  
    const filteredInvoices = useMemo(() => {
      return invoices.filter(invoice => {
        const matchesDate = filterDate ? invoice.date === filterDate : true;
        const matchesCustomerSupplier = filterCustomerSupplier ? invoice.customerSupplierName.includes(filterCustomerSupplier) : true;
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
            <Button onClick={() => onAddInvoice('sales')} className="bg-blue-600 hover:bg-blue-700 text-lg py-3 px-6 rounded-full"><Plus size={24} className="ml-2" />فاتورة بيع جديدة</Button>
            <Button onClick={() => onAddInvoice('purchase')} className="bg-green-600 hover:bg-green-700 text-lg py-3 px-6 rounded-full"><Plus size={24} className="ml-2" />فاتورة شراء جديدة</Button>
          </div>
        </div>
  
        <div className="p-6 rounded-xl mb-6 border border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><Filter size={20} className="ml-2" /> أدوات الفلترة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div><Label htmlFor="filterDate">التاريخ</Label><Input type="date" id="filterDate" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} /></div>
            <div><Label htmlFor="filterCustomerSupplier">العميل/المورد</Label><Input type="text" id="filterCustomerSupplier" value={filterCustomerSupplier} onChange={(e) => setFilterCustomerSupplier(e.target.value)} placeholder="اسم العميل أو المورد" dir="rtl" /></div>
            <div><Label htmlFor="filterStatus">الحالة</Label><Select onValueChange={setFilterStatus} value={filterStatus}><SelectTrigger><SelectValue placeholder="الكل" /></SelectTrigger><SelectContent><SelectItem value="">الكل</SelectItem>{invoiceStatuses.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent></Select></div>
            <div><Label htmlFor="filterInvoiceType">نوع الفاتورة</Label><Select onValueChange={setFilterInvoiceType} value={filterInvoiceType}><SelectTrigger><SelectValue placeholder="الكل" /></SelectTrigger><SelectContent><SelectItem value="">الكل</SelectItem><SelectItem value="sales">بيع</SelectItem><SelectItem value="purchase">شراء</SelectItem></SelectContent></Select></div>
          </div>
        </div>
  
        <div className="p-6 rounded-xl shadow-md mb-6 overflow-x-auto border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 جدول الفواتير</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العميل/المورد</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النوع</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجمالي</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th></tr></thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map(invoice => (<tr key={invoice.id}><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.customerSupplierName}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoice.type === 'sales' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{invoice.type === 'sales' ? 'بيع' : 'شراء'}</span></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.finalTotal.toFixed(2)} ر.س</td><td className="px-6 py-4 whitespace-nowrap text-sm"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoiceStatuses.find(s => s.value === invoice.status)?.color || 'bg-gray-100 text-gray-800'}`}>{invoiceStatuses.find(s => s.value === invoice.status)?.label || invoice.status}</span></td><td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><Button variant="ghost" size="icon" title="عرض" onClick={() => onViewInvoice(invoice)}><Eye size={18} className="text-blue-600" /></Button><Button variant="ghost" size="icon" title="تعديل" onClick={() => onEditInvoice(invoice)}><Edit size={18} className="text-indigo-600" /></Button><Button variant="ghost" size="icon" title="طباعة" onClick={() => alert('ميزة الطباعة قيد التطوير!')}><Printer size={18} className="text-gray-600" /></Button><Button variant="ghost" size="icon" title="إرسال بالبريد" onClick={() => alert('ميزة الإرسال بالبريد قيد التطوير!')}><Mail size={18} className="text-green-600" /></Button></td></tr>))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end space-x-3 space-x-reverse"><Button variant="outline"><Download size={20} className="ml-2" />تصدير PDF</Button><Button variant="outline"><Download size={20} className="ml-2" />تصدير Excel</Button></div>
      </div>
    );
};

const CreateEditInvoiceForm = ({ initialInvoice, onSave, onCancel, allInvoices, onGenerateJournalEntry }) => {
    const [invoice, setInvoice] = useState(() => initialInvoice || { id: '', date: new Date().toISOString().split('T')[0], customerSupplierName: '', customerSupplierId: '', type: 'sales', paymentMethod: 'cash', items: [{ name: '', quantity: 1, unitPrice: 0, total: 0 }], discount: 0, subtotal: 0, taxAmount: 0, finalTotal: 0, status: 'unpaid' });
  
    useEffect(() => {
        const calculatedSubtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
        const calculatedDiscountedSubtotal = calculatedSubtotal - (invoice.discount || 0);
        const calculatedTaxAmount = calculatedDiscountedSubtotal * TAX_RATE;
        const calculatedFinalTotal = calculatedDiscountedSubtotal + calculatedTaxAmount;
        setInvoice(prev => ({ ...prev, subtotal: calculatedSubtotal, taxAmount: calculatedTaxAmount, finalTotal: calculatedFinalTotal }));
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
  
    const handleAddItem = () => setInvoice(prev => ({ ...prev, items: [...prev.items, { name: '', quantity: 1, unitPrice: 0, total: 0 }] }));
    const handleRemoveItem = (index) => setInvoice(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  
    const handleSaveInvoice = () => {
        if (!invoice.customerSupplierName || !invoice.date || invoice.items.length === 0 || invoice.finalTotal <= 0) {
            alert('الرجاء ملء جميع الحقول المطلوبة وإضافة منتجات صحيحة.');
            return;
        }
        const invoiceToSave = { ...invoice };
        if (!invoiceToSave.id) invoiceToSave.id = `INV-${(allInvoices.length + 1).toString().padStart(4, '0')}`;
        const journalEntry = generateJournalEntry(invoiceToSave);
        onGenerateJournalEntry(journalEntry);
        onSave(invoiceToSave);
        onCancel();
    };

    const generateJournalEntry = (invoiceData) => {
        const lines = [];
        const taxAmount = invoiceData.taxAmount;
        const netAmount = invoiceData.subtotal - (invoiceData.discount || 0);
    
        if (invoiceData.type === 'sales') {
            const customerAccount = '1103'; // العملاء
            const salesRevenueAccount = '4100'; // مبيعات
            const vatPayableAccount = '2104'; // ضريبة القيمة المضافة
            
            lines.push({ account: (invoiceData.paymentMethod === 'cash' ? '1101' : '1102'), description: `تحصيل فاتورة بيع ${invoiceData.id}`, debit: invoiceData.finalTotal, credit: '' });
            lines.push({ account: salesRevenueAccount, description: `إيراد مبيعات ${invoiceData.id}`, debit: '', credit: netAmount });
            if (taxAmount > 0) lines.push({ account: vatPayableAccount, description: `ضريبة فاتورة بيع ${invoiceData.id}`, debit: '', credit: taxAmount });
        } else {
            const supplierAccount = '2101'; // الموردين
            const inventoryAccount = '1104'; // المخزون
            lines.push({ account: inventoryAccount, description: `شراء فاتورة ${invoiceData.id}`, debit: netAmount, credit: '' });
            if (taxAmount > 0) lines.push({ account: '2104', description: `ضريبة فاتورة شراء ${invoiceData.id}`, debit: taxAmount, credit: '' });
            lines.push({ account: (invoiceData.paymentMethod === 'cash' ? '1101' : '1102'), description: `دفع فاتورة شراء ${invoiceData.id}`, debit: '', credit: invoiceData.finalTotal });
        }
        return { id: `JE-${invoiceData.id}`, date: invoiceData.date, description: `قيد آلي لفاتورة ${invoiceData.id}`, lineCount: lines.length, user: 'النظام الآلي', status: 'معتمد', entryType: 'automatic', operationType: 'invoice', detailedLines: lines };
    };

    return (
        <Dialog open onOpenChange={onCancel}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
            <DialogHeader><DialogTitle>{initialInvoice ? `تعديل فاتورة ${initialInvoice.type === 'sales' ? 'بيع' : 'شراء'} رقم ${initialInvoice.id}` : `إنشاء فاتورة ${invoice.type === 'sales' ? 'بيع' : 'شراء'} جديدة`}</DialogTitle></DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-6 rounded-lg border">
                <div><Label>رقم الفاتورة:</Label><Input value={invoice.id || 'يُولد تلقائيًا'} readOnly className="bg-gray-100" /></div>
                <div><Label>التاريخ:</Label><Input type="date" value={invoice.date} onChange={e => setInvoice(prev => ({ ...prev, date: e.target.value }))} /></div>
                <div><Label>العميل/المورد:</Label><Select value={invoice.customerSupplierId} onValueChange={value => { const s = customersSuppliers.find(cs => cs.id === value); setInvoice(prev => ({...prev, customerSupplierId: value, customerSupplierName: s?.name || ''}))}}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{customersSuppliers.filter(cs => !initialInvoice && (invoice.type === 'sales' ? cs.type === 'customer' : cs.type === 'supplier')).map(cs => <SelectItem key={cs.id} value={cs.id}>{cs.name}</SelectItem>)}</SelectContent></Select></div>
                <div><Label>نوع الفاتورة:</Label><RadioGroup defaultValue={invoice.type} onValueChange={value => setInvoice(prev => ({ ...prev, type: value }))} className="flex items-center space-x-4 space-x-reverse mt-2" disabled={!!initialInvoice}><div className="flex items-center space-x-2 space-x-reverse"><RadioGroupItem value="sales" id="r1" /><Label htmlFor="r1">بيع</Label></div><div className="flex items-center space-x-2 space-x-reverse"><RadioGroupItem value="purchase" id="r2" /><Label htmlFor="r2">شراء</Label></div></RadioGroup></div>
                <div><Label>طريقة الدفع:</Label><Select value={invoice.paymentMethod} onValueChange={value => setInvoice(prev => ({ ...prev, paymentMethod: value }))}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{paymentMethods.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">المنتجات / الخدمات</h3>
            <div className="space-y-4 mb-6">{invoice.items.map((item, index) => <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end p-4 border rounded-lg bg-gray-50"><div className="md:col-span-2"><Label>الصنف:</Label><Select value={item.name} onValueChange={value => { const p = productsServices.find(p => p.name === value); handleItemChange(index, 'name', value); if(p) handleItemChange(index, 'unitPrice', p.defaultPrice);}}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{productsServices.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}</SelectContent></Select></div><div><Label>الكمية:</Label><Input type="number" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)} min="1" /></div><div><Label>السعر:</Label><Input type="number" value={item.unitPrice} onChange={e => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)} min="0"/></div><div><Label>الإجمالي:</Label><Input value={item.total.toFixed(2)} readOnly className="bg-gray-100"/></div><div className="flex items-center justify-end"><Button variant="ghost" size="icon" onClick={() => handleRemoveItem(index)}><Trash size={20} className="text-red-500" /></Button></div></div>)}</div>
            <Button onClick={handleAddItem} variant="outline" className="mb-6"><Plus size={20} className="ml-2"/>إضافة صنف</Button>
            <div className="bg-gray-100 p-6 rounded-lg mb-6 border"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><Label>المجموع الفرعي:</Label><Input value={invoice.subtotal.toFixed(2)} readOnly className="bg-gray-200 text-lg font-bold"/></div><div><Label>الخصم:</Label><Input type="number" value={invoice.discount} onChange={e => setInvoice(prev => ({...prev, discount: parseFloat(e.target.value) || 0}))} /></div><div><Label>الضريبة ({TAX_RATE * 100}%):</Label><Input value={invoice.taxAmount.toFixed(2)} readOnly className="bg-gray-200 text-lg font-bold"/></div><div><Label>الإجمالي النهائي:</Label><Input value={invoice.finalTotal.toFixed(2)} readOnly className="bg-blue-100 border-blue-300 text-lg font-bold text-blue-800"/></div></div></div>
            <DialogFooter className="gap-2"><Button onClick={handleSaveInvoice} className="rounded-full py-3 px-6 text-lg"><Save size={24} className="ml-2" />حفظ الفاتورة</Button><Button variant="outline" className="rounded-full py-3 px-6 text-lg"><Printer size={24} className="ml-2" />طباعة</Button><DialogClose asChild><Button type="button" variant="destructive" className="rounded-full py-3 px-6 text-lg"><XCircle size={24} className="ml-2" />إلغاء</Button></DialogClose></DialogFooter>
          </DialogContent>
        </Dialog>
    );
};
  
const ViewInvoiceDetailsModal = ({ invoice, onClose }) => {
    if (!invoice) return null;
    return (
        <Dialog open={!!invoice} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
                <DialogHeader><DialogTitle>تفاصيل الفاتورة #{invoice.id}</DialogTitle></DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-6 rounded-lg border">
                    <div><p className="text-sm font-medium text-gray-700">رقم الفاتورة:</p><p className="text-lg font-bold text-gray-900">{invoice.id}</p></div>
                    <div><p className="text-sm font-medium text-gray-700">التاريخ:</p><p className="text-lg font-bold text-gray-900">{invoice.date}</p></div>
                    <div><p className="text-sm font-medium text-gray-700">العميل/المورد:</p><p className="text-lg font-bold text-gray-900">{invoice.customerSupplierName}</p></div>
                    <div><p className="text-sm font-medium text-gray-700">نوع الفاتورة:</p><p className="text-lg font-bold text-gray-900">{invoice.type === 'sales' ? 'بيع' : 'شراء'}</p></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">المنتجات / الخدمات</h3>
                <table className="min-w-full divide-y divide-gray-200 mb-6">
                    <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الصنف</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الكمية</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">السعر</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجمالي</th></tr></thead>
                    <tbody className="bg-white divide-y divide-gray-200">{invoice.items.map((item, index) => <tr key={index}><td className="px-6 py-4">{item.name}</td><td className="px-6 py-4">{item.quantity}</td><td className="px-6 py-4">{item.unitPrice.toFixed(2)}</td><td className="px-6 py-4">{item.total.toFixed(2)}</td></tr>)}</tbody>
                </table>
                <div className="bg-gray-100 p-6 rounded-lg border"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><p>المجموع الفرعي:</p><p className="font-bold">{invoice.subtotal.toFixed(2)}</p></div><div><p>الخصم:</p><p className="font-bold">{invoice.discount.toFixed(2)}</p></div><div><p>الضريبة:</p><p className="font-bold">{invoice.taxAmount.toFixed(2)}</p></div><div><p>الإجمالي:</p><p className="text-2xl font-bold text-blue-800">{invoice.finalTotal.toFixed(2)}</p></div></div></div>
                <DialogFooter><DialogClose asChild><Button type="button" variant="secondary" className="mt-4">إغلاق</Button></DialogClose></DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
  
const Invoices = () => {
    const [invoices, setInvoices] = useState([{ id: 'INV-0001', date: '2025-07-14', customerSupplierName: 'شركة البن الفاخر', type: 'sales', paymentMethod: 'transfer', items: [{ name: 'بن محمّص وسط', quantity: 10, unitPrice: 45, total: 450 }, { name: 'أكواب ورقية 8 أونصة', quantity: 20, unitPrice: 1.5, total: 30 }], discount: 0, subtotal: 480, taxAmount: 24, finalTotal: 504, status: 'paid' }]);
    const [showCreateEditInvoiceModal, setShowCreateEditInvoiceModal] = useState(false);
    const [invoiceToEdit, setInvoiceToEdit] = useState(null);
    const [invoiceToView, setInvoiceToView] = useState(null);
  
    const handleAddInvoice = (type) => { setInvoiceToEdit({ id: '', date: new Date().toISOString().split('T')[0], customerSupplierName: '', customerSupplierId: '', type: type, paymentMethod: 'cash', items: [{ name: '', quantity: 1, unitPrice: 0, total: 0 }], discount: 0, subtotal: 0, taxAmount: 0, finalTotal: 0, status: 'unpaid' }); setShowCreateEditInvoiceModal(true); };
    const handleEditInvoice = (invoice) => { setInvoiceToEdit(invoice); setShowCreateEditInvoiceModal(true); };
    const handleViewInvoice = (invoice) => { setInvoiceToView(invoice); };
  
    const handleSaveInvoice = (savedInvoice) => {
      if (savedInvoice.id && invoices.some(inv => inv.id === savedInvoice.id)) {
        setInvoices(prev => prev.map(inv => inv.id === savedInvoice.id ? savedInvoice : inv));
      } else {
        setInvoices(prev => [...prev, savedInvoice]);
      }
      setShowCreateEditInvoiceModal(false);
      setInvoiceToEdit(null);
    };
  
    const handleGenerateJournalEntry = (journalEntry) => { console.log("Generated Journal Entry:", journalEntry); alert(`تم توليد قيد محاسبي تلقائي: ${journalEntry.description}`); };
  
    return (
      <div className="p-4 md:p-6">
        <InvoiceListView invoices={invoices} onAddInvoice={handleAddInvoice} onEditInvoice={handleEditInvoice} onViewInvoice={handleViewInvoice} />
        {showCreateEditInvoiceModal && <CreateEditInvoiceForm initialInvoice={invoiceToEdit} onSave={handleSaveInvoice} onCancel={() => setShowCreateEditInvoiceModal(false)} allInvoices={invoices} onGenerateJournalEntry={handleGenerateJournalEntry} />}
        <ViewInvoiceDetailsModal invoice={invoiceToView} onClose={() => setInvoiceToView(null)} />
      </div>
    );
};
  
export default Invoices;
