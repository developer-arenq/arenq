import dbConnect from "../../database/conn";
import CookieConsent from "../../models/cookieConsentSchema";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { status, timestamp, userAgent } = req.body;

      if (!status || !["accepted", "declined"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      const consent = await CookieConsent.create({
        status,
        timestamp,
        userAgent,
      });

      return res.status(201).json({ success: true, data: consent });
    } catch (error) {
      console.error("API Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
