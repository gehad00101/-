"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, LayoutDashboard, Settings, Users, BarChart2, DollarSign, 
  ShoppingBag, Bell, Search, User, Menu, X, ChevronDown, 
  FileText, BookOpen, Receipt, CreditCard, ClipboardList, Key, Calendar, HelpCircle, FileSearch
} from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
    { href: '/dashboard', label: 'الرئيسية', icon: Home },
    { href: '/entry', label: 'القيود اليومية', icon: FileText },
    { href: '/chart-of-accounts', label: 'دليل الحسابات', icon: BookOpen },
    { href: '/invoices', label: 'الفواتير', icon: Receipt },
    { href: '/payments-collections', label: 'المدفوعات والتحصيلات', icon: CreditCard },
    { href: '/expenses', label: 'المصروفات', icon: ClipboardList },
    { href: '/reports', label: 'التقارير', icon: BarChart2 },
    { href: '/accounting-periods', label: 'الفترات المحاسبية', icon: Calendar },
    { href: '/customers-suppliers', label: 'العملاء والموردين', icon: Users },
    { href: '/users-permissions', label: 'المستخدمين والصلاحيات', icon: Key },
    { href: '/settings', label: 'الإعدادات', icon: Settings },
    { href: '/how-to-design-integrated-accounting-system', label: 'كيفية تصميم نظام محاسبي', icon: HelpCircle },
    { href: '/comprehensive-accounting-system-guide', label: 'بحث شامل: برنامج محاسبي', icon: FileSearch },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-inter text-right" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-200`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </Button>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={`flex items-center p-3 w-full text-right rounded-lg transition-colors duration-200 text-lg font-medium ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <item.icon size={22} className="ml-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md z-40 border-b border-gray-200">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden ml-3"
            >
              {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
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
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell size={24} />
            </Button>
            <div className="flex items-center space-x-3 space-x-reverse cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <img
                src="https://placehold.co/40x40/FF7F50/FFFFFF?text=JD"
                alt="صورة المستخدم"
                className="w-10 h-10 rounded-full border-2 border-blue-400 object-cover"
                data-ai-hint="person portrait"
              />
              <span className="font-medium text-gray-800 hidden md:block text-lg">جون دو</span>
              <ChevronDown size={20} className="text-gray-500 hidden md:block" />
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
