export type JournalEntryLine = {
    account: string;
    description: string;
    debit: string | number;
    credit: string | number;
};
  
export type JournalEntry = {
    id: string;
    date: string;
    description: string;
    lineCount: number;
    user: string;
    status: 'معتمد' | 'قيد المراجعة' | 'مسودة';
    entryType: 'manual' | 'automatic';
    operationType?: string;
    detailedLines: JournalEntryLine[];
    isNew?: boolean;
};
  
export type InvoiceItem = {
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
};

export type Invoice = {
    id: string;
    date: string;
    customerSupplierName: string;
    customerSupplierId: string;
    type: 'sales' | 'purchase';
    paymentMethod: 'cash' | 'transfer' | 'credit' | 'card';
    items: InvoiceItem[];
    discount: number;
    subtotal: number;
    taxAmount: number;
    finalTotal: number;
    status: 'paid' | 'unpaid' | 'partially_paid';
};
  
export type Account = {
    id: string;
    name: string;
    type: string;
    color: string;
    parentId: string | null;
};

export type Transaction = {
    id: string;
    date: Date;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
};
