'use client';

import { useState, useEffect, FC } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data, replace with your actual API calls
const fetchEntries = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, description: 'شراء لوازم مكتبية', debit_account: 'مصروفات مكتبية', credit_account: 'النقدية', amount: 500.00, account_type: 'expense', cash_flow_type: 'operational', date: new Date().toISOString() },
    { id: 2, description: 'إيرادات مبيعات', debit_account: 'النقدية', credit_account: 'إيرادات المبيعات', amount: 15000.00, account_type: 'revenue', cash_flow_type: 'operational', date: new Date().toISOString() },
  ];
};

const fetchCoaAccounts = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 101, name: 'النقدية', parent_id: 1 },
    { id: 102, name: 'حسابات مدينة', parent_id: 1 },
    { id: 201, name: 'حسابات دائنة', parent_id: 2 },
    { id: 401, name: 'إيرادات المبيعات', parent_id: 4 },
    { id: 501, name: 'مصروفات مكتبية', parent_id: 5 },
  ];
};

interface InputEntryProps {
  userRole: 'admin' | 'accountant' | 'viewer';
}

export const InputEntry: FC<InputEntryProps> = ({ userRole }) => {
  const [description, setDescription] = useState("");
  const [debitAccount, setDebitAccount] = useState("");
  const [creditAccount, setCreditAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [accountType, setAccountType] = useState("");
  const [cashFlowType, setCashFlowType] = useState("");
  const [entries, setEntries] = useState<any[]>([]);
  const [coaAccounts, setCoaAccounts] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [entriesData, coaData] = await Promise.all([fetchEntries(), fetchCoaAccounts()]);
        setEntries(entriesData);
        setCoaAccounts(coaData);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to load initial data.' });
      }
    };
    loadData();
  }, [toast]);

  const handleAddEntry = async () => {
    if (!description || !debitAccount || !creditAccount || !amount || !accountType) {
      toast({ variant: 'destructive', title: 'Error', description: 'اكمل كل الحقول من فضلك.' });
      return;
    }
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast({ variant: 'destructive', title: 'Error', description: 'المبلغ يجب أن يكون رقمًا موجبًا.' });
      return;
    }
    
    // Mock API call
    console.log("Adding entry:", { description, debitAccount, creditAccount, amount, accountType, cashFlowType });
    toast({ title: 'Success', description: 'تمت إضافة القيد بنجاح!' });
    
    // Optimistically update UI
    const newEntry = {
      id: crypto.randomUUID(),
      description,
      debit_account: debitAccount,
      credit_account: creditAccount,
      amount: parseFloat(amount),
      account_type: accountType,
      cash_flow_type: cashFlowType || null,
      date: new Date().toISOString()
    };
    setEntries(prev => [newEntry, ...prev]);

    // Reset form
    setDescription("");
    setDebitAccount("");
    setCreditAccount("");
    setAmount("");
    setAccountType("");
    setCashFlowType("");
  };

  const canAddEntry = userRole === 'admin' || userRole === 'accountant';

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6 text-right">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">إدخال قيد محاسبي</h2>

      {!canAddEntry && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-right mb-4" role="alert">
          <span className="block sm:inline">ليس لديك صلاحية لإضافة قيود.</span>
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ${!canAddEntry ? 'opacity-50 pointer-events-none' : ''}`}>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-lg font-medium mb-2">الوصف:</label>
          <Input id="description" placeholder="مثال: شراء لوازم مكتبية" value={description} onChange={(e) => setDescription(e.target.value)} disabled={!canAddEntry} className="text-right" />
        </div>
        <div>
          <label htmlFor="debitAccount" className="block text-gray-700 text-lg font-medium mb-2">الحساب المدين:</label>
           <Select onValueChange={setDebitAccount} value={debitAccount} disabled={!canAddEntry}>
                <SelectTrigger id="debitAccount"><SelectValue placeholder="اختر الحساب المدين" /></SelectTrigger>
                <SelectContent>
                    {coaAccounts.map((account) => <SelectItem key={account.id} value={account.name}>{account.name}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
        <div>
          <label htmlFor="creditAccount" className="block text-gray-700 text-lg font-medium mb-2">الحساب الدائن:</label>
          <Select onValueChange={setCreditAccount} value={creditAccount} disabled={!canAddEntry}>
                <SelectTrigger id="creditAccount"><SelectValue placeholder="اختر الحساب الدائن" /></SelectTrigger>
                <SelectContent>
                    {coaAccounts.map((account) => <SelectItem key={account.id} value={account.name}>{account.name}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
        <div>
          <label htmlFor="amount" className="block text-gray-700 text-lg font-medium mb-2">المبلغ:</label>
          <Input id="amount" type="number" placeholder="مثال: 500.00" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={!canAddEntry} className="text-right" />
        </div>
        <div>
          <label htmlFor="accountType" className="block text-gray-700 text-lg font-medium mb-2">نوع الحساب:</label>
          <Select onValueChange={setAccountType} value={accountType} disabled={!canAddEntry}>
                <SelectTrigger id="accountType"><SelectValue placeholder="اختر نوع الحساب" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="revenue">إيراد</SelectItem>
                    <SelectItem value="expense">مصروف</SelectItem>
                    <SelectItem value="asset">أصل</SelectItem>
                    <SelectItem value="liability">التزام</SelectItem>
                    <SelectItem value="equity">حقوق الملكية</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div>
          <label htmlFor="cashFlowType" className="block text-gray-700 text-lg font-medium mb-2">نوع التدفق النقدي (اختياري):</label>
           <Select onValueChange={setCashFlowType} value={cashFlowType} disabled={!canAddEntry}>
                <SelectTrigger id="cashFlowType"><SelectValue placeholder="اختر نوع التدفق النقدي" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="operational">تشغيلي</SelectItem>
                    <SelectItem value="investing">استثماري</SelectItem>
                    <SelectItem value="financing">تمويلي</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <Button onClick={handleAddEntry} disabled={!canAddEntry} className="w-full md:w-auto">
        إضافة القيد
      </Button>

      <h3 className="mt-8 text-2xl font-bold text-gray-800 mb-4 text-center">القيود المسجلة:</h3>
      {entries.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">لا توجد قيود مسجلة بعد.</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => (
            <li key={entry.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-800 font-semibold text-lg">{entry.description}</p>
              <p className="text-gray-700 text-md mt-1">
                <span className="font-medium">مدين:</span> {entry.debit_account} |
                <span className="font-medium"> دائن:</span> {entry.credit_account} |
                <span className="font-medium"> المبلغ:</span> {entry.amount.toFixed(2)}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                <span className="font-medium">النوع:</span> {entry.account_type}
                {entry.cash_flow_type && <span className="font-medium"> | تدفق نقدي:</span>} {entry.cash_flow_type} |
                التاريخ: {new Date(entry.date).toLocaleString('ar-EG', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
