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
  DollarSign,
  ShoppingCart,
  Wallet,
  BarChart,
  Landmark,
  Briefcase,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { Button } from "./ui/button";

const sidebarItems = [
  {
    name: "لوحة التحكم",
    icon: LayoutDashboard,
    page: "/dashboard",
  },
  {
    name: "القيود المحاسبية",
    icon: ClipboardList,
    page: "/entry",
  },
  {
    name: "دليل الحسابات",
    icon: BookOpen,
    page: "/chart-of-accounts",
  },
  {
    name: "التقارير المالية",
    icon: BarChart,
    subItems: [
      { name: "تقرير قائمة الدخل", page: "/reports/income-statement" },
      { name: "تقرير الميزانية العمومية", page: "/reports/balance-sheet" },
      { name: "تقرير التدفقات النقدية", page: "/reports/cash-flow-statement" },
      { name: "تقرير ميزان المراجعة", page: "/reports/trial-balance" },
    ],
  },
  {
    name: "الإعدادات",
    icon: Settings,
    subItems: [{ name: "إدارة المستخدمين والصلاحيات", page: "/management" }],
  },
];

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  isMobile,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
}) => {
  const pathname = usePathname();
  const [openMenuItem, setOpenMenuItem] = useState<string | null>(null);

  useEffect(() => {
    // Open the parent menu if a sub-item is active
    const activeParent = sidebarItems.find((item) =>
      item.subItems?.some((sub) => sub.page === pathname)
    );
    if (activeParent) {
      setOpenMenuItem(activeParent.name);
    }
  }, [pathname]);

  const handleMenuItemClick = (itemName: string) => {
    setOpenMenuItem(openMenuItem === itemName ? null : itemName);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <aside
      className={`fixed top-0 right-0 h-full bg-white shadow-lg w-64 transform transition-transform duration-300 ease-in-out z-20 ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      } md:relative md:translate-x-0 md:shadow-none md:w-64 md:flex-shrink-0 md:border-l md:border-gray-200`}
    >
      <div className="p-4 border-b border-gray-200 hidden md:flex items-center justify-center">
        <Image
          src="https://placehold.co/40x40/6366F1/FFFFFF?text=شعار"
          alt="شعار النظام"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full ml-2"
        />
        <span className="text-indigo-600 text-2xl font-extrabold">
          النظام المحاسبي
        </span>
      </div>

      <div className="flex justify-between items-center p-4 md:hidden">
        <h2 className="text-xl font-semibold text-gray-800">القائمة</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="إغلاق القائمة الجانبية"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul>
          <li className="mb-2">
            <Link href="/" legacyBehavior passHref>
              <a
                onClick={handleLinkClick}
                className={`flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200 group focus:outline-none ${
                  pathname === "/" ? "bg-indigo-100 text-indigo-700" : ""
                }`}
              >
                <div className="flex items-center">
                  <Home className="text-xl ml-3 text-gray-500 group-hover:text-indigo-600 transition-colors duration-200" />
                  <span className="font-medium text-lg">الرئيسية</span>
                </div>
              </a>
            </Link>
          </li>
          {sidebarItems.map((item, index) => (
            <li key={index} className="mb-2">
              <button
                className="flex items-center justify-between w-full p-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200 group focus:outline-none"
                onClick={() =>
                  item.page
                    ? handleLinkClick()
                    : handleMenuItemClick(item.name)
                }
              >
                {item.page ? (
                  <Link href={item.page} className="flex items-center w-full">
                    <item.icon className="text-xl ml-3 text-gray-500 group-hover:text-indigo-600 transition-colors duration-200" />
                    <span className="font-medium text-lg">{item.name}</span>
                  </Link>
                ) : (
                  <>
                    <div className="flex items-center">
                      <item.icon className="text-xl ml-3 text-gray-500 group-hover:text-indigo-600 transition-colors duration-200" />
                      <span className="font-medium text-lg">{item.name}</span>
                    </div>
                    {item.subItems && (
                      <ChevronDown
                        className={`text-gray-500 transition-transform duration-200 ${
                          openMenuItem === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </>
                )}
              </button>
              {item.subItems && openMenuItem === item.name && (
                <ul className="mt-2 mr-8 border-r border-gray-200">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="mb-1">
                      <Link href={subItem.page} legacyBehavior passHref>
                        <a
                          onClick={handleLinkClick}
                          className={`flex items-center p-2 rounded-lg text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200 text-sm ${
                            pathname === subItem.page
                              ? "bg-indigo-100 text-indigo-700"
                              : ""
                          }`}
                        >
                          {subItem.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <Button
          onClick={() => alert("Logout!")}
          className="w-full bg-indigo-500 text-white hover:bg-indigo-600"
        >
          <LogOut className="ml-2 h-4 w-4" />
          <span>تسجيل الخروج</span>
        </Button>
      </div>
    </aside>
  );
};

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const username = "أحمد المحاسب";

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false); // Close sidebar when switching to desktop view
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-100" dir="rtl">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between md:justify-end border-b border-gray-200 z-10 relative">
        <Button
          className="md:hidden"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="فتح القائمة الجانبية"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>

        <div className="md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2 md:left-auto flex items-center">
          <Image
            src="https://placehold.co/40x40/6366F1/FFFFFF?text=شعار"
            alt="شعار النظام"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <span className="text-indigo-600 text-xl font-bold mr-2 hidden md:block">
            النظام المحاسبي
          </span>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <Button variant="ghost" size="icon" aria-label="التنبيهات">
            <Bell />
          </Button>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Image
              src="https://placehold.co/40x40/A78BFA/FFFFFF?text=أنا"
              alt="صورة المستخدم"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border-2 border-indigo-300"
            />
            <span className="font-medium text-gray-800 hidden sm:block">
              {username}
            </span>
          </div>
          <Button variant="ghost" size="icon" aria-label="الإعدادات">
            <Settings />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />

        {isSidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          ></div>
        )}

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
