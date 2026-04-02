import { parseHeadCode, readHeaderCode } from "@/lib/header-code";

function normalizeAttrName(name: string) {
  if (name === "http-equiv") return "httpEquiv";
  if (name === "crossorigin") return "crossOrigin";
  if (name === "referrerpolicy") return "referrerPolicy";
  if (name === "charset") return "charSet";
  return name;
}

export const dynamic = "force-dynamic";

export default async function Head() {
  const code = await readHeaderCode();
  const tags = parseHeadCode(code);

  return (
    <>
      {tags.map((item, index) => {
        const attrs: Record<string, string> = {};
        for (const [key, value] of Object.entries(item.attrs)) {
          attrs[normalizeAttrName(key)] = value;
        }

        if (item.tag === "script") {
          if (item.inner) {
            return <script key={`head-script-${index}`} {...attrs} dangerouslySetInnerHTML={{ __html: item.inner }} />;
          }
          return <script key={`head-script-${index}`} {...attrs} />;
        }

        if (item.tag === "style") {
          return <style key={`head-style-${index}`} {...attrs} dangerouslySetInnerHTML={{ __html: item.inner }} />;
        }

        if (item.tag === "noscript") {
          return <noscript key={`head-noscript-${index}`} {...attrs} dangerouslySetInnerHTML={{ __html: item.inner }} />;
        }

        if (item.tag === "meta") {
          return <meta key={`head-meta-${index}`} {...attrs} />;
        }

        return <link key={`head-link-${index}`} {...attrs} />;
      })}
    </>
  );
}

