'use server';
/**
 * @fileOverview A Genkit flow to generate insights for the accounting dashboard.
 *
 * - generateDashboardInsight - A function that analyzes dashboard data and provides a summary.
 * - GenerateDashboardInsightInput - The input type for the generateDashboardInsight function.
 * - GenerateDashboardInsightOutput - The return type for the generateDashboardInsight function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MonthlyDataSchema = z.object({
  month: z.string(),
  revenue: z.number(),
  expense: z.number(),
});

const GenerateDashboardInsightInputSchema = z.object({
  total_revenue: z.number(),
  total_expenses: z.number(),
  net_profit: z.number(),
  invoice_count: z.number(),
  monthly_data: z.array(MonthlyDataSchema),
});
export type GenerateDashboardInsightInput = z.infer<typeof GenerateDashboardInsightInputSchema>;

export type GenerateDashboardInsightOutput = string;

export async function generateDashboardInsight(input: GenerateDashboardInsightInput): Promise<GenerateDashboardInsightOutput> {
  return generateDashboardInsightFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDashboardInsightPrompt',
  input: { schema: GenerateDashboardInsightInputSchema },
  prompt: `Based on the following financial dashboard data for a coffee shop:
Total Revenue: {{{total_revenue}}}
Total Expenses: {{{total_expenses}}}
Net Profit/Loss: {{{net_profit}}}
Number of Transactions: {{{invoice_count}}}

Monthly Data (Revenue and Expenses for the last 6 months):
{{#each monthly_data}}
- {{month}}: Revenue {{revenue}}, Expenses {{expense}}
{{/each}}

Please provide a brief and comprehensive financial analysis (less than 200 words) highlighting the overall performance, any noticeable trends in revenue and expenses, and the net profit. Mention financial strengths or weaknesses and suggest areas for improvement if possible.
`,
});

const generateDashboardInsightFlow = ai.defineFlow(
  {
    name: 'generateDashboardInsightFlow',
    inputSchema: GenerateDashboardInsightInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { text } = await ai.generate({
      prompt: (await prompt(input)).prompt,
    });
    return text;
  }
);
