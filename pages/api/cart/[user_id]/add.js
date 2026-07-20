import main from "../../../../database/conn";
import Cart from "../../../../models/cartSchema";
import Product from "../../../../models/productSchema";

const addItem = async (req, res) => {
  try {
    await main();

    const { user_id } = req.query;
    const { product_id, quantity, selectedVariant } = req.body;

    if (!product_id || !quantity) {
      return res
        .status(400)
        .json({ error: "Missing product_id or quantity" });
    }

    let cart = await Cart.findOne({ user_id });

    const product = await Product.findById(product_id).lean();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const qty = Number(quantity);

    // Variant
    let variant = null;

    if (selectedVariant) {
      variant =
        product.variants?.find((v) => {
          if (selectedVariant.sku) {
            return v.sku === selectedVariant.sku;
          }

          return (
            v.model === selectedVariant.model &&
            v.voltage === selectedVariant.voltage &&
            v.capacity === selectedVariant.capacity
          );
        }) || selectedVariant;
    }

    const price = Number(variant?.price ?? product.price ?? 0);
    const mrp = Number(variant?.MRP ?? product.MRP ?? price);

    const sku =
      variant?.sku ||
      selectedVariant?.sku ||
      product.sku ||
      `SKU-${product._id}`;

    const taxPercentage = Number(product.tax ?? 0);

    const weight = Number(
      product.specifications?.get?.("weight") ??
      product.specifications?.weight ??
      109
    );

    const taxAmount = Number(
      ((price * qty * taxPercentage) / 100).toFixed(2)
    );

    const total = Number(
      (price * qty + taxAmount).toFixed(2)
    );

    const cartItem = {
      id: product._id,
      title: product.name,
      slug: product.slug,

      thumbnail: product.images?.[0] || "",
      image: product.images || [],
      alt_text: product.alt_text || "",

      SKU: sku,

      quantity: qty,
      price,
      MRP: mrp,
      weight,

      taxPercentage,
      taxAmount,
      total,

      variant: variant
        ? {
          sku: variant.sku,
          model: variant.model,
          voltage: variant.voltage,
          capacity: variant.capacity,
          price: variant.price,
          MRP: variant.MRP,
          stock: variant.stock,
          image: variant.image || "",
        }
        : null,
    };

    if (!cart) {
      cart = new Cart({
        user_id,
        items: [],
        shipping: 0,
        subtotal: 0,
        taxAmount: 0,
        taxPercentage: 0,
        total: 0,
      });
    }

    const existingItem = cart.items.find((item) => {
      if (item.id.toString() !== product._id.toString()) {
        return false;
      }

      if (!item.variant && !variant) {
        return true;
      }

      if (item.variant && variant) {
        return item.variant.sku === variant.sku;
      }

      return false;
    });

    if (existingItem) {
      existingItem.quantity += qty;

      const base = existingItem.price * existingItem.quantity;

      existingItem.taxAmount = Number(
        (
          (base * existingItem.taxPercentage) /
          100
        ).toFixed(2)
      );

      existingItem.total = Number(
        (base + existingItem.taxAmount).toFixed(2)
      );
    } else {
      cart.items.push(cartItem);
    }

    const round = (n) => Math.round(n * 100) / 100;

    cart.shipping = 0;

    cart.subtotal = round(
      cart.items.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0
      )
    );

    cart.taxAmount = round(
      cart.items.reduce(
        (sum, item) =>
          sum + (item.taxAmount || 0),
        0
      )
    );

    cart.total = round(
      cart.subtotal +
      cart.taxAmount +
      cart.shipping
    );

    cart.taxPercentage =
      cart.subtotal > 0
        ? Number(
          (
            (cart.taxAmount /
              cart.subtotal) *
            100
          ).toFixed(2)
        )
        : 0;

    console.log("Product SKU:", product.sku);
    console.log("Selected Variant:", selectedVariant);
    console.log("Cart Item:", cartItem);
    await cart.save();

    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

export default addItem;