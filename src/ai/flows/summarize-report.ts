'use server';
/**
 * @fileOverview A Genkit flow to summarize financial reports.
 *
 * - summarizeReport - A function that analyzes report data and provides a summary.
 * - SummarizeReportInput - The input type for the summarizeReport function.
 * - SummarizeReportOutput - The return type for the summarizeReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeReportInputSchema = z.object({
  reportName: z.string().describe("The name of the report (e.g., 'Balance Sheet', 'Income Statement')."),
  reportData: z.string().describe("A JSON string representation of the report's data."),
});
export type SummarizeReportInput = z.infer<typeof SummarizeReportInputSchema>;

export type SummarizeReportOutput = string;

export async function summarizeReport(input: SummarizeReportInput): Promise<SummarizeReportOutput> {
  return summarizeReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeReportPrompt',
  input: { schema: SummarizeReportInputSchema },
  prompt: `Based on the data for the following financial report, provide a brief summary that explains the financial situation, highlights key figures, and points out any important trends or insights.

Report Name: {{{reportName}}}

Report Data (JSON):
{{{reportData}}}
`,
});

const summarizeReportFlow = ai.defineFlow(
  {
    name: 'summarizeReportFlow',
    inputSchema: SummarizeReportInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { text } = await ai.generate({
      prompt: (await prompt(input)).prompt,
    });
    return text;
  }
);
