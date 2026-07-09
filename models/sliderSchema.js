import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    link: { type: String, default: "/shop" },
    order: { type: Number, required: true },
    
    // ⭐ NEW FIELD (Desktop / Mobile)
    sliderType: { 
      type: String, 
      enum: ["desktop", "mobile"], 
      default: "desktop" 
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Slider || mongoose.model("Slider", sliderSchema);
