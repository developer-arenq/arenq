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

    if (item.variant?.sku && product.variants?.length) {
      const foundVariant = product.variants.find(
        (v) => v.sku === item.variant.sku
      );

      if (!foundVariant) {
        throw new Error(`Invalid variant for ${title}`);
      }
      variant = {
        sku: foundVariant.sku || "",
        model: foundVariant.model || "",
        voltage: foundVariant.voltage || "",
        capacity: foundVariant.capacity || "",
        price: foundVariant.price,
        MRP: foundVariant.MRP,
        stock: foundVariant.stock,
        image: foundVariant.image || "",
      };

      price = foundVariant.price;
      taxPercentage = product.tax || 0;
    }

    /* ---------- IMAGE ---------- */
    const images = Array.isArray(product.images)
      ? product.images
      : [];

    finalItems.push({
      id: product._id.toString(),
      title,
      slug,

      thumbnail: product.main_image || "",
      image: product.images || [],
      alt_text: product.alt_text || "",

      SKU: variant?.sku || product.sku || "",

      quantity: Number(item.quantity),

      weight: product.weight || 0,

      price,
      MRP: variant?.MRP || product.MRP,

      taxPercentage,
      taxAmount: 0,
      total: 0,

      variant,

      delivery_status: "order_confirmed",
    });
  }

  return finalItems;
}
