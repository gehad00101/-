import AppShell from "@/components/app-shell";
import { Management } from "@/components/management";

export default function ManagementPage() {
    // Assuming user role is passed down or available in context
    const userRole = 'admin'; // 'admin' or 'viewer'
  return (
    <AppShell>
      <Management userRole={userRole} />
    </AppShell>
  );
}
