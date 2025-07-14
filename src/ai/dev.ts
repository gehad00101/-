import { config } from 'dotenv';
config();

import '@/ai/flows/categorize-transaction.ts';
import '@/ai/flows/generate-dashboard-insight.ts';
import '@/ai/flows/summarize-report.ts';
