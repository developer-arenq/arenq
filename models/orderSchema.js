import { models, model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order_items: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        slug: { type: String, required: true },
        quantity: { type: Number, required: true },

        image: [{ type: String, required: true }],

        price: { type: Number, required: true },

        taxPercentage: { type: Number, default: 0 },
        taxAmount: { type: Number, default: 0 },
        total: { type: Number, default: 0 },

        delivery_status: {
          type: String,
          default: "order_confirmed",
        },

        deliveredAt: Date,

        variant: {
          type: { type: String },
          value: String,
          price: Number,
          MRP: Number,
          tax: { type: Number, default: 0 },
        },
      },
    ],

    coupon: { type: Schema.Types.ObjectId, ref: "Coupon" },

    shipping_address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    payment_method: { type: String, required: true },

    shipping_price: { type: Number, required: true },

    subtotal: { type: Number, default: 0 },

    taxAmount: { type: Number, default: 0 },

    taxPercentage: { type: Number, default: 0 },

    total: { type: Number, required: true, default: 0 },

    discount: { type: Number, required: true, default: 0 },

    isPaid: { type: Boolean, default: false },

    paidAt: Date,

    isDelivered: { type: Boolean, default: false },

    deliveredAt: Date,

    shiprocket_order_id: Number,
    shiprocket_shipment_id: Number,

    shiprocket_awb: { type: String, default: "" },
    shiprocket_courier: { type: String, default: "" },

    shiprocket_status: {
      type: String,
      enum: [
        "not_sent",
        "order_created",
        "shipment_created",
        "awb_generated",
        "picked_up",
        "delivered",
      ],
      default: "not_sent",
    },

    transaction_id: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      default: null,
    },

    reviewEmailSent: { type: Boolean, default: false },
    reviewEmailSentAt: Date,
    reviewEligibleAt: Date,
  },
  { timestamps: true }
);

export default models.Order || model("Order", orderSchema);