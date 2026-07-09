import main from "../../../lib/connectToDatabase";
import Cart from "../../../models/cartSchema";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await main();

    const { userId, guestCart } = req.body;

    if (!userId || !Array.isArray(guestCart)) {
      return res.status(400).json({ message: "Invalid data" });
    }

    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      cart = new Cart({
        user_id: userId,
        items: [],
        subtotal: 0,
        total: 0,
        shipping: 0,
      });
    }

    guestCart.forEach((item) => {
      const variant = item.variant || null;

      const weight = Number(variant?.weight) || 0;
      const SKU = variant?.SKU || "NA";

      const existing = cart.items.find(
        (i) =>
          i.id === item.id &&
          i.SKU === SKU
      );

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        cart.items.push({
          id: item.id,
          title: item.title,
          price: item.price,
          MRP: item.MRP,
          quantity: item.quantity,
          thumbnail: item.thumbnail,
          tax: item.tax || 0,

          // ✅ REQUIRED FIELDS (ROOT LEVEL)
          weight,
          SKU,

          // ✅ FULL VARIANT (EXTRA INFO)
          variant: variant
            ? {
                id: variant.id,
                value: variant.value,
                weight,
                price: variant.price,
                MRP: variant.MRP,
                SKU,
              }
            : null,
        });
      }
    });

    cart.subtotal = cart.items.reduce(
      (acc, i) => acc + i.price * i.quantity,
      0
    );

    cart.total = cart.subtotal + (cart.shipping || 0);

    await cart.save();

    return res.status(200).json({
      success: true,
      items: cart.items,
      subtotal: cart.subtotal,
      total: cart.total,
      shipping: cart.shipping,
    });
  } catch (err) {
    console.error("Cart merge error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
