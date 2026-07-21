import main from "../../../../database/conn";
import Cart from "../../../../models/cartSchema";

const clearCart = async (req, res) => {
  try {
    await main();

    const { user_id } = req.query;

    const cart = await Cart.findOneAndUpdate(
      { user_id },
      {
        $set: {
          items: [],
          subtotal: 0,
          taxAmount: 0,
          taxPercentage: 0,
          shipping: 0,
          total: 0,
        },
      },
      {
        new: true,
      }
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: "Cart not found",
      });
    }

    return res.status(200).json({
      success: true,
      items: cart.items,
      shipping: cart.shipping,
      subtotal: cart.subtotal,
      total: cart.total,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export default clearCart;