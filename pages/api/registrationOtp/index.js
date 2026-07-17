import nodemailer from 'nodemailer';
import User from "../../../models/userSchema"
import Otp from '../../../models/otpSchema';

export default async function handler(req, res) {
  const { email } = req.body;
  const userdetails=await User.findOne({ email });
 
  // check mail exists in the database or  not
  if (userdetails){
   return res.status(409).json({ success: false,message: "Email already exists" });
  }

  const existingOtp = await Otp.findOne({ email });

  if (existingOtp && existingOtp.expiry > Date.now()) {
    const remainingTime = (existingOtp.expiry - Date.now()) / 1000; // time left in seconds
    if (remainingTime > 0) {
      return res.status(200).json({
        success: false,
        message: `Please use the existing OTP sent to your email. It is valid for another ${Math.floor(remainingTime / 60)} minute(s).`
      });
    }
  }
   
  const expiry = Date.now() + 5 * 60 * 1000;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  if (existingOtp) {
    existingOtp.otp = otp;
    existingOtp.expiry = expiry;
    await existingOtp.save();
  } else {
    // Store OTP for later verification
    const otpEntry = new Otp({ email, otp, expiry });
    await otpEntry.save();
  }
  
   

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_SECRET,
    },
  });

  const emailHtml = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
  <div style="text-align: center;">
    <img src="https://arenq.s3.ap-south-1.amazonaws.com/logo.png" alt="Arenq Logo" style="width: 150px; margin-bottom: 20px;" />
  </div>
  <h2 style="color: #333; text-align: center;">Welcome to Arenq !</h2>
  <p style="color: #555; font-size: 16px; text-align: center;">
    We're excited to have you on board. To complete your registration, please use the OTP code below:
  </p>
  <div style="text-align: center; padding: 20px; background-color: #f4f4f4; border-radius: 5px; margin-top: 20px;">
    <p style="font-size: 22px; color: #333; font-weight: bold; margin: 0;">${otp}</p>
  </div>
  <p style="color: #555; font-size: 14px; text-align: center; margin-top: 20px;">
    This OTP is valid for only 5 minutes. Please enter it on the website before it expires.
  </p>
  <p style="color: #555; font-size: 14px; text-align: center; margin-top: 10px;">
    Please do not share this code with anyone. If you didn't request this, you can safely ignore this email.
  </p>
  <div style="text-align: center; margin-top: 40px;">
    <p style="color: #888; font-size: 12px;">
      For any support, contact us at <a href="mailto:info@arenq.co.in">info@arenq.co.in</a>
    </p>
    <p style="color: #888; font-size: 12px;">
      © 2024 Arenq, All rights reserved.
    </p>
  </div>
</div>

   `;

  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: 'Your OTP Code',
    html: emailHtml,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Error sending OTP' });
    }
    return res.status(200).json({ success: true, message: 'OTP sent to your mail successfully' });
  });
}



  
  