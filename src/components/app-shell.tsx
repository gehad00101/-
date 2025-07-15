
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  Receipt,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Bell,
  Search,
  User,
  BarChart2,
  Calendar,
  Users,
  Key,
} from "lucide-react";
import { Button } from "./ui/button";


const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-right" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-200`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
            <Link href="/dashboard" legacyBehavior>
                <a onClick={() => setIsSidebarOpen(false)} className={`flex items-center p-3 w-full text-right rounded-lg transition-colors duration-200 text-lg font-medium ${pathname === '/dashboard' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}>
                    <Home size={22} className="ml-3" /> الرئيسية
                </a>
            </Link>
            <Link href="/entry" legacyBehavior>
                <a onClick={() => setIsSidebarOpen(false)} className={`flex items-center p-3 w-full text-right rounded-lg transition-colors duration-200 text-lg font-medium ${pathname === '/entry' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}>
                    <ClipboardList size={22} className="ml-3" /> القيود اليومية
                </a>
            </Link>
            <Link href="/chart-of-accounts" legacyBehavior>
                <a onClick={() => setIsSidebarOpen(false)} className={`flex items-center p-3 w-full text-right rounded-lg transition-colors duration-200 text-lg font-medium ${pathname === '/chart-of-accounts' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}>
                    <BookOpen size={22} className="ml-3" /> دليل الحسابات
                </a>
            </Link>
             <Link href="/invoices" legacyBehavior>
                <a onClick={() => setIsSidebarOpen(false)} className={`flex items-center p-3 w-full text-right rounded-lg transition-colors duration-200 text-lg font-medium ${pathname === '/invoices' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}>
                    <Receipt size={22} className="ml-3" /> الفواتير
                </a>
            </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
            <button className="flex items-center p-3 w-full text-right rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 text-lg font-medium">
                <LogOut size={22} className="ml-3" /> تسجيل الخروج
            </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md z-40 border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-3"
            >
              {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            <div className="relative w-full max-w-md mx-auto md:mx-0">
              <input
                type="text"
                placeholder="ابحث عن شيء..."
                className="pl-12 pr-4 py-3 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-lg"
                dir="rtl"
              />
              <Search size={24} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="p-3 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
              <Bell size={24} />
            </button>
            <div className="flex items-center space-x-3 space-x-reverse cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Image
                src="https://placehold.co/40x40/FF7F50/FFFFFF?text=JD"
                alt="صورة المستخدم"
                width={40}
                height={40}
                data-ai-hint="user profile"
                className="w-10 h-10 rounded-full border-2 border-blue-400 object-cover"
              />
              <span className="font-medium text-gray-800 hidden md:block text-lg">جون دو</span>
              <ChevronDown size={20} className="text-gray-500 hidden md:block" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;

    