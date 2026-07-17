import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    const { email, token, user } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_SECRET,
      },
    });

    // Verify connection
    await transporter.verify();
    console.log("✅ SMTP Server ready to send messages");

    // Email content
    const mailData = {
      from: `"Arenq" <${process.env.MAIL}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Password Reset</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>Hi ${user},</p>
            <p>You recently requested to reset your password. Please click below:</p>
            <p>
              <a href="${process.env.NEXTAUTH_URL}/reset-password?token=${token}" 
                 style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
                 Reset Password
              </a>
            </p>
            <p>If you didn’t request this change, please ignore this message.</p>
            <p>Best regards,<br>Arenq Team</p>
          </body>
        </html>
      `,
    };

    // Send mail
    const info = await transporter.sendMail(mailData);
    console.log("📨 Email sent:", info.messageId);

    return res.status(200).json({ message: "Confirmation mail sent successfully" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return res.status(500).json({ error: "Failed to send confirmation email" });
  }
}
