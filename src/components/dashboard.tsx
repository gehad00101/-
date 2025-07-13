"use client";

import { useState, useEffect, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  List,
  BarChart as BarChartIcon,
  Users,
  AlertCircle,
  MinusCircle,
  Percent,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, Legend, PieChart, Pie, Cell } from "recharts";

// Mock data, replace with your actual API calls
const fetchDashboardData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    total_revenue: 35000,
    total_expenses: 12000,
    net_profit: 23000,
    invoice_count: 8,
    monthly_data: [
      { month: "يناير", revenue: 3500, expense: 1500 },
      { month: "فبراير", revenue: 3800, expense: 1600 },
      { month: "مارس", revenue: 3200, expense: 1400 },
      { month: "أبريل", revenue: 4000, expense: 1800 },
      { month: "مايو", revenue: 3700, expense: 1700 },
      { month: "يونيو", revenue: 4200, expense: 1900 },
    ],
    cash_flow_summary:
      "Positive cash flow from operating activities, with significant investment in new equipment.",
  };
};

const expenseDistributionData = [
    { name: 'رواتب', value: 35 },
    { name: 'تشغيل', value: 25 },
    { name: 'تسويق', value: 20 },
    { name: 'إيجار', value: 10 },
    { name: 'أخرى', value: 10 },
];
const COLORS = ['#6366F1', '#EF4444', '#F59E0B', '#10B981', '#6B7280'];

const alertsData = [
  { type: 'تنبيه هام', description: 'فاتورة رقم #12345 مستحقة اليوم!', icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-50' },
  { type: 'تحليل ذكي', description: 'ارتفعت المصاريف التشغيلية بنسبة 15% هذا الشهر.', icon: BarChartIcon, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { type: 'تنبيه', description: 'العميل "شركة الأمل" اقترب من الحد الائتماني.', icon: Users, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  { type: 'تنبيه هام', description: 'خطأ محاسبي بسيط في قيد رقم #54321.', icon: MinusCircle, color: 'text-red-500', bgColor: 'bg-red-50' },
];

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load dashboard data.",
        });
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
        const loadTimer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(loadTimer);
      }
    };
    loadData();
  }, [toast]);

  const topCardsData = useMemo(() => {
    if (!dashboardData) return [];
    return [
      {
        title: 'الإيرادات',
        value: `${dashboardData.total_revenue.toFixed(2)} ريال`,
        icon: TrendingUp,
        description: 'نمو +8%',
        descriptionColor: 'text-green-400'
      },
      {
        title: 'المصروفات',
        value: `${dashboardData.total_expenses.toFixed(2)} ريال`,
        icon: TrendingDown,
        description: 'انخفاض -3%',
        descriptionColor: 'text-red-400'
      },
      {
        title: 'صافي الربح',
        value: `${dashboardData.net_profit.toFixed(2)} ريال`,
        icon: Percent,
        description: 'هامش ربح 65%',
        descriptionColor: 'text-amber-200'
      },
      {
        title: 'عدد القيود',
        value: `${dashboardData.invoice_count} قيود مُدخلة`,
        icon: List,
        description: 'آخر تحديث اليوم',
        descriptionColor: 'text-stone-200'
      },
    ];
  }, [dashboardData]);

  if (loading || !dashboardData) {
    return (
      <div className="p-6">
          <Skeleton className="h-8 w-1/3 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Skeleton className="lg:col-span-2 h-80" />
              <Skeleton className="h-80" />
          </div>
      </div>
    );
  }

  return (
    <main className={`flex-1 p-6 overflow-y-auto transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">لوحة التحكم الرئيسية</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {topCardsData.map((card, index) => (
                <Card
                key={index}
                className={`text-white p-0 rounded-lg shadow-xl flex flex-col justify-between aspect-square transform hover:scale-105 transition-transform duration-300 ease-out animate-fade-in ${
                  index === 0 ? 'bg-gray-900' : index === 1 ? 'bg-gray-800' : index === 2 ? 'bg-amber-600' : 'bg-stone-700'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-white">
                    <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
                    <card.icon className="h-8 w-8 opacity-75 animate-bounce-slow" />
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold mb-2">{card.value}</div>
                    <p className={`text-sm ${card.descriptionColor}`}>{card.description}</p>
                </CardContent>
                </Card>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">تطور الإيرادات والمصروفات (آخر 6 أشهر)</h2>
                <div className="h-[300px]">
                    <ChartContainer config={{}} className="min-h-[200px] w-full">
                        <BarChart data={dashboardData.monthly_data}>
                            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="revenue" name="الإيرادات" fill="#6366F1" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="expense" name="المصروفات" fill="#EF4444" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </div>
            </Card>

            <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">توزيع المصاريف</h2>
                 <div className="h-[300px]">
                    <ChartContainer config={{}} className="min-h-[200px] w-full">
                        <PieChart>
                            <Pie data={expenseDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {expenseDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                        </PieChart>
                    </ChartContainer>
                </div>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">تحليل ذكي</h2>
                <div className="flex items-start p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <BarChartIcon className="h-6 w-6 flex-shrink-0 mr-3 text-blue-600" />
                    <div>
                    <h3 className="text-lg font-medium text-blue-800">تحليل المصاريف التشغيلية</h3>
                    <p className="text-gray-700">
                        ارتفعت المصاريف التشغيلية بنسبة <span className="font-bold text-red-600">15%</span> هذا الشهر مقارنة بالشهر الماضي. يرجى مراجعة التفاصيل.
                    </p>
                    </div>
                </div>
            </Card>
            
            <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">التنبيهات المهمة</h2>
                <div className="space-y-4">
                    {alertsData.map((alert, index) => (
                        <div key={index} className={`flex items-start p-4 rounded-lg border ${alert.bgColor} ${alert.color === 'text-red-500' ? 'border-red-300' : 'border-gray-200'}`}>
                            <alert.icon className={`h-6 w-6 flex-shrink-0 mr-3 ${alert.color}`} />
                            <div>
                                <h3 className={`text-lg font-medium ${alert.color}`}>{alert.type}</h3>
                                <p className="text-gray-700">{alert.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </main>
  );
}
