'use client';

import { useState, FC } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle, Terminal } from 'lucide-react';

interface ManagementProps {
  userRole: 'admin' | 'viewer' | 'accountant';
}

export const Management: FC<ManagementProps> = ({ userRole }) => {
  const [closingResult, setClosingResult] = useState<number | null>(null);
  const { toast } = useToast();
  const canAccessManagement = userRole === 'admin';

  const handleClosePeriodConfirm = async () => {
    toast({ title: 'Info', description: 'جارٍ إغلاق الفترة المالية...' });
    setClosingResult(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const netProfitLoss = Math.random() * 20000 - 5000;
      setClosingResult(netProfitLoss);
      toast({ title: 'Success', description: 'تم إغلاق الفترة المالية بنجاح.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'فشل إغلاق الفترة المالية.' });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-6 text-right">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">الإدارة</h2>
      
      {!canAccessManagement ? (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>غير مصرح به</AlertTitle>
          <AlertDescription>
            ليس لديك صلاحية للوصول إلى صفحة الإدارة.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            من هنا يمكنك إدارة الحسابات، المستخدمين، وتصدير التقارير.
            كما يمكنك إغلاق الفترة المالية الحالية.
          </p>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">إغلاق الفترة المالية</h3>
            <p className="text-gray-600 text-lg mb-4">
              إغلاق الفترة سيقوم بتصفير حسابات الإيرادات والمصروفات الحالية وتحويل صافي الربح أو الخسارة إلى حساب الأرباح المبقاة.
              <br />
              <span className="font-bold text-red-700">تنبيه: هذه العملية لا يمكن التراجع عنها.</span>
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full md:w-auto">
                    <XCircle className="ml-2 h-4 w-4" />
                    إغلاق الفترة المالية
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>تأكيد إغلاق الفترة</AlertDialogTitle>
                  <AlertDialogDescription>
                    هل أنت متأكد أنك تريد إغلاق الفترة المالية الحالية؟
                    هذه العملية لا يمكن التراجع عنها.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClosePeriodConfirm}>تأكيد الإغلاق</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            {closingResult !== null && (
              <div className={`mt-6 p-4 rounded-lg shadow-md text-center ${
                closingResult >= 0 ? 'bg-green-100 text-green-800 border border-green-400' : 'bg-red-100 text-red-800 border border-red-400'
              }`}>
                <p className="text-xl font-bold">
                  صافي الربح/الخسارة للفترة المغلقة: {closingResult.toFixed(2)} ريال
                </p>
                <p className="mt-2 text-sm">
                  {closingResult >= 0 ? 'تم تحقيق ربح في هذه الفترة.' : 'تم تحقيق خسارة في هذه الفترة.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
