import * as nodemailer from "nodemailer";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  try {
    const { order, email, user, shippingAddress } = req.body;

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_SECRET,
      },
      secure: true,
    });

    const currencyFormatter = (price) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(price);
    };

    const total = currencyFormatter(order.total);
    const subtotal = currencyFormatter(order.subtotal);
    const shipping_price = currencyFormatter(order.shipping_price);

    // 🛍️ Product List HTML
    const itemsHTML = order.order_items
      .map(
        (item) => `
        <tr style="border-bottom:1px solid #e5e7eb;">
          <td style="padding:15px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td width="80" valign="top">
                  <img src="${item.image?.[0]}" width="70" height="70" 
                       style="border-radius:8px;object-fit:cover;display:block;">
                </td>
                <td style="padding-left:15px;vertical-align:top;">
                  <div style="font-size:15px;font-weight:600;color:#111827;">${item.title}</div>
                  <div style="font-size:14px;color:#4b5563;margin-top:4px;">
                    Variant: ${item.variant?.value || "-"}
                  </div>
                  <div style="font-size:14px;color:#4b5563;margin-top:2px;">
                    Quantity: ${item.quantity}
                  </div>
                </td>
                <td align="right" style="vertical-align:top;">
                  <div style="font-size:15px;font-weight:600;color:#15803d;">
                    ${currencyFormatter(item.price * item.quantity)}
                  </div>
                  <div style="font-size:13px;color:#6b7280;">
                    ₹${item.price} each
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`
      )
      .join("");

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
                  <p style="color: #dcfce7; margin: 6px 0 0;">Thank you for shopping with ApneeHatti!</p>
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
                      <td style="padding: 8px 0; color: #111827;">${order?._id || "N/A"}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #15803d;"><strong>Payment Method:</strong></td>
                      <td style="padding: 8px 0; color: #111827;">${order?.payment_method?.toUpperCase() || "-"}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #15803d;"><strong>Date:</strong></td>
                      <td style="padding: 8px 0; color: #111827;">${new Date(order.createdAt).toLocaleString()}</td>
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
                    ${shippingAddress?.name || ""}<br/>
                    ${shippingAddress?.street || ""}<br/>
                    ${shippingAddress?.city || ""}, ${shippingAddress?.state || ""} - ${shippingAddress?.zip || ""}<br/>
                    ${shippingAddress?.phone ? `📞 ${shippingAddress.phone}` : ""}
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
                  <p style="color: #15803d; font-size: 14px;">© ${new Date().getFullYear()} ApneeHatti. All rights reserved.</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    `;

    // Send mail
    await transporter.sendMail({
      from: "info@arenq.co.in",
      to: email,
      subject: "🎉 Order Confirmed – Thank You for Shopping with ApneeHatti!",
      html,
    });

    return res.status(200).json("✅ Confirmation email sent successfully!");
  } catch (err) {
    console.error("❌ Email Error:", err);
    res.status(500).json({ error: "Email failed to send." });
  }
}
