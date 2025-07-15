import { TransactionTracker } from "@/components/transaction-tracker";
import AppShell from "@/components/app-shell";

export default function TransactionsPage() {
  return (
    <AppShell>
      <TransactionTracker />
    </AppShell>
  );
}
