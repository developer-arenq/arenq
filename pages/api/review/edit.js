import main from "../../../database/conn";
import calculateAverageRating from "../../../helper/calculateAverageRating";
import Review from "../../../models/reviewSchema";
import Product from "../../../models/productSchema";
import User from "../../../models/userSchema";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const editReview = async (req, res) => {
  try {
    // Connect to database
    await main();

    // ✅ Use next-auth token
    const token = await getToken({ req, secret });

    if (!token || !token.id) {
      return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
    }

    // ✅ Ensure required fields are provided
    const { id, product_id, review, rating, imageUrls = [], videoUrls = [] } = req.body;

    if (!id || !product_id) {
      return res.status(400).json({ message: "Missing review ID or product ID" });
    }

    // ✅ Check that the user exists
    const user = await User.findById(token.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Find the existing review
    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    // ✅ Ensure the user is the author
    if (!existingReview.author.user_id.equals(user._id)) {
      return res.status(403).json({ message: "You are not authorized to edit this review" });
    }

    // ✅ Update the review
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      {
        review,
        rating,
        images: imageUrls,
        videos: videoUrls,
      },
      { new: true }
    );

    // ✅ Recalculate average rating
    const reviews = await Review.find({ product_id });
    const newRating = calculateAverageRating(reviews);

    const count = reviews.length;

    const updatedProduct = await Product.findByIdAndUpdate(
      product_id,
      {
        $set: {
          rating: newRating,
          numReviews: count,
          "structured_data.ratingValue": newRating,
          "structured_data.reviewCount": count,
        },
      },
      { new: true }
    );

    // ✅ Respond with updated reviews
    res.status(200).json({
      message: "Review updated",
      updatedReview,
      updatedProduct,
      reviews,
    });
  } catch (err) {
    console.error("Edit review error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.stack });
  }
};

export default editReview;
