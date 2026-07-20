import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialCart } from "../slices/cart";
import { addToWishlist, removeFromWishlist } from "../slices/wishlist";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  FaShoppingCart,
  FaRegHeart,
  FaHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { addToGuestCart } from "../helper/guestCart";

/* -------------------- ⭐ STAR UI -------------------- */
const renderCompactStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i)
      stars.push(<FaStar key={i} className="text-yellow-400 text-[9px] sm:text-sm" />);
    else if (rating >= i - 0.5)
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-[9px] sm:text-sm" />);
    else
      stars.push(<FaRegStar key={i} className="text-yellow-400 text-[9px] sm:text-sm" />);
  }
  return stars;
};

const formatLabelText = (label) => {
  if (label === "organic") return "Natural";
  if (label === "farm_fresh") return "Fresh Stock";
  return label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};


/* -------------------- 🎨 LABEL COLORS -------------------- */
const getLabelColor = (label) => {
  const colors = {
    trending_now: "bg-orange-500",        // energetic
    new_arrival: "bg-blue-600",           // fresh
    new_launch: "bg-indigo-600",          // premium launch
    hot_selling: "bg-red-600",            // hot
    selling_fast: "bg-rose-600",          // urgency
    limited_stock: "bg-amber-600",        // warning
    only_few_left: "bg-orange-700",       // scarcity
    best_seller: "bg-yellow-500 text-black", // standout
    big_savings: "bg-emerald-600",        // money/save
    flash_sale: "bg-fuchsia-600",         // flash
    clearance_sale: "bg-zinc-800",        // clearance
    festive_deals: "bg-pink-600",          // festive
    diwali_special: "bg-purple-700",      // diwali premium
    christmas_sale: "bg-green-800",       // christmas
    premium_quality: "bg-teal-700",       // premium
    organic: "bg-lime-700",               // natural/organic
    farm_fresh: "bg-indigo-800",          // GI Tag / farm fresh
  };

  return colors[label] || "bg-gray-600";
};



/* -------------------- 🧩 PRODUCT COMPONENT -------------------- */
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  /* ---------- NORMALIZED PRODUCT ---------- */
  const normalizedProduct = {
    _id: product?._id,
    title: product?.name || product?.title,
    image: product?.main_image || product?.image,
    price: product?.price,
    MRP: product?.MRP,
    alt_text: product?.alt_text || product?.title || "",
    slug: product?.slug,
    label: product?.label,
    out_of_stock: product?.out_of_stock,
    rating: product?.rating || 0,
    variants: Array.isArray(product?.variants) ? product.variants : [],
  };

  const defaultVariant = normalizedProduct.variants.length > 0 ? normalizedProduct.variants[0] : null;

  const {
    _id,
    image,
    title,
    price,
    MRP,
    alt_text,
    out_of_stock,
    slug,
    label,
    rating,
  } = normalizedProduct;

  const isInWishlist = wishlistItems.some((item) => item._id === _id);
  const discount = MRP > price ? Math.round(((MRP - price) / MRP) * 100) : 0;
  const validLabel = label && label !== "none";
  const [wishlistLoading, setWishlistLoading] = useState(false);

  /* -------------------- ❤️ WISHLIST -------------------- */
  const wishlistHandler = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    setWishlistLoading(true);
    try {
      const res = await fetch(`/api/users/product/addtowishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (isInWishlist) dispatch(removeFromWishlist(id));
      else dispatch(addToWishlist(product));

      toast.success(data.message || "Wishlist updated!");
    } catch {
      toast.error("Something went wrong");
    }
    setWishlistLoading(false);
  };

  /* -------------------- 🛒 ADD TO CART -------------------- */
  const addToCartHandler = async () => {
    /* ======================
       👤 GUEST USER
    ====================== */
    if (!session) {
      const updatedCart = addToGuestCart(
        product,        // ✅ ORIGINAL product
        defaultVariant, // ✅ variant
        1
      );

      dispatch(initialCart(updatedCart));
      toast.success("Added to Cart!");
      return;
    }

    /* ======================
       🔐 LOGGED IN USER
    ====================== */
    try {
      const res = await fetch(`/api/cart/${session.user.id}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product._id,
          quantity: 1,
          selectedVariant: defaultVariant,
        }),
      });

      if (!res.ok) throw new Error();

      const cartResponse = await res.json();

      dispatch(
        initialCart({
          savedcart: cartResponse.items,
          subtotal: cartResponse.subtotal,
          total: cartResponse.total,
          shipping: cartResponse.shipping,
        })
      );

      toast.success("Product Added to Cart!");
    } catch {
      toast.error("Failed to add in cart");
    }
  };

  /* -------------------- 🖼️ UI -------------------- */
  return (
    <div className="p-2 h-full">
      <Link href={`/products/${slug}`}>
        {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */
        }
        <div className="
 relative 
 bg-white 
 border 
 rounded-xl 
 shadow-sm 
 group 
 overflow-hidden 
 hover:shadow-lg 
 transition-all 
 duration-300 
 cursor-pointer
 flex 
 flex-col
 h-full
 min-h-[318px]
 sm:min-h-[430px]
">


{/* 
          {discount > 0 && (
            <div className="badge-sale">-{discount}%</div>
          )} */}

          {/* ⭐⭐⭐ LABEL + WISHLIST UI */}
          {/* <div className="absolute top-2 right-2 z-10 flex items-center gap-1">


            <button
              onClick={(e) => wishlistHandler(_id, e)}
              className="p-[6px] rounded-full shadow-md bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              {isInWishlist ? (
                <FaHeart size={15} className="text-red-500" />
              ) : (
                <FaRegHeart size={15} className="text-gray-700" />
              )}
            </button>
          </div> */}


          {/* OUT OF STOCK */}
          {out_of_stock && (
            <span className="absolute top-2 left-2 z-20 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </span>
          )}


          {/* IMAGE */}
          <div className="
 relative 
 w-full 
 h-[155px]
 sm:h-[220px] 
 md:h-[280px] 
 overflow-hidden
 flex-shrink-0
">            <img
              src={
                image?.startsWith("http")
                  ? image
                  : "/images/placeholder.jpg"
              }
              alt={alt_text || title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              // loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder.jpg";
              }}
            />
          </div>

          {/* INFO */}
          <div className="
 p-3 
 sm:p-4 
 bg-white 
 flex 
 flex-col 
 gap-1
 flex-1
