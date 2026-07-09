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
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f0f4f8;">
      <div style="text-align: center; background-color: #00aaff; padding: 20px; border-radius: 10px 10px 0 0;">
        <img src="https://arenq.s3.amazonaws.com/image-1727026815300.png" alt="ApneeHatti Logo" style="width: 150px; margin-bottom: 20px;" />
        <h1 style="color: #fff; margin: 0;">Welcome to ApneeHatti!</h1>
      </div>
      <div style="padding: 20px;">
        <h2 style="color: #333; text-align: center;">Hello, ${fullname}!</h2>
        <p style="color: #555; font-size: 16px; text-align: center;">
          We're thrilled to have you as part of our community! At ApneeHatti, we bring the goodness of the Himalayas right to your doorstep. From natural products to unique goods, we offer a wide range of Himalayan treasures just for you.
        </p>
        
        <p style="color: #555; font-size: 16px; text-align: center; margin-bottom: 20px;">
          Enjoy exploring our e-commerce platform and discovering amazing products inspired by the serenity and purity of the Himalayas.
        </p>
        <div style="text-align: center; padding: 20px; background-color: #00aaff; color: #fff; border-radius: 5px;">
          <p style="font-size: 22px; font-weight: bold; margin: 0;">“Goodness of the Himalayas at your Doorstep”</p>
        </div>
        <p style="color: #555; font-size: 14px; text-align: center; margin-top: 20px;">
          Need help? Contact us at <a href="mailto:info@arenq.co.in" style="color: #00aaff;">info@arenq.co.in</a> for any support or inquiries.
        </p>
      </div>
      <div style="text-align: center; margin-top: 40px; background-color: #333; padding: 20px; border-radius: 0 0 10px 10px;">
        <p style="color: #fff; font-size: 12px;">
          © 2024 ApneeHatti, All rights reserved. <br />
          Visit us: <a href="https://www.arenq.co.in" style="color: #00aaff;">www.arenq.co.in</a>
        </p>
      </div>
    </div>
  `;

    const mailOptions = {
      from: process.env.MAIL, // Sender address
      to: email, // Recipient's email
      subject: 'Welcome to ApneeHatti!', // Subject of the email
      html: emailHtml, // Use the email template created above
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response); // Uncomment to log successful email sending

    // const info=await transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error("Error sending email:", error); // Log the error for debugging
    //     return res.status(500).json({ error: "Email not sent. Please try again later." });
    //   }
    //   console.log('Email sent successfully:', info.response); // Log successful email sending in production
    // });



    // res.status(201).json({
    //   _id: user._id,
    //   fullname: user.fullname,
    //   email: user.email,
    //   mobile: user.mobile,
    //   // password: user.password, // Note: password should not be returned in response
    //   isAdmin: user.isAdmin,
    //   token: generateToken(user._id, user.isAdmin),
    // });

    try {
      // Use await to wait for email sending completion
      const info = await transporter.sendMail(mailOptions);
      // console.log('Email sent successfully:', info.response); // Log successful email sending

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

