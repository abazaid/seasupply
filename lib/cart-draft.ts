import type { CartItemDraft, CartSnapshot } from "@/types/cart";

export function createEmptyCart(): CartSnapshot {
  return {
    items: [],
    updatedAt: new Date().toISOString(),
  };
}

export function addToCartDraft(
  snapshot: CartSnapshot,
  item: CartItemDraft,
): CartSnapshot {
  const existing = snapshot.items.find((entry) => entry.productSlug === item.productSlug);

  if (!existing) {
    return {
      ...snapshot,
      items: [...snapshot.items, item],
      updatedAt: new Date().toISOString(),
    };
  }

  return {
    ...snapshot,
    items: snapshot.items.map((entry) =>
      entry.productSlug === item.productSlug
        ? { ...entry, quantity: entry.quantity + item.quantity }
        : entry,
    ),
    updatedAt: new Date().toISOString(),
  };
}