">            {/* Label INSIDE */}
            {label && (
              <span
                className={`w-fit px-2 py-[2px] rounded-full text-[9px] sm:text-xs font-semibold shadow-sm mb-1 bg-opacity-10 border ${getLabelColor(label.toLowerCase())} border-current text-gray-700`}
              >
                {formatLabelText(label)}
              </span>
            )}


            <h3
              className="
 font-semibold
 leading-snug
 line-clamp-2
 h-[40px]
 sm:h-[48px]
 min-h-[40px]
 sm:min-h-[48px]
"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'hsl(20 25% 12%)'
              }}
            >
              {title}
            </h3>

            {/* Price */}
            {/* <div className="
 flex 
 items-baseline 
 gap-2
 h-[35px]
 min-h-[35px]
">              <span className="font-bold" style={{ fontSize: 'var(--text-base)', color: 'hsl(12 55% 38%)' }}>₹{price}</span>
              <span className="line-through text-xs" style={{ color: 'hsl(30 12% 60%)' }}>₹{MRP}</span>
              {discount > 0 && (
                <span className="text-xs font-semibold" style={{ color: 'hsl(145 35% 30%)' }}>Save ₹{MRP - price}</span>
              )}
            </div> */}

            {/* Rating */}
            {/* <div className="flex items-center mt-1">
              {renderCompactStars(rating)}
              <span className="text-[9px] sm:text-sm text-gray-500 ml-1 font-semibold">
                ({rating || 0})
              </span>
            </div> */}
          </div>

          <button
            disabled={out_of_stock}
            onClick={(e) => {
              e.preventDefault();
              if (!out_of_stock) addToCartHandler();
            }}
            className={`
 mt-auto
 w-full
 h-[48px]
 font-bold
 rounded-b-xl
 flex
 items-center
 justify-center
 gap-2
    ${out_of_stock
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#2d241b] hover:bg-[#524232] text-white"
              }`}
          >

            {out_of_stock ? "Out of Stock" : "Add to Cart"}
          </button>

        </div>
      </Link>
    </div>
  );
};

export default Product;
