
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Eye, Edit, Trash, Printer, Save, XCircle, Copy, FilePlus, RefreshCcw, Search, AlertTriangle, CheckCircle } from 'lucide-react';

// Common data for Chart of Accounts, Entry Types, Operation Types, Users
const chartOfAccounts = [
  { id: '1000', name: 'الأصول', type: 'رئيسي', color: 'text-gray-700' },
  { id: '1100', name: 'الأصول المتداولة', type: 'الأصول', color: 'text-green-600' },
  { id: '1101', name: 'الصندوق', type: 'الأصول', color: 'text-green-600' },
  { id: '1102', name: 'الحساب البنكي', type: 'الأصول', color: 'text-green-600' },
  { id: '1103', name: 'حسابات العملاء', type: 'الأصول', color: 'text-green-600' },
  { id: '1104', name: 'المخزون (بن - حليب - كاسات)', type: 'الأصول', color: 'text-green-600' },
  { id: '1105', name: 'المصروفات المدفوعة مقدمًا', type: 'الأصول', color: 'text-green-600' },
  { id: '1106', name: 'أوراق القبض', type: 'الأصول', color: 'text-green-600' },
  { id: '1200', name: 'الأصول الثابتة', type: 'الأصول', color: 'text-green-600' },
  { id: '1201', name: 'معدات القهوة', type: 'الأصول', color: 'text-green-600' },
  { id: '1202', name: 'الأثاث والديكور', type: 'الأصول', color: 'text-green-600' },
  { id: '1203', name: 'الأجهزة الكهربائية', type: 'الأصول', color: 'text-green-600' },
  { id: '1204', name: 'كمبيوتر / POS', type: 'الأصول', color: 'text-green-600' },
  { id: '1205', name: 'مجمع الإهلاك', type: 'الأصول', color: 'text-green-600' },

  { id: '2000', name: 'الالتزامات', type: 'رئيسي', color: 'text-gray-700' },
  { id: '2100', name: 'الالتزامات قصيرة الأجل', type: 'الالتزامات', color: 'text-red-600' },
  { id: '2101', name: 'الموردين', type: 'الالتزامات', color: 'text-red-600' },
  { id: '2102', name: 'مصروفات مستحقة', type: 'الالتزامات', color: 'text-red-600' },
  { id: '2103', name: 'رواتب مستحقة', type: 'الالتزامات', color: 'text-red-600' },
  { id: '2104', name: 'ضريبة القيمة المضافة', type: 'الالتزامات', color: 'text-red-600' },
  { id: '2200', name: 'الالتزامات طويلة الأجل', type: 'الالتزامات', color: 'text-red-600' },
  { id: '2201', name: 'قرض بنكي طويل الأجل', type: 'الالتزامات', color: 'text-red-600' },

  { id: '3000', name: 'حقوق الملكية', type: 'رئيسي', color: 'text-gray-700' },
  { id: '3100', name: 'رأس المال', type: 'حقوق الملكية', color: 'text-purple-600' },
  { id: '3101', name: 'المسحوبات الشخصية', type: 'حقوق الملكية', color: 'text-purple-600' },
  { id: '3102', name: 'الأرباح المحتجزة', type: 'حقوق الملكية', color: 'text-purple-600' },

  { id: '4000', name: 'الإيرادات', type: 'رئيسي', color: 'text-gray-700' },
  { id: '4100', name: 'مبيعات القهوة', type: 'الإيرادات', color: 'text-blue-600' },
  { id: '4101', name: 'مبيعات المشروبات الباردة', type: 'الإيرادات', color: 'text-blue-600' },
  { id: '4102', name: 'مبيعات الحلى والمعجنات', type: 'الإيرادات', color: 'text-blue-600' },
  { id: '4103', name: 'إيرادات أخرى', type: 'الإيرادات', color: 'text-blue-600' },

  { id: '5000', name: 'المصروفات', type: 'رئيسي', color: 'text-gray-700' },
  { id: '5100', name: 'تكلفة المبيعات', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5101', name: 'تكلفة البن', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5102', name: 'تكلفة الحليب والمواد', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5103', name: 'تكلفة الأكواب', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5200', name: 'مصروفات تشغيلية', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5201', name: 'إيجار المحل', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5202', name: 'رواتب الموظفين', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5203', name: 'كهرباء ومياه', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5204', name: 'إنترنت واتصالات', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5205', name: 'صيانة معدات', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5206', name: 'مواد تنظيف', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5207', name: 'رخص وتجديدات', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5208', name: 'تسويق وإعلانات', type: 'المصروفات', color: 'text-orange-600' },
  { id: '5209', name: 'نفقات ضيافة', type: 'المصروفات', color: 'text-orange-600' },

  { id: '6000', name: 'الحسابات الختامية', type: 'رئيسي', color: 'text-gray-700' },
  { id: '6100', name: 'حساب الأرباح والخسائر', type: 'الحسابات الختامية', color: 'text-gray-600' },
  { id: '6200', name: 'حساب المتاجرة', type: 'الحسابات الختامية', color: 'text-gray-600' },
];

