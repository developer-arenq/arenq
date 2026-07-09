import { models, model, Schema } from "mongoose";

const subcatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    parent_id: {
      type: String,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Subcat = models.Subcat || model("Subcat", subcatSchema);

export default Subcat;