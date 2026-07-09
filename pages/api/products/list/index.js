import main from "../../../../database/conn";
import Product from "../../../../models/productSchema";
import Category from "../../../../models/categorySchema";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    await main();

    let { page = 1, limit = 12, category } = req.query;

    // ✅ Convert to numbers
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const query = { active: true };

    // ✅ Handle category filter (ObjectId OR name)
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        query.category_id = category;
      } else {
        const categoryDoc = await Category.findOne({
          slug: new RegExp(`^${category}$`, "i"),
          active: true,
        });
        if (!categoryDoc) {
          return res.status(404).json({
            success: false,
            message: "Category not found",
          });
        }

        query.category_id = categoryDoc._id;
      }
    }

    // ✅ Fetch products
    const products = await Product.find(query)
      .populate("category_id", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // ✅ Count total
    const totalItems = await Product.countDocuments(query);

    return res.status(200).json({
      success: true,
      products,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (error) {
    console.error("Product list error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}