import main from "../../../../database/conn";
import User from "../../../../models/userSchema";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function removeFromWishlist(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await main();

    const token = await getToken({ req, secret });

    if (!token?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Product id required" });
    }

    await User.updateOne(
      { _id: token.id },
      { $pull: { wishlist: new mongoose.Types.ObjectId(id) } }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("removeFromWishlist error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
