'use client';

import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Printer, Copy, Wand2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Mock data fetching
const fetchEntries = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, account_type: 'asset', amount: 10000 },
    { id: 2, account_type: 'asset', amount: 15000 },
    { id: 3, account_type: 'liability', amount: 8000 },
    { id: 4, account_type: 'equity', amount: 17000 },
  ];
};

export const BalanceSheet = () => {
  const [totals, setTotals] = useState({ asset: 0, liability: 0, equity: 0 });
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const entries = await fetchEntries();
        const sums = { asset: 0, liability: 0, equity: 0 };
        entries.forEach(entry => {
          if (entry.account_type === 'asset') sums.asset += entry.amount;
          else if (entry.account_type === 'liability') sums.liability += entry.amount;
          else if (entry.account_type === 'equity') sums.equity += entry.amount;
        });
        setTotals(sums);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to load balance sheet data.' });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [toast]);

  const generateSummary = async () => {
    setSummaryLoading(true);
    setSummary('');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockResult = `تظهر الميزانية العمومية وضعًا ماليًا مستقرًا. إجمالي الأصول البالغ ${totals.asset.toFixed(2)} يغطي بشكل كافٍ إجمالي الخصوم البالغ ${totals.liability.toFixed(2)}. حقوق الملكية قوية عند ${totals.equity.toFixed(2)}، مما يشير إلى صحة مالية جيدة للشركة.`;
      setSummary(mockResult);
      toast({ title: 'Success', description: 'تم إنشاء الملخص بنجاح.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'فشل إنشاء الملخص.' });
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
      const element = printRef.current;
      if (!element) return;
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('balance-sheet.pdf');
  };
  const handlePrint = () => window.print();

  const totalLiabilitiesAndEquity = totals.liability + totals.equity;
  const isBalanced = Math.abs(totals.asset - totalLiabilitiesAndEquity) < 0.01;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6 text-right">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">الميزانية العمومية</h2>
      {loading ? <Skeleton className="h-96 w-full" /> : (
        <>
          <div className="flex justify-center gap-4 mb-6 print:hidden">
            <Button onClick={handleDownloadPdf} variant="secondary"><Download className="ml-2 h-4 w-4" /> تحميل PDF</Button>
            <Button onClick={handlePrint} variant="outline"><Printer className="ml-2 h-4 w-4" /> طباعة</Button>
            <Button onClick={generateSummary} disabled={summaryLoading} className="bg-teal-600 hover:bg-teal-700">
              {summaryLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div> : <Wand2 className="ml-2 h-4 w-4" />}
              تلخيص التقرير ✨
            </Button>
          </div>

          {summary && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-md border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-2">ملخص التقرير (بواسطة AI)</h3>
              <p className="text-gray-700 whitespace-pre-line">{summary}</p>
              <Button onClick={() => navigator.clipboard.writeText(summary)} variant="ghost" size="sm" className="mt-2"><Copy className="ml-2 h-4 w-4" /> نسخ</Button>
            </div>
          )}

          <div ref={printRef} className="p-4 mt-4 bg-white rounded-lg print:shadow-none print:border-none">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center print:text-black">الميزانية العمومية</h3>
            <p className="text-gray-600 text-sm text-center mb-6 print:text-black">تاريخ التقرير: {new Date().toLocaleDateString('ar-EG')}</p>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-semibold text-blue-800">الأصول:</span>
                      <span className="text-2xl font-bold text-blue-900">{totals.asset.toFixed(2)} ريال 🏦</span>
                  </div>
                  <p className="text-gray-600 text-sm">إجمالي قيمة الموارد التي تمتلكها الشركة.</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg shadow-sm border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-semibold text-yellow-800">الخصوم:</span>
                      <span className="text-2xl font-bold text-yellow-900">{totals.liability.toFixed(2)} ريال 💳</span>
                  </div>
                  <p className="text-gray-600 text-sm">إجمالي الالتزامات المالية للشركة تجاه الأطراف الخارجية.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg shadow-sm border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-semibold text-green-800">حقوق الملكية:</span>
                      <span className="text-2xl font-bold text-green-900">{totals.equity.toFixed(2)} ريال 🧾</span>
                  </div>
                   <p className="text-gray-600 text-sm">المبلغ المتبقي للمساهمين بعد سداد جميع الالتزامات.</p>
              </div>
              <div className={`p-4 rounded-lg shadow-md font-bold text-center text-lg ${isBalanced ? 'bg-green-100 text-green-800 border-green-400' : 'bg-red-100 text-red-800 border-red-400'}`}>
                <p>الأصول = {totals.asset.toFixed(2)} | الخصوم + حقوق الملكية = {totalLiabilitiesAndEquity.toFixed(2)}</p>
                {isBalanced ? <p className="mt-2 text-green-700">✅ الميزانية متوازنة!</p> : <p className="mt-2 text-red-700">❌ الميزانية غير متوازنة!</p>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