const entryTypes = [
  { value: 'manual', label: 'يدوي' },
  { value: 'automatic', label: 'تلقائي' },
];
const operationTypes = [
  { value: 'invoice', label: 'فاتورة مبيعات' },
  { value: 'expense_record', label: 'تسجيل مصروف' },
  { value: 'salary_payment', label: 'صرف راتب' },
  { value: 'rent_payment', label: 'دفع إيجار' },
  { value: 'capital_deposit', label: 'إيداع رأس مال' },
  { value: 'asset_purchase', label: 'شراء أصل' },
  { value: 'bank_loan', label: 'قرض بنكي' },
  { value: 'revenue_receipt', label: 'تحصيل إيراد' },
  { value: 'other_adjustment', label: 'تسوية أخرى' },
];
const users = [
  { value: 'أحمد محمد', label: 'أحمد محمد' },
  { value: 'فاطمة علي', label: 'فاطمة علي' },
  { value: 'علي حسن', label: 'علي حسن' },
  { value: 'نورة خالد', label: 'نورة خالد' },
  { value: 'مدير النظام', label: 'مدير النظام' },
  { value: 'المستخدم الحالي', label: 'المستخدم الحالي' },
];

const JournalEntriesListView = ({ dailyEntries, onAddEntry, onEditEntry, onViewEntry, title }) => {
  const [filterEntryNumber, setFilterEntryNumber] = useState('');
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');
  const [filterEntryType, setFilterEntryType] = useState('');
  const [filterOperationType, setFilterOperationType] = useState('');
  const [filterUser, setFilterUser] = useState('');

  const filteredDailyEntries = useMemo(() => {
    return dailyEntries.filter(entry => {
      const matchesEntryNumber = filterEntryNumber ? entry.id.includes(filterEntryNumber) : true;
      const matchesDate = (filterFromDate ? entry.date >= filterFromDate : true) &&
                          (filterToDate ? entry.date <= filterToDate : true);
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
          <button
            onClick={onAddEntry}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-colors duration-200 text-lg"
          >
            <Plus size={24} className="ml-2" />
            إضافة قيد جديد
          </button>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="بحث برقم القيد..."
              className="pr-10 pl-4 py-2 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
            <label htmlFor="filterFromDate" className="block text-sm font-medium text-gray-700">من تاريخ</label>
            <input
              type="date"
              id="filterFromDate"
              value={filterFromDate}
              onChange={(e) => setFilterFromDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="filterToDate" className="block text-sm font-medium text-gray-700">إلى تاريخ</label>
            <input
              type="date"
              id="filterToDate"
              value={filterToDate}
              onChange={(e) => setFilterToDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="filterEntryType" className="block text-sm font-medium text-gray-700">نوع القيد</label>
            <select
              id="filterEntryType"
              value={filterEntryType}
              onChange={(e) => setFilterEntryType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            >
              <option value="">الكل</option>
              {entryTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filterOperationType" className="block text-sm font-medium text-gray-700">نوع العملية</label>
            <select
              id="filterOperationType"
              value={filterOperationType}
              onChange={(e) => setFilterOperationType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            >
              <option value="">الكل</option>
              {operationTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filterUser" className="block text-sm font-medium text-gray-700">المستخدم</label>
            <select
              id="filterUser"
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            >
              <option value="">الكل</option>
              {users.map(user => (
                <option key={user.value} value={user.value}>{user.label}</option>
              ))}
            </select>
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
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    entry.entryType === 'manual' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {entry.entryType === 'manual' ? 'يدوي' : 'تلقائي'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.lineCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    entry.status === 'معتمد' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {entry.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button title="عرض" onClick={() => onViewEntry(entry)} className="text-blue-600 hover:text-blue-900 ml-2">
                    <Eye size={18} />
                  </button>
                  <button title="تعديل" onClick={() => onEditEntry(entry)} className="text-indigo-600 hover:text-indigo-900 ml-2">
                    <Edit size={18} />
                  </button>
                  <button title="حذف" className="text-red-600 hover:text-red-900 ml-2">
                    <Trash size={18} />
                  </button>
                  <button title="طباعة" className="text-gray-600 hover:text-gray-900">
                    <Printer size={18} />
                  </button>
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
  const [entry, setEntry] = useState(() => initialEntry || {
    id: '',
    date: new Date().toISOString().split('T')[0],
    generalDescription: '',
    lines: [
      { account: '', description: '', debit: '', credit: '' },
      { account: '', description: '', debit: '', credit: '' },
    ],
  });
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [isBalanced, setIsBalanced] = useState(false);
  const [accountSearchTerm, setAccountSearchTerm] = useState('');

  const [recentlyUsedAccounts, setRecentlyUsedAccounts] = useState([
    { id: '1101', name: 'الصندوق', type: 'الأصول', color: 'text-green-600' },
    { id: '5201', name: 'إيجار المحل', type: 'المصروفات', color: 'text-orange-600' },
  ]);

  const journalTemplates = [
    { name: 'صرف رواتب', description: 'قيد صرف الرواتب الشهرية', lines: [
      { account: '5202', debit: '', credit: '' },
      { account: '1102', debit: '', credit: '' },
    ]},
    { name: 'فاتورة مبيعات', description: 'قيد إثبات فاتورة مبيعات', lines: [
      { account: '1103', debit: '', credit: '' },
      { account: '4100', debit: '', credit: '' },
    ]},
  ];

  useEffect(() => {
    if (initialEntry) {
      setEntry(initialEntry);
    } else {
      setEntry({
        id: '',
        date: new Date().toISOString().split('T')[0],
        generalDescription: '',
        lines: [
          { account: '', description: '', debit: '', credit: '' },
          { account: '', description: '', debit: '', credit: '' },
        ],
      });
    }
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
    if (!entry.generalDescription.trim() || !entry.date) {
      return false;
    }
    return entry.lines.every(line =>
      line.account && (parseFloat(line.debit) > 0 || parseFloat(line.credit) > 0)
    );
  }, [entry.generalDescription, entry.date, entry.lines]);

  const handleAddLine = () => {
    setEntry(prev => ({
      ...prev,
      lines: [...prev.lines, { account: '', description: '', debit: '', credit: '' }],
    }));
  };

  const handleDeleteLine = (index) => {
    setEntry(prev => ({
      ...prev,
      lines: prev.lines.filter((_, i) => i !== index),
    }));
  };

  const handleLineChange = (index, field, value) => {
    const updatedLines = entry.lines.map((line, i) => {
      if (i === index) {
        if (field === 'debit' && value !== '') {
          return { ...line, [field]: value, credit: '' };
        }
        if (field === 'credit' && value !== '') {
          return { ...line, [field]: value, debit: '' };
        }
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
        entryToSave.id = newId;
        entryToSave.isNew = true;
        entryToSave.status = 'معتمد';
        entryToSave.entryType = 'manual';
        entryToSave.user = 'المستخدم الحالي';
        entryToSave.lineCount = entryToSave.lines.length;
        entryToSave.detailedLines = entryToSave.lines;
      }
      onSave(entryToSave);
      setShowModal(false);
    } else {
      console.warn("القيد غير متوازن أو غير مكتمل ولا يمكن حفظه.");
    }
  };

  const handleClearForm = () => {
    setEntry({
      id: '',
      date: new Date().toISOString().split('T')[0],
      generalDescription: '',
      lines: [
        { account: '', description: '', debit: '', credit: '' },
        { account: '', description: '', debit: '', credit: '' },
      ],
    });
    setAccountSearchTerm('');
  };

  const applyTemplate = (template) => {
    setEntry(prev => ({
        ...prev,
        generalDescription: template.description,
        lines: template.lines.map(line => ({
            ...line,
            description: '',
            debit: '',
            credit: ''
        }))
    }));
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">{initialEntry ? 'تعديل قيد' : 'تسجيل قيد جديد'}</h2>
          <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">معلومات القيد الأساسية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <label htmlFor="entryNumber" className="block text-sm font-medium text-gray-700 mb-1">🔢 رقم القيد</label>
                    <input
                        type="text"
                        id="entryNumber"
                        value={entry.id || 'تلقائي'}
                        readOnly
                        className="block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2.5 text-gray-700 font-mono"
                    />
                </div>
                <div className="relative">
                    <label htmlFor="entryDate" className="block text-sm font-medium text-gray-700 mb-1">📅 تاريخ القيد</label>
                    <input
                        type="date"
                        id="entryDate"
                        value={entry.date}
                        onChange={(e) => setEntry(prev => ({ ...prev, date: e.target.value }))}
                        className="block w-full rounded-md border-gray-300 shadow-sm p-2.5 text-gray-700"
                    />
                </div>
                <div className="md:col-span-2 relative">
                    <label htmlFor="generalDescription" className="block text-sm font-medium text-gray-700 mb-1">📝 البيان العام</label>
                    <input
                        type="text"
                        id="generalDescription"
                        value={entry.generalDescription}
                        onChange={(e) => setEntry(prev => ({ ...prev, generalDescription: e.target.value }))}
                        placeholder="مثال: شراء أثاث للمكتب"
                        className="block w-full rounded-md border-gray-300 shadow-sm p-2.5 text-gray-700"
                    />
                </div>
                <div className="relative">
                    <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">👤 المستخدم</label>
                    <input
                        type="text"
                        id="user"
                        value="المستخدم الحالي"
                        readOnly
                        className="block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2.5 text-gray-700"
                    />
                </div>
            </div>
        </div>
        <div className="space-y-4 mb-6">
          {entry.lines.map((line, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="md:col-span-2 relative">
                <label htmlFor={`account-${index}`} className="block text-sm font-medium text-gray-700 mb-1">🧾 الحساب</label>
                <select
                  id={`account-${index}`}
                  value={line.account}
                  onChange={(e) => handleLineChange(index, 'account', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2.5 text-gray-700"
                >
                  <option value="">اختر حساب</option>
                  {recentlyUsedAccounts.length > 0 && (
                    <optgroup label="الحسابات المستخدمة مؤخراً">
                      {recentlyUsedAccounts.map(account => (
                        <option key={`recent-${account.id}`} value={account.id}>
                          {account.name} <span className={account.color}>({account.type})</span>
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {Object.entries(
                    chartOfAccounts.reduce((acc, account) => {
                      (acc[account.type] = acc[account.type] || []).push(account);
                      return acc;
                    }, {})
                  ).map(([type, accounts]) => (
                    <optgroup key={type} label={`--- ${type} ---`}>
                      {accounts.map(account => (
                        <option key={account.id} value={account.id}>
                          {account.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 relative">
                <label htmlFor={`lineDescription-${index}`} className="block text-sm font-medium text-gray-700 mb-1">✏️ البيان الخاص بالسطر</label>
                <input
                  type="text"
                  id={`lineDescription-${index}`}
                  value={line.description}
                  onChange={(e) => handleLineChange(index, 'description', e.target.value)}
                  placeholder="مثل: شراء مكتب"
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2.5 text-gray-700"
                />
              </div>
              <div className="relative">
                <label htmlFor={`debit-${index}`} className="block text-sm font-medium text-gray-700 mb-1">💰 مدين</label>
                <input
                  type="number"
                  id={`debit-${index}`}
                  value={line.debit}
                  onChange={(e) => handleLineChange(index, 'debit', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2.5 text-gray-700"
                  min="0"
                />
              </div>
              <div className="relative">
                <label htmlFor={`credit-${index}`} className="block text-sm font-medium text-gray-700 mb-1">💰 دائن</label>
                <input
                  type="number"
                  id={`credit-${index}`}
                  value={line.credit}
                  onChange={(e) => handleLineChange(index, 'credit', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2.5 text-gray-700"
                  min="0"
                />
              </div>
              <div className="md:col-span-6 flex justify-end">
                <button
                  onClick={() => handleDeleteLine(index)}
                  className="text-red-600 hover:text-red-800 flex items-center text-sm"
                >
                  <Trash size={16} className="ml-1" />
                  حذف السطر
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddLine}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-sm flex items-center transition-colors duration-200 mb-6"
        >
          <Plus size={20} className="ml-2" />
          إضافة سطر جديد
        </button>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🧮 مجموع المبالغ</h3>
            <div className="flex justify-between items-center mb-2">
                <div className="text-base font-medium text-gray-800">
                    إجمالي المدين: <span className="text-blue-600 font-bold">{totalDebit.toFixed(2)}</span>
                </div>
                <div className="text-base font-medium text-gray-800">
                    إجمالي الدائن: <span className="text-green-600 font-bold">{totalCredit.toFixed(2)}</span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-gray-800">
                    الفرق: <span className={`${(totalDebit - totalCredit) === 0 ? 'text-green-600' : 'text-red-600'}`}>{Math.abs(totalDebit - totalCredit).toFixed(2)}</span>
                </div>
                {(totalDebit - totalCredit) === 0 && totalDebit > 0 && (
                    <CheckCircle size={24} className="text-green-500" />
                )}
            </div>
        </div>

        {!isBalanced && (totalDebit !== 0 || totalCredit !== 0) && (
          <div className="flex items-center p-3 mb-6 bg-red-100 text-red-700 rounded-lg">
            <AlertTriangle size={20} className="ml-2" />
            <span className="font-medium">⚠️ القيد غير متوازن، لا يمكن الحفظ.</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-3 md:space-x-reverse">
          <button
            onClick={handleSaveEntry}
            disabled={!isBalanced || !isFormValid}
            className={`flex items-center py-3 px-6 rounded-full shadow-lg transition-colors duration-200 text-lg ${
              isBalanced && isFormValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save size={24} className="ml-2" />
            حفظ القيد
          </button>
          <button
            onClick={handleClearForm}
            className="flex items-center py-3 px-6 rounded-full shadow-lg transition-colors duration-200 text-lg bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            <RefreshCcw size={24} className="ml-2" />
            إفراغ النموذج
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="flex items-center py-3 px-6 rounded-full shadow-lg transition-colors duration-200 text-lg bg-red-500 hover:bg-red-600 text-white"
          >
            <XCircle size={24} className="ml-2" />
            رجوع للقائمة
          </button>
        </div>
      </div>
    </div>
  );
};

export const InputEntry = () => {
  const [dailyEntries, setDailyEntries] = useState([
    { id: '001', date: '2024-07-10', entryType: 'manual', description: 'شراء أثاث نقداً', lineCount: 2, user: 'أحمد محمد', status: 'معتمد', detailedLines: [
        { account: '1202', description: 'شراء أثاث للمكتب', debit: '5000', credit: '' },
        { account: '1101', description: 'دفع نقدي من الصندوق', debit: '', credit: '5000' }
    ]},
    { id: '002', date: '2024-07-09', entryType: 'automatic', operationType: 'invoice', description: 'فاتورة مبيعات رقم 4001', lineCount: 2, user: 'فاطمة علي', status: 'معتمد', detailedLines: [
        { account: '1103', description: 'مبيعات لعميل X', debit: '1500', credit: '' },
        { account: '4100', description: 'إيراد مبيعات قهوة', debit: '', credit: '1500' }
    ]},
    { id: '003', date: '2024-07-08', entryType: 'manual', description: 'دفع إيجار المحل', lineCount: 2, user: 'علي حسن', status: 'قيد المراجعة', detailedLines: [
        { account: '5201', description: 'إيجار شهر يوليو', debit: '2000', credit: '' },
        { account: '1102', description: 'دفع من الحساب البنكي', debit: '', credit: '2000' }
    ]},
    { id: '125', date: '2025-07-10', entryType: 'automatic', operationType: 'invoice', description: 'فاتورة مبيعات رقم 4001', lineCount: 2, user: 'مدير النظام', status: 'معتمد', detailedLines: [
        { account: '1103', description: 'مبيعات لعميل Y', debit: '2500', credit: '' },
        { account: '4100', description: 'إيراد مبيعات قهوة', debit: '', credit: '2500' }
    ]},
    { id: '126', date: '2025-07-11', entryType: 'manual', description: 'إيداع رأس مال', lineCount: 2, user: 'المستخدم الحالي', status: 'معتمد', detailedLines: [
        { account: '1102', description: 'إيداع نقدي في البنك', debit: '100000', credit: '' },
        { account: '3100', description: 'زيادة رأس المال', debit: '', credit: '100000' }
    ]},
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
        <button
          onClick={() => setCurrentTab('all')}
          className={`flex-1 py-3 px-6 rounded-lg font-bold text-lg transition-colors duration-200 ${
            currentTab === 'all' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          جميع القيود
        </button>
        <button
          onClick={() => setCurrentTab('my')}
          className={`flex-1 py-3 px-6 rounded-lg font-bold text-lg transition-colors duration-200 ${
            currentTab === 'my' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          القيود الخاصة بي
        </button>
      </div>

      <JournalEntriesListView
        dailyEntries={entriesToShow}
        onAddEntry={handleAddEntryClick}
        onEditEntry={handleEditEntryClick}
        onViewEntry={setSelectedEntryForView}
        title={currentTab === 'all' ? 'عرض جميع القيود المحاسبية' : 'عرض القيود المحاسبية الخاصة بي'}
      />

      {showNewEntryModal && <NewJournalEntryForm
        showModal={showNewEntryModal}
        setShowModal={setShowNewEntryModal}
        initialEntry={currentEntryForForm}
        onSave={handleSaveForm}
        dailyEntries={dailyEntries}
      />}

      {selectedEntryForView && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">تفاصيل القيد المحاسبي #{selectedEntryForView.id}</h2>
              <button onClick={() => setSelectedEntryForView(null)} className="text-gray-500 hover:text-gray-700">
                <XCircle size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div><p className="text-sm text-gray-700">رقم القيد:</p><p className="text-lg font-bold">{selectedEntryForView.id}</p></div>
              <div><p className="text-sm text-gray-700">التاريخ:</p><p className="text-lg font-bold">{selectedEntryForView.date}</p></div>
              <div className="md:col-span-2"><p className="text-sm text-gray-700">البيان:</p><p className="text-lg font-bold">{selectedEntryForView.description}</p></div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">السطور التفصيلية</h3>
            <table className="min-w-full divide-y divide-gray-200 mb-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحساب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">مدين</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">دائن</th>
                </tr>
              </thead>
              <tbody>
                {selectedEntryForView.detailedLines.map((line, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">{chartOfAccounts.find(acc => acc.id === line.account)?.name || line.account}</td>
                    <td className="px-6 py-4">{line.debit}</td>
                    <td className="px-6 py-4">{line.credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

    