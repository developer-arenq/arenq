/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { initialCart } from "../slices/cart";
import ProductSkeleton from "./cardSkeleton";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/router";
import { addToGuestCart } from "../helper/guestCart";


const PineProducts = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

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

  const formatLabelText = (label) => {
    if (label === "organic") return "Natural";
    if (label === "farm_fresh") return "Fresh Stock";
    return label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const getProductLabel = (p) => {
    const candidates = [
      p.label,
      p.tag,
      p.type,
      p.badge,
      p.highlight,
      p.category_id?.label,
      p.brand_id?.label,
    ];
    return (
      candidates.find(
        (v) =>
          typeof v === "string" &&
          v.trim() !== "" &&
          v.toLowerCase() !== "none"
      ) || null
    );
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/products/featured/pine_products");
        const data = await res.json();
        if (active) setProducts(data.slice(-12).reverse());
      } catch {
        toast.error("Failed to load products.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => (active = false);
  }, []);

  const handleAddToCart = async (product, variant) => {
    const finalVariant = variant || product.variants?.[0] || null;

    /* ======================
       👤 GUEST USER
    ====================== */
    if (!session) {
      const updatedCart = addToGuestCart(product, finalVariant, 1);
      dispatch(initialCart(updatedCart));
      toast.success("Added to cart");
      return;
    }

    /* ======================
       🔐 LOGGED-IN USER
    ====================== */
    const res = await fetch(`/api/cart/${session.user.id}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: product._id,
        selectedVariant: finalVariant,
        quantity: 1,
        tax: product.tax,
      }),
    });

    const response = await res.json();

    dispatch(
      initialCart({
        savedcart: response.items,
        subtotal: response.subtotal,
        total: response.total,
        shipping: response.shipping,
      })
    );
  };


  const scrollBy = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amt = el.offsetWidth * 0.9;
    el.scrollBy({ left: dir === "left" ? -amt : amt, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative mx-auto w-[100%] lg:w-[95%] max-w-[1400px] px-2 py-6">

        {/* Heading */}
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex-1 flex justify-start">
            <h2 className="text-[18px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-bold text-green-800 whitespace-nowrap leading-tight tracking-wide">
              Pine Collection
            </h2>
          </div>



          <div className="flex-1 flex justify-end">
            <Link
              href="/search?q=Pine"
              className="px-3 py-1 sm:px-4 sm:py-2 bg-[#2d241b] text-white rounded-lg shadow hover:bg-[#524232] transition text-xs sm:text-sm whitespace-nowrap"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => scrollBy("left")}
          className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-10 z-20 bg-white border border-gray-300 text-gray-700 rounded-full p-3 shadow-md hover:bg-gray-200 transition"
        >
          <MdKeyboardArrowLeft size={28} />
        </button>

        {/* Products */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory py-4"
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.map((p, i) => {
              const sellingPrice = Number(p.price) || 0;
              const mrpPrice = Number(p.MRP) || 0;

              const hasDiscount = mrpPrice > sellingPrice;
              const discountPercent = hasDiscount
                ? Math.round(((mrpPrice - sellingPrice) / mrpPrice) * 100)
                : 0;

              const out = p?.out_of_stock;
              const label = getProductLabel(p);

              return (
                <div
                  key={p._id}
                  className="
cursor-pointer
relative
w-[48%]
sm:w-[260px]
lg:w-[285px]
flex-shrink-0
border
border-green-400
hover:border-green-700
bg-white
rounded-xl
overflow-hidden
group
snap-start
shadow-sm
hover:shadow-lg
transition-all
duration-300
flex
flex-col
h-full
min-h-[380px]
sm:min-h-[500px]
"
                >
               <Link href={`/products/${p.slug}`}>
                    <div className="relative overflow-hidden flex flex-col h-full">

                      {/* Discount Leaf */}
                      {hasDiscount && discountPercent > 0 && (
                        <div className="absolute top-3 left-0 z-20">
                          <div className="bg-gradient-to-r from-lime-600 to-emerald-500 text-white text-[10px] sm:text-xs font-semibold px-2 py-[4px] pr-4 shadow-lg rounded-r-full backdrop-blur-md border border-white/20">
                            {discountPercent}% OFF
                          </div>
                        </div>
                      )}



                      {/* Out of Stock Badge */}
                      {out && (
                        <span className="absolute top-2 left-2 z-20 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      )}

                      {/* Image */}
                      <div
className="
relative
w-full
h-[155px]
sm:h-[220px]
md:h-[280px]
overflow-hidden
flex-shrink-0
"
>
                        <Image
                          src={p?.images?.[0] || "/placeholder.jpg"}
                          alt={p?.name || "Product"}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="
w-full
h-full
object-cover
transition-transform
duration-300
group-hover:scale-105
"
                        />
                      </div>

                      {/* Name + Prices */}
                      <div className="p-3 sm:p-4 bg-white mb-3 flex flex-col gap-1">

                        {/* Label INSIDE */}
                        {label && (
                          <span
                            className={`w-fit px-2 py-[2px] rounded-full text-[9px] sm:text-xs font-semibold shadow-sm mb-1 bg-opacity-10 border ${getLabelColor(label.toLowerCase())} border-current text-gray-700`}
                          >
                            {formatLabelText(label)}
                          </span>
                        )}

                        {/* Product Name */}
                        <h3 className="text-[11px] sm:text-[13px] md:text-[15px] font-semibold text-gray-800 leading-snug line-clamp-2">
                          {p.name}
                        </h3>

                        {/* Price Section */}
                        <div className="flex items-end gap-2 mt-1">
                          <span className="text-base sm:text-lg font-bold text-green-700">
                            ₹{sellingPrice}
                          </span>

                          {hasDiscount && (
                            <span className="text-[11px] text-gray-400 line-through">
                              ₹{mrpPrice}
                            </span>
                          )}
                        </div>


                      </div>
                      {/* Buy Now */}
                      <div
                        className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-200 z-10"
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            const defaultVariant =
                              p.variants && p.variants.length > 0 ? p.variants[0] : null;

                            handleAddToCart(p, defaultVariant);
                          }}
                          disabled={out}
                          className={`w-full py-1.5 sm:py-2 text-xs sm:text-sm font-semibold ${out
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-[#2d241b] text-white hover:bg-[#524232]"
                            }`}
                        >
                          Add to Cart
                        </button>

                      </div>

                    </div>
                  </Link>
                </div>
              );
            })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollBy("right")}
          className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-10 z-20 bg-white border border-gray-300 text-gray-700 rounded-full p-3 shadow-md hover:bg-gray-200 transition"
        >
          <MdKeyboardArrowRight size={28} />
        </button>
      </div>

    </>
  );
};

export default PineProducts;
