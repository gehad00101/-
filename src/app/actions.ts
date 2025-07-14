'use server';

import { categorizeTransaction } from '@/ai/flows/categorize-transaction';
import { generateDashboardInsight } from '@/ai/flows/generate-dashboard-insight';
import { summarizeReport } from '@/ai/flows/summarize-report';
import { z } from 'zod';

// Schema for getCategoryForTransaction
const categorizeInputSchema = z.object({
  description: z.string(),
  accounts: z.array(z.string()),
});

export async function getCategoryForTransaction(
  description: string,
  accounts: string[]
) {
  const parsedInput = categorizeInputSchema.safeParse({ description, accounts });
  if (!parsedInput.success) {
    throw new Error('Invalid input for categorization');
  }

  try {
    const result = await categorizeTransaction({
      transactionDescription: parsedInput.data.description,
      availableAccounts: parsedInput.data.accounts,
    });
    return result;
  } catch (error) {
    console.error('Error categorizing transaction:', error);
    return { debitAccount: '', creditAccount: '', accountType: 'expense', explanation: 'Error during categorization.' };
  }
}

// Schema for getDashboardInsight
const insightInputSchema = z.object({
  total_revenue: z.number(),
  total_expenses: z.number(),
  net_profit: z.number(),
  invoice_count: z.number(),
  monthly_data: z.array(z.object({ month: z.string(), revenue: z.number(), expense: z.number() })),
});

export async function getDashboardInsight(data: z.infer<typeof insightInputSchema>) {
  const parsedInput = insightInputSchema.safeParse(data);
  if (!parsedInput.success) {
    throw new Error('Invalid input for dashboard insight');
  }

  try {
    const result = await generateDashboardInsight(parsedInput.data);
    return result;
  } catch (error) {
    console.error('Error generating dashboard insight:', error);
    return 'An error occurred while generating the insight.';
  }
}

// Schema for getReportSummary
const summaryInputSchema = z.object({
  reportName: z.string(),
  reportData: z.any(),
});

export async function getReportSummary(reportName: string, reportData: any) {
  const parsedInput = summaryInputSchema.safeParse({ reportName, reportData });
  if (!parsedInput.success) {
    throw new Error('Invalid input for report summary');
  }

  try {
    const result = await summarizeReport({
        reportName: parsedInput.data.reportName,
        reportData: JSON.stringify(parsedInput.data.reportData, null, 2),
    });
    return result;
  } catch (error) {
    console.error('Error generating report summary:', error);
    return 'An error occurred while generating the summary.';
  }
}
