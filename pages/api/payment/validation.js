import main from "../../../database/conn";
import crypto from "crypto";
import Payment from "../../../models/paymentSchema";

const validation = async (req, res) => {
  await main();

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    /* 1️⃣ Verify signature */
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    /* 2️⃣ Prevent duplicate */
    const existing = await Payment.findOne({
      payment_id: razorpay_payment_id,
    });

    if (existing) {
      return res.json({ success: true });
    }

    /* 3️⃣ Save payment only */
    await Payment.create({
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature: razorpay_signature,
      status: "captured",
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("Payment validation error:", err);
    return res.status(500).json({ success: false });
  }
};

export default validation;
