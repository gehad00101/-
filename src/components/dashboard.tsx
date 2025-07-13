"use client";

import { useState, useMemo } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data fetching, replace with your actual API calls
const fetchDashboardData = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    totalIncome: 125000,
    totalExpenses: 78000,
    profitLoss: 47000,
    invoice_count: 152,
    monthly_data: [
      { month: 'Jan', revenue: 15000, expense: 8000 },
      { month: 'Feb', revenue: 18000, expense: 9500 },
      { month: 'Mar', revenue: 22000, expense: 12000 },
      { month: 'Apr', revenue: 20000, expense: 11000 },
      { month: 'May', revenue: 25000, expense: 15000 },
      { month: 'Jun', revenue: 25000, expense: 12500 },
    ],
    cash_flow_summary: 'Positive cash flow from operating activities, with significant investment in new equipment.'
  };
};

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useState(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
        toast({ title: 'Success', description: 'Dashboard data loaded successfully.' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to load dashboard data.' });
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  });

  const maxMonthlyValue = useMemo(() => {
    if (!dashboardData?.monthly_data) return 0;
    return Math.max(
      ...dashboardData.monthly_data.map((data: any) => Math.max(data.revenue, data.expense, 0))
    );
  }, [dashboardData]);

  if (loading || !dashboardData) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">لوحة التحكم</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24 md:col-span-2" />
          </div>
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  const { totalIncome, totalExpenses, profitLoss } = dashboardData;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6 text-right">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">لوحة التحكم</h2>
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline text-primary">
                {totalIncome.toFixed(2)} ريال
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المصروفات</CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline text-destructive">
                {totalExpenses.toFixed(2)} ريال
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">صافي الربح/الخسارة</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold font-headline ${profitLoss >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {profitLoss.toFixed(2)} ريال
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">الأداء الشهري (إيرادات ومصروفات)</h3>
          {dashboardData.monthly_data.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">لا توجد بيانات شهرية لعرض الرسم البياني.</p>
          ) : (
            <div className="flex justify-around items-end h-64 border-b-2 border-r-2 border-gray-300 pt-4 pr-4">
              {dashboardData.monthly_data.map((data: any, index: number) => (
                <div key={index} className="flex flex-col items-center mx-2 w-1/6">
                  <div
                    className="bg-green-500 w-8 rounded-t-md relative"
                    style={{ height: `${(data.revenue / maxMonthlyValue) * 100}%` }}
                    title={`إيرادات ${data.month}: ${data.revenue.toFixed(2)}`}
                  >
                    <span className="absolute -top-6 text-xs font-semibold text-green-700 w-full text-center">
                      {data.revenue > 0 ? data.revenue.toFixed(0) : ''}
                    </span>
                  </div>
                  <div
                    className="bg-red-500 w-8 rounded-b-md relative"
                    style={{ height: `${(data.expense / maxMonthlyValue) * 100}%` }}
                    title={`مصروفات ${data.month}: ${data.expense.toFixed(2)}`}
                  >
                     <span className="absolute -bottom-6 text-xs font-semibold text-red-700 w-full text-center">
                      {data.expense > 0 ? data.expense.toFixed(0) : ''}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
