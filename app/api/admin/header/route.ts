import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readHeaderCode, writeHeaderCode } from "@/lib/header-code";

type SaveBody = { headerCode?: string };

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return unauthorized();
  try {
    const headerCode = await readHeaderCode();
    return NextResponse.json({ ok: true, headerCode });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to read header code" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return unauthorized();

  const body = (await request.json().catch(() => ({}))) as SaveBody;
  const headerCode = body.headerCode ?? "";

  try {
    await writeHeaderCode(headerCode);
    const persisted = await readHeaderCode();
    return NextResponse.json({ ok: true, saved: true, headerCode: persisted });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to save header code" }, { status: 500 });
  }
}
