// pages/api/website-reviews/[id].js
import main from "../../../lib/connectToDatabase";
import WebsiteReview from "../../../models/websiteReviewSchema";
import jwt from "jsonwebtoken";

const auth = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return null;
  return jwt.verify(token, process.env.JWT_SECRET);
};

export default async function handler(req, res) {
  await main();

  const decoded = auth(req);
  if (!decoded) return res.status(401).json({ msg: "Unauthorized" });

  const review = await WebsiteReview.findById(req.query.id);
  if (!review || review.user.toString() !== decoded.id)
    return res.status(403).json({ msg: "Forbidden" });

  if (req.method === "PUT") {
    review.review = req.body.review;
    review.rating = req.body.rating;
    await review.save();
    return res.status(200).json(review);
  }

  if (req.method === "DELETE") {
    await review.deleteOne();
    return res.status(200).json({ msg: "Deleted" });
  }

  return res.status(405).json({ msg: "Method not allowed" });
}
