import main from "../../../database/conn";
import Product from "../../../models/productSchema";

export default async function handler(req, res) {
  await main().catch(err => console.error(err));

  try {
    const { discount } = req.query;

    // Fetch only active products
    let products = await Product.find({ active: true });

    // Ensure valid values
    products = products.filter(item => item.MRP > 0 && item.price > 0);

    // Discount filter logic
    const minDiscount =
      discount && !isNaN(discount) ? Number(discount) : 1;

    const discountedProducts = products.filter(item => {
      const dis = ((item.MRP - item.price) / item.MRP) * 100;
      return dis >= minDiscount;
    });

    if (discountedProducts.length === 0) {
      return res.status(404).json({ message: "No discounted products found" });
    }

    res.status(200).json({
      success: true,
      total: discountedProducts.length,
      products: discountedProducts,
    });

  } catch (error) {
    console.error("Error in Discount API:", error);
    res.status(500).json({ message: "Server error", error });
  }
}
