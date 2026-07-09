import main from "../../../../database/conn";
import Cart from "../../../../models/cartSchema";

const plusItem = async (req, res) => {
  try {
    await main();

    const { user_id } = req.query;
    const { product_id, selectedVariant } = req.body;

    let cart = await Cart.findOne({ user_id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const existing = cart.items.find(
      (item) =>
        item.id.toString() === product_id &&
        ((!item.variant && !selectedVariant) ||
          (item.variant &&
            selectedVariant &&
            item.variant.value === selectedVariant.value))
    );

    if (!existing)
      return res.status(404).json({ error: "Item not found" });

    const unitPrice = Number(existing.price);
    const taxPercent = Number(existing.taxPercentage ?? 0);
    const fixedGST = Number(((unitPrice * taxPercent) / 100).toFixed(2));

    // Increase quantity
    existing.quantity += 1;
    existing.baseTotal = existing.quantity * unitPrice;
    existing.taxAmount = fixedGST;
    existing.total = existing.baseTotal + fixedGST;

    // FINAL totals
    cart.subtotal = cart.items.reduce(
      (sum, item) =>
        sum + (Number(item.baseTotal ?? 0) + Number(item.taxAmount ?? 0)),
      0
    );

    cart.totalTax = cart.items.reduce(
      (sum, item) => sum + Number(item.taxAmount ?? 0),
      0
    );

    cart.shipping = 0;
    cart.total = cart.subtotal;

    await cart.save();

    return res.json(cart);
  } catch (err) {
    console.error("plusItem ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default plusItem;
