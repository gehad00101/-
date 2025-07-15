'use client';

import { useState, useEffect } from 'react';
import { getDashboardInsight } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Briefcase,
  AlertCircle,
  Banknote,
  Wand2,
  Copy,
  Receipt,
  Landmark,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// Dummy data for financial metrics
const financialData = {
  total_revenue: 120000,
  total_expenses: 85000,
  net_profit: 35000,
  cash_balance: 50000,
  invoice_count: 75,
};

// Dummy monthly data for the bar chart
const monthlyData = [
  { month: 'يناير', revenue: 18000, expense: 13000 },
  { month: 'فبراير', revenue: 22000, expense: 15000 },
  { month: 'مارس', revenue: 20000, expense: 14000 },
  { month: 'أبريل', revenue: 25000, expense: 17000 },
  { month: 'مايو', revenue: 23000, expense: 16000 },
  { month: 'يونيو', revenue: 28000, expense: 19000 },
];

// Dummy data for expense structure pie chart
const expenseData = [
  { name: 'الرواتب', value: 40000 },
  { name: 'الإيجار', value: 15000 },
  { name: 'التسويق', value: 10000 },
  { name: 'المشتريات', value: 12000 },
  { name: 'مصاريف أخرى', value: 8000 },
];

const COLORS = ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

// Dummy data for key account balances
const accountBalances = [
  { name: 'النقدية بالصندوق', balance: 15000, icon: <Banknote className="text-green-500" /> },
  { name: 'الحساب البنكي', balance: 35000, icon: <Landmark className="text-blue-500" /> },
  { name: 'الذمم المدينة (العملاء)', balance: 25000, icon: <Receipt className="text-orange-500" /> },
  { name: 'الذمم الدائنة (الموردين)', balance: 18000, icon: <Receipt className="text-red-500" /> },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState('');
  const [insightLoading, setInsightLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateInsight = async () => {
    setInsightLoading(true);
    setInsight('');
    try {
      const dataForInsight = {
        ...financialData,
        monthly_data: monthlyData,
      };
      const result = await getDashboardInsight(dataForInsight);
      setInsight(result);
      toast({ title: 'Success', description: 'تم إنشاء التحليل بنجاح.' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'فشل إنشاء التحليل.',
      });
      console.error('Error generating insight:', error);
    } finally {
      setInsightLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Skeleton className="lg:col-span-3 h-80" />
          <Skeleton className="lg:col-span-2 h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* KPIs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-r-4 border-green-500">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-600">إجمالي الإيرادات</h3>
            <TrendingUp className="text-green-500" size={28} />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {financialData.total_revenue.toLocaleString('ar-SA')} ر.س
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-r-4 border-red-500">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-600">إجمالي المصروفات</h3>
            <TrendingDown className="text-red-500" size={28} />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {financialData.total_expenses.toLocaleString('ar-SA')} ر.س
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-r-4 border-blue-500">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-600">صافي الربح</h3>
            <DollarSign className="text-blue-500" size={28} />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {financialData.net_profit.toLocaleString('ar-SA')} ر.س
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-r-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-600">السيولة النقدية</h3>
            <Briefcase className="text-yellow-500" size={28} />
          </div>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {financialData.cash_balance.toLocaleString('ar-SA')} ر.س
          </p>
        </div>
      </div>

      {/* AI Insight Section */}
       <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">نظرة عامة تحليلية</h3>
          <Button onClick={handleGenerateInsight} disabled={insightLoading}>
            {insightLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div> : <Wand2 className="ml-2 h-4 w-4" />}
            توليد تحليل بالذكاء الاصطناعي
          </Button>
        </div>
        {insightLoading && <p className="text-gray-600">جاري تحليل البيانات...</p>}
        {insight && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 relative">
            <p className="text-gray-700 whitespace-pre-line">{insight}</p>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 left-2"
              onClick={() => {
                navigator.clipboard.writeText(insight);
                toast({ title: "Copied!", description: "تم نسخ التحليل." });
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>


      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">الإيرادات مقابل المصروفات</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#6b7280' }} />
              <YAxis tick={{ fill: '#6b7280' }} tickFormatter={(value) => `${value / 1000} ألف`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.75rem',
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#22c55e" name="الإيرادات" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="#ef4444" name="المصروفات" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">هيكل المصروفات</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${Number(value).toLocaleString('ar-SA')} ر.س`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

       {/* Key Balances & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">أرصدة الحسابات الرئيسية</h3>
            <div className="space-y-4">
                {accountBalances.map(account => (
                     <div key={account.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <div className="p-2 bg-white rounded-full mr-3">{account.icon}</div>
                            <span className="font-medium text-gray-700">{account.name}</span>
                        </div>
                        <span className="font-bold text-gray-800 text-lg">{account.balance.toLocaleString('ar-SA')} ر.س</span>
                     </div>
                ))}
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">إجراءات سريعة</h3>
             <div className="grid grid-cols-2 gap-4">
                 <Button variant="outline" className="h-20 text-lg">إضافة فاتورة بيع</Button>
                 <Button variant="outline" className="h-20 text-lg">إضافة فاتورة شراء</Button>
                 <Button variant="outline" className="h-20 text-lg">تسجيل مصروف</Button>
                 <Button variant="outline" className="h-20 text-lg">عرض كشف حساب</Button>
             </div>
        </div>
      </div>
    </div>
  );
}
