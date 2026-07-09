import main from "../../../database/conn";
import nodemailer from "nodemailer";

const Contact = async (req, res) => {
  try {
    await main();

    const { fullname, email, phone, subject, message } = req.body;

    if (!fullname || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    /**
     * phone comes like: "919607128284"
     * We convert it to: "+91 9607128284"
     */
    const cleanPhone = phone.replace(/\D/g, "");

    // last 10 digits = local number (works well for most cases incl. India)
    const localNumber = cleanPhone.slice(-10);
    const countryCode = "+" + cleanPhone.slice(0, cleanPhone.length - 10);

    const fullPhone = `${countryCode} ${localNumber}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_SECRET,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: process.env.MAIL,
      to: process.env.MAIL,
      subject: `New Contact Request: ${subject}`,
      html: `
<!DOCTYPE html>
<html>
<body style="font-family:Arial;background:#f4f6f8;padding:20px">
  <div style="max-width:600px;margin:auto;background:#ffffff;padding:24px;border-radius:8px">
    <h2 style="color:#2f855a;text-align:center">New Contact Request</h2>

    <p><strong>Name:</strong> ${fullname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${fullPhone}</p>
    <p><strong>Subject:</strong> ${subject}</p>

    <div style="margin-top:12px;padding:12px;background:#f9fafb;border-left:4px solid #2f855a">
      ${message}
    </div>

    <p style="margin-top:30px;font-size:12px;color:#888;text-align:center">
      This email was sent from the Apneehatti contact form.
    </p>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Contact request sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export default Contact;
