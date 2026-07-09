/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../slices/wishlist";
import { initialCart } from "../slices/cart";
import ProductSkeleton from "./cardSkeleton";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import dynamic from "next/dynamic";
import Image from "next/image";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";

const Login = dynamic(() => import("./login"), { ssr: false });

const TrendingProducts = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems,
    shallowEqual
  );
  const [wishlistSet, setWishlistSet] = useState(
    new Set(wishlistItems.map((item) => item._id))
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoginPage, setIsLoginPage] = useState(false);

  const scrollRef = useRef(null);
  const itemsPerPage = 4; // ✅ Show 4 products at a time
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/featured/trending_products`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data); // ✅ Get all products
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogin = () => setIsLoginPage((prev) => !prev);

  const wishlistHandler = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      toast.warning("Please sign in first");
      setIsLoginPage(true);
      return;
    }

    const product = products.find((p) => p._id === productId);
    if (!product) return;

    try {
      const response = await fetch(`/api/users/product/addtowishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify({ id: productId }),
      });

      const res = await response.json();

      if (res.error) {
        toast.error(res.error);
      } else {
        if (wishlistSet.has(productId)) {
          setWishlistSet((prev) => {
            const updated = new Set(prev);
            updated.delete(productId);
            return updated;
          });
          dispatch(removeFromWishlist(productId));
        } else {
          setWishlistSet((prev) => new Set([...prev, productId]));
          dispatch(addToWishlist(product));
        }
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
      console.error(error);
    }
  };

  const handleBuyNow = async (id) => {
    if (!session) {
      setIsLoginPage(true);
      return;
    }
    try {
      const res = await fetch(`/api/cart/${session.user.id}/add`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ product_id: id, quantity: 1 }),
      });

      if (!res.ok) {
        toast.error("Failed to add item to cart");
        return;
      }

      const response = await res.json();

      if (response) {
        const savedcart = response.items;
        const initialCartObj = {
          savedcart,
          shipping: response.shipping,
          subtotal: response.subtotal,
          total: response.total,
        };
        dispatch(initialCart(initialCartObj));
        router.push("/checkout");
      }
    } catch (error) {
      console.error("Buy Now Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const scrollToPage = (page) => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: containerWidth * page,
        behavior: "smooth",
      });
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      scrollToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      scrollToPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const onScroll = debounce(() => {
      if (!scrollRef.current) return;
      const scrollLeft = scrollRef.current.scrollLeft;
      const containerWidth = scrollRef.current.offsetWidth;
      const page = Math.round(scrollLeft / containerWidth);
      setCurrentPage(page);
    }, 100);
    const scrollEl = scrollRef.current;
    scrollEl?.addEventListener("scroll", onScroll);
    return () => scrollEl?.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="mx-auto pt-5  max-w-full px-2 lg:px-2 sm:px-0 md:px-0">


        <div className="sm:flex items-center justify-between mb-6 px-5">
          <h2 className="text-2xl lg:text-4xl sm:text-3xl md:text-4xl font-bold text-green-600">
            Season Special
          </h2>

          <div className="flex-grow border-t border-gray-300 mx-4"></div>

          <div className="hidden sm:flex gap-3">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`touch-manipulation w-14 h-10 flex items-center justify-center rounded-full border transition-colors duration-200
                ${currentPage === 0
                  ? "border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed"
                  : "border-green-500 bg-green-50 text-green-600 hover:bg-green-500 hover:text-white"
                }`}
            >
              <MdKeyboardArrowLeft size={25} />
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className={`touch-manipulation w-14 h-10 flex items-center justify-center rounded-full border transition-colors duration-200
                ${currentPage === totalPages - 1
                  ? "border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed"
                  : "border-green-500 bg-green-50 text-green-600 hover:bg-green-500 hover:text-white"
                }`}
            >
              <MdKeyboardArrowRight size={25} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-2 sm:gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
        >
          {loading
            ? Array.from({ length: 5 }, (_, i) => <ProductSkeleton key={i} />)
            : products.map((product, index) => {
              const isInWishlist = wishlistSet.has(product._id);
              const isOutOfStock = product?.out_of_stock;

              return (
                <div
                  key={product._id}
                  className="min-w-[160px] max-w-[183px] sm:min-w-[300px] sm:max-w-[294px] flex-shrink-0 relative bg-white rounded-lg border hover:shadow-md snap-start"
                >
                  <button
                    className={`absolute z-10 top-2 right-2 p-2 bg-white border border-gray-300 rounded-full hover:border-black touch-manipulation ${isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    onClick={(e) =>
                      !isOutOfStock && wishlistHandler(product._id, e)
                    }
                    disabled={isOutOfStock}
                  >
                    {isInWishlist ? (
                      <FaHeart size={16} className="text-red-500" />
                    ) : (
                      <FaRegHeart size={16} />
                    )}
                  </button>

                  <Link
                    href={`/products/${product.slug}`}
                    onClick={(e) => {
                      if (isOutOfStock) e.preventDefault();
                    }}
                  >
                    <div className="cursor-pointer relative">
                      {isOutOfStock && (
                        <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      )}

                      <div className="relative overflow-hidden rounded-md">
                        <Image
                          src={
                            product?.images?.[0] ||
                            product?.main_image ||
                            "/placeholder.jpg"
                          }
                          alt={
                            product?.alt_text ||
                            product?.name ||
                            "Product Image"
                          }
                          width={600}
                          height={600}
                          objectFit="cover"
                          priority={index < 4}
                        />
                      </div>

                      <div className="p-2 mt-auto">
                        <h3 className="text-xs sm:text-sm font-bold font-sans text-green-600 h-12 leading-snug">
                          {product.name.length > 50
                            ? `${product.name.slice(0, 50)}...`
                            : product.name}
                        </h3>
                        <div className="flex items-center gap-x-2 mt-1">
                          <span className="text-sm sm:text-base font-semibold text-green-600 text-center">
                            ₹{product.price}
                          </span>
                          {product?.MRP && product.price !== product.MRP && (
                            <span className="text-xs sm:text-sm text-gray-400 line-through">
                              ₹{product.MRP}
                            </span>
                          )}
                        </div>

                        <div className="mt-3">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleBuyNow(product._id);
                            }}
                            disabled={isOutOfStock}
                            className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2
                              ${isOutOfStock
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-[#2d241b] hover:bg-[#524232] text-white transition-colors"
                              }`}
                          >
                            🛒 Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>

      {isLoginPage && !session && <Login onClose={handleLogin} />}
    </>
  );
};

export default TrendingProducts;
