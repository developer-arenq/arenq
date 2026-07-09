import main from "../../../../database/conn";
import Product from "../../../../models/productSchema";
import Subcat from "../../../../models/subcatSchema";

const getProducts = async (req, res) => {
  // console.log(req.query, "sksksksk")
  try {
    await main().catch((err) => console.error(err));
    const { page = 1, limit = 5, subcat } = req.query;
    const skip = (page - 1) * limit;
    const subcat_by_slug = await Subcat.findOne({ slug: subcat }).lean();
    let products
    console.log("subcat_by_slug",subcat_by_slug)
    if (subcat_by_slug) {
      const subcate_id = subcat_by_slug._id;
      products = await Product.find({ active: true, subcate_id }).skip(skip)
        .limit(parseInt(limit))
        .select("_id name price MRP rating main_image alt_text subcate_id active featured out_of_stock subcat purchase_count tax label")
    } else {
      products = await Product.find({ active: true }).skip(skip)
        .limit(parseInt(limit))
        .select("_id name price MRP rating main_image alt_text subcate_id active featured out_of_stock subcat purchase_count tax label")
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getProducts;

