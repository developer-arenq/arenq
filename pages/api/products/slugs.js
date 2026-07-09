import Product from "../../../models/productSchema";

export async function getStaticProps({ params }) {
  try {
    await dbConnect();

    const { slug } = params; // ✅ Yeh line add karo

    const product = await Product.findOne({ slug })
      .select("_id name purchase_count price MRP main_image images alt_text subcat variants brand_id featured category_id faq out_of_stock desc tax slug videos rating numReviews SKU label seo structured_data tags oldSlugs")
      .populate({ path: "category_id", select: "_id active name slug" })
      .populate({ path: "brand_id", select: "_id name slug" });

    if (!product) {
      return { notFound: true };
    }

    const recommendations = await Product.find({
      category_id: product.category_id?._id,
      _id: { $ne: product._id },
    })
      .limit(8)
      .lean();

    return {
      props: {
        product_data: JSON.parse(JSON.stringify(product)),
        recommendations: JSON.parse(JSON.stringify(recommendations)),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("getStaticProps error:", error);
    return { notFound: true };
  }
}