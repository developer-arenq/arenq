export default async function handler(req, res) {
  if (req.query.secret !== "Arenq123") {
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    await res.revalidate(`/products/${req.query.slug}`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}