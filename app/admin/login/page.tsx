import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="mb-5 text-3xl font-semibold text-slate-900">Admin Login</h1>
      <AdminLoginForm />
    </main>
  );
}

