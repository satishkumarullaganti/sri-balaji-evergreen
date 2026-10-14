
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../api/admin/auth";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return <AdminDashboard />;
}
