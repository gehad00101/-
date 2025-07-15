export const chartOfAccounts = [
    { id: '1000', name: 'الأصول', type: 'رئيسي', color: 'text-gray-700', parentId: null },
    { id: '1100', name: 'الأصول المتداولة', type: 'الأصول', color: 'text-green-600', parentId: '1000' },
    { id: '1101', name: 'الصندوق', type: 'الأصول', color: 'text-green-600', parentId: '1100' },
    { id: '1102', name: 'الحساب البنكي', type: 'الأصول', color: 'text-green-600', parentId: '1100' },
    { id: '1103', name: 'حسابات العملاء', type: 'الأصول', color: 'text-green-600', parentId: '1100' },
    { id: '1104', name: 'المخزون (بن - حليب - كاسات)', type: 'الأصول', color: 'text-green-600', parentId: '1100' },
    { id: '1105', name: 'المصروفات المدفوعة مقدمًا', type: 'الأصول', color: 'text-green-600', parentId: '1100' },
    { id: '1106', name: 'أوراق القبض', type: 'الأصول', color: 'text-green-600', parentId: '1100' },
    { id: '1200', name: 'الأصول الثابتة', type: 'الأصول', color: 'text-green-600', parentId: '1000' },
    { id: '1201', name: 'معدات القهوة', type: 'الأصول', color: 'text-green-600', parentId: '1200' },
    { id: '1202', name: 'الأثاث والديكور', type: 'الأصول', color: 'text-green-600', parentId: '1200' },
    { id: '1203', name: 'الأجهزة الكهربائية', type: 'الأصول', color: 'text-green-600', parentId: '1200' },
    { id: '1204', name: 'كمبيوتر / POS', type: 'الأصول', color: 'text-green-600', parentId: '1200' },
    { id: '1205', name: 'مجمع الإهلاك', type: 'الأصول', color: 'text-green-600', parentId: '1200' },
  
    { id: '2000', name: 'الالتزامات', type: 'رئيسي', color: 'text-gray-700', parentId: null },
    { id: '2100', name: 'الالتزامات قصيرة الأجل', type: 'الالتزامات', color: 'text-red-600', parentId: '2000' },
    { id: '2101', name: 'الموردين', type: 'الالتزامات', color: 'text-red-600', parentId: '2100' },
    { id: '2102', name: 'مصروفات مستحقة', type: 'الالتزامات', color: 'text-red-600', parentId: '2100' },
    { id: '2103', name: 'رواتب مستحقة', type: 'الالتزامات', color: 'text-red-600', parentId: '2100' },
    { id: '2104', name: 'ضريبة القيمة المضافة', type: 'الالتزامات', color: 'text-red-600', parentId: '2100' },
    { id: '2200', name: 'الالتزامات طويلة الأجل', type: 'الالتزامات', color: 'text-red-600', parentId: '2000' },
    { id: '2201', name: 'قرض بنكي طويل الأجل', type: 'الالتزامات', color: 'text-red-600', parentId: '2200' },
  
    { id: '3000', name: 'حقوق الملكية', type: 'رئيسي', color: 'text-gray-700', parentId: null },
    { id: '3100', name: 'رأس المال', type: 'حقوق الملكية', color: 'text-purple-600', parentId: '3000' },
    { id: '3101', name: 'المسحوبات الشخصية', type: 'حقوق الملكية', color: 'text-purple-600', parentId: '3100' },
    { id: '3102', name: 'الأرباح المحتجزة', type: 'حقوق الملكية', color: 'text-purple-600', parentId: '3100' },
  
    { id: '4000', name: 'الإيرادات', type: 'رئيسي', color: 'text-gray-700', parentId: null },
    { id: '4100', name: 'مبيعات القهوة', type: 'الإيرادات', color: 'text-blue-600', parentId: '4000' },
    { id: '4101', name: 'مبيعات المشروبات الباردة', type: 'الإيرادات', color: 'text-blue-600', parentId: '4000' },
    { id: '4102', name: 'مبيعات الحلى والمعجنات', type: 'الإيرادات', color: 'text-blue-600', parentId: '4000' },
    { id: '4103', name: 'إيرادات أخرى', type: 'الإيرادات', color: 'text-blue-600', parentId: '4000' },
  
    { id: '5000', name: 'المصروفات', type: 'رئيسي', color: 'text-gray-700', parentId: null },
    { id: '5100', name: 'تكلفة المبيعات', type: 'المصروفات', color: 'text-orange-600', parentId: '5000' },
    { id: '5101', name: 'تكلفة البن', type: 'المصروفات', color: 'text-orange-600', parentId: '5100' },
    { id: '5102', name: 'تكلفة الحليب والمواد', type: 'المصروفات', color: 'text-orange-600', parentId: '5100' },
    { id: '5103', name: 'تكلفة الأكواب', type: 'المصروفات', color: 'text-orange-600', parentId: '5100' },
    { id: '5200', name: 'مصروفات تشغيلية', type: 'المصروفات', color: 'text-orange-600', parentId: '5000' },
    { id: '5201', name: 'إيجار المحل', type: 'المصروفات', color: 'text-orange-600', parentId: '5200' },
    { id: '5202', name: 'رواتب الموظفين', type: 'المصروفات', color: 'text-orange-600', parentId: '5200' },
    { id: '5203', name: 'كهرباء ومياه', type: 'المصروفات', color: 'text-orange-600', parentId: '5200' },
    { id: '5204', name: 'إنترنت واتصالات', type: 'المصروفات', color: 'text-orange-600', parentId: '5200' },
    { id: '5205', name: 'صيانة معدات', type: 'المصروفات', color: 'text-orange-600', parentId: '5200' },
    { id: '5206', name: 'مواد تنظيف', type: 'المصروفات', color: 'text-orange-600', parentId: '5200' },
    { id: '5207', name: 'رخص وتجديدات', type: 'المصروفات', color: 'text-orange-600', parentId: '5200' },
    { id: '5208', name: 'تسويق وإعلانات', type: 'المصروفات', color: 'text-orange-600', parentId: '5200' },
    { id: '5209', name: 'نفقات ضيافة', type: 'المصروفات', color: 'text-orange-600', parentId: '5200' },
  
    { id: '6000', name: 'الحسابات الختامية', type: 'رئيسي', color: 'text-gray-700', parentId: null },
    { id: '6100', name: 'حساب الأرباح والخسائر', type: 'الحسابات الختامية', color: 'text-gray-600', parentId: '6000' },
    { id: '6200', name: 'حساب المتاجرة', type: 'الحسابات الختامية', color: 'text-gray-600', parentId: '6000' },
];
  
