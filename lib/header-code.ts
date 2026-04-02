import fs from "fs/promises";
import path from "path";

function getRuntimeFile() {
  const customFile = process.env.HEADER_CODE_FILE?.trim();
  if (customFile) return customFile;
  return path.join(process.cwd(), "data", "runtime", "header-code.json");
}

type HeaderCodeStore = { headerCode: string; updatedAt: string };
type HeaderCodeCache = { value: string; expiresAt: number };

let headerCodeCache: HeaderCodeCache | null = null;

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
  const runtimeFile = getRuntimeFile();
  const runtimeDir = path.dirname(runtimeFile);
  await fs.mkdir(runtimeDir, { recursive: true });
  try {
    await fs.access(runtimeFile);
  } catch {
    const initial: HeaderCodeStore = { headerCode: "", updatedAt: new Date(0).toISOString() };
    await fs.writeFile(runtimeFile, JSON.stringify(initial, null, 2), "utf8");
  }
}

export async function readHeaderCode() {
  try {
    const now = Date.now();
    if (headerCodeCache && headerCodeCache.expiresAt > now) {
      return headerCodeCache.value;
    }

    const runtimeFile = getRuntimeFile();
    await ensureRuntimeStore();
    const raw = await fs.readFile(runtimeFile, "utf8");
    const parsed = JSON.parse(raw) as HeaderCodeStore;
    const value = parsed.headerCode ?? "";
    headerCodeCache = { value, expiresAt: now + 30_000 };
    return value;
  } catch {
    return headerCodeCache?.value ?? "";
  }
}

export async function writeHeaderCode(headerCode: string) {
  const runtimeFile = getRuntimeFile();
  await ensureRuntimeStore();
  const normalized = headerCode.slice(0, 20000);
  const payload: HeaderCodeStore = {
    headerCode: normalized,
    updatedAt: new Date().toISOString(),
  };
  const tmpFile = `${runtimeFile}.tmp`;
  await fs.writeFile(tmpFile, JSON.stringify(payload, null, 2), "utf8");
  await fs.rename(tmpFile, runtimeFile);
  headerCodeCache = { value: normalized, expiresAt: Date.now() + 30_000 };
}
