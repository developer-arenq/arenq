import dbConnect from "../../../../database/conn";
import Product from "../../../../models/productSchema";

export default async function handler(req, res) {
  await dbConnect();

  const { slug } = req.query;

  try {
    const product = await Product.findOne({
      oldSlugs: slug,
    }).select("slug");

    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({
      slug: product.slug,
    });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}