'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Transaction = {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  category: string;
  date: string;
};

const incomeCategories = ['راتب', 'عمل حر', 'هدايا', 'أخرى'];
const expenseCategories = ['طعام', 'مواصلات', 'فواتير', 'ترفيه', 'صحة', 'تعليم', 'أخرى'];

export function TransactionTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const { toast } = useToast();

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category) {
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: 'الرجاء ملء جميع الحقول.',
      });
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      type,
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString('ar-EG'),
    };

    setTransactions([...transactions, newTransaction]);
    toast({
      title: 'نجاح',
      description: 'تمت إضافة المعاملة بنجاح.',
    });

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('');
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast({
        title: 'تم الحذف',
        description: 'تم حذف المعاملة.',
    });
  };

  const categories = type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="text-primary" />
            إضافة معاملة جديدة
          </CardTitle>
          <CardDescription>أضف دخلاً أو مصروفاً جديداً لتتبع أموالك.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTransaction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={type} onValueChange={(value: 'income' | 'expense') => setType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع المعاملة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">مصروف</SelectItem>
                  <SelectItem value="income">دخل</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="الوصف (مثال: فاتورة كهرباء)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                type="number"
                placeholder="المبلغ"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full md:w-auto">إضافة المعاملة</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>سجل المعاملات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الوصف</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead className="text-left">المبلغ</TableHead>
                <TableHead>إجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    لا توجد معاملات بعد.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'income' ? 'دخل' : 'مصروف'}
                      </span>
                    </TableCell>
                    <TableCell className={`text-left font-mono ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {transaction.amount.toLocaleString('ar-SA')} ر.س
                    </TableCell>
                    <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTransaction(transaction.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
