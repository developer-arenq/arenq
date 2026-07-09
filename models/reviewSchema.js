import { models, model, Schema } from "mongoose";

// Review Schema definition
const reviewSchema = new Schema(
  {
    author: {
      user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    rating: {
      type: Number,
      default: 0,
    },

    review: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    videos: {
      type: [String],
      default: [],
    },

    number_of_likes: {
      type: Number,
      default: 0,
    },
    number_of_dislikes: {
      type: Number,
      default: 0,
    },
    like_by_users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislike_by_users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Indexes for performance
reviewSchema.index({ product_id: 1 });
reviewSchema.index({ "author.user_id": 1 });

export default models.Review || model("Review", reviewSchema);
