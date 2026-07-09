import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

export default function ReviewModal({
  onClose,
  existingReview,
  refresh,
}) {
  const { data: session } = useSession();

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingReview) {
      setReview(existingReview.review);
      setRating(existingReview.rating);
    }
  }, [existingReview]);

  // ---------------- SUBMIT / UPDATE ----------------
  const submit = async () => {
    if (!rating || !review || (!session && (!guestName || !guestEmail))) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    const method = existingReview ? "PUT" : "POST";
    const url = existingReview
      ? `/api/website-reviews/${existingReview._id}`
      : "/api/website-reviews";

    const body = session
      ? {
          fullname: session.user.name,
          rating,
          review,
        }
      : {
          fullname: guestName,
          email: guestEmail,
          rating,
          review,
        };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(session && {
            Authorization: `Bearer ${session.user.accessToken}`,
          }),
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error();

      toast.success(
        existingReview
          ? "Review updated successfully ⭐"
          : "Review submitted successfully ⭐"
      );

      refresh();
      onClose();
    } catch {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE ----------------
  const remove = async () => {
    if (!session) return;
    if (!confirm("Delete this review?")) return;

    try {
      const res = await fetch(
        `/api/website-reviews/${existingReview._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Review deleted 🗑️");
      refresh();
      onClose();
    } catch {
      toast.error("Failed to delete review ❌");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl p-8">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        {/* GOOGLE STYLE HEADER */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          {existingReview ? "Edit your review" : "Rate your experience"}
        </h2>

        <p className="text-center text-sm text-gray-500 mt-1">
          Your feedback helps others like Google Reviews
        </p>

        {/* ⭐ STAR RATING (REACT ICONS) */}
        <div className="flex justify-center gap-2 my-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-125"
            >
              <FaStar
                size={36}
                className={
                  (hover || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>

        {/* NAME / EMAIL */}
        {session ? (
          <div className="mb-4">
            <label className="text-xs text-gray-500">Name</label>
            <input
              disabled
              value={session.user.name}
              className="w-full mt-1 rounded-xl border bg-gray-100 px-4 py-3 text-sm"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-gray-500">Name</label>
              <input
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Your name"
                className="w-full mt-1 rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Email</label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full mt-1 rounded-xl border px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>
        )}

        {/* REVIEW */}
        <div className="mb-6">
          <label className="text-xs text-gray-500">Your review</label>
          <textarea
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share details of your experience"
            className="w-full mt-1 rounded-xl border px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-between">
          {existingReview && session && (
            <button
              onClick={remove}
              className="text-sm text-red-500 hover:underline"
            >
              Delete review
            </button>
          )}

          <button
            onClick={submit}
            disabled={
              loading ||
              !rating ||
              !review ||
              (!session && (!guestName || !guestEmail))
            }
            className="ml-auto rounded-xl bg-[#2d241b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#524232] disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : existingReview
              ? "Update Review"
              : "Post Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
