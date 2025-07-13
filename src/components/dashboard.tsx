"use client";

import { useState, useMemo, type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Calendar as CalendarIcon,
  Download,
  Landmark,
  Loader2,
  Plus,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

import { exportToCsv } from "@/lib/csv";
import { getCategoryForTransaction } from "@/app/actions";
import type { Transaction } from "@/types";

const transactionSchema = z.object({
  description: z.string().min(1, "Description is required."),
  amount: z.coerce
    .number({ invalid_type_error: "Amount must be a number." })
    .positive("Amount must be a positive number."),
  date: z.date({ required_error: "Date is required." }),
  category: z.string().min(1, "Category is required."),
});

const TransactionForm: FC<{
  type: "income" | "expense";
  onSuccess: (data: Transaction) => void;
}> = ({ type, onSuccess }) => {
  const [isCategorizing, setIsCategorizing] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      amount: undefined,
      date: new Date(),
      category: "",
    },
  });

  async function handleDescriptionBlur(description: string) {
    if (description) {
      setIsCategorizing(true);
      try {
        const result = await getCategoryForTransaction(description, type);
        if (result.category) {
          form.setValue("category", result.category, { shouldValidate: true });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Categorization Failed",
          description: "Could not get an AI category suggestion.",
        });
      } finally {
        setIsCategorizing(false);
      }
    }
  }

  function onSubmit(values: z.infer<typeof transactionSchema>) {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      type,
      ...values,
    };
    onSuccess(newTransaction);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder={`e.g., ${
                    type === "income" ? "Client Payment" : "Office Supplies"
                  }`}
                  {...field}
                  onBlur={() => handleDescriptionBlur(field.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Category <Sparkles className="h-4 w-4 text-primary/80" />
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="e.g., Sales" {...field} />
                  {isCategorizing && (
                    <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Add {type === "income" ? "Income" : "Expense"}
        </Button>
      </form>
    </Form>
  );
};

const TransactionsTable: FC<{
  transactions: Transaction[];
  type: "income" | "expense";
}> = ({ transactions, type }) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{format(t.date, "MMM d, yyyy")}</TableCell>
                <TableCell className="font-medium">{t.description}</TableCell>
                <TableCell className="text-muted-foreground">
                  {t.category}
                </TableCell>
                <TableCell
                  className={`text-right font-semibold ${
                    type === "income"
                      ? "text-primary"
                      : "text-destructive"
                  }`}
                >
                  ${t.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center h-24">
                No {type} recorded yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const { toast } = useToast();

  const { income, expenses } = useMemo(() => {
    return {
      income: transactions.filter((t) => t.type === "income"),
      expenses: transactions.filter((t) => t.type === "expense"),
    };
  }, [transactions]);

  const { totalIncome, totalExpenses, profitLoss } = useMemo(() => {
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const profitLoss = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, profitLoss };
  }, [income, expenses]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) =>
      [...prev, transaction].sort((a, b) => b.date.getTime() - a.date.getTime())
    );
    toast({
      title: "Transaction Added",
      description: `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} of $${transaction.amount.toFixed(2)} recorded.`,
    });
    if (transaction.type === 'income') setIsIncomeDialogOpen(false);
    if (transaction.type === 'expense') setIsExpenseDialogOpen(false);
  };
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-headline font-bold text-foreground">
            Daftar Accounting
            </h1>
            <p className="text-muted-foreground">Welcome to your financial dashboard.</p>
        </div>
        <Button
            onClick={() => exportToCsv(transactions, "daftar_transactions.csv")}
            variant="outline"
        >
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </header>

      <section className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline text-primary">
              ${totalIncome.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline text-destructive">
              ${totalExpenses.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit & Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold font-headline ${profitLoss >= 0 ? 'text-primary' : 'text-destructive'}`}>
              ${profitLoss.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </section>

      <Tabs defaultValue="income">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <TabsList>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expense">Expenses</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
            <Dialog open={isIncomeDialogOpen} onOpenChange={setIsIncomeDialogOpen}>
                <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Income
                </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Income</DialogTitle>
                </DialogHeader>
                <TransactionForm type="income" onSuccess={addTransaction} />
                </DialogContent>
            </Dialog>
            <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
                <DialogTrigger asChild>
                <Button variant="destructive">
                    <Plus className="mr-2 h-4 w-4" /> Add Expense
                </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Expense</DialogTitle>
                </DialogHeader>
                <TransactionForm type="expense" onSuccess={addTransaction} />
                </DialogContent>
            </Dialog>
            </div>
        </div>

        <TabsContent value="income">
          <TransactionsTable transactions={income} type="income" />
        </TabsContent>
        <TabsContent value="expense">
          <TransactionsTable transactions={expenses} type="expense" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
