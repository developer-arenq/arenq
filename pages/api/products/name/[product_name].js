import main from "../../../../database/conn";
import Product from "../../../../models/productSchema";

const getSearchProduct = async (req, res) => {
  try {
    await main();

    const { product_name } = req.query;

    if (!product_name || typeof product_name !== "string") {
      return res.status(400).json({ message: "Invalid product name" });
    }

    // ✅ MongoDB level search (FAST + CLEAN)
    const products = await Product.find({
      active: true,
      name: { $regex: product_name.trim(), $options: "i" },
    })
      .select(`
        _id
        name
        slug
        price
        MRP
        rating
        main_image
        images
        alt_text
        out_of_stock
        purchase_count
        tax
        variants
        label
        category_id
        brand_id
      `)
      .populate({
        path: "category_id",
        select: "_id name active label",
      })
      .populate({
        path: "brand_id",
        select: "_id name slug label",
      })
      .sort({ updatedAt: -1 });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Search Product Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getSearchProduct;
