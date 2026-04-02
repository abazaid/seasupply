import { redirect } from "next/navigation";
import { HeaderCodeForm } from "@/components/admin/header-code-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readHeaderCode } from "@/lib/header-code";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const headerCode = await readHeaderCode();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="mb-5 text-3xl font-semibold text-slate-900">Admin Panel</h1>
      <HeaderCodeForm initialValue={headerCode} />
    </main>
  );
}

