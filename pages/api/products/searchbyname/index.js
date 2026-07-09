// 📁 /api/products/searchbyname.js
import connectToDatabase from "../../../../database/conn";
import Product from "../../../../models/productSchema";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectToDatabase();

  const { product_name } = req.query;

  if (!product_name || product_name.trim().length === 0) {
    return res.status(400).json({ message: "Product name is required" });
  }

  try {
    const regex = new RegExp(product_name.trim(), "i");

    const products = await Product.find({
      active: true,
      $or: [{ name: regex }, { slug: regex }],
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
        featured
        subcat
        subcate_id
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
    console.error("Search error:", error);
    return res.status(500).json({ message: "Error during search" });
  }
}
