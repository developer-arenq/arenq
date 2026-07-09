/* eslint-disable @next/next/no-img-element */
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { initialCart } from "../slices/cart";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/router";
import { addToGuestCart } from "../helper/guestCart";
import { ShoppingCart } from "lucide-react";
import { FaBell } from "react-icons/fa";

const ProductSkeleton = dynamic(() => import("./cardSkeleton"), { ssr: false });

const TeaSpecial = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userEmail, setUserEmail] = useState("");
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

  const getLabel = (p) => {
    const fields = [
      p.label,
      p.tag,
      p.badge,
      p.type,
      p.category_id?.label,
      p.brand_id?.label,
    ];
    return (
      fields.find(
        (v) => typeof v === "string" && v.trim() !== "" && v.toLowerCase() !== "none"
      ) || null
    );
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/products/name/Tea", { cache: "no-store" });
        const data = await res.json();
        if (active) setProducts(data.slice(0, 18));
      } catch {
        toast.error("Failed to load product data.");
      } finally {
        setLoading(false);
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

  const handleNotifyMe = async (product) => {
    setSelectedProduct(product);

    if (!session) {
      setShowNotifyModal(true);
      return;
    }

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            name: session.user.name,
            email: session.user.email,
          },
          product: {
            _id: product._id,
            title: product.name,
          },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("We'll notify you when the product is back in stock.");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const submitNotifyGuest = async () => {
    if (!userEmail)
      return toast.warning("Please enter your email.");

    if (!selectedProduct)
      return toast.error("No product selected.");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            name: "Guest",
            email: userEmail,
          },
          product: {
            _id: selectedProduct._id,
            title: selectedProduct.name,
          },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Notification request submitted.");
        setShowNotifyModal(false);
      } else {
        toast.error(data.message || "Failed.");
      }
    } catch {
      toast.error("Error occurred.");
    };
  };

  return (
    <>
     <div className="w-full overflow-hidden">
        <img
          src="/images/sl/tea-sec.png"
          alt="Tea Specials At Apneehatti"
          className="
          w-full
          h-auto
          object-cover
          block
        "
        />
      </div>
      <div className="relative mx-auto w-[100%] lg:w-[95%] max-w-[1400px] px-2 py-6">

        {/* Heading */}
        <div className="w-full flex items-center justify-between gap-2">

          <div className="flex-1 flex justify-start">
            <h2 style={{ fontFamily: 'var(--font-body)' }} className="text-[#2d241b] text-[18px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-bold  whitespace-nowrap leading-tight tracking-wide">
              Tea Specials
            </h2>
          </div>



          <div className="flex-1 flex justify-end">
            <Link
              href="/search?q=Tea"
              className="px-3 py-1 sm:px-4 sm:py-2 bg-[#2d241b] text-white rounded-lg shadow hover:bg-[#524232] transition text-xs sm:text-sm whitespace-nowrap"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => scrollBy("left")}
          aria-label="Scroll Left"
          className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-10 z-20 bg-white border border-gray-300 text-gray-700 rounded-full p-3 shadow-md hover:bg-gray-200 transition"
        >
          <MdKeyboardArrowLeft size={28} />
        </button>

        {/* Product List */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory py-4"
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.map((p, idx) => {
              const out = p.out_of_stock;
              const img = p.images?.[0] || p.main_image || "/placeholder.jpg";
              const label = getLabel(p);

              const sellingPrice = Number(p.price) || 0;
              const mrpPrice = Number(p.MRP) || sellingPrice;
              const hasDiscount = mrpPrice > sellingPrice;
              const discountPercent = hasDiscount
                ? Math.round(((mrpPrice - sellingPrice) / mrpPrice) * 100)
                : 0;

              return (
                <div
                  key={p._id + idx}
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

                      {hasDiscount && discountPercent > 0 && (
                        <div className="badge-sale">{discountPercent}% OFF</div>
                      )}



                      {/* Out of Stock */}
                      {out && (
                        <span className="absolute top-2 left-2 z-20 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      )}

                      {/* Product Image */}
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
                        <img
                          src={p?.images?.[0] || "/placeholder.jpg"}
                          alt={p?.name || "Product"}

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

                      <div
className="
p-3
sm:p-4
bg-white
flex
flex-col
gap-1
flex-1
"
>

                        {/* Label INSIDE */}
                        {label && (
                          <span
                            className={`w-fit px-2 py-[2px] rounded-full text-[9px] sm:text-xs font-semibold shadow-sm mb-1 bg-opacity-10 border ${getLabelColor(label.toLowerCase())} border-current text-gray-700`}
                          >
                            {formatLabelText(label)}
                          </span>
                        )}

                        <h3 className="
font-semibold
leading-snug
line-clamp-2
h-[42px]
min-h-[42px]
"
                          style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'hsl(20 25% 12%)' }}>
                          {p.name}
                        </h3>

                        {/* Price */}
                        <div
className="
flex
items-baseline
gap-2
h-[35px]
min-h-[35px]
"
>
                          <span className="font-bold" style={{ fontSize: 'var(--text-base)', color: 'hsl(12 55% 38%)' }}>₹{p.price}</span>
                          <span className="line-through text-xs" style={{ color: 'hsl(30 12% 60%)' }}>₹{p.MRP}</span>
                          {hasDiscount && discountPercent > 0 && (
                            <span className="text-xs font-semibold" style={{ color: 'hsl(145 35% 30%)' }}>Save ₹{p.MRP - p.price}</span>
                          )}
                        </div>


                      </div>
                      <div className="p-2 mt-auto">
                        {out ? (
                          <button

                            className="btn-primary bg-red-600 hover:bg-red-400 w-full justify-center py-2.5 gap-1.5"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleNotifyMe(p);
                            }}
                          >
                            <FaBell /> Notify Me
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              const defaultVariant =
                                p.variants && p.variants.length > 0 ? p.variants[0] : null;

                              handleAddToCart(p, defaultVariant);
                            }}
                            className="btn-primary w-full justify-center py-2.5 gap-1.5"
                          >
                            <ShoppingCart size={13} />
                            Add to Cart
                          </button>
                        )}



                      </div>

                    </div>
                  </Link>
                </div>
              );
            })}
        </div>

           {/* ── NOTIFY MODAL ── */}
      {showNotifyModal && (
        <div className="pd-modal-overlay">
          <div className="pd-modal">
            <h2 className="pd-modal-title">Notify Me 🔔</h2>
            <p className="pd-modal-sub">Enter your email to get notified when this product is back in stock.</p>
            <input className="pd-modal-input" type="email" placeholder="your@email.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            <div className="pd-modal-btns">
              <button className="pd-modal-cancel" onClick={() => setShowNotifyModal(false)}>Cancel</button>
              <button className="pd-modal-submit" onClick={submitNotifyGuest}>Submit</button>
            </div>
          </div>
        </div>
      )}

        {/* Right Arrow */}
        <button
          onClick={() => scrollBy("right")}
          aria-label="Scroll Right"
          className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-10 z-20 bg-white border border-gray-300 text-gray-700 rounded-full p-3 shadow-md hover:bg-gray-200 transition"
        >
          <MdKeyboardArrowRight size={28} />
        </button>

      </div>


    </>
  );
};

export default memo(TeaSpecial);
