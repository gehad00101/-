// use server'

/**
 * @fileOverview This file contains the Genkit flow for categorizing transactions.
 *
 * - categorizeTransaction - A function that categorizes a transaction based on its description.
 * - CategorizeTransactionInput - The input type for the categorizeTransaction function.
 * - CategorizeTransactionOutput - The return type for the categorizeTransaction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeTransactionInputSchema = z.object({
  transactionDescription: z.string().describe('The description of the transaction.'),
  transactionType: z.enum(['income', 'expense']).describe('The type of the transaction (income or expense).'),
});
export type CategorizeTransactionInput = z.infer<typeof CategorizeTransactionInputSchema>;

const CategorizeTransactionOutputSchema = z.object({
  category: z.string().describe('The predicted category of the transaction.'),
  confidence: z.number().describe('The confidence level of the categorization (0-1).'),
});
export type CategorizeTransactionOutput = z.infer<typeof CategorizeTransactionOutputSchema>;

export async function categorizeTransaction(input: CategorizeTransactionInput): Promise<CategorizeTransactionOutput> {
  return categorizeTransactionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeTransactionPrompt',
  input: {schema: CategorizeTransactionInputSchema},
  output: {schema: CategorizeTransactionOutputSchema},
  prompt: `You are a financial expert specializing in categorizing transactions.

  Based on the description of the transaction and the transaction type, determine the most appropriate category for the transaction.
  Also, provide a confidence level (0-1) indicating how sure you are about the categorization.

  Transaction Description: {{{transactionDescription}}}
  Transaction Type: {{{transactionType}}}

  Respond in a valid JSON format.`,
});

const categorizeTransactionFlow = ai.defineFlow(
  {
    name: 'categorizeTransactionFlow',
    inputSchema: CategorizeTransactionInputSchema,
    outputSchema: CategorizeTransactionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
