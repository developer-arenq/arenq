import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const courierSchema = new Schema(
  {
    company_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Courier = models.Courier || model("Courier", courierSchema);

export default Courier;