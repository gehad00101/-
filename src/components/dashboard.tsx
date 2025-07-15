
"use client";

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Home, LayoutDashboard, Settings, Users, BarChart2, DollarSign, ShoppingBag, Bell, Search, User, Menu, X, ChevronDown, Calendar, Clock, CheckCircle, AlertCircle, Info, FileText, BookOpen, Receipt, CreditCard, ClipboardList, TrendingUp, Briefcase, Key, ListChecks, Plus, Eye, Edit, Trash, Printer, AlertTriangle, Save, XCircle, Copy, FilePlus, RefreshCcw, Download, Tag, Mail, Filter } from 'lucide-react';

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
  { id: 1, type: 'جديد', description: 'تم تسجيل مستخدم جديد', time: 'منذ 5 دقائق', icon: <User size={16} className="text-green-500" /> },
  { id: 2, type: 'طلب', description: 'طلب شراء جديد #12345', time: 'منذ ساعة', icon: <ShoppingBag size={16} className="text-blue-500" /> },
  { id: 3, type: 'تنبيه', description: 'مساحة التخزين منخفضة', time: 'منذ 3 ساعات', icon: <AlertCircle size={16} className="text-red-500" /> },
  { id: 4, type: 'تقرير', description: 'تم إنشاء تقرير المبيعات الشهري', time: 'أمس', icon: <BarChart2 size={16} className="text-purple-500" /> },
];

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex items-center justify-between border border-blue-100">
          <div>
            <p className="text-base text-gray-600 mb-1">إجمالي المبيعات</p>
            <h2 className="text-4xl font-extrabold text-blue-700 mt-1">45,231 ر.س</h2>
          </div>
          <DollarSign size={60} className="text-blue-400 opacity-20" />
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex items-center justify-between border border-green-100">
          <div>
            <p className="text-base text-gray-600 mb-1">العملاء الجدد</p>
            <h2 className="text-4xl font-extrabold text-green-700 mt-1">2,345</h2>
          </div>
          <Users size={60} className="text-green-400 opacity-20" />
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex items-center justify-between border border-orange-100">
          <div>
            <p className="text-base text-gray-600 mb-1">الطلبات المعلقة</p>
            <h2 className="text-4xl font-extrabold text-orange-700 mt-1">1,200</h2>
          </div>
          <ShoppingBag size={60} className="text-orange-400 opacity-20" />
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex items-center justify-between border border-purple-100">
          <div>
            <p className="text-base text-gray-600 mb-1">النمو اليومي</p>
            <h2 className="text-4xl font-extrabold text-purple-700 mt-1">+15%</h2>
          </div>
          <TrendingUp size={60} className="text-purple-400 opacity-20" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">مبيعات وأرباح هذا العام</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={salesData}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} padding={{ left: 20, right: 20 }} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #ccc',
                  borderRadius: '12px',
                  padding: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                labelStyle={{ fontWeight: 'bold', color: '#333' }}
                itemStyle={{ color: '#555' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line
                type="monotone"
                dataKey="مبيعات"
                stroke="#4A90E2"
                strokeWidth={3}
                activeDot={{ r: 8, fill: '#4A90E2', stroke: '#fff', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="أرباح"
                stroke="#7ED321"
                strokeWidth={3}
                activeDot={{ r: 8, fill: '#7ED321', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">النشاطات الأخيرة</h3>
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tasks Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">المهام</h3>
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
        </div>

        {/* Quick Info Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">معلومات سريعة</h3>
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
        </div>
      </div>
    </>
  );
}

    