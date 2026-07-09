import main from "../../../database/conn";
import User from "../../../models/userSchema";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const forgotPassword = async (req, res) => {
  try {
    // Connect to the database
    await main();
    console.log("Connected to database");
    
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a token valid for 10 minutes
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    // Create a reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL, 
        pass: process.env.MAIL_SECRET, 
      },
    });

    // Verify transporter connection
    await transporter.verify();

    // Construct the reset password link
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    console.log("Generated reset link:", resetLink);


    // HTML Email Template
    const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charSet="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Request</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .email-container {
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                padding: 30px;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
                border-bottom: 2px solid #4CAF50;
                padding-bottom: 15px;
            }
            .logo {
                max-width: 50px;
                margin-bottom: 15px;
            }
            .reset-button {
                display: block;
                width: 200px;
                background-color: #4CAF50;
                color: white;
                text-align: center;
                padding: 12px 25px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px auto;
                font-weight: bold;
            }
            .security-note {
                background-color: #f0f0f0;
                border-left: 4px solid #FF9800;
                padding: 10px 15px;
                margin: 20px 0;
                font-size: 0.9em;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
                margin-top: 20px;
                border-top: 1px solid #e0e0e0;
                padding-top: 15px;
            }
        </style>
    </head>
    <body>
        <div className="email-container">
            <div className="header">
                <img src="https://arenq.s3.amazonaws.com/image-1727026815300.png" alt="ApneeHatti Logo" className="logo">
                <h1>Password Reset Request</h1>
            </div>
            
            <p>Hi ${user.fullname},</p>
            
            <p>You recently requested to reset your password for your ApneeHatti account. Click the button below to proceed:</p>
            
            <a href="${resetLink}" className="reset-button">Reset Password</a>
            
            <div className="security-note">
                <p><strong>Security Note:</strong> This link is valid for 10 minutes. If you did not request a password reset, please ignore this email or contact our support team.</p>
            </div>
            
            <p>If the button above doesn't work, copy and paste the following URL into your browser:</p>
            
            <p style="word-break: break-all;">${resetLink}</p>
            
            <div className="footer">
                <p>© 2024 ApneeHatti. All rights reserved.</p>
                <p>If you're having trouble, contact us at <a href="mailto:info@arenq.co.in">info@arenq.co.in</a></p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Prepare email data
    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: "Password Reset Request",
      html: emailHtml,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("Password reset email sent successfully");

    res.status(200).json({ 
      message: "Password reset email sent", 
      resetLink: resetLink // Optional: for debugging or frontend use
    });

  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ 
      error: "An error occurred while processing your request",
      details: error.message 
    });
  }
};

export default forgotPassword;