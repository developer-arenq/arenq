

import Otp from "../../../models/otpSchema";

export default async function handler(req, res) {
  const { email, otp } = req.body;
  
  const otpEntry = await Otp.findOne({ email });

  if (!otpEntry) {
    return res.status(400).json({ success: false, message: 'Please ask for a new OTP' });
  }

  // Check if OTP has expired
  if (Date.now() > otpEntry.expiry) {
    await Otp.deleteOne({ email }); // Optionally delete the expired OTP
    return res.status(400).json({ success: false, message: "OTP expired"});
  }

  // Check if the OTP is correct
  if (otp !== otpEntry.otp) {
    return res.status(400).json({  success: false, message: "Incorrect OTP"});
  }

  // Delete OTP after successful verification
  await Otp.deleteOne({ email });

  res.status(200).json({ success: true, message: 'OTP verified successfully' });
}

