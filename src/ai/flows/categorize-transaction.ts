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
  availableAccounts: z.array(z.string()).describe('A list of available accounts in the chart of accounts.'),
});
export type CategorizeTransactionInput = z.infer<typeof CategorizeTransactionInputSchema>;

const CategorizeTransactionOutputSchema = z.object({
  debitAccount: z.string().describe('The predicted debit account for the transaction.'),
  creditAccount: z.string().describe('The predicted credit account for the transaction.'),
  accountType: z.enum(['revenue', 'expense', 'asset', 'liability', 'equity']).describe('The predicted account type for the transaction.'),
  explanation: z.string().describe('An explanation of why these accounts were chosen.'),
});
export type CategorizeTransactionOutput = z.infer<typeof CategorizeTransactionOutputSchema>;

export async function categorizeTransaction(input: CategorizeTransactionInput): Promise<CategorizeTransactionOutput> {
  return categorizeTransactionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeTransactionPrompt',
  input: {schema: CategorizeTransactionInputSchema},
  output: {schema: CategorizeTransactionOutputSchema},
  prompt: `You are a financial expert specializing in suggesting journal entries.

  Based on the description of the transaction, determine the most appropriate debit and credit accounts from the provided list, and classify the transaction type.
  The available accounts are: {{{json availableAccounts}}}

  Transaction Description: {{{transactionDescription}}}

  Provide a brief explanation for your choices. Respond in a valid JSON format.`,
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
