
'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit, Trash, ChevronDown, XCircle, Save } from 'lucide-react';

// Common data for Chart of Accounts
const initialChartOfAccounts = [
    { id: '1000', name: 'الأصول', type: 'رئيسي', color: 'text-gray-700', parentId: null },
    { id: '1100', name: 'الأصول المتداولة', type: 'الأصول', color: 'text-green-600', parentId: '1000' },
    { id: '1101', name: 'الصندوق', type: 'الأصول', color: 'text-green-600', parentId: '1100' },
    { id: '1102', name: 'الحساب البنكي', type: 'الأصول', color: 'text-green-600', parentId: '1100' },
    { id: '1103', name: 'حسابات العملاء', type: 'الأصول', color: 'text-green-600', parentId: '1100' },
    { id: '1104', name: 'المخزون (بن - حليب - كاسات)', type: 'الأصول', color: 'text-green-600', parentId: '1100' },
    { id: '1105', name: 'المصروفات المدفوعة مقدمًا', type: 'الأصول', color: 'text-green-600', parentId: '1100' },
    { id: '1106', name: 'أوراق القبض', type: 'الأصول', color: 'text-green-600', parentId: '1100' },
    { id: '1200', name: 'الأصول الثابتة', type: 'الأصول', color: 'text-green-600', parentId: '1000' },
    { id: '1201', name: 'معدات القهوة', type: 'الأصول', color: 'text-green-600', parentId: '1200' },
    { id: '1202', name: 'الأثاث والديكور', type: 'الأصول', color: 'text-green-600', parentId: '1200' },
    { id: '1203', name: 'الأجهزة الكهربائية', type: 'الأصول', color: 'text-green-600', parentId: '1200' },
    { id: '1204', name: 'كمبيوتر / POS', type: 'الأصول', color: 'text-green-600', parentId: '1200' },
    { id: '1205', name: 'مجمع الإهلاك', type: 'الأصول', color: 'text-green-600', parentId: '1200' },

    { id: '2000', name: 'الالتزامات', type: 'رئيسي', color: 'text-gray-700', parentId: null },
    { id: '2100', name: 'الالتزامات قصيرة الأجل', type: 'الالتزامات', color: 'text-red-600', parentId: '2000' },
    { id: '2101', name: 'الموردين', type: 'الالتزامات', color: 'text-red-600', parentId: '2100' },
    { id: '2102', name: 'مصروفات مستحقة', type: 'الالتزامات', color: 'text-red-600', parentId: '2100' },
    { id: '2103', name: 'رواتب مستحقة', type: 'الالتزامات', color: 'text-red-600', parentId: '2100' },
    { id: '2104', name: 'ضريبة القيمة المضافة', type: 'الالتزامات', color: 'text-red-600', parentId: '2100' },
    { id: '2200', name: 'الالتزامات طويلة الأجل', type: 'الالتزامات', color: 'text-red-600', parentId: '2000' },
    { id: '2201', name: 'قرض بنكي طويل الأجل', type: 'الالتزامات', color: 'text-red-600', parentId: '2200' },

    { id: '3000', name: 'حقوق الملكية', type: 'رئيسي', color: 'text-gray-700', parentId: null },
    { id: '3100', name: 'رأس المال', type: 'حقوق الملكية', color: 'text-purple-600', parentId: '3000' },
    { id: '3101', name: 'المسحوبات الشخصية', type: 'حقوق الملكية', color: 'text-purple-600', parentId: '3100' },
    { id: '3102', name: 'الأرباح المحتجزة', type: 'حقوق الملكية', color: 'text-purple-600', parentId: '3100' },

    { id: '4000', name: 'الإيرادات', type: 'رئيسي', color: 'text-gray-700', parentId: null },
    { id: '4100', name: 'مبيعات القهوة', type: 'الإيرادات', color: 'text-blue-600', parentId: '4000' },
    { id: '4101', name: 'مبيعات المشروبات الباردة', type: 'الإيرادات', color: 'text-blue-600', parentId: '4000' },
    { id: '4102', name: 'مبيعات الحلى والمعجنات', type: 'الإيرادات', color: 'text-blue-600', parentId: '4000' },
    { id: '4103', name: 'إيرادات أخرى', type: 'الإيرادات', color: 'text-blue-600', parentId: '4000' },

    { id: '5000', name: 'المصروفات', type: 'رئيسي', color: 'text-gray-700', parentId: null },
    { id: '5100', name: 'تكلفة المبيعات', type: 'المصروفات', color: 'text-orange-600', parentId: '5000' },
    { id: '5101', name: 'تكلفة البن', type: 'المصروفات', color: 'text-orange-600', parentId: '5100' },
    { id: '5102', name: 'تكلفة الحليب والمواد', type: 'المصروفات', color: 'text-orange-600', parentId: '5100' },
    { id: '5103', name: 'تكلفة الأكواب', type: 'المصروفات', color: 'text-orange-600', parentId: '5100' },
    { id: '5200', name: 'مصروفات تشغيلية', type: 'المصروفات', color: 'text-orange-600', parentId: '5000' },
    { id: '5201', name: 'إيجار المحل', type: 'المصروفات', color: 'text-orange-600', parentId: '5200' },
    { id: '5202', name: 'رواتب الموظفين', type: 'المصروفات', color: 'text-orange-600', parentId: '5200' },
    { id: '5203', name: 'كهرباء ومياه', type: 'المصروفات', color: 'text-orange-600', parentId: '5200' },

    { id: '6000', name: 'الحسابات الختامية', type: 'رئيسي', color: 'text-gray-700', parentId: null },
    { id: '6100', name: 'حساب الأرباح والخسائر', type: 'الحسابات الختامية', color: 'text-gray-600', parentId: '6000' },
    { id: '6200', name: 'حساب المتاجرة', type: 'الحسابات الختامية', color: 'text-gray-600', parentId: '6000' },
];

