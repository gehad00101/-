'use server';

import { categorizeTransaction } from '@/ai/flows/categorize-transaction';
import { z } from 'zod';

const inputSchema = z.object({
  description: z.string(),
  type: z.enum(['income', 'expense']),
});

export async function getCategoryForTransaction(
  description: string,
  type: 'income' | 'expense'
) {
  const parsedInput = inputSchema.safeParse({ description, type });
  if (!parsedInput.success) {
    throw new Error('Invalid input');
  }

  try {
    const result = await categorizeTransaction({
      transactionDescription: parsedInput.data.description,
      transactionType: parsedInput.data.type,
    });
    return result;
  } catch (error) {
    console.error('Error categorizing transaction:', error);
    return { category: '', confidence: 0 };
  }
}
