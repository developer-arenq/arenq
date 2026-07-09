// /api/products/slug/[slug].js

import connectToDatabase from "../../../../database/conn";
import Product from "../../../../models/productSchema";

const getProductBySlug = async (req, res) => {
  try {
    await connectToDatabase();

    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const product = await Product.findOne({ slug })
      .select(`
_id name purchase_count price MRP
main_image images alt_text subcat variants
brand_id featured category_id faq
out_of_stock desc tax slug videos
rating numReviews SKU label

seo
structured_data
short_desc
long_description
benefits
health_benefits
ingredients
how_to_use
storage_instructions
taste_profile
origin
region
state_of_origin
country_of_origin
trust_badges
comparison_section
why_choose_section
expert_review
featured_snippet_content
ai_overview_content
internal_links
related_blogs
nutritional_info
semantic_keywords
voice_search_keywords
youtube_video
instagram_reel
`).populate({
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
    console.error("Error fetching product by slug:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default getProductBySlug;
