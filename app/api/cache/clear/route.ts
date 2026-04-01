import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const DEFAULT_PATHS = [
  "/",
  "/categories",
  "/brands",
  "/products",
  "/resources",
  "/deals",
  "/search",
  "/sitemap",
];

type ClearRequest = {
  token?: string;
  paths?: string[];
  tags?: string[];
};

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: Request) {
  const secret = process.env.CACHE_CLEAR_TOKEN;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "CACHE_CLEAR_TOKEN is not configured on server" },
      { status: 500 },
    );
  }

  let body: ClearRequest = {};
  try {
    body = (await request.json()) as ClearRequest;
  } catch {
    // no body provided
  }

  const token =
    body.token ??
    request.headers.get("x-cache-token") ??
    new URL(request.url).searchParams.get("token") ??
    "";

  if (token !== secret) return unauthorized();

  const paths = body.paths && body.paths.length > 0 ? body.paths : DEFAULT_PATHS;
  const tags = body.tags ?? [];

  for (const path of paths) revalidatePath(path, "layout");
  for (const tag of tags) revalidateTag(tag, "max");

  return NextResponse.json({
    ok: true,
    revalidatedPaths: paths,
    revalidatedTags: tags,
    at: new Date().toISOString(),
  });
}

export async function GET(request: Request) {
  const secret = process.env.CACHE_CLEAR_TOKEN;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "CACHE_CLEAR_TOKEN is not configured on server" },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? request.headers.get("x-cache-token") ?? "";
  if (token !== secret) return unauthorized();

  for (const path of DEFAULT_PATHS) revalidatePath(path, "layout");

  return NextResponse.json({
    ok: true,
    revalidatedPaths: DEFAULT_PATHS,
    at: new Date().toISOString(),
  });
}