const AddEditAccountModal = ({ showModal, onClose, onSave, initialAccount, accounts }) => {
  const [account, setAccount] = useState(initialAccount || { id: '', name: '', type: '', parentId: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialAccount) {
      setAccount(initialAccount);
    } else {
      setAccount({ id: '', name: '', type: '', parentId: '' });
    }
    setError('');
  }, [initialAccount, showModal]);

  const handleSubmit = () => {
    if (!account.id || !account.name || !account.type) {
      setError('الرجاء ملء جميع الحقول المطلوبة.');
      return;
    }
    if (account.type !== 'رئيسي' && !account.parentId) {
        setError('يجب اختيار حساب أب للحسابات الفرعية.');
        return;
    }
    onSave(account);
    onClose();
  };

  const availableParentAccounts = useMemo(() => {
    return accounts.filter(acc => acc.type === 'رئيسي' || (acc.id.length < 4 && (!account.id || acc.id.length < account.id.length)));
  }, [accounts, account.id]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg" dir="rtl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          {initialAccount ? 'تعديل حساب' : 'إضافة حساب جديد'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">خطأ!</strong>
            <span className="block sm:inline mr-2">{error}</span>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="accountId" className="block text-sm font-medium text-gray-700 mb-1">رقم الحساب:</label>
          <input
            type="text"
            id="accountId"
            value={account.id}
            onChange={(e) => setAccount({ ...account, id: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="مثال: 1101"
            readOnly={!!initialAccount} // Disable editing ID for existing accounts
          />
        </div>
        <div className="mb-4">
          <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">اسم الحساب:</label>
          <input
            type="text"
            id="accountName"
            value={account.name}
            onChange={(e) => setAccount({ ...account, name: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="مثال: الصندوق"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">تصنيف الحساب:</label>
          <select
            id="accountType"
            value={account.type}
            onChange={(e) => setAccount({ ...account, type: e.target.value })}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">اختر تصنيف</option>
            <option value="رئيسي">رئيسي</option>
            <option value="الأصول">الأصول</option>
            <option value="الالتزامات">الالتزامات</option>
            <option value="حقوق الملكية">حقوق الملكية</option>
            <option value="الإيرادات">الإيرادات</option>
            <option value="المصروفات">المصروفات</option>
            <option value="الحسابات الختامية">الحسابات الختامية</option>
          </select>
        </div>
        {account.type !== 'رئيسي' && (
            <div className="mb-6">
                <label htmlFor="parentAccount" className="block text-sm font-medium text-gray-700 mb-1">الحساب الأب:</label>
                <select
                    id="parentAccount"
                    value={account.parentId || ''}
                    onChange={(e) => setAccount({ ...account, parentId: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">اختر حساب أب</option>
                    {availableParentAccounts.map(parent => (
                        <option key={parent.id} value={parent.id}>
                            {parent.id} - {parent.name}
                        </option>
                    ))}
                </select>
            </div>
        )}

        <div className="flex justify-end space-x-3 space-x-reverse">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-full shadow-md transition-colors duration-200"
          >
            <Save size={20} className="ml-2" />
            حفظ
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2.5 px-5 rounded-full shadow-md transition-colors duration-200"
          >
            <XCircle size={20} className="ml-2" />
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};


const AccountNode = ({ account, allAccounts, level = 0, onEdit, onDelete, expandedAccounts, toggleExpand }) => {
    const isExpanded = expandedAccounts[account.id];
    const children = allAccounts.filter(acc => acc.parentId === account.id);
    const hasChildren = children.length > 0;

  const getAccountColorClass = (type) => {
    switch (type) {
      case 'الأصول': return 'text-green-600';
      case 'الالتزامات': return 'text-red-600';
      case 'حقوق الملكية': return 'text-purple-600';
      case 'الإيرادات': return 'text-blue-600';
      case 'المصروفات': return 'text-orange-600';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className={`mb-1 ${level > 0 ? 'border-r-2 border-gray-200 pr-4' : ''}`}>
      <div
        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
          level === 0 ? 'bg-blue-50 hover:bg-blue-100 shadow-sm' : 'bg-gray-50 hover:bg-gray-100'
        }`}
        onClick={hasChildren ? () => toggleExpand(account.id) : undefined}
      >
        <div className="flex items-center">
          {hasChildren && (
            <ChevronDown
              size={18}
              className={`ml-2 transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
            />
          )}
          <span className={`font-mono text-sm ml-2 ${getAccountColorClass(account.type)}`}>
            {account.id}
          </span>
          <span className={`font-semibold ${level === 0 ? 'text-lg' : 'text-md'} ${getAccountColorClass(account.type)}`}>
            {account.name}
          </span>
          {account.type !== 'رئيسي' && (
            <span className="mr-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
              {account.type}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(account); }}
            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50"
            title="تعديل الحساب"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(account); }}
            className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
            title="حذف الحساب"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
      {isExpanded && hasChildren && (
        <div className="mt-2 mr-6">
          {children.sort((a,b) => a.id.localeCompare(b.id)).map(childAccount => (
              <AccountNode
                key={childAccount.id}
                account={childAccount}
                allAccounts={allAccounts}
                level={level + 1}
                onEdit={onEdit}
                onDelete={onDelete}
                expandedAccounts={expandedAccounts}
                toggleExpand={toggleExpand}
              />
            ))}
        </div>
      )}
    </div>
  );
};


export const ChartOfAccounts = () => {
  const [accounts, setAccounts] = useState(initialChartOfAccounts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);
  const [expandedAccounts, setExpandedAccounts] = useState({});

  const filteredAccounts = useMemo(() => {
    if (!searchTerm) return accounts;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    // Find matching accounts and their parents
    const matchingIds = new Set();
    accounts.forEach(account => {
        if(account.name.toLowerCase().includes(lowerCaseSearchTerm) || account.id.includes(lowerCaseSearchTerm)){
            matchingIds.add(account.id);
            let parentId = account.parentId;
            while(parentId) {
                matchingIds.add(parentId);
                const parent = accounts.find(a => a.id === parentId);
                parentId = parent ? parent.parentId : null;
            }
        }
    });

    return accounts.filter(account => matchingIds.has(account.id));
  }, [accounts, searchTerm]);

  useEffect(() => {
    // If searching, expand all filtered accounts
    if (searchTerm) {
        const expanded = {};
        filteredAccounts.forEach(acc => {
            if (accounts.some(child => child.parentId === acc.id)) {
                expanded[acc.id] = true;
            }
        });
        setExpandedAccounts(expanded);
    } else {
        setExpandedAccounts({});
    }
  }, [searchTerm, filteredAccounts, accounts]);

  const toggleExpand = (accountId) => {
    setExpandedAccounts(prev => ({ ...prev, [accountId]: !prev[accountId] }));
  };

  const handleAddAccount = () => {
    setAccountToEdit(null);
    setShowAddEditModal(true);
  };

  const handleEditAccount = (account) => {
    setAccountToEdit(account);
    setShowAddEditModal(true);
  };

  const handleDeleteAccount = (accountToDelete) => {
    if (window.confirm(`هل أنت متأكد أنك تريد حذف الحساب ${accountToDelete.name} (${accountToDelete.id})؟`)) {
      const hasChildren = accounts.some(acc => acc.parentId === accountToDelete.id);
      if (hasChildren) {
        alert('لا يمكن حذف هذا الحساب لأنه يحتوي على حسابات فرعية. الرجاء حذف الحسابات الفرعية أولاً.');
        return;
      }
      setAccounts(prev => prev.filter(acc => acc.id !== accountToDelete.id));
      alert(`تم حذف الحساب ${accountToDelete.name} بنجاح.`);
    }
  };

  const handleSaveAccount = (newAccount) => {
    if (accountToEdit) {
      setAccounts(prev => prev.map(acc => acc.id === newAccount.id ? newAccount : acc));
      alert('تم تحديث الحساب بنجاح!');
    } else {
      if (accounts.some(acc => acc.id === newAccount.id)) {
        alert('رقم الحساب موجود بالفعل. الرجاء اختيار رقم آخر.');
        return;
      }
      setAccounts(prev => [...prev, newAccount]);
      alert('تم إضافة الحساب بنجاح!');
    }
  };

  const accountTree = useMemo(() => {
      const tree = [];
      const map = {};

      filteredAccounts.forEach(account => {
          map[account.id] = {...account, children: []}
      });
      filteredAccounts.forEach(account => {
          if(account.parentId && map[account.parentId]){
             map[account.parentId].children.push(map[account.id])
          } else {
             tree.push(map[account.id]);
          }
      });
      return tree.sort((a,b) => a.id.localeCompare(b.id));

  }, [filteredAccounts]);
  

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">دليل الحسابات</h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse">
          <button
            onClick={handleAddAccount}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition-colors duration-200 text-lg"
          >
            <Plus size={24} className="ml-2" />
            إضافة حساب جديد
          </button>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="بحث برقم أو اسم الحساب..."
              className="pr-10 pl-4 py-2 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              dir="rtl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl shadow-md mb-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">شجرة الحسابات</h3>
        {accountTree.length === 0 && (
          <p className="text-gray-600 text-center py-8">لا توجد حسابات مطابقة لمعايير البحث.</p>
        )}
        <div className="space-y-1">
          {accountTree.map(rootAccount => (
            <AccountNode
              key={rootAccount.id}
              account={rootAccount}
              allAccounts={accounts}
              onEdit={handleEditAccount}
              onDelete={handleDeleteAccount}
              expandedAccounts={expandedAccounts}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      </div>

      <AddEditAccountModal
        showModal={showAddEditModal}
        onClose={() => setShowAddEditModal(false)}
        onSave={handleSaveAccount}
        initialAccount={accountToEdit}
        accounts={accounts}
      />
    </div>
  );
};

    