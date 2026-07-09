// pages/api/cron/sendReviewEmails.js
import main from "../../../database/conn";
import Order from "../../../models/orderSchema";
import { sendReviewMailLogic } from "../../../utils/sendReviewMailLogic";

export default async function handler(req, res) {
  try {
    await main();

    const orders = await Order.find({
      isDelevered: true,
      reviewEmailSent: false,
      reviewEligibleAt: { $lte: new Date() },
    });

    let count = 0;

    for (const order of orders) {
      await sendReviewMailLogic(order._id);
      count++;
    }

    return res.json({
      success: true,
      count,
      message: "Review emails processed",
    });
  } catch (err) {
    console.error("❌ Cron error:", err);
    return res.status(500).json({ success: false });
  }
}
