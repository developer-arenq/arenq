import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ Auto-generated slug
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    // ✅ Proper reference (for parent categories)
    parent_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


// ✅ Auto-generate slug before save
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")        // spaces → hyphens
      .replace(/[^\w-]+/g, "");    // remove special chars
  }
  next();
});

const Category = models.Category || model("Category", categorySchema);

export default Category;