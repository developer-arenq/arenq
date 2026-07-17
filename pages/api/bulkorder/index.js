// Importing necessary modules
import main from "../../../database/conn"; // Assuming you're connecting to a database
import nodemailer from "nodemailer";

// Bulk order API handler
const BulkOrder = async (req, res) => {
  try {
    // Connect to the database (if needed)
    await main();

    // Destructure the form data from the request body
    const { name, email, phone, organization, quantity, productInterest, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !quantity || !productInterest || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create an email transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL, // Sender email
        pass: process.env.MAIL_SECRET, // Your Gmail app password
      },
    });

    // Verify transporter connection
    await transporter.verify();

    // Prepare the email content with the submitted data
    const mailOptions = {
      from: email , // Sender email
      to:  process.env.MAIL, // Receiver email (your contact email)
      subject: `New Bulk Order Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>New Bulk Order Inquiry</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              h2 {
                color: #333;
                text-align: center;
              }
              .details {
                margin: 20px 0;
              }
              .details p {
                font-size: 16px;
                color: #555;
                margin: 10px 0;
              }
              .details span {
                font-weight: bold;
                color: #333;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                color: #888;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>New Bulk Order Inquiry from ${name}</h2>
              <div class="details">
                <p><span>Full Name:</span> ${name}</p>
                <p><span>Email:</span> ${email}</p>
                <p><span>Phone:</span> ${phone}</p>
                <p><span>Organization:</span> ${organization || "Not provided"}</p>
                <p><span>Estimated Quantity:</span> ${quantity}</p>
                <p><span>Product Interest:</span> ${productInterest}</p>
                <p><span>Message:</span></p>
                <p>${message}</p>
              </div>
              <div class="footer">
                <p>This email was sent from the Arenq bulk order form.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log("Bulk order request email sent successfully");

    // Send a successful response back to the client
    res.status(200).json({ message: "Bulk order request email sent successfully" });
  } catch (error) {
    console.error("Error while sending bulk order request:", error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
};

export default BulkOrder;
