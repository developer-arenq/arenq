import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const cartSchema = new Schema(
  {
    user_id: { type: String, required: true },

    items: [
      {
        id: { type: Schema.Types.ObjectId, required: true },
        title: { type: String, required: true },
        thumbnail: { type: String, required: true },
        SKU: { type: String, required: true },
        image: [{ type: String, required: true }],
        alt_text: { type: String, default: "Product_image" },
        price: { type: Number, required: true },
        MRP: { type: Number, required: true },
        quantity: { type: Number, required: true },
        weight: { type: Number, required: true },

        variantValue: { type: String },

        variant: {
          id: { type: Schema.Types.ObjectId },
          type: { type: String },
          value: { type: String },
          price: { type: Number },
          MRP: { type: Number },
          tax: { type: Number },
        },

        total: { type: Number },
        taxPercentage: { type: Number, default: 0 },
        taxAmount: { type: Number, default: 0 },
      },
    ],

    shipping: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    taxPercentage: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Cart = models.Cart || model("Cart", cartSchema);

export default Cart;