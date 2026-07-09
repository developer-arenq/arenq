/* ============================
   GUEST CART HELPERS
============================ */

export const getGuestCart = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("guest_cart")) || [];
};

export const setGuestCart = (cart) => {
  localStorage.setItem("guest_cart", JSON.stringify(cart));
};

/* SAFE WEIGHT PARSER */
const parseWeight = (value) => {
  if (!value) return 0;
  const match = value.toString().match(/\d+/);
  return match ? Number(match[0]) : 0;
};

/* SAFE PRODUCT FIELDS */
const getProductTitle = (product) =>
  product?.name || product?.title || "";

const getProductImage = (product) =>
  product?.main_image ||
  product?.image ||
  product?.images?.[0] ||
  "/placeholder.jpg";

/* ➕ ADD TO GUEST CART */
export const addToGuestCart = (product, variant, qty = 1) => {
  const cart = getGuestCart();

  const normalizedVariant = variant
    ? {
        id: variant._id || variant.id,
        value: variant.value,
        price: variant.price,
        MRP: variant.MRP,
        SKU: variant.SKU || "NA",
        weight: parseWeight(variant.value),
      }
    : null;

  const existing = cart.find((item) => {
    if (item.id !== product._id) return false;

    if (!item.variant && !normalizedVariant) return true;
    if (item.variant && normalizedVariant) {
      return item.variant.id === normalizedVariant.id;
    }
    return false;
  });

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: product._id,
      title: getProductTitle(product),
      price: normalizedVariant?.price || product.price,
      MRP: normalizedVariant?.MRP || product.MRP,
      thumbnail: getProductImage(product),
      quantity: qty,
      variant: normalizedVariant,
      tax: product.tax || 0,
    });
  }

  setGuestCart(cart);
  return cart;
};

/* ➕ / ➖ UPDATE QTY */
export const updateGuestCartQty = (productId, variantId, delta) => {
  const cart = getGuestCart();

  const item = cart.find(
    (i) =>
      i.id === productId &&
      ((i.variant?.id && i.variant.id === variantId) ||
        (!i.variant && !variantId))
  );

  if (!item) return cart;

  item.quantity += delta;

  if (item.quantity <= 0) {
    return removeGuestCartItem(productId, variantId);
  }

  setGuestCart(cart);
  return cart;
};

/* ❌ REMOVE ITEM */
export const removeGuestCartItem = (productId, variantId) => {
  const updated = getGuestCart().filter(
    (i) =>
      !(
        i.id === productId &&
        ((i.variant?.id && i.variant.id === variantId) ||
          (!i.variant && !variantId))
      )
  );

  setGuestCart(updated);
  return updated;
};

/* 🧹 CLEAR */
export const clearGuestCart = () => {
  localStorage.removeItem("guest_cart");
  return [];
};
