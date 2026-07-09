export default async function handler(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_PLACE_ID;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,reviews`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
      }
    );

    const data = await response.json();
    // console.log("✅ Google Places (New) Response:", data);

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    const formattedReviews = (data.reviews || []).map((r) => ({
      author_name: r.authorAttribution?.displayName || "Anonymous",
      profile_photo: r.authorAttribution?.photoUri || "/images/user.png",
      rating: r.rating || 0,
      text: r.text?.text || "",
      relativeTime: r.relativePublishTimeDescription || "",
      publishTime: r.publishTime || "",
      mapLink: r.googleMapsUri || "",
    }));
    res.status(200).json({
      reviews: formattedReviews,
      rating: data.rating,
      userRatingCount: data.userRatingCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
