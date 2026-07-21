import main from "../../../../database/conn";
import Cart from "../../../../models/cartSchema";

const round = (num) => Math.round(num * 100) / 100;

const minusItem = async (req, res) => {
  try {
    await main();

    const { user_id } = req.query;
    const { product_id, quantity = 1, selectedVariant } = req.body;

    const cart = await Cart.findOne({ user_id });

    if (!cart) {
      return res.status(404).json({
        error: "Cart not found",
      });
    }

    const existingCartItem = cart.items.find((item) => {
      if (item.id.toString() !== product_id) return false;

      if (!item.variant && !selectedVariant) return true;

      if (item.variant && selectedVariant) {
        return item.variant.sku === selectedVariant.sku;
      }

      return false;
    });

    if (!existingCartItem) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    const qty = Number(quantity);

    if (existingCartItem.quantity <= qty) {
      return res.status(400).json({
        error: "Cannot reduce below 1",
      });
    }

    existingCartItem.quantity -= qty;

    const basePrice =
      existingCartItem.price * existingCartItem.quantity;

    existingCartItem.taxAmount = round(
      (basePrice * existingCartItem.taxPercentage) / 100
    );

    existingCartItem.total = round(
      basePrice + existingCartItem.taxAmount
    );

    cart.subtotal = round(
      cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    );

    cart.taxAmount = round(
      cart.items.reduce(
        (sum, item) => sum + (item.taxAmount || 0),
        0
      )
    );

    cart.shipping = 0;

    cart.total = round(
      cart.subtotal +
        cart.taxAmount +
        cart.shipping
    );

    cart.taxPercentage =
      cart.subtotal > 0
        ? Number(
            (
              (cart.taxAmount / cart.subtotal) *
              100
            ).toFixed(2)
          )
        : 0;

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

export default minusItem;