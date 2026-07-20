/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import dbConnect from "../../database/conn";
import Product from "../../models/productSchema";
import { Breadcrumb } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormatter from "../../helper/currencyFormatter";
import { initialCart } from "../../slices/cart";
import { HiHome } from "react-icons/hi2";
import { MdContentCopy, MdRestore } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { FaBell, FaShoppingCart, FaPlus, FaMinus, FaChevronRight, FaChevronLeft, FaShoppingBag, FaWhatsapp, FaFacebookF, FaTwitter, FaUsers } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import ProductSEOHead from "../../components/ProductSEOHead";
import { addToGuestCart } from "../../helper/guestCart";
import Review from "../../models/reviewSchema";

const Faq = dynamic(() => import("../../components/Faq"), { ssr: true });
const Login = dynamic(() => import("../../components/login"), { ssr: true });
const ProductReview = dynamic(() => import("../../components/productReview"), { ssr: false, loading: () => <div className="pd-loading">Loading reviews...</div> });
const RelatedProduct = dynamic(() => import("../../components/relatedProduct"), { ssr: true });
const TextEditorView = dynamic(() => import("../../components/textEditorView"), { ssr: true });

/* ─────────────────────────────────────────── */
/*  DATA FETCHING                              */
/* ─────────────────────────────────────────── */
export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  try {
    await dbConnect();

    let product = await Product.findOne({ slug: params.slug })
      .populate("brand_id", "name slug")
      .populate("category_id", "_id name slug")
      .lean();

    if (!product) {
      const oldProduct = await Product.findOne({ oldSlugs: params.slug }).lean();
      if (oldProduct) {
        return { redirect: { destination: `/products/${oldProduct.slug}`, permanent: true } };
      }
      return { notFound: true };
    }

    let recommendations = [];
    if (product.subcat) {
      recommendations = await Product.find({ subcat: product.subcat, _id: { $ne: product._id } }).limit(8).lean();
    }

    const pro_review = await Review.find({ product_id: product._id }).sort({ createdAt: -1 }).lean();

    return {
      props: {
        product_data: JSON.parse(JSON.stringify(product)),
        recommendations: JSON.parse(JSON.stringify(recommendations)),
        pro_review: JSON.parse(JSON.stringify(pro_review)),
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("getStaticProps error:", err);
    return { notFound: true };
  }
}

/* ─────────────────────────────────────────── */
/*  HELPERS                                    */
/* ─────────────────────────────────────────── */

// Pulls the numeric Ah value out of strings like "30Ah" so the
// battery-cell picker can render a real, proportional charge-fill.
const parseCapacity = (capacityStr) => {
  if (!capacityStr) return 0;
  const match = String(capacityStr).match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

/* ─────────────────────────────────────────── */
/*  COMPONENT                                  */
/* ─────────────────────────────────────────── */
const ProductDetail = ({ product_data, pro_review, recommendations }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const { cartItems } = useSelector((state) => state.cart);

  const [reviews, setReviews] = useState(pro_review || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [localQty, setLocalQty] = useState(1);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewEditModalOpen, setReviewEditModalOpen] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const shareRef = useRef();
  const videoRef = useRef(null);

  const variants = product_data.variants || [];
  const selectedVariant = variants[selectedVariantIndex] || variants[0];

  // Highest Ah across all variants — the denominator for each cell's charge-fill.
  const maxCapacity = Math.max(1, ...variants.map((v) => parseCapacity(v.capacity)));

  const mainImgg = product_data?.images?.[currentIndex]
    ? product_data.images[currentIndex].replace(/\s+/g, "-")
    : "/images/placeholder.jpg";

  const productUrl = `${process.env.NEXTAUTH_URL || "https://www.arenq.co.in"}/products/${product_data.slug}`;

  const calculateDiscount = (mrp, price) => {
    if (!mrp || !price || mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
  };
  const discount = calculateDiscount(selectedVariant?.MRP, selectedVariant?.price);

  /* effects */
  useEffect(() => {
    const t = setTimeout(() => setShowVideoModal(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setLocalQty(
      cartItems.find(
        (i) => i.id === product_data._id && i.variant?.sku === selectedVariant?.sku
      )?.quantity || 1
    );
  }, [cartItems, selectedVariant, product_data._id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/review/get?product_id=${product_data._id}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) { console.error(err); }
    };
    fetchReviews();
  }, [product_data._id]);

  useEffect(() => {
    const handler = (e) => { if (shareRef.current && !shareRef.current.contains(e.target)) setShowShareDropdown(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (typeof window.fbq !== "undefined" && product_data) {
      fbq("track", "ViewContent", { content_name: product_data?.name, content_category: product_data?.category_id?.name || "Product", content_ids: [product_data?._id], content_type: "product", value: product_data?.price || 0, currency: "INR" });
    }
  }, [product_data]);

  /* handlers */
  const clearReviewQuery = () => {
    if (router.query.review || router.query.openReview) {
      const q = { ...router.query };
      delete q.review; delete q.openReview;
      router.replace({ pathname: router.pathname, query: q }, undefined, { shallow: true });
    }
  };

  const handleAddToCart = async (id, variant, out_of_stock) => {
    if (out_of_stock) { toast.warning("This product is currently out of stock."); return; }
    const finalVariant = variant || selectedVariant || variants[0] || null;
    if (!session?.user?.id) {
      dispatch(initialCart(addToGuestCart(product_data, finalVariant, 1)));
      toast.success("Added to cart"); return;
    }
    try {
      const res = await fetch(`/api/cart/${session.user.id}/add`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ product_id: id, selectedVariant: finalVariant, quantity: 1, tax: product_data.tax }) });
      if (!res.ok) { toast.error("Failed to add to cart."); return; }
      const response = await res.json();
      dispatch(initialCart({ savedcart: response.items, shipping: response.shipping, subtotal: response.subtotal, total: response.total }));
      toast.success("Added to cart");
      // tracking
      const price = selectedVariant?.price || product_data?.price || 0;
      if (typeof window !== "undefined") {
        if (window.fbq) window.fbq("track", "AddToCart", { value: price, currency: "INR", content_ids: [product_data._id], content_type: "product" });
        if (window.gtag) window.gtag("event", "add_to_cart", { value: price, currency: "INR", items: [{ id: product_data._id, name: product_data.name, quantity: 1, price }] });
      }
    } catch (err) { console.error(err); toast.error("Something went wrong"); }
  };

  const minus = async (id, variant) => {
    if (!variant) { toast.warning("Please select a variant first."); return; }
    if (!session) { setShowLoginPrompt(true); return; }
    const data = await fetch(`/api/cart/${session.user.id}/minus`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ product_id: id, selectedVariant: variant, quantity: 1, tax: product_data.tax }) });
    if (data.ok) {
      const response = await data.json();
      dispatch(initialCart({ savedcart: response.items, shipping: response.shipping, subtotal: response.subtotal, total: response.total }));
      toast.success("Removed successfully");
    }
  };

  const handleBuyNow = async (id) => {
    if (!session) { setShowLoginPrompt(true); return; }
    try {
      const res = await fetch(`/api/cart/${session.user.id}/add`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ product_id: id, selectedVariant, quantity: 1, tax: product_data.tax }) });
      if (!res.ok) { toast.error("Failed to add item to cart"); return; }
      const response = await res.json();
      dispatch(initialCart({ savedcart: response.items, shipping: response.shipping, subtotal: response.subtotal, total: response.total }));
      router.push("/checkout");
    } catch (error) { console.error(error); toast.error("Something went wrong."); }
  };

  const handleNotifyMe = async (pd) => {
    if (!session) { setShowNotifyModal(true); return; }
    try {
      const res = await fetch("/api/notify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user: { name: session.user.name, email: session.user.email }, product: { _id: pd._id, title: pd.name } }) });
      const data = await res.json();
      if (res.ok) toast.success("Admin has been notified."); else toast.error(data.message || "Failed to notify admin.");
    } catch (err) { toast.error("Error notifying admin."); }
  };

  const submitNotifyGuest = async () => {
    if (!userEmail) return toast.warning("Please enter your email.");
    try {
      const res = await fetch("/api/notify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user: { name: "Guest", email: userEmail }, product: { _id: product_data._id, title: product_data.name } }) });
      const data = await res.json();
      if (res.ok) { toast.success("Notification request submitted."); setShowNotifyModal(false); } else toast.error(data.message || "Failed.");
    } catch (err) { toast.error("Error occurred."); }
  };

  const createReview = async (e) => {
    e.preventDefault();
    if (!product_data?._id) { toast.error("Product not found"); return; }
    const fd = new FormData(e.target);
    fd.append("rating", starRating); fd.append("product_id", product_data._id);
    try {
      const response = await fetch("/api/review/create", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user?.accessToken}` }, body: JSON.stringify(Object.fromEntries(fd.entries())) });
      const text = await response.text();
      const res = text ? JSON.parse(text) : null;
      if (!response.ok) { toast.error(res?.message || "Something went wrong."); return; }
      toast.success("Review submitted successfully!");
      const nr = await fetch(`/api/review/get?product_id=${product_data._id}`);
      setReviews((await nr.json())?.reviews || []);
      setReviewModalOpen(false); clearReviewQuery();
    } catch (err) { toast.error("Network error."); }
  };

  const editReview = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target); fd.append("rating", starRating);
    try {
      const response = await fetch("/api/review/edit", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user?.accessToken}` }, body: JSON.stringify(Object.fromEntries(fd)) });
      const text = await response.text();
      let res; try { res = JSON.parse(text); } catch { toast.error("Server returned invalid response."); return; }
      if (!response.ok) { toast.error(res.message || "Something went wrong."); return; }
      toast.success(res.message || "Review updated!");
      setReviews(Array.isArray(res) ? res : res.reviews || []);
      setReviewEditModalOpen(false); clearReviewQuery();
    } catch (error) { toast.error("Network error."); }
  };

  const reviewLike = async (id, like, product_id) => {
    const data = await fetch("/api/review/like", { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.user?.accessToken}` }, body: JSON.stringify({ id, like, product_id }) });
    setReviews(await data.json());
  };

  const openNewWindow = () => {
    const w = 600, h = 500, l = (window.innerWidth - w) / 2, t = (window.innerHeight - h) / 2;
    window.open("/policies/privacy-policy", "Policy", `width=${w},height=${h},left=${l},top=${t}`);
  };

  /* star rating component */
  const StarRating = ({ rating }) => {
    const r = Math.round(rating * 2) / 2;
    return (
      <div className="pd-stars">
        {Array.from({ length: 5 }, (_, i) =>
          r >= i + 1 ? <FaStar key={i} /> : r >= i + 0.5 ? <FaStarHalfAlt key={i} /> : <FaRegStar key={i} />
        )}
      </div>
    );
  };

  return (
    <div className="pd-root">
      <ProductSEOHead product={product_data} />

      {/* ── BREADCRUMB ── */}
      <div className="pd-breadcrumb hidden md:block">
        <Breadcrumb aria-label="breadcrumb">
          <Breadcrumb.Item icon={HiHome} href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href={`/collections/${product_data.category_id?.slug}`}>
            {product_data.category_id?.name || "Products"}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="capitalize truncate">{product_data.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* ── MAIN SECTION ── */}
      <section className="pd-section pd-root">
        <div className="pd-container">
          <div className="pd-grid">

            {/* ── LEFT: IMAGES ── */}
            <div className="pd-img-col">
              {/* Mobile title */}

              

              {/* Main image */}
              <div className="pd-main-img-wrap">
                {mainImgg
                  ? <img src={mainImgg} alt={product_data.alt_text || product_data.name} className="pd-main-img" />
                  : <div className="pd-img-placeholder">No Image</div>}
                {/* <button className="pd-nav-btn pd-nav-prev" onClick={() => setCurrentIndex(p => p === 0 ? product_data.images.length - 1 : p - 1)}><FaChevronLeft /></button>
                <button className="pd-nav-btn pd-nav-next" onClick={() => setCurrentIndex(p => p === product_data.images.length - 1 ? 0 : p + 1)}><FaChevronRight /></button> */}
              </div>

              {/* Thumbnails */}
              <div className="pd-thumbs">
                {product_data.images?.map((item, idx) => item ? (
                  <img key={idx} src={item} alt={`thumb-${idx}`} className={`pd-thumb ${idx === currentIndex ? "active" : ""}`} onClick={() => setCurrentIndex(idx)} />
                ) : null)}
              </div>
            </div>

            {/* ── RIGHT: INFO ── */}
            <div className="pd-info-col">
              <h1 className="pd-name-desktop">{product_data.name}</h1>

              {/* Rating */}
              {/* <div className="pd-rating-row">
                <StarRating rating={product_data.rating} />
                <span className="pd-rating-val">{product_data.rating || 0}</span>
                <span className="pd-rating-count">· {product_data.review_count || 0} Reviews</span>
              </div> */}
              {product_data.purchase_count > 0 && (
                <div className="pd-purchase-count"><FaUsers /> {product_data.purchase_count} people bought this</div>
              )}

              {/* Price */}
              <div className="pd-price-row">
                {discount > 0 && <span className="pd-discount-badge">-{discount}%</span>}
                <span className="pd-price"><CurrencyFormatter price={selectedVariant?.price || product_data.price} /></span>
                {selectedVariant?.MRP > selectedVariant?.price && <span className="pd-mrp"><CurrencyFormatter price={selectedVariant?.MRP} /></span>}
              </div>
              {discount > 0 && <p className="pd-mrp-label">M.R.P. <span style={{ textDecoration: "line-through" }}><CurrencyFormatter price={selectedVariant?.MRP} /></span></p>}

              {product_data.brand_id?.name && (
                <p className="pd-sold-by">
                  Sold by <span>{product_data.brand_id.name}</span>
                  <span className="pd-policy-link" onClick={openNewWindow}> · Check Policy</span>
                </p>
              )}

              {/* Variants — battery-cell picker: fill % is driven by real Ah capacity */}
              {variants.length > 0 && (
                <>
                  <p className="pd-variant-label">Select Configuration</p>
                  <div className="pd-variants">
                    {variants.map((variant, idx) => {
                      const capacityNum = parseCapacity(variant.capacity);
                      const fillPct = Math.max(8, Math.round((capacityNum / maxCapacity) * 100));
                      return (
                        <div
                          key={variant.sku || idx}
                          className={`pd-variant-card ${selectedVariantIndex === idx ? "active" : ""}`}
                          onClick={() => setSelectedVariantIndex(idx)}
                        >
                          <div className="pd-variant-cell">
                            <div className="pd-variant-cell-fill" style={{ width: `${fillPct}%` }} />
                          </div>
                          <span className="pd-variant-voltage">{variant.voltage}</span>
                          <p className="pd-variant-size">{variant.capacity}</p>
                          <p className="pd-variant-price">₹{variant.price}</p>
                          {variant.price !== variant.MRP && <p className="pd-variant-mrp">₹{variant.MRP}</p>}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Qty */}
              <div className="pd-qty-row">
                <div className="pd-qty-wrap">
                  <button className="pd-qty-btn" onClick={() => { if (localQty > 1) setLocalQty(q => q - 1); minus(product_data._id, selectedVariant); }}><FaMinus /></button>
                  <span className="pd-qty-val">{localQty}</span>
                  <button className="pd-qty-btn" onClick={() => { setLocalQty(q => q + 1); handleAddToCart(product_data._id, selectedVariant || variants[0], product_data.out_of_stock); }}><FaPlus /></button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pd-cta-wrap">
                <button className="pd-btn-cart" onClick={() => handleAddToCart(product_data._id, selectedVariant || variants[0], product_data.out_of_stock)}>
                  <FaShoppingCart /> Add to Cart
                </button>
                {product_data?.out_of_stock
                  ? <button className="pd-btn-notify" onClick={() => handleNotifyMe(product_data)}><FaBell /> Notify Me</button>
                  : <button className="pd-btn-buynow" onClick={() => handleBuyNow(product_data._id)}><FaShoppingBag /> Buy Now</button>
                }
              </div>

              {/* Trust badges */}
              <div className="pd-badges">
                {[
                  { icon: <MdRestore />, label: "2 Day Replacement" },
                  { icon: <SiBrandfolder />, label: "Top Brand" },
                  { icon: <TbTruckDelivery />, label: "Fast Delivery" },
                  { icon: <RiSecurePaymentFill />, label: "Secure Payment" },
                ].map(({ icon, label }) => (
                  <div key={label} className="pd-badge-item">
                    <div className="pd-badge-icon-wrap">{icon}</div>
                    <span className="pd-badge-label">{label}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="pd-desc-wrap">
                <TextEditorView desc={product_data.desc} />
              </div>

              {/* Key Features */}
              {product_data.key_features?.length > 0 && (
                <div className="pd-section-block">
                  <h2 className="pd-section-title">Key Features</h2>
                  <ul className="pd-list">
                    {product_data.key_features.flatMap((block) => String(block).split(/\r?\n/)).filter(Boolean).map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {product_data.applications?.length > 0 && (
                <div className="pd-section-block">
                  <h2 className="pd-section-title">Applications</h2>
                  <ul className="pd-list">
                    {product_data.applications.flatMap((block) => String(block).split(/\r?\n/)).filter(Boolean).map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              )}

              {/* Advantages */}
              {product_data.advantages?.length > 0 && (
                <div className="pd-section-block">
                  <h2 className="pd-section-title">Advantages</h2>
                  <ul className="pd-list">
                    {product_data.advantages.flatMap((block) => String(block).split(/\r?\n/)).filter(Boolean).map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              )}

              {/* Benefits (legacy field, kept for other product types) */}
              {product_data.benefits?.length > 0 && (
                <div className="pd-section-block">
                  <h2 className="pd-section-title">Benefits</h2>
                  <ul className="pd-list">{product_data.benefits.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
              )}

              {/* Health Benefits */}
              {product_data.health_benefits?.length > 0 && (
                <div className="pd-section-block">
                  <h2 className="pd-section-title">Health Benefits</h2>
                  <ul className="pd-list">{product_data.health_benefits.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
              )}

              {/* Ingredients */}
              {product_data.ingredients?.length > 0 && (
                <div className="pd-section-block">
                  <h2 className="pd-section-title">Ingredients</h2>
                  <ul className="pd-list">{product_data.ingredients.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
              )}

              {/* Storage */}
              {product_data.storage_instructions?.length > 0 && (
                <div className="pd-section-block">
                  <h2 className="pd-section-title">Storage Instructions</h2>
                  <ul className="pd-list">{product_data.storage_instructions.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
              )}

              {/* Nutrition */}
              {product_data.nutritional_info &&
                Object.values(product_data.nutritional_info).some(Boolean) && (
                  <div className="pd-section-block">
                    <h2 className="pd-section-title">Nutritional Information</h2>
                    <table className="pd-nutri-table">
                      <tbody>
                        {[
                          ["Calories", product_data.nutritional_info.calories],
                          ["Protein", product_data.nutritional_info.protein],
                          ["Carbohydrates", product_data.nutritional_info.carbs],
                          ["Sugar", product_data.nutritional_info.sugar],
                          ["Fat", product_data.nutritional_info.fat],
                        ]
                          .filter(([, v]) => v)
                          .map(([label, val]) => (
                            <tr key={label}>
                              <td>{label}</td>
                              <td>{val}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

              {/* Compatible Devices */}
              {product_data.compatible_devices?.length > 0 && (
                <div className="pd-section-block">
                  <h2 className="pd-section-title">Compatible With</h2>
                  <div className="pd-info-grid">
                    {product_data.compatible_devices.flatMap((block) => String(block).split(/\r?\n/)).filter(Boolean).map((item, i) => (
                      <div key={i} className="pd-info-pill">
                        <p className="pd-info-pill-val">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Info */}
              {(product_data.taste_profile || product_data.origin || product_data.region || product_data.country_of_origin) && (
                <div className="pd-section-block">
                  <h2 className="pd-section-title">Product Information</h2>
                  <div className="pd-info-grid">
                    {[
                      ["Taste Profile", product_data.taste_profile],
                      ["Origin", product_data.origin],
                      ["Region", product_data.region],
                      ["Country", product_data.country_of_origin],
                    ].filter(([, v]) => v).map(([label, val]) => (
                      <div key={label} className="pd-info-pill">
                        <p className="pd-info-pill-label">{label}</p>
                        <p className="pd-info-pill-val">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose */}
              {product_data.why_choose_section && (
                <div className="pd-section-block">
                  <h2 className="pd-section-title">Why Choose This Product?</h2>
                  <p style={{ fontSize: 13, color: "var(--pd-slate)", lineHeight: 1.7 }}>{product_data.why_choose_section}</p>
                </div>
              )}

              {/* Expert Review */}
              {product_data.expert_review && (
                <div className="pd-section-block" style={{ borderLeft: "3px solid var(--pd-amber)", paddingLeft: 16 }}>
                  <h2 className="pd-section-title">Expert Review</h2>
                  <p style={{ fontSize: 13, color: "var(--pd-slate)", lineHeight: 1.7, fontStyle: "italic" }}>{product_data.expert_review}</p>
                </div>
              )}

              {/* Related Blogs */}
              {product_data.related_blogs?.length > 0 && (
                <div className="pd-section-block">
                  <h2 className="pd-section-title">Related Articles</h2>
                  {product_data.related_blogs.map((blog) => (
                    <a key={blog.slug} href={`/blogs/${blog.slug}`} className="pd-blog-link">{blog.title}</a>
                  ))}
                </div>
              )}

              {/* Internal Links */}
              {product_data.internal_links?.length > 0 && (
                <div className="pd-section-block">
                  <h2 className="pd-section-title">Explore More</h2>
                  {product_data.internal_links.map((url, i) => (
                    <a key={i} href={url} className="pd-blog-link">{url}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO REEL ── */}
      {showVideoModal && product_data.videos?.length > 0 && (
        <div className="pd-reel-outer">
          <div className={`pd-reel-inner ${isExpanded ? "expanded" : ""}`} onClick={() => !isExpanded && setIsExpanded(true)}>
            {isExpanded && <div style={{ position: "fixed", inset: 0 }} onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }} />}
            <div className="pd-reel-video-wrap" onClick={(e) => e.stopPropagation()}>
              <button className="pd-reel-close" onClick={(e) => { e.stopPropagation(); isExpanded ? setIsExpanded(false) : setShowVideoModal(false); }}>✕</button>
              <video ref={videoRef} src={product_data.videos[0]} className="pd-reel-video" autoPlay loop muted={isMuted} playsInline />
              <div className="pd-reel-controls">
                <button className="pd-reel-ctrl" onClick={(e) => { e.stopPropagation(); if (isPlaying) videoRef.current.pause(); else videoRef.current.play(); setIsPlaying(!isPlaying); }}>{isPlaying ? "⏸" : "▶"}</button>
                <button className="pd-reel-ctrl" onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}>{isMuted ? "🔇" : "🔊"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── REVIEWS ── */}
      <div className="pd-review-section pd-root">
        <div className="pd-review-container">
          <ProductReview
            reviews={reviews} setReviews={setReviews}
            starRating={starRating} session={session}
            reviewModalOpen={reviewModalOpen} setReviewModalOpen={setReviewModalOpen}
            reviewEditModalOpen={reviewEditModalOpen} setReviewEditModalOpen={setReviewEditModalOpen}
            handleStarRating={(i) => setStarRating(i + 1)}
            setThumbsDown={setThumbsDown} setThumbsUp={setThumbsUp}
            reviewLike={reviewLike} createReview={createReview} editReview={editReview}
            mainImg={product_data?.main_image} product_data={product_data}
            selectedImages={selectedImages} setSelectedImages={setSelectedImages}
            selectedVideos={selectedVideos} setSelectedVideos={setSelectedVideos}
          />
        </div>
      </div>

      {/* ── VIDEO SECTION ── */}
      {product_data.videos?.length > 0 && (
        <div className="pd-video-section pd-root">
          <div className="pd-video-inner">
            <video autoPlay muted controls className="pd-video-el" poster={product_data.main_image}>
              <source src={product_data.videos[0]} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* ── FAQ ── */}
      <div className="pd-faq-section pd-root">
        <div className="pd-faq-container">
          <Faq faq={product_data?.faq} />
        </div>
      </div>

      {/* ── RELATED ── */}
      <div className="pd-related pd-root">
        <RelatedProduct recommendations={recommendations} />
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

      {/* ── LOGIN PROMPT ── */}
      {showLoginPrompt && <Login onClose={() => setShowLoginPrompt(false)} />}
    </div>
  );
};

export default ProductDetail;