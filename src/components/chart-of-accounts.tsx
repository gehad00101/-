'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface Account {
  id: number;
  name: string;
  type: string;
  parent_id: number | null;
  children?: Account[];
}

// Mock data fetching
const fetchCoaAccounts = async (): Promise<Account[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: 'الأصول', type: 'Category', parent_id: null },
    { id: 2, name: 'الخصوم', type: 'Category', parent_id: null },
    { id: 3, name: 'حقوق الملكية', type: 'Category', parent_id: null },
    { id: 4, name: 'الإيرادات', type: 'Category', parent_id: null },
    { id: 5, name: 'المصروفات', type: 'Category', parent_id: null },
    { id: 101, name: 'الأصول المتداولة', type: 'Sub-Category', parent_id: 1 },
    { id: 102, name: 'الأصول الثابتة', type: 'Sub-Category', parent_id: 1 },
    { id: 10101, name: 'النقدية', type: 'Account', parent_id: 101 },
    { id: 10102, name: 'حسابات مدينة', type: 'Account', parent_id: 101 },
    { id: 401, name: 'إيرادات المبيعات', type: 'Account', parent_id: 4 },
  ];
};

const CoaNode = ({ account, level = 0 }: { account: Account, level?: number }) => (
  <li className={`mb-1 ${level > 0 ? 'mr-4' : ''}`}>
    <div className={`flex items-center p-2 rounded-md ${
      level === 0 ? 'bg-gray-200 font-bold text-gray-800' : 
      level === 1 ? 'bg-gray-100 font-semibold text-gray-700' : 
      'bg-gray-50 text-gray-700 border border-gray-200'
    }`}>
      <span className="ml-2">{account.name}</span>
      <span className="text-sm text-gray-500 mr-auto">({account.type})</span>
    </div>
    {account.children && account.children.length > 0 && (
      <ul className="mt-2">
        {account.children.map(child => (
          <CoaNode key={child.id} account={child} level={level + 1} />
        ))}
      </ul>
    )}
  </li>
);

export const ChartOfAccounts = () => {
  const [coaTree, setCoaTree] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const accounts = await fetchCoaAccounts();
        const buildTree = (items: Account[], parentId: number | null = null): Account[] => {
          return items
            .filter(item => item.parent_id === parentId)
            .map(item => ({ ...item, children: buildTree(items, item.id) }));
        };
        setCoaTree(buildTree(accounts));
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to load Chart of Accounts.' });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [toast]);
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6 text-right">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">دليل الحسابات</h2>
      {loading ? (
        <div className="space-y-2">
            {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
        </div>
      ) : coaTree.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">لا توجد حسابات في دليل الحسابات بعد.</p>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <ul className="list-none p-0">
            {coaTree.map(account => <CoaNode key={account.id} account={account} />)}
          </ul>
        </div>
      )}
    </div>
  );
};
