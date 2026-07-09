import Product from "../models/productSchema.js";

/**
 * Validates cart/order items against DB
 * - Always fetches price, tax & images from Product
 * - Fixes missing slug
 * - Supports variant-level pricing & tax
 */
export async function validateOrderItems(items = []) {
  const finalItems = [];

  for (const item of items) {
    if (!item?.id) throw new Error("Invalid product id");

    const product = await Product.findById(item.id).lean();
    if (!product) throw new Error("Product not found");

    /* ---------- TITLE (FIXED) ---------- */
    const title =
      product.title || product.name || product.product_name;

    if (!title) {
      throw new Error(`Product title missing for ${product._id}`);
    }

    /* ---------- SLUG ---------- */
    const slug =
      item.slug ||
      product.slug ||
      `missing-slug-${product._id.toString()}`;

    /* ---------- VARIANT ---------- */
    let variant = null;
    let price = product.price;
    let taxPercentage = product.tax || 0;

    if (item.variant && product.variants?.length) {
      const foundVariant = product.variants.find(
        (v) => v.value === item.variant.value
      );

      if (!foundVariant)
        throw new Error(`Invalid variant for ${title}`);

      variant = {
        type: foundVariant.type,
        value: foundVariant.value,
        price: foundVariant.price,
        MRP: foundVariant.MRP,
        tax: foundVariant.tax || 0,
      };

      price = foundVariant.price;
      taxPercentage = foundVariant.tax ?? taxPercentage;
    }

    /* ---------- IMAGE ---------- */
    const images = Array.isArray(product.images)
      ? product.images
      : [];

    finalItems.push({
      id: product._id.toString(),
      title,                 // ✅ FIXED
      slug,
      quantity: Number(item.quantity),

      image: images,
      price,

      taxPercentage,
      taxAmount: 0,
      total: 0,

      variant,
      delivery_status: "order_confirmed",
    });
  }

  return finalItems;
}
