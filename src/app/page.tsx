import AppShell from "@/components/app-shell";

export default function Home() {
  return (
    <AppShell>
       <div className="p-6 bg-white rounded-lg shadow-md mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">الرئيسية</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-right">
            مرحباً بك في التطبيق التجريبي. هذا التطبيق يوضح كيفية التنقل بين الصفحات المختلفة باستخدام React و Tailwind CSS.
            يمكنك استخدام القائمة الجانبية للانتقال إلى لوحة التحكم، أو أي من الصفحات الأخرى.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed text-right mt-4">
            تم تصميم هذا التطبيق ليكون متجاوبًا تمامًا ويعمل بشكل جيد على جميع الأجهزة، بما في ذلك الهواتف المحمولة والأجهزة اللوحية.
          </p>
        </div>
    </AppShell>
  );
}
