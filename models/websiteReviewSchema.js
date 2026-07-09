import mongoose from "mongoose";

const websiteReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // 👈 guest allowed
      unique: true,
      sparse: true, // 👈 important for guests
    },
    fullname: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    review: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const WebsiteReview =
  mongoose.models.WebsiteReview ||
  mongoose.model("WebsiteReview", websiteReviewSchema);

export default WebsiteReview;
