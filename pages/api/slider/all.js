import main from "../../../database/conn";
import Slider from "../../../models/sliderSchema";

export default async function handler(req, res) {
  try {
    await main(); 

    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const desktopSliders = await Slider.find({ sliderType: "desktop" }).sort({ order: 1 });
    const mobileSliders = await Slider.find({ sliderType: "mobile" }).sort({ order: 1 });

    return res.status(200).json({
      desktop: desktopSliders,
      mobile: mobileSliders,
    });

  } catch (error) {
    console.error("Slider Fetch Error:", error);
    return res.status(500).json({ error: "Failed to fetch sliders!" });
  }
}
