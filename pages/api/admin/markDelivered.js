import main from "../../../database/conn";
import Order from "../../../models/orderSchema";
import { markOrderDelivered } from "../../../utils/markOrderDelivered";

/**
 * This API is called ONLY from Admin project
 * when order is marked as delivered.
 *
 * Responsibilities:
 * 1. Verify admin secret
 * 2. Fetch order
 * 3. Call markOrderDelivered()
 *    → sets isDelevered = true
 *    → sets reviewEligibleAt (2 min test / prod later)
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await main();

    const { orderId, secret } = req.body;

    // 🔐 Security check (VERY IMPORTANT)
    if (!secret || secret !== process.env.NEXTAUTH_SECRET) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    // 🔍 Fetch order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ Call central logic
    await markOrderDelivered(order);

    return res.status(200).json({
      success: true,
      message: "Order marked delivered & review timer started",
      reviewEligibleAt: order.reviewEligibleAt,
    });
  } catch (error) {
    console.error("❌ markDelivered error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
