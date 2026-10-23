import main from "../../../database/conn";
import nodemailer from "nodemailer";

const Contact = async (req, res) => {
  // =====================================================
  // ONLY POST REQUEST ALLOWED
  // =====================================================

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    // =====================================================
    // DATABASE CONNECTION
    // =====================================================

    await main();

    // =====================================================
    // GET FORM DATA
    // =====================================================

    const {
      fullname,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      subject,
      message,
    } = req.body;

    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      !fullname?.trim() ||
      !email?.trim() ||
      !phone ||
      !address?.trim() ||
      !city?.trim() ||
      !state?.trim() ||
      !pincode?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address",
      });
    }

    // =====================================================
    // PHONE NUMBER FORMATTING
    // =====================================================

    /*
      react-phone-input-2 example:

      Incoming:
      919607128284

      CRM:
      919607128284

      Email:
      +91 9607128284
    */

    const cleanPhone = String(phone).replace(/\D/g, "");

    if (cleanPhone.length < 10) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid phone number",
      });
    }

    const localNumber = cleanPhone.slice(-10);

    const extractedCountryCode = cleanPhone.slice(
      0,
      cleanPhone.length - 10
    );

    const countryCode = extractedCountryCode
      ? `+${extractedCountryCode}`
      : "+91";

    const fullPhone = `${countryCode} ${localNumber}`;

    // =====================================================
    // PINCODE VALIDATION
    // =====================================================

    const cleanPincode = String(pincode).replace(/\D/g, "");

    if (!/^\d{6}$/.test(cleanPincode)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid 6-digit pincode",
      });
    }

    // =====================================================
    // CLEAN VALUES
    // =====================================================

    const cleanFullname = fullname.trim();
    const cleanEmail = email.trim();
    const cleanAddress = address.trim();
    const cleanCity = city.trim();
    const cleanState = state.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

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
            fullName: cleanFullname,

            email: cleanEmail,

            // Clean phone number for CRM
            mobile: cleanPhone,

            // No company field in website contact form
            companyName: "",

            /*
              Until RAIYA confirms dedicated API fields
              for address / city / state / pincode,
              send them inside description so the
              information is not lost.
            */
            description: `
Address: ${cleanAddress}
City: ${cleanCity}
State: ${cleanState}
Pincode: ${cleanPincode}

Subject: ${cleanSubject}

Message:
${cleanMessage}
            `.trim(),

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
        crmData = crmText ? JSON.parse(crmText) : {};
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
          IMPORTANT:
          CRM failure will NOT stop the email.

          Customer enquiry will still be sent
          to ARENQ through Zoho email.
        */
      }
    } catch (crmError) {
      console.error(
        "RAIYA CRM CONNECTION ERROR:",
        crmError
      );

      /*
        CRM connection failed.
        Continue execution so enquiry email
        is not lost.
      */
    }

    // =====================================================
    // ZOHO EMAIL CONFIGURATION
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

    // Verify SMTP connection
    await transporter.verify();

    // =====================================================
    // EMAIL CONTENT
    // =====================================================

    const mailOptions = {
      from: `"ARENQ Website" <${process.env.MAIL}>`,

      to: process.env.MAIL,

      replyTo: cleanEmail,

      subject: `New Contact Request: ${cleanSubject}`,

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
</head>

<body
  style="
    margin: 0;
    padding: 20px;
    background: #f4f6f8;
    font-family: Arial, Helvetica, sans-serif;
  "
>

  <div
    style="
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
    "
  >

    <!-- HEADER -->

    <div
      style="
        background: #0a528f;
        padding: 24px;
        text-align: center;
      "
    >

      <h2
        style="
          margin: 0;
          color: #ffffff;
          font-size: 24px;
        "
      >
        New ARENQ Website Enquiry
      </h2>

    </div>

    <!-- CUSTOMER DETAILS -->

    <div style="padding: 24px;">

      <h3
        style="
          margin-top: 0;
          color: #0a528f;
        "
      >
        Customer Details
      </h3>

      <table
        style="
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        "
      >

        <tr>
          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
              width: 150px;
            "
          >
            <strong>Name</strong>
          </td>

          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            ${cleanFullname}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            <strong>Email</strong>
          </td>

          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            ${cleanEmail}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            <strong>Phone</strong>
          </td>

          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            ${fullPhone}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            <strong>Address</strong>
          </td>

          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            ${cleanAddress}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            <strong>City</strong>
          </td>

          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            ${cleanCity}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            <strong>State</strong>
          </td>

          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            ${cleanState}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            <strong>Pincode</strong>
          </td>

          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            ${cleanPincode}
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            <strong>Subject</strong>
          </td>

          <td
            style="
              padding: 10px;
              border-bottom: 1px solid #eeeeee;
            "
          >
            ${cleanSubject}
          </td>
        </tr>

      </table>

      <!-- MESSAGE -->

      <h3
        style="
          margin-top: 25px;
          color: #0a528f;
        "
      >
        Customer Message
      </h3>

      <div
        style="
          padding: 15px;
          background: #f9fafb;
          border-left: 4px solid #ffb600;
          border-radius: 4px;
          white-space: pre-wrap;
          line-height: 1.6;
        "
      >${cleanMessage}</div>

      <!-- FOOTER -->

      <p
        style="
          margin-top: 30px;
          font-size: 12px;
          color: #888888;
          text-align: center;
        "
      >
        This enquiry was submitted through the
        ARENQ website contact form.
      </p>

    </div>

  </div>

</body>
</html>
      `,
    };

    // =====================================================
    // SEND EMAIL
    // =====================================================

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
      error: "Server error. Please try again later.",
    });
  }
};

export default Contact;