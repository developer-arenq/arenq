import main from "../../../database/conn";
import Order from "../../../models/orderSchema";

// ✅ REQUIRED for populate
import "../../../models/paymentSchema";
import "../../../models/userSchema";
import "../../../models/userAddressSchema";
import "../../../models/couponSchema"; // ✅ FIX

const getOrder = async (req, res) => {
  await main().catch((err) => console.error(err));

  try {
    const { order_id } = req.query;

    if (!order_id || order_id === "undefined") {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(order_id)
      .populate("shipping_address")
      .populate({ path: "user_id", select: "fullname email mobile" })
      .populate("coupon") // ✅ now works
      .populate("transaction_id");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const obj = order.toObject();

    const safeOrder = {
      ...obj,
      user_id: obj.user_id ?? null,
      shipping_address: obj.shipping_address ?? null,
      coupon: obj.coupon ?? null,
      transaction_id: obj.transaction_id ?? null,
    };

    return res.status(200).json(safeOrder);
  } catch (error) {
    console.error("ORDER API ERROR:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export default getOrder;