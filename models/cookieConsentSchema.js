import mongoose from "mongoose";

const CookieConsentSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["accepted", "declined"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userAgent: {
    type: String,
  },
});

const CookieConsent =
  mongoose.models.CookieConsent ||
  mongoose.model("CookieConsent", CookieConsentSchema);

export default CookieConsent;