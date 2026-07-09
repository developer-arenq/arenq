import main from "../../../database/conn";
import Coupon from "../../../models/couponSchema";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  await main();

  try {
    const authHeader = req.headers.authorization;

    // ❌ Token missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ JWT verify with proper handling
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token expired. Please login again.",
          expired: true,
        });
      }

      return res.status(401).json({ message: "Invalid token" });
    }

    // ✅ Token valid → fetch coupons
    const coupons = await Coupon.find({ active: true })
      .select(
        "_id coupon_code discount_percent flat_discount min max valid_from valid_until active"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json(coupons);
  } catch (error) {
    console.error("Coupon all fatal error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default handler;
