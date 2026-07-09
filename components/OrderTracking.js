import React, { useEffect, useState } from "react";
import { Badge } from "flowbite-react";

export default function OrderTracking({ orderId }) {
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTracking = async () => {
    try {
      const res = await fetch(
        `/api/order-tracking/${orderId}`
      );
      const data = await res.json();

      if (data?.status) {
        setTracking(data);
      }
    } catch (err) {
      console.error("Tracking fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracking();

    const interval = setInterval(fetchTracking, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center">
        Tracking loading...
      </div>
    );
  }

  if (!tracking) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">
        📦 Order Tracking
      </h2>

      {/* BASIC INFO */}
      <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
        <div>
          <p className="text-gray-500">Courier</p>
          <p className="font-semibold">
            {tracking.courier || "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">AWB Number</p>
          <p className="font-semibold">
            {tracking.awb || "-"}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Current Status</p>
          <Badge
            color={
              tracking.status === "delivered"
                ? "success"
                : tracking.status === "rto"
                ? "failure"
                : "info"
            }
          >
            {tracking.status.replaceAll("_", " ")}
          </Badge>
        </div>
      </div>

      {/* TIMELINE */}
      {tracking.scans?.length > 0 && (
        <>
          <h3 className="font-medium mb-3">
            🧭 Parcel Movement
          </h3>

          <ol className="relative border-l border-gray-200">
            {tracking.scans.map((scan, index) => (
              <li key={index} className="mb-6 ml-4">
                <div className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -left-1.5"></div>

                <time className="mb-1 text-xs text-gray-400">
                  {new Date(scan.date).toLocaleString()}
                </time>

                <p className="text-sm font-medium text-gray-800">
                  {scan.status}
                </p>

                <p className="text-xs text-gray-500">
                  {scan.location}
                </p>
              </li>
            ))}
          </ol>
        </>
      )}

      {/* FINAL MESSAGE */}
      {tracking.status === "delivered" && (
        <p className="mt-6 text-green-600 font-medium">
          ✅ Your order has been delivered successfully.
        </p>
      )}

      {tracking.status === "rto" && (
        <p className="mt-6 text-red-600 font-medium">
          ❌ Delivery failed. Parcel is being returned.
        </p>
      )}
    </div>
  );
}
