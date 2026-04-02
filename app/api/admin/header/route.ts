import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readHeaderCode, writeHeaderCode } from "@/lib/header-code";

type SaveBody = { headerCode?: string };

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return unauthorized();
  const headerCode = await readHeaderCode();
  return NextResponse.json({ ok: true, headerCode });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const body = (await request.json().catch(() => ({}))) as SaveBody;
  const headerCode = body.headerCode ?? "";

  await writeHeaderCode(headerCode);
  return NextResponse.json({ ok: true, saved: true });
}