export const entryTypes = [
    { value: 'manual', label: 'يدوي' },
    { value: 'automatic', label: 'تلقائي' },
];

export const operationTypes = [
    { value: 'invoice', label: 'فاتورة مبيعات' },
    { value: 'expense_record', label: 'تسجيل مصروف' },
    { value: 'salary_payment', label: 'صرف راتب' },
    { value: 'rent_payment', label: 'دفع إيجار' },
    { value: 'capital_deposit', label: 'إيداع رأس مال' },
    { value: 'asset_purchase', label: 'شراء أصل' },
    { value: 'bank_loan', label: 'قرض بنكي' },
    { value: 'revenue_receipt', label: 'تحصيل إيراد' },
    { value: 'other_adjustment', label: 'تسوية أخرى' },
];

export const users = [
    { value: 'أحمد محمد', label: 'أحمد محمد' },
    { value: 'فاطمة علي', label: 'فاطمة علي' },
    { value: 'علي حسن', label: 'علي حسن' },
    { value: 'نورة خالد', label: 'نورة خالد' },
    { value: 'مدير النظام', label: 'مدير النظام' },
    { value: 'المستخدم الحالي', label: 'المستخدم الحالي' },
];

export const customersSuppliers = [
    { id: 'C001', name: 'شركة البن الفاخر', type: 'customer' },
    { id: 'C002', name: 'مقهى السعادة', type: 'customer' },
    { id: 'S001', name: 'المورد الرئيسي للبن', type: 'supplier' },
    { id: 'S002', name: 'شركة الأكواب المحدودة', type: 'supplier' },
    { id: 'P001', name: 'عميل نقدي', type: 'customer' }, // For cash sales
];
  
export const productsServices = [
    { id: 'P101', name: 'بن محمّص وسط', unit: 'كجم', defaultPrice: 45, type: 'product' },
    { id: 'P102', name: 'بن محمّص غامق', unit: 'كجم', defaultPrice: 50, type: 'product' },
    { id: 'P103', name: 'حليب كامل الدسم', unit: 'لتر', defaultPrice: 6, type: 'product' },
    { id: 'P104', name: 'أكواب ورقية 8 أونصة', unit: 'كرتون', defaultPrice: 1.5, type: 'product' },
    { id: 'S201', name: 'خدمة استشارية', unit: 'ساعة', defaultPrice: 150, type: 'service' },
    { id: 'S202', name: 'تصميم شعار', unit: 'مرة واحدة', defaultPrice: 500, type: 'service' },
];
  
export const paymentMethods = [
    { value: 'cash', label: 'نقدًا' },
    { value: 'transfer', label: 'تحويل بنكي' },
    { value: 'credit', label: 'آجل' },
    { value: 'card', label: 'بطاقة ائتمان' },
];
  
export const invoiceStatuses = [
      { value: 'paid', label: 'مدفوعة', color: 'bg-green-100 text-green-800' },
      { value: 'unpaid', label: 'غير مدفوعة', color: 'bg-red-100 text-red-800' },
      { value: 'partially_paid', label: 'مدفوعة جزئيًا', color: 'bg-yellow-100 text-yellow-800' },
];
  
export const TAX_RATE = 0.05; // 5% VAT
