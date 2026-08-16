import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getCmsContent } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getCmsContent();

  return <AdminDashboard initialContent={content} />;
}
