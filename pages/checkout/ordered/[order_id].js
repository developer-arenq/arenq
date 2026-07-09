/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import CurrencyFormatter from "../../../helper/currencyFormatter";

export async function getServerSideProps(context) {
  const { order_id } = context.query; // ✅ FIX

  try {
    const data = await fetch(
      `${process.env.NEXTAUTH_URL}/api/orders/${order_id}` // ✅ FIX
    );

    if (!data.ok) {
      return {
        props: {
          order: null,
          user: null,
          payment: null,
        },
      };
    }

    const res = await data.json();

    return {
      props: {
        order: res ?? null,
        user: res?.user_id ?? null,
        payment: res?.transaction_id ?? null,
      },
    };
  } catch (err) {
    console.error("SSR ERROR:", err);

    return {
      props: {
        order: null,
        user: null,
        payment: null,
      },
    };
  }
}

const OrderPage = ({ order, user, payment }) => {
  return (
    <>
      <Head>
        <title>Order Successful | Thank You</title>
      </Head>

      <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-xl md:text-3xl font-bold text-green-600">
              🎉 Order Placed Successfully
            </h1>

            <Link href="/myorders">
              <button className="w-full sm:w-auto px-6 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                View My Orders
              </button>
            </Link>
          </div>

          {/* SUCCESS BANNER */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
            <h2 className="text-lg font-semibold text-green-700">
              ✔ Thank you! Your order has been confirmed
            </h2>

            {/* ✅ SAFE */}
            <p className="text-sm text-green-600 mt-1">
              Order ID:{" "}
              <span className="font-medium">
                #{order?._id || "N/A"}
              </span>
            </p>

            <p className="text-sm text-green-600">
              Estimated delivery in 5–6 business days 🚚
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {/* ORDER INFO */}
              <div className="bg-white rounded-xl border shadow-sm p-5">
                <h3 className="text-lg font-semibold mb-3">
                  Order Information
                </h3>

                <p className="text-sm text-gray-600">
                  Order Date:{" "}
                  {order?.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "N/A"}
                </p>

                <p className="text-sm text-gray-600">
                  Confirmation sent to:{" "}
                  {order?.shipping_address?.email || "N/A"}
                </p>
              </div>

              {/* SHIPPING */}
              <div className="bg-white rounded-xl border shadow-sm p-5">
                <h3 className="text-lg font-semibold mb-3">
                  Shipping Address
                </h3>

                <p className="text-sm text-gray-700 font-medium capitalize">
                  {order?.shipping_address?.fullname ||
                    user?.fullname ||
                    "Guest"}
                </p>

                <p className="text-sm text-gray-600">
                  {order?.shipping_address?.address_line},{" "}
                  {order?.shipping_address?.city},{" "}
                  {order?.shipping_address?.state} -{" "}
                  {order?.shipping_address?.postal_code}
                </p>

                <p className="text-sm text-gray-600">
                  {order?.shipping_address?.country}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Phone: {order?.shipping_address?.mobile}
                </p>
              </div>

              {/* PAYMENT */}
              <div className="bg-white rounded-xl border shadow-sm p-5">
                <h3 className="text-lg font-semibold mb-3">
                  Payment Information
                </h3>

                <p className="text-sm text-gray-600 capitalize">
                  Method:{" "}
                  {order?.payment_method === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </p>

                {payment && (
                  <>
                    <p className="text-sm text-gray-600">
                      Transaction ID: {payment?.order_id}
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment ID: {payment?.payment_id}
                    </p>
                    <p className="text-sm text-gray-600">
                      Time:{" "}
                      {payment?.createdAt
                        ? new Date(payment.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </>
                )}
              </div>

              {/* PRODUCTS */}
              <div className="bg-white rounded-xl border shadow-sm p-5">
                <h3 className="text-lg font-semibold mb-4">
                  Ordered Items
                </h3>

                <div className="space-y-4">
                  {order?.order_items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-4"
                    >
                      <Image
                        src={item?.image?.[0]}
                        width={80}
                        height={80}
                        className="object-contain"
                        alt={item.title}
                      />

                      <div className="flex-1">
                        <h4 className="text-sm font-medium">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <div className="text-sm font-semibold">
                        <CurrencyFormatter
                          price={item.quantity * item.price}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:sticky lg:top-24 h-fit bg-white rounded-xl border shadow-sm p-5">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                Order Summary
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <CurrencyFormatter price={order?.subtotal || 0} />
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <CurrencyFormatter
                    price={order?.shipping_price || 0}
                  />
                </div>

                {order?.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>
                      -<CurrencyFormatter price={order.discount} />
                    </span>
                  </div>
                )}

                <div className="flex justify-between font-bold border-t pt-3">
                  <span>Total</span>
                  <CurrencyFormatter price={order?.total || 0} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Script
        src="https://apis.google.com/js/platform.js?onload=renderOptIn"
        strategy="afterInteractive"
      />

      <Script
        id="google-customer-reviews"
        strategy="afterInteractive"
      >
        {`
    window.renderOptIn = function () {

      if (
        !window.gapi ||
        !window.gapi.load
      ) {
        console.log(
          "Google API not loaded"
        );
        return;
      }

      window.gapi.load(
        "surveyoptin",
        function () {

          window.gapi.surveyoptin.render({

            merchant_id: 551702225,

            order_id:
              "${order?._id || ""}",

            email:
              "${order?.shipping_address?.email || ""}",

            delivery_country: "IN",

            estimated_delivery_date:
              "${new Date(
          Date.now() +
          6 *
          24 *
          60 *
          60 *
          1000
        )
            .toISOString()
            .split("T")[0]}",

          });

        }
      );
    };
  `}
      </Script>
    </>
  );
};

export default OrderPage;