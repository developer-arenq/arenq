import main from "../../../../database/conn";
import Order from "../../../../models/orderSchema";
import { shiprocketLogin } from "../../../../lib/shiprocket";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await main();

    const { orderId } = req.query;

    const order = await Order.findById(orderId).lean();
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // 🛑 AWB not yet generated
    if (!order.shiprocket_awb) {
      return res.status(200).json({
        status: "order_confirmed",
        courier: null,
        awb: null,
        current_location: "Order confirmed",
        last_updated: null,
        tracking: [],
      });
    }

    // 🔐 Shiprocket login
    const token = await shiprocketLogin();

    // 📦 Track by AWB
    const trackRes = await fetch(
      `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${order.shiprocket_awb}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const trackData = await trackRes.json();

    const trackingData = trackData?.tracking_data;
    const shipmentStatus = trackingData?.shipment_status;

    // 🗺️ Status mapping
    const statusMap = {
      6: "order_confirmed",
      7: "shipped",
      8: "out_for_delivery",
      9: "delivered",
    };

    const mappedStatus =
      statusMap[shipmentStatus] || "order_confirmed";

    // 📍 Build tracking timeline
    const scans =
      trackingData?.shipment_track_activities || [];

    const timeline = scans.map((s) => ({
      status:
        statusMap[s?.status] ||
        s?.activity?.toLowerCase()?.replaceAll(" ", "_") ||
        "in_transit",
      location: s?.location || "—",
      date: s?.date || s?.activity_date || null,
    }));

    const lastScan = scans[scans.length - 1];

    return res.status(200).json({
      status: mappedStatus,
      courier: order.shiprocket_courier,
      awb: order.shiprocket_awb,
      current_location:
        lastScan?.location || "In transit",
      last_updated:
        lastScan?.date || lastScan?.activity_date || null,
      tracking: timeline.reverse(), // oldest → newest
    });
  } catch (err) {
    console.error("ORDER TRACKING ERROR:", err);
    return res.status(500).json({
      status: "order_confirmed",
      tracking: [],
      error: "Tracking failed",
    });
  }
}
