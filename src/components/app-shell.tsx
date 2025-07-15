"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Wallet,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background text-right" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-card shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col border-l border-border`}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">متتبع المال</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-secondary"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-grow p-4 space-y-2">
            <Link href="/dashboard" legacyBehavior>
                <a onClick={() => setIsSidebarOpen(false)} className={`flex items-center p-3 rounded-lg transition-colors duration-200 text-lg font-medium ${pathname === '/dashboard' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent hover:text-accent-foreground'}`}>
                    <LayoutDashboard size={22} className="ml-3" /> لوحة التحكم
                </a>
            </Link>
            <Link href="/transactions" legacyBehavior>
                <a onClick={() => setIsSidebarOpen(false)} className={`flex items-center p-3 rounded-lg transition-colors duration-200 text-lg font-medium ${pathname === '/transactions' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-accent hover:text-accent-foreground'}`}>
                    <Wallet size={22} className="ml-3" /> المعاملات
                </a>
            </Link>
        </nav>
        <div className="p-4 border-t border-border">
            <button className="flex items-center p-3 w-full text-right rounded-lg text-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors duration-200 text-lg font-medium">
                <LogOut size={22} className="ml-3" /> تسجيل الخروج
            </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-card shadow-md z-40 border-b border-border">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-secondary ml-3"
          >
            {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="p-2 rounded-full bg-secondary">
              <User size={24} className="text-foreground" />
            </div>
            <span className="font-medium text-foreground hidden md:block">مرحباً بك</span>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
