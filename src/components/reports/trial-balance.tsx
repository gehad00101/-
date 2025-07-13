'use client';

import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Mock data fetching
const fetchEntries = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, debit_account: 'مصروفات مكتبية', credit_account: 'النقدية', amount: 500.00 },
    { id: 2, debit_account: 'النقدية', credit_account: 'إيرادات المبيعات', amount: 15000.00 },
    { id: 3, debit_account: 'الأصول الثابتة', credit_account: 'النقدية', amount: 25000.00 },
  ];
};

export const TrialBalance = () => {
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const entries = await fetchEntries();
        const tempBalances: Record<string, number> = {};
        entries.forEach((entry) => {
          tempBalances[entry.debit_account] = (tempBalances[entry.debit_account] || 0) + entry.amount;
          tempBalances[entry.credit_account] = (tempBalances[entry.credit_account] || 0) - entry.amount;
        });
        setBalances(tempBalances);
        toast({ title: 'Success', description: 'تم جلب القيود بنجاح.' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'خطأ في جلب القيود لميزان المراجعة.' });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [toast]);
  
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
        toast({ variant: 'destructive', title: 'Error', description: 'لم يتم العثور على محتوى لإنشاء PDF.' });
        return;
    }
    setLoading(true);
    try {
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('ميزان_المراجعة.pdf');
        toast({ title: 'Success', description: 'تم إنشاء ملف PDF بنجاح!' });
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'حدث خطأ أثناء إنشاء ملف PDF.' });
    } finally {
        setLoading(false);
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6 text-right">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">ميزان المراجعة</h2>
      
      {loading ? (
        <div className="space-y-4">
            <Skeleton className="h-10 w-48 mx-auto" />
            <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-4 mb-6 print:hidden">
            <Button onClick={handleDownloadPdf}><Download className="ml-2 h-4 w-4" /> تحميل PDF</Button>
            <Button onClick={handlePrint} variant="outline"><Printer className="ml-2 h-4 w-4" /> طباعة</Button>
          </div>
          <div ref={printRef} className="p-4 bg-white rounded-lg shadow-md print:shadow-none print:border-none">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center print:text-black">ميزان المراجعة</h3>
            <p className="text-gray-600 text-sm text-center mb-6 print:text-black">تاريخ التقرير: {new Date().toLocaleDateString('ar-EG')}</p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal print:bg-gray-200 print:text-black">
                    <th className="py-3 px-6 text-right">الحساب</th>
                    <th className="py-3 px-6 text-left">الرصيد</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {Object.entries(balances).map(([account, balance]) => (
                    <tr key={account} className={`border-b border-gray-200 hover:bg-gray-50 ${
                      balance > 0 ? "bg-green-50 print:bg-white" : balance < 0 ? "bg-red-50 print:bg-white" : "print:bg-white"
                    }`}>
                      <td className="py-3 px-6 text-right whitespace-nowrap print:text-black">{account}</td>
                      <td className="py-3 px-6 text-left print:text-black">{balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-gray-600 text-sm text-center print:text-gray-700">
                *الأرصدة الموجبة (بالأخضر) تمثل أرصدة مدينة، والأرصدة السالبة (بالأحمر) تمثل أرصدة دائنة.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
