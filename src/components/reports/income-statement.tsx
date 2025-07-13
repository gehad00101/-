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
    { id: 1, account_type: 'revenue', amount: 50000 },
    { id: 2, account_type: 'revenue', amount: 15000 },
    { id: 3, account_type: 'expense', amount: -22000 },
    { id: 4, account_type: 'expense', amount: -8000 },
  ];
};

export const IncomeStatement = () => {
  const [totals, setTotals] = useState({ revenue: 0, expense: 0 });
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
        const sums = { revenue: 0, expense: 0 };
        entries.forEach(entry => {
          if (entry.account_type === 'revenue') sums.revenue += entry.amount;
          if (entry.account_type === 'expense') sums.expense += Math.abs(entry.amount);
        });
        setTotals(sums);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to load income statement data.' });
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
      const netIncome = totals.revenue - totals.expense;
      const mockResult = `حققت الشركة إيرادات إجمالية قدرها ${totals.revenue.toFixed(2)} ريال، بينما بلغت المصروفات ${totals.expense.toFixed(2)} ريال. ينتج عن ذلك صافي دخل ${netIncome >= 0 ? 'ربح' : 'خسارة'} بقيمة ${netIncome.toFixed(2)} ريال، مما يشير إلى أداء مالي ${netIncome >= 0 ? 'قوي' : 'ضعيف'} خلال الفترة.`;
      setSummary(mockResult);
      toast({ title: 'Success', description: 'تم إنشاء الملخص بنجاح.' });
    } catch (error) {
       toast({ variant: 'destructive', title: 'Error', description: 'فشل إنشاء الملخص.' });
    } finally {
       setSummaryLoading(false);
    }
  };

  const handleDownloadPdf = async () => { /* ... PDF logic ... */ };
  const handlePrint = () => window.print();

  const netIncome = totals.revenue - totals.expense;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6 text-right">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">📊 قائمة الدخل</h2>
      {loading ? <Skeleton className="h-96 w-full" /> : (
        <>
          <div className="flex justify-center gap-4 mb-6 print:hidden">
            <Button onClick={handleDownloadPdf}><Download className="ml-2 h-4 w-4" /> تحميل PDF</Button>
            <Button onClick={handlePrint} variant="outline"><Printer className="ml-2 h-4 w-4" /> طباعة</Button>
            <Button onClick={generateSummary} disabled={summaryLoading}>
              {summaryLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div> : <Wand2 className="ml-2 h-4 w-4" />}
              تلخيص التقرير
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
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center print:text-black">قائمة الدخل</h3>
            <p className="text-gray-600 text-sm text-center mb-6 print:text-black">تاريخ التقرير: {new Date().toLocaleDateString('ar-EG')}</p>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg shadow-sm border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-semibold text-purple-800">إجمالي الإيرادات:</span>
                  <span className="text-2xl font-bold text-purple-900">{totals.revenue.toFixed(2)} ريال</span>
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg shadow-sm border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-semibold text-orange-800">إجمالي المصروفات:</span>
                  <span className="text-2xl font-bold text-orange-900">{totals.expense.toFixed(2)} ريال</span>
                </div>
              </div>
              <div className={`p-4 rounded-lg shadow-md font-bold text-center text-lg ${netIncome >= 0 ? 'bg-green-100 text-green-800 border-green-400' : 'bg-red-100 text-red-800 border-red-400'}`}>
                <p>صافي الدخل: {netIncome.toFixed(2)} ريال</p>
                {netIncome >= 0 ? <p className="mt-2 text-green-700">✅ صافي ربح.</p> : <p className="mt-2 text-red-700">❌ صافي خسارة.</p>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
