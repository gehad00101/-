"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Home,
  LayoutDashboard,
  FileText,
  Settings,
  FileBox,
  AreaChart,
  Landmark,
  BookUser,
  LogOut,
  LineChart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-bold text-foreground">Daftar</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/" legacyBehavior passHref>
                <SidebarMenuButton isActive={isActive("/")} icon={Home}>
                  الرئيسية
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={isActive("/dashboard")}
                  icon={LayoutDashboard}
                >
                  لوحة التحكم
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/entry" legacyBehavior passHref>
                <SidebarMenuButton isActive={isActive("/entry")} icon={FileText}>
                  إدخال القيود
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isSubmenu
                icon={AreaChart}
                isActive={pathname.startsWith("/reports")}
              >
                التقارير
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <Link href="/reports/trial-balance" legacyBehavior passHref>
                    <SidebarMenuSubButton
                      isActive={isActive("/reports/trial-balance")}
                    >
                      ميزان المراجعة
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <Link href="/reports/balance-sheet" legacyBehavior passHref>
                    <SidebarMenuSubButton
                      isActive={isActive("/reports/balance-sheet")}
                    >
                      الميزانية العمومية
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <Link
                    href="/reports/cash-flow-statement"
                    legacyBehavior
                    passHref
                  >
                    <SidebarMenuSubButton
                      isActive={isActive("/reports/cash-flow-statement")}
                    >
                      قائمة التدفقات النقدية
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <Link href="/reports/income-statement" legacyBehavior passHref>
                    <SidebarMenuSubButton
                      isActive={isActive("/reports/income-statement")}
                    >
                      قائمة الدخل
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/chart-of-accounts" legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={isActive("/chart-of-accounts")}
                  icon={BookUser}
                >
                  دليل الحسابات
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/management" legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={isActive("/management")}
                  icon={Settings}
                >
                  الإدارة
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={LogOut}>تسجيل خروج</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
