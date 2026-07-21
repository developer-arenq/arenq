/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Label, Modal, Rating, TextInput, Textarea } from "flowbite-react";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaTwitter,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";
import calculateAverageRating from "../helper/calculateAverageRating";
import Image from "next/image";
import Login from "./login";
import { MdContentCopy } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
import { toast } from "react-toastify";

const BRAND_BLUE = "#0A528F";
const BRAND_AMBER = "#FFB600";

const ProductReview = ({
  reviews,
  starRating,
  session,
  reviewModalOpen,
  setReviewModalOpen,
  reviewEditModalOpen,
  setReviewEditModalOpen,
  setThumbsDown,
  setThumbsUp,
  reviewLike,
  handleStarRating,
  createReview,
  editReview,
  mainImg,
  product_data,
}) => {
  const router = useRouter();
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const shareRef = useRef();

  // ✅ Helper to remove ?review=true or ?openReview=true from URL
  const clearReviewQuery = () => {
    if (router.query.review || router.query.openReview) {
      const newQuery = { ...router.query };
      delete newQuery.review;
      delete newQuery.openReview;
      router.replace({ pathname: router.pathname, query: newQuery }, undefined, {
        shallow: true,
      });
    }
  };

  const hasUserReviewed = useMemo(() => {
    return (
      Array.isArray(reviews) &&
      reviews.some((rev) => rev.author?.user_id === session?.user?.id)
    );
  }, [reviews, session]);

  const handleLogin = () => {
    setIsLoginPage(!isLoginPage);
  };

  const handlereview = () => {
    handleLogin();
  };

  const avgRating = calculateAverageRating(reviews);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (avgRating >= i) {
        stars.push(<FaStar size={20} key={i} style={{ color: BRAND_AMBER }} />);
      } else if (avgRating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt size={20} key={i} style={{ color: BRAND_AMBER }} />
        );
      } else {
        stars.push(<FaRegStar key={i} size={20} style={{ color: BRAND_AMBER }} />);
      }
    }
    return stars;
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 🚀 Automatically open review modal when ?review=true OR ?openReview=true
  useEffect(() => {
    const query = router.query;
    const shouldOpen = query.openReview === "true" || query.review === "true";

    if (shouldOpen) {
      if (session?.user && !hasUserReviewed) {
        setReviewModalOpen(true);
      } else if (!session?.user) {
        setIsLoginPage(true);
      }
    }
  }, [router.query, session, hasUserReviewed]);

  const productUrl = `${
    process.env.NEXTAUTH_URL || "https://www.arenq.co.in"
  }/products/${product_data.slug}?review=true`;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8 mt-2">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold m-auto"
            style={{ color: BRAND_BLUE }}
          >
            Product Reviews
          </h1>

          <div className="relative text-right" ref={shareRef}>
            <div>
              <button
                type="button"
                aria-label="Share this product"
                className="inline-flex justify-center items-center gap-x-1.5 rounded-full bg-white w-9 h-9 text-sm shadow-sm border border-gray-200 transition-colors hover:border-[#0A528F] hover:text-[#0A528F]"
                onClick={() => setShowShareDropdown(!showShareDropdown)}
              >
                <FiShare2 size={16} />
              </button>
            </div>

            {showShareDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden">
                <div className="py-1">
                  <button
                    onClick={() => {
                      const reviewLink = `${productUrl}`;

                      const shareMessage = `We’d Love Your Feedback – Share Your Experience!

Your opinion helps us improve and serve you better. Please take a moment to share your experience by reviewing.

${reviewLink}

Thank you for being a valued customer! 🌟`;

                      window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`);
                      setShowShareDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaWhatsapp className="mr-2.5 text-green-600" size={15} /> WhatsApp
                  </button>

                  <button
                    onClick={() => {
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          productUrl
                        )}`
                      );
                      setShowShareDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaFacebookF className="mr-2.5 text-[#0A528F]" size={15} /> Facebook
                  </button>

                  <button
                    onClick={() => {
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          productUrl
                        )}&text=${encodeURIComponent(
                          product_data?.title || "Check this product!"
                        )}`
                      );
                      setShowShareDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaTwitter className="mr-2.5 text-[#0A528F]" size={15} /> Twitter
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(productUrl);
                      toast.success("Link copied to clipboard!");
                      setShowShareDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <MdContentCopy className="mr-2.5 text-gray-500" size={15} /> Copy link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="text-center rounded-xl bg-gray-50 py-4 px-4 sm:bg-transparent sm:py-0 sm:px-4 sm:border-r sm:border-gray-200">
            <h2 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
              Total reviews
            </h2>
            <p className="text-2xl sm:text-3xl font-bold" style={{ color: BRAND_BLUE }}>
              {Array.isArray(reviews) ? reviews.length : 0}
            </p>
          </div>

          <div className="text-center rounded-xl bg-gray-50 py-4 px-4 sm:bg-transparent sm:py-0 sm:px-4 sm:border-r sm:border-gray-200">
            <h2 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
              Average rating
            </h2>
            <div className="flex justify-center items-center mt-1 gap-2">
              <p className="text-xl sm:text-2xl font-bold" style={{ color: BRAND_BLUE }}>
                {avgRating}
              </p>
              <div className="flex">{renderStars()}</div>
            </div>
          </div>

          <div className="flex items-center justify-center px-4">
            {hasUserReviewed ? (
              <button
                onClick={() => setReviewEditModalOpen(!reviewEditModalOpen)}
                className="py-2.5 px-5 font-sans transition-colors uppercase font-semibold text-xs sm:text-sm rounded-full text-white w-full sm:w-auto"
                style={{ backgroundColor: BRAND_BLUE }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#083f6d")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND_BLUE)}
              >
                Edit review
              </button>
            ) : (
              <button
                onClick={() => {
                  session?.user
                    ? setReviewModalOpen(!reviewModalOpen)
                    : handlereview();
                }}
                className="py-2.5 px-5 font-sans transition-colors uppercase font-semibold text-xs sm:text-sm rounded-full text-white w-full sm:w-auto"
                style={{ backgroundColor: BRAND_BLUE }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#083f6d")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND_BLUE)}
              >
                Write a review
              </button>
            )}
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-5">
          {Array.isArray(reviews) &&
            reviews.map((rev) => (
              <div
                className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 sm:p-5"
                key={rev._id}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="text-white w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full font-semibold"
                      style={{ backgroundColor: BRAND_BLUE }}
                    >
                      {rev.author?.name?.[0]?.toUpperCase() ||
                        rev.user_name?.[0]?.toUpperCase() ||
                        "?"}
                    </div>
                    <div>
                      <div className="capitalize font-medium text-gray-900 leading-tight">
                        {rev.author?.name?.split("@")[0] ||
                          rev.user_name?.split("@")[0] ||
                          "Anonymous"}
                      </div>
                      <span className="text-xs text-gray-400">
                        {rev.createdAt
                          ? new Date(rev.createdAt).toLocaleDateString()
                          : new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-500 pl-[52px] sm:pl-0">
                    <Rating size="sm">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Rating.Star key={index} filled={rev.rating > index} />
                      ))}
                    </Rating>

                    <div
                      className="flex items-center gap-1 cursor-pointer transition-colors"
                      style={{
                        color: rev.like_by_users?.includes(session?.user?.id)
                          ? BRAND_BLUE
                          : undefined,
                      }}
                      onClick={() => {
                        setThumbsDown(false);
                        setThumbsUp(true);
                        reviewLike(rev._id, true, rev.product_id);
                      }}
                    >
                      <FaRegThumbsUp size={14} />
                      <span className="text-sm">
                        {rev.number_of_likes || 0}
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-1 cursor-pointer transition-colors ${
                        rev.dislike_by_users?.includes(session?.user?.id)
                          ? "text-red-500"
                          : ""
                      }`}
                      onClick={() => {
                        setThumbsDown(true);
                        setThumbsUp(false);
                        reviewLike(rev._id, false, rev.product_id);
                      }}
                    >
                      <FaRegThumbsDown size={14} />
                      <span className="text-sm">
                        {rev.number_of_dislikes || 0}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed pl-[52px] pr-2">
                  {rev.review || "No review text"}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Add Review Modal */}
      <Modal
        className="h-screen"
        show={reviewModalOpen}
        size="2xl"
        popup={true}
        onClose={() => {
          setReviewModalOpen(!reviewModalOpen);
          clearReviewQuery(); // ✅ Remove query when closed
        }}
        id="add-review"
      >
        <Modal.Header />
        <Modal.Body>
          <form
            onSubmit={(e) => {
              createReview(e);
              clearReviewQuery(); // ✅ Remove query when submitted
            }}
          >
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3
                className="text-xl font-semibold font-sans"
                style={{ color: BRAND_BLUE }}
              >
                Write a review
              </h3>

              <div className="flex gap-x-6">
                <Image
                  src={mainImg}
                  width={100}
                  height={100}
                  alt="product_img"
                  objectFit="contain"
                  className="rounded-lg border border-gray-100"
                />

                <div>
                  <Label htmlFor="rating" value="Rate this product" />
                  <input
                    type="hidden"
                    name="user_id"
                    defaultValue={session?.user?.id}
                  />
                  <input
                    type="hidden"
                    name="product_id"
                    defaultValue={product_data._id}
                  />

                  <div className="mt-2">
                    <Rating size="lg">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <div onMouseMove={() => handleStarRating(index)} key={index}>
                          <Rating.Star filled={starRating > index} />
                        </div>
                      ))}
                    </Rating>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <Label htmlFor="name" value="Name" />
                  <TextInput
                    id="name"
                    name="name"
                    defaultValue={session?.user?.name}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" value="Your email" />
                  <TextInput
                    id="email"
                    defaultValue={session?.user?.email}
                    disabled
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="review" value="Review" />
                <span className="mx-2 text-xs text-gray-400">
                  ( Max 100 words )
                </span>
                <Textarea name="review" required rows={4} />
              </div>

              <button
                type="submit"
                className="p-2.5 uppercase transition-colors text-white text-sm font-bold w-full mt-2 rounded-full"
                style={{ backgroundColor: BRAND_BLUE }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#083f6d")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND_BLUE)}
              >
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Review Edit Modal */}
      <Modal
        className="h-screen"
        show={reviewEditModalOpen}
        size="2xl"
        popup={true}
        onClose={() => {
          setReviewEditModalOpen(!reviewEditModalOpen);
          clearReviewQuery();
        }}
      >
        <Modal.Header />
        <Modal.Body>
          {reviews
            ?.filter((rev) => rev.author?.user_id === session?.user?.id)
            .map((rev) => (
              <form
                onSubmit={(e) => {
                  editReview(e);
                  clearReviewQuery();
                }}
                key={rev._id}
              >
                <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                  <h3
                    className="text-xl font-semibold font-sans"
                    style={{ color: BRAND_BLUE }}
                  >
                    Edit review
                  </h3>

                  <div className="flex gap-x-5">
                    <Image
                      src={mainImg}
                      width={100}
                      height={100}
                      alt="product_img"
                      objectFit="contain"
                      className="rounded-lg border border-gray-100"
                    />
                    <div>
                      <Label htmlFor="rating" value="Rate this product" />
                      <input
                        type="hidden"
                        name="user_id"
                        defaultValue={session?.user?.id}
                      />
                      <input
                        type="hidden"
                        name="product_id"
                        defaultValue={product_data._id}
                      />
                      <input type="hidden" name="id" defaultValue={rev._id} />

                      <div className="mt-2">
                        <Rating size="lg">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <div
                              onMouseMove={() => handleStarRating(index)}
                              key={index}
                            >
                              <Rating.Star
                                filled={(starRating || rev.rating) > index}
                              />
                            </div>
                          ))}
                        </Rating>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4">
                    <div>
                      <Label htmlFor="name" value="Name" />
                      <TextInput
                        id="name"
                        defaultValue={rev.author?.name}
                        disabled
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" value="Your email" />
                      <TextInput
                        id="email"
                        defaultValue={rev.author?.email || "Not provided"}
                        disabled
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="review" value="Review" />
                    <span className="mx-2 text-xs text-gray-400">
                      ( Max 100 words )
                    </span>
                    <Textarea name="review" defaultValue={rev.review} required rows={4} />
                  </div>

                  <button
                    type="submit"
                    className="p-2.5 uppercase transition-colors text-white text-sm font-bold w-full mt-2 rounded-full"
                    style={{ backgroundColor: BRAND_BLUE }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#083f6d")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND_BLUE)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            ))}
        </Modal.Body>
      </Modal>

      {isLoginPage && !session && <Login onClose={handleLogin} />}
    </>
  );
};

export default ProductReview;