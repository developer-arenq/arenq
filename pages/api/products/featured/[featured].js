import main from "../../../../database/conn";
import Product from "../../../../models/productSchema";

const getProducts = async (req, res) => {
  try {
    await main();

    const { featured } = req.query;

    const products = await Product.find({
      featured,
      active: true,
    })
      .sort({ updatedAt: -1 })
      .limit(10)
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
        featured
        out_of_stock
        purchase_count
        tax
        variants
        category_id
        brand_id
        label
      `)
      .populate({
        path: "category_id",
        select: "_id name active label",
      })
      .populate({
        path: "brand_id",
        select: "_id name slug label",
      });

    res.status(200).json(products.reverse());
  } catch (error) {
    console.error("Featured products error:", error);
    res.status(500).json({ error: error.message });
  }
};

export default getProducts;
