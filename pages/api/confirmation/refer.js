import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    const { email, token, user } = req.body;

    // 1️⃣ Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_SECRET,
      },
    });

    // 2️⃣ Verify connection
    await transporter.verify();
    console.log("SMTP server is ready to send emails");

    // 3️⃣ Mail options
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
          <body style="font-family: Arial, sans-serif; color: #333;">
            <p>Hi ${user},</p>
            <p>You recently requested to reset your password.</p>
            <p>
              <a href="${process.env.NEXTAUTH_URL}/reset-password?token=${token}" 
                 style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
                 Reset Password
              </a>
            </p>
            <p>If you didn’t request this, please ignore this email.</p>
            <p>Best regards,<br>Arenq Team</p>
          </body>
        </html>
      `,
    };

    // 4️⃣ Send mail
    const info = await transporter.sendMail(mailData);
    console.log("Mail sent:", info.messageId);

    return res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
