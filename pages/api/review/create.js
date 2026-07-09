import main from "../../../database/conn";
import User from "../../../models/userSchema";
import Review from "../../../models/reviewSchema";
import Product from "../../../models/productSchema";
import { getToken } from "next-auth/jwt";
import mongoose from "mongoose";

const secret = process.env.NEXTAUTH_SECRET;

export default async function createReview(req, res) {
  try {
    await main();

    const token = await getToken({ req, secret });

    if (!token?.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { review, rating, product_id } = req.body;

    if (!review?.trim() || !rating || !product_id) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Invalid rating",
      });
    }

    const productObjectId =
      new mongoose.Types.ObjectId(product_id);

    const user = await User.findById(token.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const exists = await Review.findOne({
      product_id: productObjectId,
      "author.user_id": user._id,
    });

    if (exists) {
      return res.status(409).json({
        message: "Already reviewed",
      });
    }

    const newReview = await Review.create({
      product_id: productObjectId,

      rating,

      review: review.trim(),

      author: {
        user_id: user._id,
        name:
          user.name ||
          user.email.split("@")[0],

        email: user.email,
      },
    });

    const stats = await Review.aggregate([
      {
        $match: {
          product_id: productObjectId,
        },
      },

      {
        $group: {
          _id: "$product_id",

          avgRating: {
            $avg: "$rating",
          },

          count: {
            $sum: 1,
          },
        },
      },
    ]);

    if (stats.length) {
      const avg =
        Math.round(stats[0].avgRating * 10) / 10;

      const count = stats[0].count;

      await Product.findByIdAndUpdate(
        productObjectId,
        {
          $set: {
            rating: avg,

            numReviews: count,

            "structured_data.ratingValue": avg,

            "structured_data.reviewCount": count,
          },
        },
        {
          new: true,
        }
      );
    }

    return res.status(200).json({
      message: "Review submitted",
      review: newReview,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
}