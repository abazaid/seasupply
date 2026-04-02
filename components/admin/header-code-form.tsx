"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type HeaderCodeFormProps = {
  initialValue: string;
};

export function HeaderCodeForm({ initialValue }: HeaderCodeFormProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<"" | "saving" | "saved" | "error">("");

  async function save() {
    setStatus("saving");
    const response = await fetch("/api/admin/header", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ headerCode: value }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("saved");
    router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Header</h2>
        <button type="button" onClick={logout} className="text-sm font-semibold text-slate-600 hover:text-slate-900">
          Logout
        </button>
      </div>
      <p className="text-sm text-slate-600">
        Paste script/meta/link/style/noscript code here. It will be injected into the site head.
      </p>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="min-h-52 w-full rounded-lg border border-slate-300 p-3 font-mono text-sm"
        placeholder="<meta name='verification' content='...'>"
      />
      <div className="flex items-center gap-3">
        <button type="button" onClick={save} className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white">
          Save
        </button>
        {status === "saving" ? <span className="text-sm text-slate-600">Saving...</span> : null}
        {status === "saved" ? <span className="text-sm text-emerald-700">Saved successfully.</span> : null}
        {status === "error" ? <span className="text-sm text-red-600">Save failed. Please login again.</span> : null}
      </div>
    </section>
  );
}

