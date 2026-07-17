import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_SECRET,
    },
});

const order = {

    "_id": {
        "$oid": "6a3a5bbb6dcf0a01952d3a7d"
    },
    "user_id": {
        "$oid": "6a3a5b09755c5cdcbbb18181"
    },
    "order_items": [
        {
            "id": "6721cd2c3aec1b9cffa9c7c1",
            "title": "Happiness Box – Himalayan Dark Chocolate Combo (240g) | Arenq",
            "slug": "happiness-box-himalayan-dark-chocolate-combo",
            "quantity": 1,
            "image": [
                "https://arenq.s3.ap-south-1.amazonaws.com/happiness-box-himalayan-dark-chocolate-combo-1776099951409.webp",
                "https://arenq.s3.ap-south-1.amazonaws.com/happiness-box-himalayan-dark-chocolate-combo-1776099951107.webp",
                "https://arenq.s3.ap-south-1.amazonaws.com/happiness-box-himalayan-dark-chocolate-combo-1776099951449.webp"
            ],
            "price": 499,
            "taxPercentage": 5,
            "taxAmount": 24.95,
            "total": 523.95,
            "delivery_status": "order_confirmed",
            "variant": {
                "type": "g",
                "value": "240g",
                "price": 499,
                "MRP": 500,
                "tax": 5
            },
            "_id": {
                "$oid": "6a3a5bbb6dcf0a01952d3a7e"
            }
        }
    ],
    "coupon": {
        "$oid": "6a0d75a54c064dc46ef48681"
    },
    "shipping_address": {
        "$oid": "6a3a5bb16dcf0a01952d3a74"
    },
    "payment_method": "cod",
    "shipping_price": 100,
    "subtotal": 499,
    "taxAmount": 24.95,
    "taxPercentage": 0,
    "total": 593.95,
    "discount": 30,
    "isPaid": false,
    "paidAt": null,
    "isDelivered": false,
    "shiprocket_awb": "",
    "shiprocket_courier": "",
    "shiprocket_status": "not_sent",
    "transaction_id": null,
    "reviewEmailSent": false,
    "createdAt": {
        "$date": "2026-06-23T10:11:07.521Z"
    },
    "updatedAt": {
        "$date": "2026-06-23T10:11:09.675Z"
    },
    "__v": 0,
    "shiprocket_order_id": 1414601456,
    "shiprocket_shipment_id": 1410854615

};

const shippingAddress = {
    "_id": {
        "$oid": "6a3a5bb16dcf0a01952d3a74"
    },
    "user_id": {
        "$oid": "6a3a5b09755c5cdcbbb18181"
    },
    "email": "gargika06@gmail.com",
    "fullname": "Gargi Alekar",
    "address_line": "C A/403, Sanklpa nagar, Manisha nagar gate no 2,",
    "city": "Thane",
    "postal_code": 400605,
    "state": "Maharashtra",
    "country": "IN",
    "mobile": 9833704060,
    "enable": true,
    "createdAt": {
        "$date": "2026-06-23T10:10:57.131Z"
    },
    "updatedAt": {
        "$date": "2026-06-23T10:10:57.131Z"
    },
    "__v": 0
}
const user = "Gargi Alekar";

const email = "gargika06@gmail.com";

const currencyFormatter = (price) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(price);


const itemsHTML = order.order_items
    .map(
        (item) => `
<tr style="border-bottom:1px solid #e5e7eb;">
  <td style="padding:15px 0;">
    <table width="100%">
      <tr>
        <td width="80">
          <img src="${item.image[0]}" width="70" height="70"
            style="border-radius:8px;object-fit:cover;">
        </td>

        <td style="padding-left:15px;">
          <div style="font-weight:600;">${item.title}</div>
          <div>Variant: ${item.variant.value}</div>
          <div>Qty: ${item.quantity}</div>
        </td>

        <td align="right">
          ${currencyFormatter(item.price * item.quantity)}
        </td>
      </tr>
    </table>
  </td>
</tr>`
    )
    .join("");
