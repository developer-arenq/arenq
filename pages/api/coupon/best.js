import main from "../../../database/conn";
import Coupon from "../../../models/couponSchema";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const bestCoupon = async (req, res) => {
  try {
    await main();

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    // 🔐 Token optional (but recommended)
    let userId = null;

    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const tokenData = jwt.verify(token, process.env.JWT_SECRET);
      userId = tokenData?.id
        ? new mongoose.Types.ObjectId(tokenData.id)
        : null;
    }

    const { subtotal, shipping_price } = req.body;

    if (!subtotal || subtotal <= 0) {
      return res.status(400).json({ message: "Invalid subtotal" });
    }

    const today = new Date().toISOString().split("T")[0];

    // ✅ Fetch active + valid coupons
    const coupons = await Coupon.find({
      active: true,
      valid_from: { $lte: today },
      valid_until: { $gte: today },
    });

    let bestCoupon = null;
    let maxDiscount = 0;

    for (const coupon of coupons) {
      // ❌ Skip if user already used
      if (userId && coupon.useby.includes(userId)) continue;

      // ❌ Min order check
      if (subtotal < coupon.min) continue;

      let discount = 0;

      // ✅ Discount calculation
      if (coupon.type === "PERCENT") {
        discount = (subtotal * coupon.discount_percent) / 100;
      } else if (coupon.type === "FLAT") {
        discount = coupon.flat_discount;
      }

      // ✅ Max discount cap
      if (coupon.max > 0) {
        discount = Math.min(discount, coupon.max);
      }

      if (discount > maxDiscount) {
        maxDiscount = discount;
        bestCoupon = coupon;
      }
    }

    if (!bestCoupon) {
      return res.status(200).json({});
    }

    const discounted_price =
      subtotal + (shipping_price || 0) - maxDiscount;

    return res.status(200).json({
      _id: bestCoupon._id,
      coupon_code: bestCoupon.coupon_code,
      discount: Math.round(maxDiscount),
      discounted_price: Math.round(discounted_price),
    });
  } catch (error) {
    console.error("Best coupon error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default bestCoupon;
