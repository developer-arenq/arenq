import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("Notify API Called");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  console.log(req.body);

  const { user, product } = req.body;

  if (!user || !product) {
    return res.status(400).json({ message: "Missing user or product info" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_SECRET,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Apneehatti" <${process.env.MAIL}>`,
      to: "info@arenq.co.in",
      subject: "Out of Stock Product Requested",
      html: `
        <h3>Product Notification Request</h3>
        <p><strong>User:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Product:</strong> ${product.title}</p>
        <p><strong>Product ID:</strong> ${product._id}</p>
        <p><strong>Requested at:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Notification sent successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}