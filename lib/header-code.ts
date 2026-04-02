import fs from "fs/promises";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";

const runtimeDir = path.join(process.cwd(), "data", "runtime");
const runtimeFile = path.join(runtimeDir, "header-code.json");

type HeaderCodeStore = { headerCode: string; updatedAt: string };

function parseAttributes(input: string) {
  const attrs: Record<string, string> = {};
  const attrRegex = /([:@a-zA-Z0-9-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
  let match: RegExpExecArray | null = null;

  while ((match = attrRegex.exec(input)) !== null) {
    const key = match[1].toLowerCase();
    const value = match[3] ?? match[4] ?? match[5] ?? "";
    attrs[key] = value;
  }

  return attrs;
}

export type ParsedHeadTag = {
  tag: "meta" | "link" | "script" | "style" | "noscript";
  attrs: Record<string, string>;
  inner: string;
};

export function parseHeadCode(code: string) {
  const items: ParsedHeadTag[] = [];
  const tagRegex = /<(meta|link|script|style|noscript)\b([^>]*?)(?:\/>|>([\s\S]*?)<\/\1>)/gi;
  let match: RegExpExecArray | null = null;

  while ((match = tagRegex.exec(code)) !== null) {
    const tag = match[1].toLowerCase() as ParsedHeadTag["tag"];
    const attrs = parseAttributes(match[2] ?? "");
    const inner = (match[3] ?? "").trim();
    items.push({ tag, attrs, inner });
  }

  return items;
}

async function ensureRuntimeStore() {
  await fs.mkdir(runtimeDir, { recursive: true });
  try {
    await fs.access(runtimeFile);
  } catch {
    const initial: HeaderCodeStore = { headerCode: "", updatedAt: new Date(0).toISOString() };
    await fs.writeFile(runtimeFile, JSON.stringify(initial, null, 2), "utf8");
  }
}

export async function readHeaderCode() {
  noStore();
  await ensureRuntimeStore();
  const raw = await fs.readFile(runtimeFile, "utf8");
  const parsed = JSON.parse(raw) as HeaderCodeStore;
  return parsed.headerCode ?? "";
}

export async function writeHeaderCode(headerCode: string) {
  await ensureRuntimeStore();
  const payload: HeaderCodeStore = {
    headerCode,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(runtimeFile, JSON.stringify(payload, null, 2), "utf8");
}

