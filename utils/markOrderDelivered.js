export async function markOrderDelivered(order) {
  const allDelivered = order.order_items.every(
    (item) => item.delivery_status === "delivered"
  );

  if (!allDelivered) return;

  order.isDelevered = true;
  order.DeleveredAt = new Date();

  // 🚀 Set review eligibility to 5 days after delivery
  order.reviewEligibleAt = new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000
  );

  await order.save();
}
