import { getToken } from "next-auth/jwt";
import main from "../../../../database/conn";
import User from "../../../../models/userSchema";

const secret = process.env.NEXTAUTH_SECRET;

const addToWishlist = async (req, res) => {
  try {
    await main();

    const token = await getToken({ req, secret });

    if (!token || !token.id) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { id } = req.body;

    const result = await User.updateOne(
      { _id: token.id },
      { $push: { wishlist: id } }
    );

    return res.status(201).json({ message: "Added to wishlist" });

  } catch (err) {
    console.error("Error in addToWishlist:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default addToWishlist;
