"use client";
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = ({ order }) => {
  const invoiceRef = useRef();

  const downloadInvoice = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 200;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 5, 5, imgWidth, imgHeight);
    pdf.save(`ARENQ_Invoice_${order._id}.pdf`);
  };

  return (
    <>
      <div className="flex justify-center mt-4">
        <button
          onClick={downloadInvoice}
          className="px-10 py-2 bg-black text-white uppercase tracking-wide font-bold rounded hover:bg-gray-900 transition"
        >
          Invoice
        </button>
      </div>

      {/* ------- HIDDEN INVOICE FOR PDF -------- */}
      <div
        ref={invoiceRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "210mm",
          padding: "25px 30px",
          background: "white",
          fontFamily: "Arial, sans-serif",
          color: "#222",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid #e5e5e5",
            paddingBottom: "15px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                marginBottom: "5px",
                letterSpacing: "1px",
              }}
            >
              TAX INVOICE
            </h1>

            <p style={{ fontSize: "12px", lineHeight: "1.5", color: "#555" }}>
              <strong>Sunlit Power Pvt Ltd (ARENQ)</strong> <br />
              Factory: <br />
              No. 327/2, Mohida TS,<br />
              Dondaicha Road, Shahada Nandurbar,<br />
              Maharashtra - 425409, India
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <img
              src="/images/logo/Arenq_light.png"
              width={120}
              style={{ marginBottom: "8px" }}
              alt="ARENQ Logo"
            />

            <p style={{ fontSize: "12px" }}>
              <strong>Invoice No:</strong> {order._id}
            </p>
            <p style={{ fontSize: "12px" }}>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* CUSTOMER BLOCK */}
        <div style={{ display: "flex", marginTop: "25px", gap: "30px" }}>
          <div style={{ width: "50%" }}>
            <h3
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "5px",
              }}
            >
              Billing Address
            </h3>

            <p style={{ lineHeight: "1.6", fontSize: "12px" }}>
              <strong>{order.shipping_address.fullname}</strong> <br />
              {order.shipping_address.address_line}, <br />
              {order.shipping_address.city}, {order.shipping_address.state} -{" "}
              {order.shipping_address.postal_code}
              <br />
              {order.shipping_address.country} <br />
              Phone: {order.shipping_address.mobile} <br />
              Email: {order.shipping_address.email}
            </p>
          </div>

          <div style={{ width: "50%" }}>
            <h3
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "5px",
              }}
            >
              Shipping Address
            </h3>

            <p style={{ lineHeight: "1.6", fontSize: "12px" }}>
              <strong>{order.shipping_address.fullname}</strong> <br />
              {order.shipping_address.address_line}, <br />
              {order.shipping_address.city}, {order.shipping_address.state} -{" "}
              {order.shipping_address.postal_code}
              <br />
              {order.shipping_address.country}
            </p>
          </div>
        </div>

        {/* PRODUCT TABLE */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            fontSize: "11px",
          }}
        >
          <thead>
            <tr style={{ background: "#f2f2f2" }}>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Item</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Variant</th>
              <th style={styles.th}>Rate</th>
              <th style={styles.th}>Tax %</th>
              <th style={styles.th}>Tax Amt</th>
              <th style={styles.th}>Total</th>
            </tr>
          </thead>

          <tbody>
            {order.order_items.map((item, i) => {
              const taxPercent =
                item.taxPercentage ??
                item.variant?.tax ??
                item.tax ??
                0;

              return (
                <tr key={i}>
                  <td style={styles.tdCenter}>{i + 1}</td>
                  <td style={styles.td}>{item.title}</td>
                  <td style={styles.tdCenter}>{item.quantity}</td>
                  <td style={styles.tdCenter}>{item.variant?.value}</td>
                  <td style={styles.tdCenter}>₹{item.price}</td>
                  <td style={styles.tdCenter}>{taxPercent}%</td>
                  <td style={styles.tdRight}>₹{item.taxAmount.toFixed(2)}</td>
                  <td style={styles.tdRight}>₹{item.total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* TOTALS SECTION */}
        <div style={{ marginTop: "30px", width: "40%", marginLeft: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={styles.tdLeft}>Subtotal:</td>
                <td style={styles.tdRight}>₹{order.subtotal.toFixed(2)}</td>
              </tr>

              <tr>
                <td style={styles.tdLeft}>
                  Tax Amount :
                </td>
                <td style={styles.tdRight}>₹{order.taxAmount.toFixed(2)}</td>
              </tr>

              <tr>
                <td style={styles.tdLeft}>Shipping:</td>
                <td style={styles.tdRight}>₹{order.shipping_price}</td>
              </tr>

              <tr style={{ color: "green" }}>
                <td style={styles.tdLeft}>Coupon Discount</td>
                <td style={styles.tdRight}>- ₹{(order.discount ?? 0).toFixed(2)}</td>
              </tr>



              <tr style={{ background: "#f2f2f2", fontWeight: "bold" }}>
                <td style={styles.tdLeft}>Grand Total:</td>
                <td style={styles.tdRight}>₹{order.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <hr style={{ marginTop: "35px" }} />
        <p style={{ textAlign: "center", fontSize: "11px", color: "#555" }}>
          Thank you for choosing ARENQ - Forward To Future
        </p>
      </div>
    </>
  );
};

/* STYLES */
const styles = {
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    fontWeight: "bold",
    textAlign: "center",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  tdCenter: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  },
  tdRight: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "right",
  },
  tdLeft: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
};

export default Invoice;
