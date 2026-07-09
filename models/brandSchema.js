import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: String,
    },
    email: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Brand = models.Brand || model("Brand", brandSchema);

export default Brand;