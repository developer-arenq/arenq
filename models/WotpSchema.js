import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  expiry: { type: Date, required: true },
});

const WOtp = mongoose.models.WOtp || mongoose.model('WOtp', otpSchema);

export default WOtp;