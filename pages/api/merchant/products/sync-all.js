import dbConnect from "../../../../lib/connectToDatabase";
import ProductModel from "../../../../models/productSchema";
import { GoogleAuth } from "google-auth-library";
import serviceKey from "../../../../google-service-key.json";

function extractDescription(draftJson) {
  try {
    if (!draftJson) return "";

    const parsed = JSON.parse(draftJson);

    if (!parsed.blocks || !Array.isArray(parsed.blocks)) {
      return "";
    }

    return parsed.blocks
      .map((block) => block.text)
      .join("\n")
      .trim();
  } catch (error) {
    return "";
  }
}

async function uploadToGoogle(product) {
  const auth = new GoogleAuth({
    credentials: serviceKey,
    scopes: ["https://www.googleapis.com/auth/content"],
  });

  const client = await auth.getClient();

  const merchantId = "551702225";

  const url = `https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/products`;

  const description = extractDescription(product.desc).substring(
    0,
    5000
  );

  const item = {
    offerId: product.SKU,

    title: (product.name || "").substring(0, 150),

    description,

    link: `https://www.arenq.co.in/products/${product.slug}`,

    imageLink: product.main_image,

    channel: "online",

    contentLanguage: "en",

    targetCountry: "IN",

    brand: "Apneehatti",

    condition: "new",

    identifierExists: false,

    googleProductCategory:
      "Food, Beverages & Tobacco > Food Items > Dried Goods",

    productTypes: [product.subcat || "Food"],

    price: {
      value: String(product.price),
      currency: "INR",
    },

    availability: product.out_of_stock
      ? "out of stock"
      : "in stock",
  };

  try {
    const response = await client.request({
      url,
      method: "POST",
      data: item,
    });

    return {
      offerId: product.SKU,
      success: true,
      response: response.data,
    };
  } catch (error) {
    return {
      offerId: product.SKU,
      success: false,
      error:
        error?.response?.data || error.message,
    };
  }
}

export default async function handler(req, res) {
  try {
    await dbConnect();

    const products = await ProductModel.find({
      active: true,
    });

    const logs = [];

    for (const product of products) {
      const result = await uploadToGoogle(product);

      logs.push({
        productId: product._id,
        sku: product.SKU,
        result,
      });
    }

    return res.status(200).json({
      success: true,
      totalProducts: products.length,
      message:
        "Google Merchant Sync Completed Successfully",
      logs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}