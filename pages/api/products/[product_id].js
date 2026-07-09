import connectToDatabase from "../../../database/conn";
import Product from "../../../models/productSchema";

const getProduct = async (req, res) => {
  try {
    // Connect to database (optimized and cached)
    await connectToDatabase();

    const { product_id } = req.query;

    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Optimized query: only required fields
    const product = await Product.findById(product_id)
      .select("_id name price main_image images subcat alt_text variants brand_id category_id faq out_of_stock desc label videos featured SKU purchase_count tax")
      .populate({
        path: "category_id",
        select: "_id active name slug",
      })
      .populate({
        path: "brand_id",
        select: "_id name slug",
      });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default getProduct;
