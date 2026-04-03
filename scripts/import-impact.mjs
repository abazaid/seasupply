#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const cwd = process.cwd();
const seedDir = path.join(cwd, "data", "seed");
const productsPath = path.join(seedDir, "products.json");
const brandsPath = path.join(seedDir, "brands.json");
const categoriesPath = path.join(seedDir, "categories.json");
const backupDir = path.join(seedDir, "backups");

function parseEnvLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  const eqIndex = trimmed.indexOf("=");
  if (eqIndex <= 0) return null;

  const key = trimmed.slice(0, eqIndex).trim();
  let value = trimmed.slice(eqIndex + 1).trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  return { key, value };
}

async function loadLocalEnv() {
  const files = [".env.local", ".env"];
  for (const filename of files) {
    const filePath = path.join(cwd, filename);
    try {
      const content = await fs.readFile(filePath, "utf8");
      for (const line of content.split(/\r?\n/g)) {
        const parsed = parseEnvLine(line);
        if (!parsed) continue;
        if (process.env[parsed.key] === undefined) process.env[parsed.key] = parsed.value;
      }
    } catch {
      // ignore
    }
  }
}

function parseArgs(defaultLimit) {
  const flags = new Set(process.argv.slice(2));
  return {
    dryRun: flags.has("--dry-run"),
    replaceAll: flags.has("--replace-all"),
    allowNewBrands: !flags.has("--no-new-brands"),
    limit: defaultLimit,
  };
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function trimToLength(value, max) {
  const text = String(value || "").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}...`;
}

function cleanText(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSentence(value) {
  const text = cleanText(value).replace(/\s*,\s*/g, ", ");
  if (!text) return "";
  const withEnd = /[.!?]$/.test(text) ? text : `${text}.`;
  return withEnd.charAt(0).toUpperCase() + withEnd.slice(1);
}

function parsePriceValue(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return undefined;
  const raw = value.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  if (!raw) return undefined;
  const parsed = Number(raw[0]);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function firstPrice(item, keys) {
  for (const key of keys) {
    const parsed = parsePriceValue(item?.[key]);
    if (typeof parsed === "number") return parsed;
  }
  return undefined;
}

function deepFindArrays(obj, out = []) {
  if (!obj || typeof obj !== "object") return out;
  if (Array.isArray(obj)) {
    if (obj.length) out.push(obj);
    for (const item of obj) deepFindArrays(item, out);
    return out;
  }
  for (const value of Object.values(obj)) deepFindArrays(value, out);
  return out;
}

function pickFirstString(record, keys) {
  for (const key of keys) {
    const value = record?.[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return "";
}

function inferCategory(text, categories) {
  const haystack = text.toLowerCase();
  const checks = [
    { category: "electronics-navigation", subcategory: "chartplotters", keywords: ["chartplotter", "gps", "sonar", "fishfinder", "radar", "vhf", "navigation"] },
    { category: "marine-electrical", subcategory: "batteries", keywords: ["battery", "charger", "inverter", "breaker", "electrical", "power"] },
    { category: "apparel", subcategory: "base-layers", keywords: ["watch strap", "silicone strap", "wrist", "wearable", "watch band"] },
    { category: "anchor-docking", subcategory: "anchors", keywords: ["anchor", "docking", "fender", "dock line", "windlass", "rode"] },
    { category: "engine-systems", subcategory: "fuel-systems", keywords: ["engine", "fuel", "ignition", "cooling", "filtration", "outboard"] },
    { category: "boat-maintenance", subcategory: "cleaners", keywords: ["cleaner", "wax", "polish", "maintenance", "paint", "antifouling"] },
    { category: "safety", subcategory: "life-jackets", keywords: ["safety", "life jacket", "pfd", "epirb", "flare", "survival"] },
    { category: "fishing", subcategory: "fishing-electronics", keywords: ["fishing", "tackle", "rod", "livewell", "bait"] },
    { category: "plumbing", subcategory: "hoses", keywords: ["hose", "plumbing", "sanitation", "freshwater", "fitting", "clamp"] },
    { category: "pumps", subcategory: "bilge-pumps", keywords: ["pump", "bilge", "washdown"] },
    { category: "boats-motors", subcategory: "outboard-accessories", keywords: ["boat", "motor", "trolling", "trailering"] },
    { category: "cabin-galley", subcategory: "cookware", keywords: ["galley", "cabin", "cookware", "refrigeration", "storage"] },
    { category: "watersports", subcategory: "towables", keywords: ["towable", "watersport", "impact vest", "tow rope"] },
    { category: "sailing", subcategory: "running-rigging", keywords: ["sail", "rigging", "winch", "block"] },
    { category: "marine-hardware", subcategory: "cleats", keywords: ["hardware", "cleat", "latch", "fastener", "hinge", "rail"] },
    { category: "apparel", subcategory: "foul-weather", keywords: ["apparel", "jacket", "gear", "gloves", "footwear"] },
  ];

  for (const check of checks) {
    if (check.keywords.some((keyword) => haystack.includes(keyword))) return check;
  }

  const fallback = categories.find((c) => c.slug === "electronics-navigation") || categories[0];
  return { category: fallback.slug, subcategory: fallback.subcategories[0]?.slug || "chartplotters" };
}

function resolveBrandSlug(brandName, brands) {
  const clean = cleanText(brandName);
  const normalized = slugify(clean);
  if (!clean) return "";

  const exact = brands.find((brand) => brand.slug === normalized);
  if (exact) return exact.slug;

  const byName = brands.find((brand) => slugify(brand.name) === normalized);
  if (byName) return byName.slug;

  const fuzzy = brands.find((brand) => {
    const nameSlug = slugify(brand.name);
    return normalized.includes(nameSlug) || nameSlug.includes(normalized);
  });
  return fuzzy?.slug || normalized;
}

function buildSeo(record, categoryName) {
  const name = cleanText(record.name);
  const brand = cleanText(record.brandName || "Marine");
  const shortSource = normalizeSentence(record.description || `${name} for marine use.`);

  const seoTitle = trimToLength(`${name} by ${brand} | ${categoryName} at Sea Supply Hub`, 60);
  const seoDescription = trimToLength(
    `Compare ${name} by ${brand} with key specs, fit notes, and practical buying guidance in ${categoryName}.`,
    158,
  );

  const shortDescription = trimToLength(
    shortSource || `${name} from ${brand} with practical performance and compatibility guidance.`,
    150,
  );

  const longDescription = trimToLength(
    `${name} by ${brand} is built for reliable performance in ${categoryName.toLowerCase()} setups. ${shortSource} This listing includes clear specifications, compatibility guidance, and practical buying notes so you can compare confidently before purchase.`,
    680,
  );

  return { seoTitle, seoDescription, shortDescription, longDescription };
}

function extractFeatures(item) {
  const candidates = [item.Features, item.FeatureBullets, item.Bullets, item.Highlights, item.KeyFeatures, item.Attributes];
  const values = [];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      for (const val of candidate) {
        if (typeof val === "string" && val.trim()) values.push(cleanText(val));
        if (val && typeof val === "object") {
          const maybe = pickFirstString(val, ["Value", "value", "Name", "name", "Description"]);
          if (maybe) values.push(cleanText(maybe));
        }
      }
    } else if (typeof candidate === "string" && candidate.trim()) {
      values.push(...candidate.split(/[|;]+/g).map((x) => cleanText(x)).filter(Boolean));
    }
  }

  return Array.from(new Set(values)).slice(0, 6);
}

function buildSpecs(item) {
  const specs = [];
  const mapping = [
    ["Model", ["Model", "ModelNumber", "MPN"]],
    ["UPC", ["UPC", "Upc"]],
    ["Weight", ["Weight", "ShippingWeight"]],
    ["Length", ["Length"]],
    ["Width", ["Width"]],
    ["Height", ["Height"]],
    ["Color", ["Color"]],
    ["Material", ["Material"]],
  ];

  for (const [label, keys] of mapping) {
    const value = pickFirstString(item, keys);
    if (value) specs.push({ label, value: cleanText(value) });
  }

  if (!specs.length) {
    const fallbackModel = pickFirstString(item, ["Model", "ModelNumber", "Title", "Name"]);
    if (fallbackModel) specs.push({ label: "Model", value: cleanText(fallbackModel) });
  }
  return specs.slice(0, 8);
}

function normalizeCatalogItems(payload) {
  const direct = [];
  if (Array.isArray(payload?.CatalogItems)) direct.push(payload.CatalogItems);
  if (Array.isArray(payload?.Items)) direct.push(payload.Items);
  if (Array.isArray(payload?.Products)) direct.push(payload.Products);
  if (Array.isArray(payload?.Result)) direct.push(payload.Result);
  if (direct.length) return direct.flat();

  const arrays = deepFindArrays(payload).filter((arr) => {
    if (!arr.length || typeof arr[0] !== "object") return false;
    const first = arr[0];
    return "Name" in first || "ProductName" in first || "Description" in first || "ProductUrl" in first || "TrackingLink" in first;
  });

  return arrays[0] || [];
}

function parseCsvList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function passesFilters(item, merchantAllowlist, keywordAllowlist) {
  if (!merchantAllowlist.length && !keywordAllowlist.length) return true;

  const merchant = cleanText(
    pickFirstString(item, ["MerchantName", "Brand", "BrandName", "Manufacturer"]),
  ).toLowerCase();
  const textBlob = [
    pickFirstString(item, ["Name", "ProductName", "Title"]),
    pickFirstString(item, ["Description", "ShortDescription", "Category", "CategoryName", "ProductType"]),
    merchant,
  ]
    .join(" ")
    .toLowerCase();

  const merchantOk =
    merchantAllowlist.length === 0 ||
    merchantAllowlist.some((allowed) => merchant.includes(allowed));
  const keywordOk =
    keywordAllowlist.length === 0 ||
    keywordAllowlist.some((allowed) => textBlob.includes(allowed));

  return merchantOk && keywordOk;
}

async function loadJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function saveJson(filePath, data) {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function mapItemToProduct(item, brands, categories) {
  const id = pickFirstString(item, ["Id", "CatalogItemId", "ProductId", "ID"]) || `imp-${Date.now()}`;
  const name = pickFirstString(item, ["Name", "ProductName", "Title", "name"]) || `Marine Product ${id}`;
  const description = cleanText(pickFirstString(item, ["Description", "ShortDescription", "description", "ProductDescription"]));

  const url = pickFirstString(item, ["TrackingLink", "TrackingUrl", "Url", "ProductUrl", "Link", "BuyUrl"]);
  if (!/^https?:\/\//i.test(url)) return null;

  const merchantName = pickFirstString(item, ["MerchantName", "ProgramName"]);
  let brandName = pickFirstString(item, ["Brand", "BrandName", "Manufacturer"]);
  if (!brandName || brandName.length < 4 || /^(strap|parts|accessories)$/i.test(brandName)) {
    brandName = merchantName;
  }
  const brandSlug = resolveBrandSlug(brandName || "Marine Brand", brands) || "west-marine";

  const categoryHint = [
    pickFirstString(item, ["Category", "CategoryName", "PrimaryCategory"]),
    pickFirstString(item, ["CategoryPath", "Taxonomy", "ProductType"]),
    name,
    description,
  ].filter(Boolean).join(" ");

  const inferred = inferCategory(categoryHint, categories);
  const category = categories.find((c) => c.slug === inferred.category) || categories[0];
  const subcategory = category.subcategories.find((s) => s.slug === inferred.subcategory) || category.subcategories[0];

  const seo = buildSeo({ name, brandName, description }, category.name);
  const highlights = extractFeatures(item);
  const specs = buildSpecs(item);

  const imageUrl = pickFirstString(item, ["ImageUrl", "ImageURL", "LargeImageUrl", "DefaultImageUrl", "Image"]) || "/images/products/placeholder-product-1.svg";
  const sku = pickFirstString(item, ["Sku", "SKU", "Mpn", "MPN", "ModelNumber"]) || `IMP-${slugify(name)}`;
  const price = firstPrice(item, ["SalePrice", "CurrentPrice", "Price", "Amount", "MinPrice"]);
  const compareAtPrice = firstPrice(item, ["RetailPrice", "OriginalPrice", "RegularPrice", "MaxPrice", "MSRP"]);
  const currency =
    pickFirstString(item, ["Currency", "CurrencyCode", "currencyCode"]).toUpperCase() || "USD";

  return {
    id: `IMP-${id}`,
    slug: slugify(name),
    name,
    seoTitle: seo.seoTitle,
    seoDescription: seo.seoDescription,
    price,
    compareAtPrice:
      typeof compareAtPrice === "number" && typeof price === "number" && compareAtPrice > price
        ? compareAtPrice
        : undefined,
    currency,
    brandSlug,
    categorySlug: category.slug,
    subcategorySlug: subcategory.slug,
    sku,
    shortDescription: seo.shortDescription,
    longDescription: seo.longDescription,
    highlights: highlights.length ? highlights : [`Built for dependable ${category.name.toLowerCase()} performance`, "Practical fit and setup details included", "Quick comparison format for faster buying decisions"],
    pros: ["Clear core specs and model details", "Useful fit and compatibility guidance", "Fast comparison before partner checkout"],
    cons: ["Final stock and shipping terms are confirmed on seller page"],
    specs: [
      ...specs,
      { label: "Brand", value: brandName || "Partner brand" },
      { label: "SKU", value: sku },
    ].slice(0, 10),
    compatibility: [`Best matched for ${category.name} use cases`, "Verify dimensions and model compatibility before purchase"],
    images: [imageUrl],
    partnerLinks: [
      {
        label: "View Details",
        url,
        network: "Impact",
        merchant: merchantName || brandName || "Partner Merchant",
        lastChecked: new Date().toISOString().slice(0, 10),
        availabilityNote: "Availability may change on partner site.",
        rel: "sponsored nofollow",
      },
    ],
    relatedProductSlugs: [],
    relatedGuideSlugs: [],
    featured: false,
    bestSeller: false,
  };
}

function ensureUniqueSlugs(products) {
  const seen = new Map();
  return products.map((product) => {
    const count = seen.get(product.slug) || 0;
    seen.set(product.slug, count + 1);
    if (count === 0) return product;
    return { ...product, slug: `${product.slug}-${count + 1}` };
  });
}

async function backupProducts(products) {
  await fs.mkdir(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = path.join(backupDir, `products.backup.${stamp}.json`);
  await saveJson(backupPath, products);
  return backupPath;
}

async function main() {
  await loadLocalEnv();

  const IMPACT_API_BASE = process.env.IMPACT_API_BASE_URL || "https://api.impact.com";
  const IMPACT_ACCOUNT_SID = process.env.IMPACT_ACCOUNT_SID;
  const IMPACT_AUTH_TOKEN = process.env.IMPACT_AUTH_TOKEN;
  const PAGE_SIZE = Number(process.env.IMPACT_PAGE_SIZE || "30");
  const DEFAULT_LIMIT = Number(process.env.IMPACT_IMPORT_LIMIT || "5");
  const merchantAllowlist = parseCsvList(process.env.IMPACT_MERCHANT_ALLOWLIST);
  const keywordAllowlist = parseCsvList(process.env.IMPACT_KEYWORD_ALLOWLIST);
  const options = parseArgs(DEFAULT_LIMIT);

  if (!IMPACT_ACCOUNT_SID || !IMPACT_AUTH_TOKEN) {
    throw new Error("Missing IMPACT_ACCOUNT_SID or IMPACT_AUTH_TOKEN in environment.");
  }

  const authHeader = `Basic ${Buffer.from(`${IMPACT_ACCOUNT_SID}:${IMPACT_AUTH_TOKEN}`).toString("base64")}`;

  async function impactGet(apiPath, query = {}) {
    const url = new URL(apiPath, IMPACT_API_BASE);
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      url.searchParams.set(key, String(value));
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: authHeader,
        Accept: "application/json",
      },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Impact API ${response.status} on ${url.pathname}: ${text.slice(0, 300)}`);
    }

    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`Impact API did not return JSON for ${url.pathname}.`);
    }
  }

  async function fetchCatalogs() {
    const payload = await impactGet(`/Mediapartners/${IMPACT_ACCOUNT_SID}/Catalogs`, { PageSize: PAGE_SIZE, Page: 1 });
    const arrays = deepFindArrays(payload).filter((arr) => {
      if (!arr.length || typeof arr[0] !== "object") return false;
      return "Id" in arr[0] || "Name" in arr[0] || "CatalogId" in arr[0];
    });

    const catalogs = arrays[0] || [];
    return catalogs
      .map((catalog) => ({
        id: pickFirstString(catalog, ["Id", "CatalogId", "ID"]),
        name: pickFirstString(catalog, ["Name", "CatalogName", "name"]) || "Impact Catalog",
      }))
      .filter((catalog) => catalog.id);
  }

  async function fetchCatalogItems(catalogId, limit) {
    const endpoints = [
      `/Mediapartners/${IMPACT_ACCOUNT_SID}/Catalogs/${catalogId}/Items`,
      `/Mediapartners/${IMPACT_ACCOUNT_SID}/Catalogs/${catalogId}/CatalogItems`,
      `/Mediapartners/${IMPACT_ACCOUNT_SID}/Catalogs/${catalogId}/Products`,
    ];

    for (const endpoint of endpoints) {
      try {
        const all = [];
        for (let page = 1; page <= 5; page += 1) {
          const payload = await impactGet(endpoint, { PageSize: PAGE_SIZE, Page: page });
          const pageItems = normalizeCatalogItems(payload);
          if (!pageItems.length) break;
          all.push(...pageItems);
          if (all.length >= limit) break;
        }
        if (all.length) return all.slice(0, limit);
      } catch {
        // try next endpoint
      }
    }

    return [];
  }

  const [existingProducts, brands, categories] = await Promise.all([
    loadJson(productsPath),
    loadJson(brandsPath),
    loadJson(categoriesPath),
  ]);

  const catalogs = await fetchCatalogs();
  if (!catalogs.length) throw new Error("No catalogs returned from Impact account.");

  const importedItems = [];
  for (const catalog of catalogs) {
    if (importedItems.length >= options.limit) break;
    const remaining = options.limit - importedItems.length;
    const fetched = await fetchCatalogItems(catalog.id, Math.max(remaining * 3, remaining));
    const filtered = fetched.filter((item) =>
      passesFilters(item, merchantAllowlist, keywordAllowlist),
    );
    importedItems.push(...filtered.slice(0, remaining));
  }

  if (!importedItems.length) {
    throw new Error("No catalog items found from Impact. Check catalog permissions and account feed settings.");
  }

  let importedProducts = importedItems.map((item) => mapItemToProduct(item, brands, categories)).filter(Boolean);
  importedProducts = ensureUniqueSlugs(importedProducts).slice(0, options.limit);

  if (!importedProducts.length) {
    throw new Error("Imported items were found but none had valid product URLs for partner links.");
  }

  const incomingBrandSlugs = new Set(importedProducts.map((p) => p.brandSlug));
  const missingBrandSlugs = [...incomingBrandSlugs].filter((slug) => !brands.some((brand) => brand.slug === slug));

  const newBrands = [];
  if (options.allowNewBrands) {
    for (const slug of missingBrandSlugs) {
      newBrands.push({
        slug,
        name: slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" "),
        description: "Imported brand profile from Impact catalog feed.",
        website: "https://impact.com",
        logoText: slug.toUpperCase(),
        featured: false,
      });
    }
  } else if (missingBrandSlugs.length) {
    importedProducts = importedProducts.map((product) => (missingBrandSlugs.includes(product.brandSlug) ? { ...product, brandSlug: "west-marine" } : product));
  }

  if (options.dryRun) {
    console.log("Dry run successful.");
    console.log(`Catalogs discovered: ${catalogs.length}`);
    console.log(`Imported products prepared: ${importedProducts.length}`);
    console.log("Product slugs:", importedProducts.map((p) => p.slug).join(", "));
    return;
  }

  const backupPath = await backupProducts(existingProducts);
  const finalProducts = options.replaceAll ? importedProducts : [...existingProducts, ...importedProducts];

  await saveJson(productsPath, finalProducts);
  if (newBrands.length) await saveJson(brandsPath, [...brands, ...newBrands]);

  console.log(`Imported ${importedProducts.length} products from Impact.`);
  console.log(`Products seed updated: ${productsPath}`);
  console.log(`Backup created: ${backupPath}`);
  if (newBrands.length) console.log(`Added ${newBrands.length} new brand profiles to brands seed.`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
