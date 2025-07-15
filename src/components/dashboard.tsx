'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, Users, ShoppingBag, TrendingUp, BarChart2, Calendar, Clock, Info, ListChecks, Briefcase, LayoutDashboard, AlertCircle, User as UserIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

const salesData = [
  { name: 'يناير', مبيعات: 4000, أرباح: 2400 },
  { name: 'فبراير', مبيعات: 3000, أرباح: 1398 },
  { name: 'مارس', مبيعات: 2000, أرباح: 9800 },
  { name: 'أبريل', مبيعات: 2780, أرباح: 3908 },
  { name: 'مايو', مبيعات: 1890, أرباح: 4800 },
  { name: 'يونيو', مبيعات: 2390, أرباح: 3800 },
  { name: 'يوليو', مبيعات: 3490, أرباح: 4300 },
];

const activityData = [
  { id: 1, type: 'جديد', description: 'تم تسجيل مستخدم جديد', time: 'منذ 5 دقائق', icon: <UserIcon size={16} className="text-green-500" /> },
  { id: 2, type: 'طلب', description: 'طلب شراء جديد #12345', time: 'منذ ساعة', icon: <ShoppingBag size={16} className="text-blue-500" /> },
  { id: 3, type: 'تنبيه', description: 'مساحة التخزين منخفضة', time: 'منذ 3 ساعات', icon: <AlertCircle size={16} className="text-red-500" /> },
  { id: 4, type: 'تقرير', description: 'تم إنشاء تقرير المبيعات الشهري', time: 'أمس', icon: <BarChart2 size={16} className="text-purple-500" /> },
];

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base text-gray-600">إجمالي المبيعات</CardTitle>
                <DollarSign className="w-10 h-10 text-blue-400 opacity-20" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-extrabold text-blue-700">45,231 ر.س</div>
            </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border-green-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base text-gray-600">العملاء الجدد</CardTitle>
                <Users className="w-10 h-10 text-green-400 opacity-20" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-extrabold text-green-700">2,345</div>
            </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border-orange-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base text-gray-600">الطلبات المعلقة</CardTitle>
                <ShoppingBag className="w-10 h-10 text-orange-400 opacity-20" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-extrabold text-orange-700">1,200</div>
            </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border-purple-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base text-gray-600">النمو اليومي</CardTitle>
                <TrendingUp className="w-10 h-10 text-purple-400 opacity-20" />
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-extrabold text-purple-700">+15%</div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 shadow-lg border-gray-100 p-4">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">مبيعات وأرباح هذا العام</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={salesData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} padding={{ left: 20, right: 20 }} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc', borderRadius: '12px', padding: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} labelStyle={{ fontWeight: 'bold', color: '#333' }} itemStyle={{ color: '#555' }} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Line type="monotone" dataKey="مبيعات" stroke="#4A90E2" strokeWidth={3} activeDot={{ r: 8, fill: '#4A90E2', stroke: '#fff', strokeWidth: 2 }} />
                        <Line type="monotone" dataKey="أرباح" stroke="#7ED321" strokeWidth={3} activeDot={{ r: 8, fill: '#7ED321', stroke: '#fff', strokeWidth: 2 }} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        
        <Card className="shadow-lg border-gray-100 p-4">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">النشاطات الأخيرة</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-5">
                    {activityData.map((activity) => (
                        <li key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <div className="flex-shrink-0 ml-4 p-2 rounded-full bg-white shadow-sm border border-gray-200">{activity.icon}</div>
                        <div>
                            <p className="text-gray-800 font-medium text-lg">{activity.description}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg border-gray-100 p-4">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">المهام</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center">
                        <ListChecks size={24} className="text-blue-500 ml-4" />
                        <span className="text-gray-700 text-lg">مراجعة تقرير الربع الأول</span>
                        </div>
                        <span className="text-sm text-gray-500 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">اليوم</span>
                    </li>
                    <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center">
                        <Calendar size={24} className="text-green-500 ml-4" />
                        <span className="text-gray-700 text-lg">تحديد موعد اجتماع الفريق</span>
                        </div>
                        <span className="text-sm text-gray-500 bg-green-100 text-green-700 px-3 py-1 rounded-full">غداً</span>
                    </li>
                    <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center">
                        <Clock size={24} className="text-orange-500 ml-4" />
                        <span className="text-gray-700 text-lg">الرد على استفسارات العملاء</span>
                        </div>
                        <span className="text-sm text-gray-500 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">بعد يومين</span>
                    </li>
                </ul>
            </CardContent>
        </Card>

        <Card className="shadow-lg border-gray-100 p-4">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">معلومات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <Info size={24} className="text-gray-500 ml-4" />
                        <p className="text-gray-700 text-lg">عدد المنتجات النشطة: <span className="font-bold text-blue-600">120</span></p>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <Briefcase size={24} className="text-gray-500 ml-4" />
                        <p className="text-gray-700 text-lg">عدد الفروع: <span className="font-bold text-green-600">5</span></p>
                    </div>
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer">
                        <LayoutDashboard size={24} className="text-gray-500 ml-4" />
                        <p className="text-gray-700 text-lg">إصدار النظام: <span className="font-bold text-purple-600">2.1.0</span></p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
