export default async function handler(req, res) {
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        "X-Goog-FieldMask":
          "places.id,places.displayName",
      },
      body: JSON.stringify({
        textQuery: "Arenq Dharamshala",
      }),
    }
  );

  const data = await response.json();

  res.status(200).json(data);
}