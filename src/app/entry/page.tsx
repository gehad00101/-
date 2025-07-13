import AppShell from "@/components/app-shell";
import { InputEntry } from "@/components/input-entry";

export default function InputEntryPage() {
  // Assuming user role is passed down or available in context
  const userRole = "admin"; // or 'accountant', 'viewer'

  return (
    <AppShell>
      <InputEntry userRole={userRole} />
    </AppShell>
  );
}
