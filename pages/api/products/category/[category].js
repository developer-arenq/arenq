import main from "../../../../database/conn";
import Product from "../../../../models/productSchema";
import Category from "../../../../models/categorySchema";

const getProducts = async (req, res) => {
  try {
    await main().catch((err) => console.error(err));

    const { page, limit, category } = req.query;

    let query = { active: true };

    if (category) {
      const category_by_slug = await Category.findOne({ slug: category }).lean();
      if (category_by_slug) {
        query.category_id = category_by_slug._id;
      } else {
        return res.status(200).json([]); // Return empty if invalid category
      } 
    }

    let productsQuery = Product.find(query).select(
      "_id name price MRP rating main_image alt_text category_id active slug SKU purchase_count label tax"
    );

    // Apply pagination only if page and limit are provided
    if (page && limit) {
      const skip = (parseInt(page) - 1) * parseInt(limit);
      productsQuery = productsQuery.skip(skip).limit(parseInt(limit));
    }

    const products = await productsQuery;

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getProducts;
