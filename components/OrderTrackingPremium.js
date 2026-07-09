import { HiCheckCircle, HiTruck, HiLocationMarker } from "react-icons/hi";
import { FiCopy } from "react-icons/fi";

const STATUS_STEPS = [
  "order_confirmed",
  "shipped",
  "out_for_delivery",
  "delivered",
];

export default function OrderTrackingPremium({ tracking }) {
  if (!tracking) return null;

  const activeIndex = STATUS_STEPS.indexOf(tracking.status);

  return (
    <div className="bg-white rounded-2xl border  p-6 mb-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            📦 Track your order
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Shipped via {tracking.courier}
          </p>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
          🚚 {tracking.current_location || "AWB Assigned"}
        </span>
      </div>

      {/* ================= INFO GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-8">
        <div>
          <p className="text-gray-500">Courier Partner</p>
          <p className="font-semibold">{tracking.courier}</p>
        </div>

        <div>
          <p className="text-gray-500">AWB Number</p>
          <div className="flex items-center gap-2">
            <p className="font-semibold tracking-wide">{tracking.awb}</p>
            <button
              onClick={() => navigator.clipboard.writeText(tracking.awb)}
              className="text-gray-400 hover:text-black"
              title="Copy AWB"
            >
              <FiCopy />
            </button>
          </div>
        </div>

        <div>
          <p className="text-gray-500">Last Updated</p>
          <p className="font-medium">
            {tracking.last_updated
              ? new Date(tracking.last_updated).toLocaleString()
              : "Not updated yet"}
          </p>
        </div>
      </div>

      {/* ================= PROGRESS BAR ================= */}
      {/* <div className="flex items-center justify-between mb-10">
        {STATUS_STEPS.map((step, idx) => {
          const completed = idx <= activeIndex;
          return (
            <div key={step} className="flex-1 text-center relative">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center
                ${completed ? "bg-[#2d241b] text-white" : "bg-gray-200 text-gray-400"}`}
              >
                <HiCheckCircle />
              </div>

              {idx < STATUS_STEPS.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-full h-1
                  ${completed ? "bg-green-400" : "bg-gray-200"}`}
                />
              )}

              <p className="text-xs mt-3 capitalize text-gray-600">
                {step.replaceAll("_", " ")}
              </p>
            </div>
          );
        })}
      </div> */}

      {/* ================= PICKUP PENDING ================= */}
      {!tracking.tracking?.length && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          📦 Order packed & AWB generated. Courier pickup pending.
        </div>
      )}

      {/* ================= TIMELINE ================= */}
      {tracking.tracking?.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-4 text-gray-700">
            🚚 Shipment Journey
          </h3>

          <ol className="relative border-l border-gray-300 ml-4">
            {tracking.tracking.map((t, i) => (
              <li key={i} className="mb-8 ml-6">
                <span className="absolute -left-3 w-6 h-6 bg-[#2d241b] rounded-full ring-4 ring-white flex items-center justify-center text-white">
                  <HiTruck size={14} />
                </span>

                <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                  <p className="font-semibold capitalize">
                    {t.status.replaceAll("_", " ")}
                  </p>

                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <HiLocationMarker /> {t.location}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    🕒 {t.date}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
