import { GoogleAuth } from "google-auth-library";
import serviceKey from "../../../../google-service-key.json";

function extractDescription(draftJson) {
  try {
    if (!draftJson) return "";
    const parsed = JSON.parse(draftJson);
    if (!parsed.blocks || !Array.isArray(parsed.blocks)) return "";
    return parsed.blocks.map(b => b.text).join("\n");
  } catch {
    return "";
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  try {
    const product = req.body;

    const auth = new GoogleAuth({
      credentials: serviceKey,
      scopes: ["https://www.googleapis.com/auth/content"],
    });

    const client = await auth.getClient();
    const merchantId = "551702225";

    const url = `https://shoppingcontent.googleapis.com/content/v2.1/${merchantId}/products`;

    const payload = {
      offerId: String(product.SKU),
      title: product.name.substring(0, 150),
      description: extractDescription(product.desc).substring(0, 5000),
      link: `https://www.arenq.co.in/products/${product.slug}`,
      imageLink: product.main_image,
      channel: "online",
      contentLanguage: "en",
      targetCountry: "IN",
      price: {
        value: String(product.price),
        currency: "INR"
      },
      availability: product.out_of_stock ? "out of stock" : "in stock",
      condition: "new"
    };

    const response = await client.request({
      url,
      method: "POST",
      data: payload,
    });

    return res.status(200).json({
      success: true,
      payload,
      google_response: response.data,
    });

  } catch (err) {
    console.error("Content API Error →", err);
    return res.status(500).json({
      success: false,
      message: "Google Shopping Content API Error",
      error: err.message,
    });
  }
}
