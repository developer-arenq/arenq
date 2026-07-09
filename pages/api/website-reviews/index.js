import main from "../../../lib/connectToDatabase";
import WebsiteReview from "../../../models/websiteReviewSchema";
import jwt from "jsonwebtoken";

const getUserFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};

export default async function handler(req, res) {
  await main();

  // ---------------- GET ALL REVIEWS ----------------
  if (req.method === "GET") {
    const reviews = await WebsiteReview.find().sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  }

  // ---------------- CREATE REVIEW (LOGIN + GUEST) ----------------
  if (req.method === "POST") {
    const decoded = getUserFromToken(req);

    // ---------- LOGIN USER ----------
    if (decoded) {
      const exists = await WebsiteReview.findOne({ user: decoded.id });
      if (exists) {
        return res
          .status(400)
          .json({ msg: "You already reviewed" });
      }

      const review = await WebsiteReview.create({
        user: decoded.id,
        fullname: req.body.fullname,
        rating: req.body.rating,
        review: req.body.review,
      });

      return res.status(201).json(review);
    }

    // ---------- GUEST USER ----------
    if (!req.body.fullname || !req.body.review || !req.body.rating) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const review = await WebsiteReview.create({
      fullname: req.body.fullname,
      rating: req.body.rating,
      review: req.body.review,
    });

    return res.status(201).json(review);
  }

  return res.status(405).json({ msg: "Method not allowed" });
}
