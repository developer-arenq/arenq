import main from "../../../database/conn";
import Order from "../../../models/orderSchema";
import { shiprocketLogin } from "../../../lib/shiprocket";

export default async function handler(req, res) {
  await main();

  const { orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order?.shiprocket_shipment_id)
    return res.status(400).json({ error: "No shipment id" });

  const token = await shiprocketLogin();

  const srRes = await fetch(
    `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${order.shiprocket_shipment_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const srData = await srRes.json();

  const awb = srData?.tracking_data?.awb_code;
  const courier = srData?.tracking_data?.courier_name;

  if (!awb) return res.json({ message: "AWB not generated yet" });

  await Order.findByIdAndUpdate(orderId, {
    shiprocket_awb: awb,
    shiprocket_courier: courier,
  });

  return res.json({ message: "AWB synced", awb, courier });
}
