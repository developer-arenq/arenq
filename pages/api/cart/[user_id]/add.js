import main from "../../../../database/conn";
import Cart from "../../../../models/cartSchema";
import Product from "../../../../models/productSchema";

const addItem = async (req, res) => {
  try {
    await main();

    const { user_id } = req.query;
    const { product_id, quantity, selectedVariant } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ error: "Missing product_id or quantity" });
    }


    let cart = await Cart.findOne({ user_id });

    const product = await Product.findById(product_id).select(
      "name price MRP images alt_text weight SKU slug tax"
    );

    if (!product) return res.status(404).json({ error: "Product not found" });

    const qty = Number(quantity);
    const basePrice = selectedVariant?.price || product.price;
    const taxPercentage = selectedVariant?.tax ?? product.tax ?? 0;

    const taxAmount = Number(((basePrice * qty * taxPercentage) / 100).toFixed(2));
    const itemTotal = Number((basePrice * qty + taxAmount).toFixed(2));

    const renamed_product = {
      id: product._id,
      title: product.name,
      slug: product.slug,
      thumbnail: product.images[0],
      image: product.images,
      alt_text: product.alt_text,
      price: basePrice,
      MRP: selectedVariant?.MRP || product.MRP,
      weight: typeof product.weight === "number" ? product.weight : 109,
      SKU: product.SKU,
      quantity: qty,
      variantValue: selectedVariant?.value || "",
      variant: selectedVariant
        ? {
          id: selectedVariant._id,
          type: selectedVariant.type,
          value: selectedVariant.value,
          price: selectedVariant.price,
          MRP: selectedVariant.MRP,
          tax: selectedVariant.tax,
        }
        : undefined,
      taxPercentage,
      taxAmount,
      total: itemTotal,
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

    const existingCartItem = cart.items.find((item) => {
      const sameProduct = item.id.toString() === product_id;
      const bothNoVariant = !item.variant && !selectedVariant;
      const bothHaveSameVariant =
        item.variant &&
        selectedVariant &&
        item.variant.type === selectedVariant.type &&
        item.variant.value === selectedVariant.value;
      return sameProduct && (bothNoVariant || bothHaveSameVariant);
    });

    if (existingCartItem) {
      existingCartItem.quantity += qty;

      const base = existingCartItem.price * existingCartItem.quantity;
      existingCartItem.taxAmount = Number(
        ((base * existingCartItem.taxPercentage) / 100).toFixed(2)
      );
      existingCartItem.total = Number((base + existingCartItem.taxAmount).toFixed(2));
    } else {
      cart.items.push(renamed_product);
    }

    const round = (num) => Math.round(num * 100) / 100;



    cart.shipping = 0;

    cart.subtotal = cart.items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    cart.taxAmount = cart.items.reduce(
      (sum, item) => sum + Number(item.taxAmount || 0),
      0
    );

    cart.total = cart.subtotal + cart.taxAmount + cart.shipping;

    cart.taxPercentage =
      cart.subtotal > 0
        ? Number(((cart.taxAmount / cart.subtotal) * 100).toFixed(2))
        : 0;

    cart.subtotal = round(cart.subtotal);
    cart.taxAmount = round(cart.taxAmount);
    cart.total = round(cart.total);

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default addItem;
