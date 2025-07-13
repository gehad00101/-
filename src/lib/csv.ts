"use client";

import type { Transaction } from '@/types';

export function exportToCsv(transactions: Transaction[], filename: string) {
  if (transactions.length === 0) {
    alert("No transactions to export.");
    return;
  }

  const headers = ['id', 'date', 'type', 'description', 'amount', 'category'];
  const csvRows = [headers.join(',')];

  for (const transaction of transactions) {
    const values = [
      transaction.id,
      transaction.date.toISOString().split('T')[0], // format as YYYY-MM-DD
      transaction.type,
      `"${transaction.description.replace(/"/g, '""')}"`, // handle quotes
      transaction.amount,
      `"${transaction.category.replace(/"/g, '""')}"`
    ];
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
