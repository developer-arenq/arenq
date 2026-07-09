import dbConnect from "../../../database/conn";
import Product from "../../../models/productSchema";

export default async function handler(req, res) {
  await dbConnect();

  try {
    // सगळे products get करणे
    const products = await Product.find({}).lean();

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    // जास्तीत जास्त purchase_count असलेला product काढणे
    const topProduct = await Product.findOne({})
      .sort({ purchase_count: -1 }) // desc order
      .limit(1)
      .lean();

    return res.status(200).json({
      success: true,
      products,
      flashProduct: topProduct,
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
      details: error.message,
    });
  }
}
