const calculateAverageRating = (reviews = []) => {
  // Default to empty array if reviews is undefined
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    const averageRating = totalRating / reviews.length;
    return parseFloat(averageRating.toFixed(1)); // e.g., 4.5
  }
  return 0; // Return 0 if no reviews
};

export default calculateAverageRating;
