import main from "../../../database/conn";
import Order from "../../../models/orderSchema";
import { shiprocketLogin } from "../../../lib/shiprocket";

export default async function handler(req, res) {
  await main();

  try {
    const { orderId } = req.query;

    const order = await Order.findById(orderId).lean();
    if (!order || !order.shiprocket_awb) {
      return res.status(200).json({ available: false });
    }

    const token = await shiprocketLogin();

    const srRes = await fetch(
      `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${order.shiprocket_awb}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const sr = await srRes.json();
    const td = sr?.tracking_data;
    const track = td?.shipment_track?.[0];

    return res.status(200).json({
      available: true,
      courier: track?.courier_name || order.shiprocket_courier,
      awb: order.shiprocket_awb,
      current_location: track?.current_status || "Processing",
      last_updated: track?.updated_time_stamp || null,
      tracking: (td?.shipment_track_activities || []).map((a) => ({
        status: a.activity,
        location: a.location,
        date: a.date,
      })),
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ available: false });
  }
}
