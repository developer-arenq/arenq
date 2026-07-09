import main from "../../../database/conn";
import Order from "../../../models/orderSchema";
import Product from "../../../models/productSchema";
import User from "../../../models/userSchema";
import Coupon from "../../../models/couponSchema";
import Address from "../../../models/userAddressSchema";
import Cart from "../../../models/cartSchema";
import { getToken } from "next-auth/jwt";
import { validateOrderItems } from "../../../lib/validateOrderItems";
import {
  shiprocketLogin,
  buildShiprocketOrderPayload,
  createShiprocketOrder,
} from "../../../lib/shiprocket";

const getShippingPrice = (method) => (method === "cod" ? 100 : 70);

const Create = async (req, res) => {
  await main();

  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      order_items = [],
      payment_method,
      shipping_address,
      coupon = null,
    } = req.body;

    /* ---------------- CART ---------------- */
    const cart = await Cart.findOne({ user_id: token.id });
    if (!cart || !order_items.length) {
      return res.status(400).json({ error: "Cart not found" });
    }

    /* ---------------- ADDRESS ---------------- */
    const address = await Address.findOne({
      _id: shipping_address,
      user_id: token.id,
    });

    if (!address) {
      return res.status(400).json({ error: "Invalid address" });
    }

    /* ---------------- ITEMS (ONLY VALID PLACE) ---------------- */
    const validatedItems = await validateOrderItems(order_items);

    let subtotal = 0;
    let taxAmount = 0;

    const finalItems = validatedItems.map((item) => {
      const base = item.price * item.quantity;
      subtotal += base;

      const taxPercent = item.taxPercentage || 0;
      const lineTax = Number(((base * taxPercent) / 100).toFixed(2));

      taxAmount += lineTax;

      return {
        ...item,
        taxAmount: lineTax,
        total: Number((base + lineTax).toFixed(2)),
      };
    });

    /* ---------------- COUPON ---------------- */
    let discount = 0;

    if (coupon) {
      const c = await Coupon.findOneAndUpdate(
        { _id: coupon, useby: { $ne: token.id } },
        { $push: { useby: token.id } },
        { new: true }
      );

      if (!c) {
        return res.status(400).json({ error: "Coupon already used" });
      }

      discount = c.discount_percent
        ? Math.round((subtotal * c.discount_percent) / 100)
        : c.flat_discount || 0;
    }

    /* ---------------- TOTAL ---------------- */
    const shipping_price = getShippingPrice(payment_method);

    const total = Number(
      (subtotal + taxAmount + shipping_price - discount).toFixed(2)
    );

    /* ---------------- CREATE ORDER ---------------- */
    const order = await Order.create({
      user_id: token.id,
      order_items: finalItems,
      payment_method,
      subtotal,
      taxAmount,
      discount,
      shipping_price,
      total,
      isPaid: payment_method !== "cod",   // ✅ FIX
      paidAt: payment_method !== "cod" ? new Date() : null,
      shipping_address,
      coupon,
    });


    /* ---------------- CLEAR CART ---------------- */
    await Cart.deleteOne({ user_id: token.id });

    /* ---------------- UPDATE PRODUCT STATS ---------------- */
    for (const item of finalItems) {
      await Product.findByIdAndUpdate(item.id, {
        $inc: { purchase_count: item.quantity },
      });
    }

    /* ---------------- EMAIL ---------------- */
    try {
      const user = await User.findById(token.id, {
        fullname: 1,
        email: 1,
      });

      if (user?.email) {
        await fetch(`${process.env.NEXTAUTH_URL}/api/confirmation/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: user.fullname,
            email: user.email,
            order,
            shippingAddress: address,
          }),
        });
      }
    } catch (e) {
      console.warn("Email failed:", e.message);
    }

    /* ---------------- SHIPROCKET (COD ONLY) ---------------- */
    if (payment_method === "cod") {
      try {
        const srToken = await shiprocketLogin();

        const payload = buildShiprocketOrderPayload({
          order,
          address,
        });

        const srOrder = await createShiprocketOrder(payload, srToken);

        // ✅ ONLY SAVE ORDER + SHIPMENT ID
        await Order.findByIdAndUpdate(order._id, {
          shiprocket_order_id: srOrder.order_id,
          shiprocket_shipment_id: srOrder.shipment_id,

          // ❌ NO AWB / NO COURIER AUTO ASSIGN
          shiprocket_awb: "",
          shiprocket_courier: "",
        });

      } catch (err) {
        console.error("❌ Shiprocket error:", err.message);
      }
    }


    return res.status(201).json({ id: order._id });
  } catch (err) {
    console.error("❌ Order create error:", err);
    return res.status(500).json({ error: "Order failed" });
  }
};

export default Create;
