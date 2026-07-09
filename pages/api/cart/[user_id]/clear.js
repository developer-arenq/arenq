import main from "../../../../database/conn";
import Cart from "../../../../models/cartSchema";

const clearCart = async (req, res) => {
  await main();

  try {
    const { user_id } = req.query;

    console.log("CLEAR API HIT");
    console.log("USER ID =", user_id);

    const deletedCart = await Cart.findOneAndDelete({ user_id });


    return res.json({
      success: true,
      deletedCart,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export default clearCart;
