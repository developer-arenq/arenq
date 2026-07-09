import main from "../../../database/conn";
import User from "../../../models/userSchema";
import Product from "../../../models/productSchema";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function wishlist(req, res) {
  try {
    await main();

    const token = await getToken({ req, secret });

    if (!token?.id) {
      return res.status(401).json([]);
    }

    const user = await User.findById(token.id).lean();

    if (!user || !user.wishlist?.length) {
      return res.status(200).json([]);
    }

    const products = await Product.find({
      _id: { $in: user.wishlist },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error("wishlist error:", error);
    return res.status(500).json([]);
  }
}
