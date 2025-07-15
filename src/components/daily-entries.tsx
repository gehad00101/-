"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Eye, Edit, Trash, Printer, AlertTriangle, Save, XCircle, Copy, FilePlus, RefreshCcw, Download, Tag, Mail, Filter } from 'lucide-react';
import { chartOfAccounts, entryTypes, operationTypes, users, customersSuppliers, productsServices, paymentMethods, invoiceStatuses, TAX_RATE } from '@/lib/data';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from './ui/dialog';
import { Label } from './ui/label';

const JournalEntriesListView = ({ dailyEntries, onAddEntry, onEditEntry, onViewEntry, entryTypes, operationTypes, users, title }) => {
    const [filterEntryNumber, setFilterEntryNumber] = useState('');
    const [filterFromDate, setFilterFromDate] = useState('');
    const [filterToDate, setFilterToDate] = useState('');
    const [filterEntryType, setFilterEntryType] = useState('');
    const [filterOperationType, setFilterOperationType] = useState('');
    const [filterUser, setFilterUser] = useState('');
  
    const filteredDailyEntries = useMemo(() => {
      return dailyEntries.filter(entry => {
        const matchesEntryNumber = filterEntryNumber ? entry.id.toString().includes(filterEntryNumber) : true;
        const entryDate = new Date(entry.date);
        const fromDate = filterFromDate ? new Date(filterFromDate) : null;
        const toDate = filterToDate ? new Date(filterToDate) : null;
        
        if(fromDate) fromDate.setHours(0,0,0,0);
        if(toDate) toDate.setHours(23,59,59,999);

        const matchesDate = (!fromDate || entryDate >= fromDate) && (!toDate || entryDate <= toDate);
        const matchesEntryType = filterEntryType ? entry.entryType === filterEntryType : true;
        const matchesOperationType = filterOperationType ? entry.operationType === filterOperationType : true;
        const matchesUser = filterUser ? entry.user === filterUser : true;
  
        return matchesEntryNumber && matchesDate && matchesEntryType && matchesOperationType && matchesUser;
      });
    }, [dailyEntries, filterEntryNumber, filterFromDate, filterToDate, filterEntryType, filterOperationType, filterUser]);
  
    return (
      <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">{title}</h1>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse">
            <Button onClick={onAddEntry} className="rounded-full py-3 px-6 text-lg">
              <Plus size={24} className="ml-2" />
              إضافة قيد جديد
            </Button>
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="بحث برقم القيد..."
                className="pr-10 pl-4 py-2 rounded-full bg-gray-100"
                dir="rtl"
                value={filterEntryNumber}
                onChange={(e) => setFilterEntryNumber(e.target.value)}
              />
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
  
        <div className="p-6 rounded-xl mb-6 border border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🔍 أدوات الفلترة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="filterFromDate">من تاريخ</Label>
              <Input type="date" id="filterFromDate" value={filterFromDate} onChange={(e) => setFilterFromDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="filterToDate">إلى تاريخ</Label>
              <Input type="date" id="filterToDate" value={filterToDate} onChange={(e) => setFilterToDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="filterEntryType">نوع القيد</Label>
              <Select onValueChange={setFilterEntryType} value={filterEntryType}>
                <SelectTrigger><SelectValue placeholder="الكل" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">الكل</SelectItem>
                  {entryTypes.map(type => (<SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filterOperationType">نوع العملية</Label>
              <Select onValueChange={setFilterOperationType} value={filterOperationType}>
                <SelectTrigger><SelectValue placeholder="الكل" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">الكل</SelectItem>
                  {operationTypes.map(type => (<SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filterUser">المستخدم</Label>
              <Select onValueChange={setFilterUser} value={filterUser}>
                <SelectTrigger><SelectValue placeholder="الكل" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">الكل</SelectItem>
                  {users.map(user => (<SelectItem key={user.value} value={user.value}>{user.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
  
        <div className="p-6 rounded-xl shadow-md mb-6 overflow-x-auto border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 جدول عرض القيود</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم القيد</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نوع القيد</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">البيان</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عدد السطور</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستخدم</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDailyEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${entry.entryType === 'manual' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{entry.entryType === 'manual' ? 'يدوي' : 'تلقائي'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.lineCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${entry.status === 'معتمد' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{entry.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button title="عرض" onClick={() => onViewEntry(entry)} className="text-blue-600 hover:text-blue-900 ml-2"><Eye size={18} /></button>
                    <button title="تعديل" onClick={() => onEditEntry(entry)} className="text-indigo-600 hover:text-indigo-900 ml-2"><Edit size={18} /></button>
                    <button title="حذف" className="text-red-600 hover:text-red-900 ml-2"><Trash size={18} /></button>
                    <button title="طباعة" className="text-gray-600 hover:text-gray-900"><Printer size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

const NewJournalEntryForm = ({ initialEntry, onSave, dailyEntries, showModal, setShowModal }) => {
    const [entry, setEntry] = useState(() => initialEntry || { id: '', date: new Date().toISOString().split('T')[0], generalDescription: '', lines: [{ account: '', description: '', debit: '', credit: '' }, { account: '', description: '', debit: '', credit: '' }] });
    const [totalDebit, setTotalDebit] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const [isBalanced, setIsBalanced] = useState(false);
    const [accountSearchTerm, setAccountSearchTerm] = useState('');
    const [recentlyUsedAccounts, setRecentlyUsedAccounts] = useState([{ id: '1101', name: 'الصندوق', type: 'الأصول', color: 'text-green-600' }, { id: '5201', name: 'إيجار المحل', type: 'المصروفات', color: 'text-orange-600' }]);
  
    const journalTemplates = [{ name: 'صرف رواتب', description: 'قيد صرف الرواتب الشهرية', lines: [{ account: '5202', debit: '', credit: '' }, { account: '1102', debit: '', credit: '' }] }, { name: 'فاتورة مبيعات', description: 'قيد إثبات فاتورة مبيعات', lines: [{ account: '1103', debit: '', credit: '' }, { account: '4100', debit: '', credit: '' }] }];
  
    useEffect(() => {
      if (initialEntry) setEntry(initialEntry);
      else setEntry({ id: '', date: new Date().toISOString().split('T')[0], generalDescription: '', lines: [{ account: '', description: '', debit: '', credit: '' }, { account: '', description: '', debit: '', credit: '' }] });
      setAccountSearchTerm('');
    }, [initialEntry, showModal]);
  
    useEffect(() => {
      let debitSum = 0;
      let creditSum = 0;
      entry.lines.forEach(line => {
        debitSum += parseFloat(line.debit || 0);
        creditSum += parseFloat(line.credit || 0);
      });
      setTotalDebit(debitSum);
      setTotalCredit(creditSum);
      setIsBalanced(debitSum === creditSum && debitSum > 0);
    }, [entry.lines]);
  
    const isFormValid = useMemo(() => {
      if (!entry.generalDescription.trim() || !entry.date) return false;
      return entry.lines.every(line => line.account && (parseFloat(line.debit) > 0 || parseFloat(line.credit) > 0));
    }, [entry.generalDescription, entry.date, entry.lines]);
  
    const handleAddLine = () => setEntry(prev => ({ ...prev, lines: [...prev.lines, { account: '', description: '', debit: '', credit: '' }] }));
    const handleDeleteLine = (index) => setEntry(prev => ({ ...prev, lines: prev.lines.filter((_, i) => i !== index) }));
  
    const handleLineChange = (index, field, value) => {
      const updatedLines = entry.lines.map((line, i) => {
        if (i === index) {
          if (field === 'debit' && value !== '') return { ...line, [field]: value, credit: '' };
          if (field === 'credit' && value !== '') return { ...line, [field]: value, debit: '' };
          return { ...line, [field]: value };
        }
        return line;
      });
      setEntry(prev => ({ ...prev, lines: updatedLines }));
  
      if (field === 'account' && value) {
        const selectedAccount = chartOfAccounts.find(acc => acc.id === value);
        if (selectedAccount && !recentlyUsedAccounts.some(acc => acc.id === selectedAccount.id)) {
          setRecentlyUsedAccounts(prev => [selectedAccount, ...prev.slice(0, 4)]);
        }
      }
    };
  
    const handleSaveEntry = () => {
      if (isBalanced && isFormValid) {
        const entryToSave = { ...entry };
        if (!entryToSave.id) {
          const newId = (dailyEntries.length + 1).toString().padStart(3, '0');
          entryToSave.id = `JE-${newId}`;
          entryToSave.isNew = true;
          entryToSave.status = 'معتمد';
          entryToSave.entryType = 'manual';
          entryToSave.user = 'المستخدم الحالي';
        }
        onSave(entryToSave);
        setShowModal(false);
      } else {
        console.warn("القيد غير متوازن أو غير مكتمل ولا يمكن حفظه.");
      }
    };
  
    const handleSaveDraft = () => {
      const entryToSave = { ...entry };
      if (!entryToSave.id) {
        const newId = (dailyEntries.length + 1).toString().padStart(3, '0');
        entryToSave.id = `JE-${newId}`;
        entryToSave.isNew = true;
      }
      entryToSave.status = 'مسودة';
      entryToSave.entryType = entryToSave.entryType || 'manual';
      entryToSave.user = entryToSave.user || 'المستخدم الحالي';
      onSave(entryToSave);
      alert("تم حفظ القيد كمسودة");
      setShowModal(false);
    };
  
    const handleClearForm = () => {
      setEntry({ id: '', date: new Date().toISOString().split('T')[0], generalDescription: '', lines: [{ account: '', description: '', debit: '', credit: '' }, { account: '', description: '', debit: '', credit: '' }] });
      setAccountSearchTerm('');
    };
  
    const applyTemplate = (template) => {
      setEntry(prev => ({ ...prev, generalDescription: template.description, lines: template.lines.map(line => ({ ...line, description: '', debit: '', credit: '' })) }));
    };
  
    const filteredAccounts = useMemo(() => {
      if (!accountSearchTerm) return chartOfAccounts;
      const lowerCaseSearchTerm = accountSearchTerm.toLowerCase();
      return chartOfAccounts.filter(account => account.name.toLowerCase().includes(lowerCaseSearchTerm) || account.id.includes(lowerCaseSearchTerm));
    }, [accountSearchTerm]);
  
    if (!showModal) return null;
  
    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
                <DialogHeader>
                    <DialogTitle>{initialEntry ? 'تعديل قيد' : 'تسجيل قيد جديد'}</DialogTitle>
                </DialogHeader>
  
                <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">معلومات القيد الأساسية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Label htmlFor="entryNumber">🔢 رقم القيد</Label>
                            <Input id="entryNumber" value={entry.id || 'تلقائي'} readOnly className="bg-gray-100 font-mono" />
                        </div>
                        <div className="relative">
                            <Label htmlFor="entryDate">📅 تاريخ القيد</Label>
                            <Input type="date" id="entryDate" value={entry.date} onChange={(e) => setEntry(prev => ({ ...prev, date: e.target.value }))} />
                        </div>
                        <div className="md:col-span-2 relative">
                            <Label htmlFor="generalDescription">📝 البيان العام</Label>
                            <Input id="generalDescription" value={entry.generalDescription} onChange={(e) => setEntry(prev => ({ ...prev, generalDescription: e.target.value }))} placeholder="مثال: شراء أثاث للمكتب" />
                        </div>
                        <div className="relative">
                            <Label htmlFor="user">👤 المستخدم</Label>
                            <Input id="user" value="المستخدم الحالي" readOnly className="bg-gray-100" />
                        </div>
                    </div>
                </div>
  
                <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">خيارات سريعة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="templates">📂 قوالب قيود جاهزة</Label>
                            <Select onValueChange={(value) => { const t = journalTemplates.find(t => t.name === value); if(t) applyTemplate(t); }}>
                                <SelectTrigger><SelectValue placeholder="اختر قالب" /></SelectTrigger>
                                <SelectContent>
                                {journalTemplates.map(template => (<SelectItem key={template.name} value={template.name}>{template.name}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="invisible">زر نسخ</Label>
                            <Button onClick={() => alert("ميزة 'نسخ من قيد سابق' قيد التطوير!")} className="w-full bg-indigo-500 hover:bg-indigo-600">
                                <Copy size={20} className="ml-2" />
                                نسخ من قيد سابق
                            </Button>
                        </div>
                    </div>
                </div>
  
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 جدول القيد التفصيلي</h3>
                <div className="space-y-4 mb-6">
                {entry.lines.map((line, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="md:col-span-2 relative">
                        <Label htmlFor={`account-${index}`}>🧾 الحساب</Label>
                        <Input type="text" placeholder="ابحث عن حساب..." value={accountSearchTerm} onChange={(e) => setAccountSearchTerm(e.target.value)} className="mb-2" dir="rtl"/>
                        <Select onValueChange={(value) => handleLineChange(index, 'account', value)} value={line.account}>
                            <SelectTrigger><SelectValue placeholder="اختر حساب" /></SelectTrigger>
                            <SelectContent>
                                {recentlyUsedAccounts.length > 0 && <Label className="px-2 py-1.5 text-sm font-semibold">المستخدمة مؤخراً</Label>}
                                {recentlyUsedAccounts.map(account => (<SelectItem key={`recent-${account.id}`} value={account.id}>{account.name} <span className={account.color}>({account.type})</span></SelectItem>))}
                                {Object.entries(filteredAccounts.reduce((acc, account) => { (acc[account.type] = acc[account.type] || []).push(account); return acc; }, {})).map(([type, accounts]) => (<div key={type}><Label className="px-2 py-1.5 text-sm font-semibold">--- {type} ---</Label>{accounts.map(account => (<SelectItem key={account.id} value={account.id}>{account.name}</SelectItem>))}</div>))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="md:col-span-2 relative">
                        <Label htmlFor={`lineDescription-${index}`}>✏️ البيان الخاص بالسطر</Label>
                        <Input id={`lineDescription-${index}`} value={line.description} onChange={(e) => handleLineChange(index, 'description', e.target.value)} placeholder="مثل: شراء مكتب" />
                    </div>
                    <div className="relative">
                        <Label htmlFor={`debit-${index}`}>💰 مدين</Label>
                        <Input type="number" id={`debit-${index}`} value={line.debit} onChange={(e) => handleLineChange(index, 'debit', e.target.value)} min="0"/>
                    </div>
                    <div className="relative">
                        <Label htmlFor={`credit-${index}`}>💰 دائن</Label>
                        <Input type="number" id={`credit-${index}`} value={line.credit} onChange={(e) => handleLineChange(index, 'credit', e.target.value)} min="0"/>
                    </div>
                    <div className="md:col-span-6 flex justify-end">
                        <Button variant="ghost" className="text-red-600 hover:text-red-800" onClick={() => handleDeleteLine(index)}><Trash size={16} className="ml-1" />حذف السطر</Button>
                    </div>
                    </div>
                ))}
                </div>
  
                <Button onClick={handleAddLine} variant="outline" className="mb-6"><Plus size={20} className="ml-2" />إضافة سطر جديد</Button>
  
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">🧮 مجموع المبالغ</h3>
                    <div className="flex justify-between items-center mb-2">
                        <div>إجمالي المدين: <span className="text-blue-600 font-bold">{totalDebit.toFixed(2)}</span></div>
                        <div>إجمالي الدائن: <span className="text-green-600 font-bold">{totalCredit.toFixed(2)}</span></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>الفرق: <span className={`${(totalDebit - totalCredit) === 0 ? 'text-green-600' : 'text-red-600'}`}>{Math.abs(totalDebit - totalCredit).toFixed(2)}</span></div>
                        {(totalDebit - totalCredit) === 0 && totalDebit > 0 && (<CheckCircle size={24} className="text-green-500" />)}
                    </div>
                </div>
  
                {!isBalanced && (totalDebit !== 0 || totalCredit !== 0) && (
                    <div className="flex items-center p-3 mb-6 bg-red-100 text-red-700 rounded-lg">
                        <AlertTriangle size={20} className="ml-2" />
                        <span className="font-medium">⚠️ القيد غير متوازن، لا يمكن الحفظ.</span>
                    </div>
                )}
  
                <DialogFooter className="gap-2">
                    <Button onClick={handleSaveEntry} disabled={!isBalanced || !isFormValid}><Save size={24} className="ml-2" />حفظ القيد</Button>
                    <Button onClick={handleSaveDraft} variant="secondary"><FilePlus size={24} className="ml-2" />حفظ كمسودة</Button>
                    <Button onClick={handleClearForm} variant="outline" className="text-yellow-600 border-yellow-500 hover:bg-yellow-100"><RefreshCcw size={24} className="ml-2" />إفراغ النموذج</Button>
                    <DialogClose asChild>
                        <Button type="button" variant="destructive"><XCircle size={24} className="ml-2" />رجوع للقائمة</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
  
const DailyEntries = () => {
    const [dailyEntries, setDailyEntries] = useState([
        { id: 'JE-001', date: '2024-07-10', entryType: 'manual', description: 'شراء أثاث نقداً', lineCount: 2, user: 'أحمد محمد', status: 'معتمد', detailedLines: [{ account: '1202', description: 'شراء أثاث للمكتب', debit: '5000', credit: '' }, { account: '1101', description: 'دفع نقدي من الصندوق', debit: '', credit: '5000' }] },
        { id: 'JE-002', date: '2024-07-09', entryType: 'automatic', operationType: 'invoice', description: 'فاتورة مبيعات رقم 4001', lineCount: 2, user: 'فاطمة علي', status: 'معتمد', detailedLines: [{ account: '1103', description: 'مبيعات لعميل X', debit: '1500', credit: '' }, { account: '4100', description: 'إيراد مبيعات قهوة', debit: '', credit: '1500' }] },
    ]);
    const [selectedEntryForView, setSelectedEntryForView] = useState(null);
    const [currentEntryForForm, setCurrentEntryForForm] = useState(null);
    const [showNewEntryModal, setShowNewEntryModal] = useState(false);
    const [currentTab, setCurrentTab] = useState('all');
  
    const handleAddEntryClick = () => {
      setCurrentEntryForForm(null);
      setShowNewEntryModal(true);
    };
  
    const handleEditEntryClick = (entry) => {
      setCurrentEntryForForm(entry);
      setShowNewEntryModal(true);
    };
  
    const handleSaveForm = (savedEntry) => {
      if (savedEntry.isNew) {
        setDailyEntries(prev => [...prev, savedEntry]);
      } else {
        setDailyEntries(prev => prev.map(entry => entry.id === savedEntry.id ? savedEntry : entry));
      }
    };
  
    const entriesToShow = useMemo(() => {
      if (currentTab === 'my') {
        return dailyEntries.filter(entry => entry.user === 'المستخدم الحالي');
      }
      return dailyEntries;
    }, [dailyEntries, currentTab]);
  
  
    return (
      <div className="p-4 md:p-6">
        <div className="flex mb-6 bg-white p-2 rounded-xl shadow-md">
          <button onClick={() => setCurrentTab('all')} className={`flex-1 py-3 px-6 rounded-lg font-bold text-lg transition-colors duration-200 ${currentTab === 'all' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}>جميع القيود</button>
          <button onClick={() => setCurrentTab('my')} className={`flex-1 py-3 px-6 rounded-lg font-bold text-lg transition-colors duration-200 ${currentTab === 'my' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}>القيود الخاصة بي</button>
        </div>
  
        <JournalEntriesListView dailyEntries={entriesToShow} onAddEntry={handleAddEntryClick} onEditEntry={handleEditEntryClick} onViewEntry={setSelectedEntryForView} entryTypes={entryTypes} operationTypes={operationTypes} users={users} title={currentTab === 'all' ? 'عرض جميع القيود المحاسبية' : 'عرض القيود المحاسبية الخاصة بي'} />
        
        <NewJournalEntryForm showModal={showNewEntryModal} setShowModal={setShowNewEntryModal} initialEntry={currentEntryForForm} onSave={handleSaveForm} dailyEntries={dailyEntries} />
  
        {selectedEntryForView && (
          <Dialog open={!!selectedEntryForView} onOpenChange={() => setSelectedEntryForView(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
              <DialogHeader><DialogTitle>تفاصيل القيد المحاسبي #{selectedEntryForView.id}</DialogTitle></DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div><p className="text-sm font-medium text-gray-700">رقم القيد:</p><p className="text-lg font-bold text-gray-900">{selectedEntryForView.id}</p></div>
                    <div><p className="text-sm font-medium text-gray-700">التاريخ:</p><p className="text-lg font-bold text-gray-900">{selectedEntryForView.date}</p></div>
                    <div><p className="text-sm font-medium text-gray-700">البيان العام:</p><p className="text-lg font-bold text-gray-900">{selectedEntryForView.description}</p></div>
                    <div><p className="text-sm font-medium text-gray-700">المستخدم:</p><p className="text-lg font-bold text-gray-900">{selectedEntryForView.user}</p></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">السطور التفصيلية</h3>
                <table className="min-w-full divide-y divide-gray-200 mb-6">
                    <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحساب</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">البيان</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مدين</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">دائن</th></tr></thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {selectedEntryForView.detailedLines.map((line, index) => (<tr key={index}><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{chartOfAccounts.find(acc => acc.id === line.account)?.name || line.account}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{line.description}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-bold">{line.debit || '-'}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">{line.credit || '-'}</td></tr>))}
                    </tbody>
                </table>
              <DialogFooter className="gap-2">
                <Button variant="outline"><RefreshCcw size={20} className="ml-2" />تحويل الحالة</Button>
                <Button variant="outline"><Download size={20} className="ml-2" />تصدير</Button>
                <DialogClose asChild><Button type="button" variant="secondary">إغلاق</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
};
  
export default DailyEntries;
