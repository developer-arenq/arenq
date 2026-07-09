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
        stars.push(<FaStar size={20} key={i} className="text-yellow-400" />);
      } else if (avgRating >= i - 0.5) {
        stars.push(<FaStarHalfAlt size={20} key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} size={20} className="text-yellow-400" />);
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

  const productUrl = `${process.env.NEXTAUTH_URL || "https://www.arenq.co.in"
    }/products/${product_data.slug}?review=true`;

  return (
    <>
      <div className="bg-white rounded shadow-md p-1 mt-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-green-800 m-auto">
            Product Reviews
          </h1>

          <div className="z-10 text-right" ref={shareRef}>
            <div>
              <button
                type="button"
                className="inline-flex justify-center gap-x-1.5 rounded-full bg-white px-2 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset"
                onClick={() => setShowShareDropdown(!showShareDropdown)}
              >
                <FiShare2 size={18} />
              </button>
            </div>

            {showShareDropdown && (
              <div className="absolute right-5 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
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
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaWhatsapp className="mr-2" /> WhatsApp
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
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaFacebookF className="mr-2" /> Facebook
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
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaTwitter className="mr-2" /> Twitter
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(productUrl);
                      toast.success("Link copied to clipboard!");
                      setShowShareDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <MdContentCopy className="mr-2" /> Copy Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center border-r md:border-r-2 pr-4">
            <h2 className="text-md font-medium mb-1">Total Reviews</h2>
            <p className="text-3xl font-bold">
              {Array.isArray(reviews) ? reviews.length : 0}
            </p>
          </div>

          <div className="text-center border-r md:border-r-2 px-4">
            <h2 className="text-md font-medium mb-1">Average Rating</h2>
            <div className="flex justify-center items-center mt-2">
              <p className="text-2xl font-bold mr-2">{avgRating}</p>
              <div className="flex">{renderStars()}</div>
            </div>
          </div>

          <div className="text-center px-4">
            {hasUserReviewed ? (
              <button
                onClick={() => setReviewEditModalOpen(!reviewEditModalOpen)}
                className="py-2 px-4 font-sans border border-green-700 text-green-700 hover:bg-[#524232] hover:text-white transition uppercase font-semibold text-sm rounded-md"
              >
                Edit Review
              </button>
            ) : (
              <button
                onClick={() => {
                  session?.user
                    ? setReviewModalOpen(!reviewModalOpen)
                    : handlereview();
                }}
                className="py-2 px-4 font-sans border border-green-700 text-green-700 hover:bg-[#524232] hover:text-white transition uppercase font-semibold text-sm rounded-md"
              >
                Write Review
              </button>
            )}
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-6">
          {Array.isArray(reviews) &&
            reviews.map((rev) => (
              <div className="border-b pb-4" key={rev._id}>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-700 text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold">
                      {rev.author?.name?.[0]?.toUpperCase() ||
                        rev.user_name?.[0]?.toUpperCase() ||
                        "?"}
                    </div>
                    <div className="capitalize font-medium">
                      {rev.author?.name?.split("@")[0] ||
                        rev.user_name?.split("@")[0] ||
                        "Anonymous"}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600">
                    <Rating size="sm">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Rating.Star key={index} filled={rev.rating > index} />
                      ))}
                    </Rating>

                    <div
                      className={`flex items-center gap-1 cursor-pointer ${rev.like_by_users?.includes(session?.user?.id)
                        ? "text-green-700"
                        : ""
                        }`}
                      onClick={() => {
                        setThumbsDown(false);
                        setThumbsUp(true);
                        reviewLike(rev._id, true, rev.product_id);
                      }}
                    >
                      <FaRegThumbsUp />
                      <span className="text-sm">
                        {rev.number_of_likes || 0}
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-1 cursor-pointer ${rev.dislike_by_users?.includes(session?.user?.id)
                        ? "text-red-500"
                        : ""
                        }`}
                      onClick={() => {
                        setThumbsDown(true);
                        setThumbsUp(false);
                        reviewLike(rev._id, false, rev.product_id);
                      }}
                    >
                      <FaRegThumbsDown />
                      <span className="text-sm">
                        {rev.number_of_dislikes || 0}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 pl-4 sm:pl-12 pr-4 text-justify">
                  {rev.review || "No review text"}
                </p>

                <div className="text-right mt-2 pr-4">
                  <span className="text-xs text-gray-400">
                    {rev.createdAt
                      ? new Date(rev.createdAt).toLocaleString()
                      : new Date().toLocaleString()}
                  </span>
                </div>
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
              <h3 className="text-xl font-medium text-gray-900 font-sans">
                Write Review
              </h3>

              <div className="flex gap-x-6">
                <Image
                  src={mainImg}
                  width={100}
                  height={100}
                  alt="product_img"
                  objectFit="contain"
                  className="rounded-md"
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

                  <Rating size="lg">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div onMouseMove={() => handleStarRating(index)} key={index}>
                        <Rating.Star filled={starRating > index} />
                      </div>
                    ))}
                  </Rating>
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
                <Textarea name="review" required />
              </div>

              <button className="p-2 uppercase transition-all duration-300 hover:bg-[#524232] hover:text-white text-green-700 text-sm font-bold w-full mt-2 border border-green-700 rounded-md">
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
                  <h3 className="text-xl font-medium font-sans text-gray-900">
                    Edit Review
                  </h3>

                  <div className="flex gap-x-5">
                    <Image
                      src={mainImg}
                      width={100}
                      height={100}
                      alt="product_img"
                      objectFit="contain"
                      className="rounded-md"
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
                    <Textarea name="review" defaultValue={rev.review} required />
                  </div>

                  <button className="p-2 uppercase transition-all duration-300 hover:bg-[#524232] hover:text-white text-green-700 text-sm font-bold w-full mt-2 border border-green-700 rounded-md">
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
