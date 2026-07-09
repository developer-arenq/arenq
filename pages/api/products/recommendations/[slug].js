// /pages/api/products/recommendations/[slug].js
import dbConnect from "../../../../database/conn";
import Product from "../../../../models/productSchema";

export default async function handler(req, res) {
  await dbConnect();

  const { slug } = req.query;

  try {
    // 1️⃣ Current product शोधा
    const currentProduct = await Product.findOne({ slug }).lean();
    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let recommended = [];

    // 2️⃣ Try same subcat first
    if (currentProduct.subcat) {
      recommended = await Product.find({
        _id: { $ne: currentProduct._id }, // exclude current product
        subcat: currentProduct.subcat,    // match same subcat
      })
        .limit(8)
        .lean();
    }

    // 3️⃣ If no products in same subcat → fallback to same category
    if (recommended.length === 0 && currentProduct.category_id) {
      recommended = await Product.find({
        _id: { $ne: currentProduct._id },
        category_id: currentProduct.category_id._id || currentProduct.category_id,
      })
        .limit(8)
        .lean();
    }

    return res.status(200).json(recommended);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return res.status(500).json({ message: "Server error", error });
  }
}
