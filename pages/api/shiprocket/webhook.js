import main from "../../../database/conn";
import Order from "../../../models/orderSchema";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    await main();

    const data = req.body;

    /*
      Shiprocket sample payload fields:
      data.order_id
      data.awb
      data.courier_name
    */

    if (!data?.order_id) return res.status(200).end();

    await Order.findOneAndUpdate(
      { _id: data.order_id },
      {
        shiprocket_awb: data.awb || "",
        shiprocket_courier: data.courier_name || "",
      }
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Shiprocket Webhook Error:", err);
    return res.status(200).end(); // shiprocket expects 200
  }
}
