import main from "../../../../database/conn";
import Cart from "../../../../models/cartSchema";

const round = (num) => Math.round(num * 100) / 100;

const removeItem = async (req, res) => {
  try {
    await main();

    const { user_id } = req.query;
    const { product_id, selectedVariant } = req.body;

    const cart = await Cart.findOne({ user_id });

    if (!cart) {
      return res.status(404).json({
        error: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex((item) => {
      if (item.id.toString() !== product_id) {
        return false;
      }

      if (!item.variant && !selectedVariant) {
        return true;
      }

      if (item.variant && selectedVariant) {
        return item.variant.sku === selectedVariant.sku;
      }

      return false;
    });

    if (itemIndex === -1) {
      return res.status(404).json({
        error: "Item not found",
      });
    }

    cart.items.splice(itemIndex, 1);

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

    cart.shipping = cart.items.length ? 0 : 0;

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

export default removeItem;