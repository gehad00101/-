import AppShell from "@/components/app-shell";
import { CashFlowStatement } from "@/components/reports/cash-flow-statement";

export default function CashFlowStatementPage() {
  return (
    <AppShell>
      <CashFlowStatement />
    </AppShell>
  );
}
