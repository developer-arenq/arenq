import main from "../../../database/conn";
import Coupon from "../../../models/couponSchema";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const update = async (req, res) => {
  try {
    await main();

    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const token_data = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = req.body;

    if (!token_data?.id) {
      return res.status(401).json({ message: "Token expired" });
    }

    const userId = new mongoose.Types.ObjectId(token_data.id);

    const coupon = await Coupon.updateOne(
      { _id: id },
      {
        // 👇 duplicate entry avoid + correct ObjectId
        $addToSet: { useby: userId },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      coupon,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default update;
