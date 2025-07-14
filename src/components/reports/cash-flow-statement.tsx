'use client';

import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Printer, Copy, Wand2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getReportSummary } from '@/app/actions';

// Mock data fetching
const fetchEntries = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, cash_flow_type: 'operational', amount: 12000 },
    { id: 2, cash_flow_type: 'operational', amount: -5000 },
    { id: 3, cash_flow_type: 'investing', amount: -10000 },
    { id: 4, cash_flow_type: 'financing', amount: 8000 },
  ];
};

export const CashFlowStatement = () => {
  const [totals, setTotals] = useState({ operational: 0, investing: 0, financing: 0 });
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
        const sums = { operational: 0, investing: 0, financing: 0 };
        entries.forEach(entry => {
          if (entry.cash_flow_type && sums[entry.cash_flow_type as keyof typeof sums] !== undefined) {
            sums[entry.cash_flow_type as keyof typeof sums] += entry.amount;
          }
        });
        setTotals(sums);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to load cash flow data.' });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [toast]);

  const generateSummary = async () => {
     setSummaryLoading(true);
    setSummary('');
    const netCashFlow = totals.operational + totals.investing + totals.financing;
    const reportData = { ...totals, netCashFlow };
    try {
      const result = await getReportSummary('Cash Flow Statement', reportData);
      setSummary(result);
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
      pdf.save('cash-flow-statement.pdf');
  };
  const handlePrint = () => window.print();

  const netCashFlow = totals.operational + totals.investing + totals.financing;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6 text-right">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">💵 قائمة التدفقات النقدية</h2>
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
             <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center print:text-black">قائمة التدفقات النقدية</h3>
             <p className="text-gray-600 text-sm text-center mb-6 print:text-black">تاريخ التقرير: {new Date().toLocaleDateString('ar-EG')}</p>
             <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xl font-semibold text-blue-800">التدفقات من الأنشطة التشغيلية:</span>
                        <span className="text-2xl font-bold text-blue-900">{totals.operational.toFixed(2)} ريال 🔧</span>
                    </div>
                    <p className="text-gray-600 text-sm">التدفقات النقدية الناتجة عن العمليات الأساسية للشركة.</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg shadow-sm border border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xl font-semibold text-yellow-800">التدفقات من الأنشطة الاستثمارية:</span>
                        <span className="text-2xl font-bold text-yellow-900">{totals.investing.toFixed(2)} ريال 🏗</span>
                    </div>
                    <p className="text-gray-600 text-sm">التدفقات النقدية المتعلقة بشراء وبيع الأصول طويلة الأجل.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg shadow-sm border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xl font-semibold text-green-800">التدفقات من الأنشطة التمويلية:</span>
                        <span className="text-2xl font-bold text-green-900">{totals.financing.toFixed(2)} ريال 💰</span>
                    </div>
                    <p className="text-gray-600 text-sm">التدفقات النقدية الناتجة عن معاملات الديون وحقوق الملكية.</p>
                </div>
                <div className={`p-4 rounded-lg shadow-md font-bold text-center text-lg ${netCashFlow >= 0 ? 'bg-green-100 text-green-800 border-green-400' : 'bg-red-100 text-red-800 border-red-400'}`}>
                    <p>صافي التدفق النقدي: {netCashFlow.toFixed(2)} ريال</p>
                    {netCashFlow >= 0 ? <p className="mt-2 text-green-700">✅ صافي التدفق النقدي إيجابي.</p> : <p className="mt-2 text-red-700">❌ صافي التدفق النقدي سلبي.</p>}
                </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
