import main from "../../../database/conn";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const createPaymentOrder = async (req, res) => {
  await main();

  try {
    const { total } = req.body;

    const order = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
    });

    return res.json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Razorpay error" });
  }
};

export default createPaymentOrder;
