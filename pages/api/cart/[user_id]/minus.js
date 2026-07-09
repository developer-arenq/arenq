import main from "../../../../database/conn";
import Cart from "../../../../models/cartSchema";

const minusItem = async (req, res) => {
  try {
    await main();

    const { user_id } = req.query;
    const { product_id, quantity } = req.body;

    const cart = await Cart.findOne({ user_id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const existingCartItem = cart.items.find(
      (item) => item.id.toString() === product_id
    );

    if (!existingCartItem)
      return res.status(404).json({ error: "Item not found in cart" });

    if (existingCartItem.quantity <= 1) {
      return res.status(400).json({ error: "Cannot reduce below 1" });
    }

    const qty = Number(quantity);
    const unitPrice = existingCartItem.price;
    const taxPercentage = existingCartItem.taxPercentage;

    const priceMinus = unitPrice * qty;
    const taxMinus = Number(((priceMinus * taxPercentage) / 100).toFixed(2));

    existingCartItem.quantity -= qty;

    existingCartItem.taxAmount = Number(
      (existingCartItem.taxAmount - taxMinus).toFixed(2)
    );

    const itemBase = existingCartItem.price * existingCartItem.quantity;

    existingCartItem.total = Number(
      (itemBase + existingCartItem.taxAmount).toFixed(2)
    );

    cart.subtotal = Number(
      (cart.subtotal - (priceMinus + taxMinus)).toFixed(2)
    );

    cart.taxAmount = Number(
      cart.items.reduce((sum, item) => sum + item.taxAmount, 0).toFixed(2)
    );

    const subtotalBeforeTax = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    cart.taxPercentage =
      subtotalBeforeTax > 0
        ? Number(((cart.taxAmount / subtotalBeforeTax) * 100).toFixed(2))
        : 0;

    cart.shipping = 0;
    cart.total = Number((cart.subtotal + cart.shipping).toFixed(2));

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default minusItem;
