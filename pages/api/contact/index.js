import main from "../../../database/conn";
import nodemailer from "nodemailer";

const Contact = async (req, res) => {
  // Only POST request allowed
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    await main();

    const { fullname, email, phone, subject, message } = req.body;

    // Validation
    if (!fullname || !email || !phone || !subject || !message) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    /**
     * Phone example:
     * Incoming: 919607128284
     * Email display: +91 9607128284
     */

    const cleanPhone = phone.replace(/\D/g, "");

    const localNumber = cleanPhone.slice(-10);

    const countryCode =
      "+" + cleanPhone.slice(0, cleanPhone.length - 10);

    const fullPhone = `${countryCode} ${localNumber}`;

    // =====================================================
    // RAIYA CRM API
    // =====================================================

    try {
      const crmResponse = await fetch(
        "https://raiyacrm.speedtech.ai/external/leads",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            fullName: fullname,
            email: email,

            // Send clean number to CRM
            mobile: cleanPhone,

            // Contact form currently has no company field
            companyName: "",

            // Send complete enquiry details
            description: `Subject: ${subject}\nMessage: ${message}`,

            client_id: 19,
            lead_source_id: 81,
            lead_value: 3999,
            products: "RAIYA Telephony",
          }),
        }
      );

      const crmText = await crmResponse.text();

      let crmData = {};

      try {
        crmData = crmText
          ? JSON.parse(crmText)
          : {};
      } catch {
        crmData = {
          message: crmText,
        };
      }

      console.log("=================================");
      console.log("RAIYA CRM STATUS:", crmResponse.status);
      console.log("RAIYA CRM RESPONSE:", crmData);
      console.log("=================================");

      if (!crmResponse.ok) {
        console.error(
          "RAIYA CRM API ERROR:",
          crmResponse.status,
          crmData
        );

        /*
         * IMPORTANT:
         * CRM failure will NOT stop email.
         * Email will still be sent.
         */
      }
    } catch (crmError) {
      console.error("RAIYA CRM CONNECTION ERROR:", crmError);

      /*
       * CRM connection failed.
       * Continue execution so enquiry email is not lost.
       */
    }

    // =====================================================
    // ZOHO EMAIL
    // =====================================================

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,

      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_SECRET,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: `"Arenq Website" <${process.env.MAIL}>`,

      to: process.env.MAIL,

      replyTo: email,

      subject: `New Contact Request: ${subject}`,

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>

<body style="
  font-family: Arial, sans-serif;
  background: #f4f6f8;
  padding: 20px;
">

  <div style="
    max-width: 600px;
    margin: auto;
    background: #ffffff;
    padding: 24px;
    border-radius: 8px;
  ">

    <h2 style="
      color: #2f855a;
      text-align: center;
    ">
      New Contact Request
    </h2>

    <p>
      <strong>Name:</strong>
      ${fullname}
    </p>

    <p>
      <strong>Email:</strong>
      ${email}
    </p>

    <p>
      <strong>Phone:</strong>
      ${fullPhone}
    </p>

    <p>
      <strong>Subject:</strong>
      ${subject}
    </p>

    <div style="
      margin-top: 12px;
      padding: 12px;
      background: #f9fafb;
      border-left: 4px solid #2f855a;
    ">
      ${message}
    </div>

    <p style="
      margin-top: 30px;
      font-size: 12px;
      color: #888;
      text-align: center;
    ">
      This email was sent from the Arenq contact form.
    </p>

  </div>

</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,
      message: "Contact request sent successfully",
    });

  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

export default Contact;