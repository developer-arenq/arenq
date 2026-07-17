import nodemailer from 'nodemailer';
import main from "../../../database/conn";
import User from "../../../models/userSchema";
import generateToken from "../../../utils/generateToken";

// Handler function for creating a user
const createUser = async (req, res) => {
  // Connect to database
  await main().catch((err) => console.error(err));
  const { fullname, email, mobile, password } = req.body;

  // Check if email or mobile number already exists in database
  if (await User.findOne({ email })) {
    res.status(409).json({ error: "Email already exists" });
  }
  if (await User.findOne({ mobile })) {
    res.status(409).json({ error: "Mobile number already exists" });
  } else {



    // Create new user in database and return relevant information along with generated JWT token
    const user = await User.create({ fullname, email, mobile, password });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_SECRET,
      },
    });


const emailHtml = `
<div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; overflow:hidden;">
  
  <div style="background:#0f172a; padding:30px; text-align:center;">
    <img src="https://arenq.s3.ap-south-1.amazonaws.com/logo.png" alt="Arenq Logo" style="max-width:180px; margin-bottom:15px;" />
    <h1 style="margin:0; color:#ffffff; font-size:28px;">
      Welcome to Arenq
    </h1>
    <p style="margin-top:10px; color:#cbd5e1; font-size:15px;">
      The Future of Electricity Storage Solutions
    </p>
  </div>

  <div style="padding:35px;">
    <h2 style="color:#111827;">
      Hello ${fullname},
    </h2>

    <p style="font-size:16px; line-height:1.8; color:#4b5563;">
      Thank you for creating your Arenq account.
      We're excited to have you join us as we power the future with innovative and reliable energy storage solutions.
    </p>

    <p style="font-size:16px; line-height:1.8; color:#4b5563;">
      Explore our complete range of advanced battery solutions designed for:
    </p>

    <ul style="color:#374151; line-height:2;">
      <li>⚡ Electric Vehicles (EV)</li>
      <li>🔋 Industrial UPS Systems</li>
      <li>🚜 Agriculture Applications</li>
      <li>🏭 Industrial & Commercial Power Backup</li>
      <li>⚙️ Custom Energy Storage Solutions</li>
    </ul>

    <div style="background:#eff6ff; border-left:4px solid #2563eb; padding:18px; margin:30px 0;">
      <h3 style="margin:0; color:#1e3a8a;">
        Forward To Future
      </h3>
      <p style="margin-top:10px; color:#475569;">
        Delivering dependable battery technology with performance,
        safety, and innovation at its core.
      </p>
    </div>

    <div style="text-align:center; margin-top:35px;">
      <a href="https://arenq.co.in"
         style="background:#2563eb; color:#ffffff; text-decoration:none; padding:14px 30px; border-radius:6px; display:inline-block; font-weight:bold;">
        Visit Our Website
      </a>
    </div>

    <p style="margin-top:35px; color:#6b7280; font-size:15px;">
      If you have any questions, feel free to contact us anytime.
    </p>

    <p style="margin:0; color:#111827;">
      📧 info@arenq.co.in<br/>
      📞 +91 89562 25134
    </p>
  </div>

  <div style="background:#0f172a; text-align:center; padding:20px;">
    <p style="color:#cbd5e1; font-size:13px; margin:0;">
      © ${new Date().getFullYear()} Arenq. All Rights Reserved.
    </p>
    <p style="margin-top:8px;">
      <a href="https://arenq.co.in" style="color:#60a5fa; text-decoration:none;">
        www.arenq.co.in
      </a>
    </p>
  </div>

</div>
`;

    const mailOptions = {
      from: process.env.MAIL, // Sender address
      to: email, // Recipient's email
      subject: 'Welcome to Arenq!', // Subject of the email
      html: emailHtml, // Use the email template created above
    };


    try {
      const info = await transporter.sendMail(mailOptions);

      // After email is sent, send the response
      res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile,
        isAdmin: user.isAdmin,
        token: generateToken(user._id, user.isAdmin),
      });
    } catch (error) {
      console.error("Error sending email:", error); // Log the error for debugging
      return res.status(500).json({ error: "Email not sent. Please try again later." });
    }
  }
};

export default createUser;

