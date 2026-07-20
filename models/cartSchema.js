import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const VariantSchema = new Schema(
  {
    sku: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: "",
    },
    voltage: {
      type: String,
      default: "",
    },
    capacity: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    MRP: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const CartItemSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      default: "",
    },

    thumbnail: {
      type: String,
      required: true,
    },

    SKU: {
      type: String,
      required: true,
    },

    image: [
      {
        type: String,
      },
    ],

    alt_text: {
      type: String,
      default: "Product Image",
    },

    price: {
      type: Number,
      required: true,
    },

    MRP: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    weight: {
      type: Number,
      default: 0,
    },

    variant: {
      type: VariantSchema,
      default: null,
    },

    taxPercentage: {
      type: Number,
      default: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const cartSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },

    items: [CartItemSchema],

    shipping: {
      type: Number,
      default: 0,
    },

    subtotal: {
      type: Number,
      default: 0,
    },

    taxPercentage: {
      type: Number,
      default: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Cart || model("Cart", cartSchema);