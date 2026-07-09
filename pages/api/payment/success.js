import main from "../../../database/conn";
import Order from "../../../models/orderSchema";
import Address from "../../../models/userAddressSchema";

import {
  shiprocketLogin,
  buildShiprocketOrderPayload,
  createShiprocketOrder,
} from "../../../lib/shiprocket";

const paymentSuccess = async (req, res) => {
  await main();

  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "Order ID missing" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    /* 1️⃣ Mark payment success */
    if (!order.isPaid) {
      order.isPaid = true;
      order.paidAt = new Date();
      await order.save();
    }

    /* 2️⃣ Shiprocket already sent? (VERY IMPORTANT) */
    if (order.shiprocket_order_id) {
      return res.json({
        success: true,
        orderId: order._id,
        message: "Shiprocket already created",
      });
    }

    /* 3️⃣ Fetch address */
    const address = await Address.findById(order.shipping_address);
    if (!address) {
      return res.status(400).json({ error: "Shipping address missing" });
    }

    /* 4️⃣ SEND TO SHIPROCKET (NETBANKING + COD) */
    try {
      const srToken = await shiprocketLogin();

      const payload = buildShiprocketOrderPayload({
        order,
        address,
      });

      const srOrder = await createShiprocketOrder(payload, srToken);

      await Order.findByIdAndUpdate(order._id, {
        shiprocket_order_id: srOrder.order_id,
        shiprocket_shipment_id: srOrder.shipment_id,
        shiprocket_status: "order_created",
      });
    } catch (srErr) {
      console.error("❌ Shiprocket error:", srErr.message);
    }

    return res.json({
      success: true,
      orderId: order._id,
    });
  } catch (err) {
    console.error("Payment success error:", err);
    return res.status(500).json({ error: "Payment success failed" });
  }
};

export default paymentSuccess;