const subtotal = currencyFormatter(order.subtotal);
const shipping_price = currencyFormatter(order.shipping_price);
const total = currencyFormatter(order.total);

// ✨ Email HTML Template
const html = `
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td align="center" style="padding: 30px 0;">
            <table width="650" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">

              <!-- Header -->
              <tr>
                <td align="center" style="background-color: #15803d; padding: 30px;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 26px;">Order Confirmed 🎉</h1>
                  <p style="color: #dcfce7; margin: 6px 0 0;">Thank you for shopping with Arenq!</p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 30px;">
                  <p style="font-size: 16px; color: #1f2937;">Hi <strong>${user || "Customer"}</strong>,</p>
                  <p style="color: #374151;">We’re excited to let you know your order has been successfully placed. Here are the details:</p>

                  <!-- Order Summary -->
                  <table width="100%" style="margin-top: 20px; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #15803d;"><strong>Order ID:</strong></td>
                      <td style="padding: 8px 0; color: #111827;">${order?._id?.$oid || "N/A"}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #15803d;"><strong>Payment Method:</strong></td>
                      <td style="padding: 8px 0; color: #111827;">${order?.payment_method?.toUpperCase() || "-"}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #15803d;"><strong>Date:</strong></td>
                      <td style="padding: 8px 0; color: #111827;">${new Date(order.createdAt.$date).toLocaleString("en-IN")}</td>
                    </tr>
                  </table>

                  <!-- Product Section -->
                  <h3 style="color: #15803d; margin-top: 30px;">Ordered Items</h3>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:10px;">
                    <tbody>${itemsHTML}</tbody>
                  </table>

                  <!-- Price Breakdown -->
                  <table width="100%" style="margin-top: 25px; border-collapse: collapse;">
                    <tr>
                      <td style="color:#374151;">Subtotal</td>
                      <td align="right" style="color:#111827;">${subtotal}</td>
                    </tr>
                    <tr>
                      <td style="color:#374151;">Shipping</td>
                      <td align="right" style="color:#111827;">${shipping_price}</td>
                    </tr>
                    <tr>
                      <td style="color:#15803d; font-weight: bold; padding-top: 8px;">Total (Including Tax)</td>
                      <td align="right" style="color:#15803d; font-weight: bold; padding-top: 8px;">${total}</td>
                    </tr>
                  </table>

                  <!-- Shipping Address -->
                  <h3 style="color: #15803d; margin-top: 35px;">Shipping Address</h3>
                  <p style="color: #374151; line-height: 1.6;">
  ${shippingAddress?.fullname || ""}<br/>
  ${shippingAddress?.address_line || ""}<br/>
  ${shippingAddress?.city || ""}, ${shippingAddress?.state || ""} - ${shippingAddress?.postal_code || ""}<br/>
  ${shippingAddress?.mobile ? `📞 ${shippingAddress.mobile}` : ""}
</p>

                  <!-- Button -->
                  <div style="text-align: center; margin-top: 40px;">
                    <a href="https://www.arenq.co.in/myorders" 
                      style="background-color: #15803d; color: #ffffff; text-decoration: none; 
                      padding: 14px 36px; border-radius: 8px; font-weight: bold; font-size: 16px;
                      display: inline-block;">
                      View My Order
                    </a>
                  </div>

                  <p style="color: #6b7280; margin-top: 40px; font-size: 13px; text-align: center;">
                    If you have any questions, contact us at 
                    <a href="mailto:info@arenq.co.in" style="color: #15803d;">info@arenq.co.in</a>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="background-color: #f0fdf4; padding: 15px;">
                  <p style="color: #15803d; font-size: 14px;">© ${new Date().getFullYear()} Arenq. All rights reserved.</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    `;

await transporter.sendMail({
    from: `"Arenq" <${process.env.MAIL}>`,
    to: email,
    subject: "🎉 Order Confirmed – Thank You for Shopping with Arenq!",
    html
});

console.log("Mail Sent");