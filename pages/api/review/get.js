import main from "../../../database/conn";
import Review from "../../../models/reviewSchema";

const getReviewById = async (req, res) => {
  try {
    await main();

    const { product_id } = req.query;

    const review = await Review.find({ product_id });

    if (!Array.isArray(review)) {
      return res.status(404).json({ message: "Reviews not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("Review GET error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export default getReviewById;
