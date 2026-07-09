import main from "../../../database/conn";
import Product from "../../../models/productSchema";

const getProductsBySubcat = async (req, res) => {
  await main().catch((err) => {
    console.error("DB Connection Error:", err);
    return res.status(500).json({ error: "Database connection failed" });
  });

  const { subcat } = req.query; // /api/products/subcat?subcat=Juice

  if (!subcat || typeof subcat !== "string") {
    return res.status(400).json({ error: "Subcategory is required in the URL" });
  }

  try {
    // Case-insensitive exact match for subcat
    const products = await Product.find({
      subcat: { $regex: new RegExp(`^${subcat.trim()}$`, "i") },
      active: true,
    }).lean();

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: `No products found for subcategory: ${subcat}` });
    }

    return res.status(200).json({
      success: true,
      count: products.length,
      subcategory: subcat,
      products,
    });
  } catch (error) {
    console.error("Error fetching products by subcat:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export default getProductsBySubcat;
