export interface CartItemDraft {
  productSlug: string;
  quantity: number;
  partnerUrl?: string;
}

export interface CartSnapshot {
  items: CartItemDraft[];
  updatedAt: string;
}

// Affiliate-first today: these types prepare a future native cart/checkout layer
// without requiring route-level refactoring.
