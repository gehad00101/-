'use client';
import AppShell from "@/components/app-shell";

export default function Home() {
  return (
    <AppShell>
        <div className="p-6 bg-white rounded-lg shadow-md mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">مرحباً بك في نظام المحاسبة</h2>
            <p className="text-gray-700 text-lg leading-relaxed text-right">
                هذا هو نظام المحاسبة المتكامل الخاص بك. استخدم القائمة الجانبية للتنقل بين الأقسام المختلفة.
            </p>
        </div>
    </AppShell>
  );
}
