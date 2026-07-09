import main from "../../../database/conn";
import Coupon from "../../../models/couponSchema";
import Product from "../../../models/productSchema";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    await main();

    const { authorization } = req.headers;
    if (!authorization) 
      return res.status(401).json({ message: "Authorization missing" });

    const [type, token] = authorization.split(" ");
    if (!token) 
      return res.status(401).json({ message: "Invalid token format" });

    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ message: "Token Expired" });
    }

    const { coupon_code, order_items, order_qty } = req.body;

    const products = await Product.find({ _id: { $in: order_items } }, { price: 1 });


    const subtotal = products.reduce((t, p) => {
      const item = order_qty.find((i) => i.id == p._id);
      return item ? t + p.price * item.quantity : t;
    }, 0);

    // if (subtotal !== subtotalClient) {
    //   return res.status(400).json({ message: "Subtotal mismatch" });
    // }

    const coupon = await Coupon.findOne({ coupon_code });
    if (!coupon) return res.status(404).json({ message: "Invalid Coupon" });

    const now = new Date();
    const validFrom = new Date(`${coupon.valid_from}T00:00:00`);
    const validUntil = new Date(`${coupon.valid_until}T23:59:59`);

    if (now < validFrom || now > validUntil)
      return res.status(400).json({ message: "Coupon Expired" });

    if (coupon.useby.includes(user.id))
      return res.status(400).json({ message: "Coupon Already Used" });

    // Discount calculation
    const discount = coupon.discount_percent
      ? Math.floor((subtotal * coupon.discount_percent) / 100)
      : coupon.flat_discount;

    const priceAfterDiscount = subtotal - discount;

    return res.status(200).json({
      _id: coupon._id,
      discount,
      subtotalAfterDiscount: priceAfterDiscount, // SHIPPING NOT ADDED HERE
    });

  } catch (err) {
    console.error("Coupon Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
}
