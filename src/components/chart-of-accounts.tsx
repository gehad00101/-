"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Edit, Trash, Plus, Search, Filter, Save, XCircle } from 'lucide-react';
import { chartOfAccounts as initialAccounts } from '@/lib/data';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from './ui/dialog';
import { Label } from './ui/label';

const AccountNode = ({ account, level = 0, onEdit, onDelete, allAccounts }) => {
  const [isExpanded, setIsExpanded] = useState(level < 1);
  const hasChildren = useMemo(() => allAccounts.some(acc => acc.id.startsWith(account.id) && acc.id.length > account.id.length), [allAccounts, account.id]);

  const toggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

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

  const directChildren = useMemo(() => {
    if (!hasChildren) return [];
    return allAccounts
      .filter(acc => acc.parentId === account.id)
      .sort((a, b) => a.id.localeCompare(b.id));
  }, [allAccounts, account.id, hasChildren]);


  return (
    <div className={`mb-2 ${level > 0 ? 'border-r-2 border-gray-200 pr-4' : ''}`}>
      <div
        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
          level === 0 ? 'bg-blue-50 hover:bg-blue-100 shadow-sm' : 'bg-gray-50 hover:bg-gray-100'
        }`}
        onClick={toggleExpand}
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
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onEdit(account); }} title="تعديل الحساب">
            <Edit size={18} className="text-indigo-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onDelete(account); }} title="حذف الحساب">
            <Trash size={18} className="text-red-600" />
          </Button>
        </div>
      </div>
      {isExpanded && hasChildren && (
        <div className="mt-2 mr-6">
          {directChildren.map(childAccount => (
            <AccountNode
              key={childAccount.id}
              account={childAccount}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
              allAccounts={allAccounts}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const AddEditAccountModal = ({ showModal, onClose, onSave, initialAccount }) => {
    const [account, setAccount] = useState(initialAccount || { id: '', name: '', type: '', parentId: null });
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (showModal) {
        setAccount(initialAccount || { id: '', name: '', type: '', parentId: null });
        setError('');
      }
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
      return initialAccounts.filter(acc => acc.type === 'رئيسي' || (acc.id.length < 4 && (!account.id || acc.id.length < account.id.length)));
    }, [account.id]);
  
    return (
      <Dialog open={showModal} onOpenChange={onClose}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle>{initialAccount ? 'تعديل حساب' : 'إضافة حساب جديد'}</DialogTitle>
          </DialogHeader>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">خطأ!</strong>
              <span className="block sm:inline mr-2">{error}</span>
            </div>
          )}
  
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountId" className="text-right">رقم الحساب:</Label>
              <Input id="accountId" value={account.id} onChange={(e) => setAccount({ ...account, id: e.target.value })} className="col-span-3" placeholder="مثال: 1101" readOnly={!!initialAccount} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountName" className="text-right">اسم الحساب:</Label>
              <Input id="accountName" value={account.name} onChange={(e) => setAccount({ ...account, name: e.target.value })} className="col-span-3" placeholder="مثال: الصندوق" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountType" className="text-right">تصنيف الحساب:</Label>
              <Select onValueChange={(value) => setAccount({ ...account, type: value })} value={account.type}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر تصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="رئيسي">رئيسي</SelectItem>
                  <SelectItem value="الأصول">الأصول</SelectItem>
                  <SelectItem value="الالتزامات">الالتزامات</SelectItem>
                  <SelectItem value="حقوق الملكية">حقوق الملكية</SelectItem>
                  <SelectItem value="الإيرادات">الإيرادات</SelectItem>
                  <SelectItem value="المصروفات">المصروفات</SelectItem>
                  <SelectItem value="الحسابات الختامية">الحسابات الختامية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {account.type !== 'رئيسي' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parentAccount" className="text-right">الحساب الأب:</Label>
                <Select onValueChange={(value) => setAccount({ ...account, parentId: value })} value={account.parentId}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="اختر حساب أب" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableParentAccounts.map(parent => (
                            <SelectItem key={parent.id} value={parent.id}>
                                {parent.id} - {parent.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
            )}
          </div>
  
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">إلغاء</Button>
            </DialogClose>
            <Button onClick={handleSubmit}><Save size={20} className="ml-2" />حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
};
  
const ChartOfAccounts = () => {
    const [accounts, setAccounts] = useState(initialAccounts);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [accountToEdit, setAccountToEdit] = useState(null);
  
    const filteredAccounts = useMemo(() => {
      return accounts.filter(account => {
        const matchesSearch = searchTerm ?
          (account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           account.id.includes(searchTerm)) : true;
        const matchesType = filterType ? account.type === filterType : true;
        return matchesSearch && matchesType;
      });
    }, [accounts, searchTerm, filterType]);
  
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
  
    const topLevelAccounts = useMemo(() => {
      return filteredAccounts.filter(acc => acc.parentId === null);
    }, [filteredAccounts]);

    return (
      <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">دليل الحسابات</h1>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse">
            <Button onClick={handleAddAccount} className="text-lg py-3 px-6 rounded-full">
              <Plus size={24} className="ml-2" />
              إضافة حساب جديد
            </Button>
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="بحث برقم أو اسم الحساب..."
                className="pr-10 pl-4 py-2 rounded-full bg-gray-100"
                dir="rtl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
  
        <div className="p-6 rounded-xl mb-6 border border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><Filter size={20} className="ml-2" /> فلترة حسب التصنيف</h3>
          <Select onValueChange={setFilterType} value={filterType}>
            <SelectTrigger className="w-full md:w-1/3">
              <SelectValue placeholder="جميع التصنيفات" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="">جميع التصنيفات</SelectItem>
                <SelectItem value="رئيسي">رئيسي</SelectItem>
                <SelectItem value="الأصول">الأصول</SelectItem>
                <SelectItem value="الالتزامات">الالتزامات</SelectItem>
                <SelectItem value="حقوق الملكية">حقوق الملكية</SelectItem>
                <SelectItem value="الإيرادات">الإيرادات</SelectItem>
                <SelectItem value="المصروفات">المصروفات</SelectItem>
                <SelectItem value="الحسابات الختامية">الحسابات الختامية</SelectItem>
            </SelectContent>
          </Select>
        </div>
  
        <div className="p-6 rounded-xl shadow-inner mb-6 border border-gray-200 bg-gray-50/50">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">شجرة الحسابات</h3>
          {topLevelAccounts.length > 0 ? (
            <div className="space-y-3">
              {topLevelAccounts.map(account => (
                <AccountNode
                  key={account.id}
                  account={account}
                  onEdit={handleEditAccount}
                  onDelete={handleDeleteAccount}
                  allAccounts={accounts}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">لا توجد حسابات تطابق معايير البحث.</p>
          )}
        </div>
  
        <AddEditAccountModal
          showModal={showAddEditModal}
          onClose={() => setShowAddEditModal(false)}
          onSave={handleSaveAccount}
          initialAccount={accountToEdit}
        />
      </div>
    );
};

export default ChartOfAccounts;
