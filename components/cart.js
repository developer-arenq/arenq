/* eslint-disable react-hooks/exhaustive-deps */
import { IoMdArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, initialCart } from "../slices/cart";
import CartItem from "./cartItem";
import CurrencyFormatter from "../helper/currencyFormatter";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import EmptyCart from "./emptyCart";
import Login from "./login";

const Cart = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();

  const { cartItems, subtotal, total, shipping } = useSelector(
    (state) => state.cart
  );

  const [isLoginPage, setIsLoginPage] = useState(false);

  /* ================= COUPON STATES ================= */
  const [coupons, setCoupons] = useState([]);
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [showAllCoupons, setShowAllCoupons] = useState(false);

  /* ================= LOGIN ================= */
  const handleLogin = () => setIsLoginPage((p) => !p);

  const checkout = () => {
    setIsOpen(false);
    session?.user?.id ? router.push("/checkout") : handleLogin();
  };

  /* ================= FETCH COUPONS ================= */
  const fetchCoupons = async () => {
    try {
      if (!session?.user?.accessToken) return;

      const res = await fetch("/api/coupon/all", {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();
      setCoupons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Coupon fetch error:", err);
    }
  };

  /* 🔥 fetch coupons when cart opens */
  useEffect(() => {
    if (isOpen && status === "authenticated") {
      fetchCoupons();
    }
  }, [isOpen, status]);

  /* ================= COUPON ENGINE ================= */
  useEffect(() => {
    if (!coupons.length) {
      setActiveCoupon(null);
      return;
    }

    const validCoupons = coupons.filter((c) => c.active);
    const eligible = validCoupons.filter((c) => subtotal >= c.min);

    if (eligible.length) {
      const best = eligible.sort((a, b) => {
        const aVal =
          a.flat_discount > 0 ? a.flat_discount : a.discount_percent;
        const bVal =
          b.flat_discount > 0 ? b.flat_discount : b.discount_percent;
        return bVal - aVal;
      })[0];

      setActiveCoupon(best);
    } else {
      const upcoming = validCoupons.sort((a, b) => a.min - b.min)[0];
      setActiveCoupon(upcoming || null);
    }
  }, [coupons, subtotal]);

  /* ================= DERIVED ================= */
  const couponMin = activeCoupon?.min || 0;
  const couponCode = activeCoupon?.coupon_code || "";

  const discountText = activeCoupon
    ? activeCoupon.flat_discount > 0
      ? `₹${activeCoupon.flat_discount} OFF`
      : `${activeCoupon.discount_percent}% OFF`
    : "";

  const remainingAmount = Math.max(0, Math.ceil(couponMin - subtotal));
  const couponProgress =
    couponMin > 0 ? Math.min((subtotal / couponMin) * 100, 100) : 0;

  const isCouponUnlocked = activeCoupon && subtotal >= couponMin;

  /* ================= CART LOAD ================= */
  const initialCartLoad = async () => {
    try {
      if (!session?.user?.id) return;

      const res = await fetch(`/api/cart/${session.user.id}`);

      if (!res.ok) {
        dispatch(clearCart());
        return;
      }

      const response = await res.json();
      const safe = response ?? {};

      dispatch(
        initialCart({
          savedcart: Array.isArray(safe.items) ? safe.items : [],
          subtotal: safe.subtotal ?? 0,
          total: safe.total ?? 0,
          shipping: safe.shipping ?? 0,
        })
      );
    } catch (err) {
      console.error("Cart Load Error:", err);
      dispatch(clearCart());
    }
  };

  useEffect(() => {
    if (isOpen && session?.user?.id) {
      initialCartLoad();
    }
  }, [isOpen]);

  /* ================= CLEAR CART ================= */
  const clearCartFun = async () => {
    try {
      if (!session?.user?.id) {
        localStorage.removeItem("guest_cart");
        dispatch(clearCart());
        setIsOpen(false);
        return;
      }

      const res = await fetch(`/api/cart/${session.user.id}/clear`, {
        method: "DELETE",
      });

      if (res.ok) {
        dispatch(clearCart());
        setIsOpen(false);
      }
    } catch (err) {
      console.error("Clear Cart Error:", err);
    }
  };

  const closeCart = () => {
    setIsOpen(false);
    setShowAllCoupons(false);
  };

  /* ================= UI ================= */
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeCart}
      />

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-40 shadow-xl
        transform transition-transform duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <HiOutlineShoppingBag size={22} />
            Cart ({cartItems.length})
          </h2>
          <button onClick={closeCart}>
            <IoMdArrowForward size={22} />
          </button>
        </div>

        {/* ===== COUPON BAR ===== */}
        {session && activeCoupon && (
          <div className="border-b bg-gradient-to-r from-green-700 to-green-600 text-white">
            <div className="px-4 py-2 text-sm font-semibold text-center">
              🎉 {discountText} on orders above ₹{couponMin}
            </div>

            <div className="bg-white px-4 py-3 text-black">
              <p className="text-sm font-semibold text-green-700">
                {isCouponUnlocked ? (
                  <>✅ Coupon <b>{couponCode}</b> unlocked</>
                ) : (
                  <>🎯 Add ₹{remainingAmount} more to unlock <b>{couponCode}</b></>
                )}
              </p>

              {!isCouponUnlocked && (
                <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2d241b] transition-all"
                    style={{ width: `${couponProgress}%` }}
                  />
                </div>
              )}

              <button
                onClick={() => setShowAllCoupons(true)}
                className="mt-2 text-sm font-bold text-green-700"
              >
                🎟 View all coupons
              </button>
            </div>
          </div>
        )}

        {/* ===== ALL COUPONS ===== */}
        {showAllCoupons && (
          <div className="absolute inset-0 bg-white z-50 flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h3 className="font-bold">Available Coupons</h3>
              <button onClick={() => setShowAllCoupons(false)}>
                <IoClose size={22} />
              </button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto">
              {coupons.map((c) => (
                <div key={c._id} className="border rounded-xl p-4">
                  <div className="flex justify-between font-bold">
                    <span>{c.coupon_code}</span>
                    <span className="text-green-700">
                      {c.flat_discount > 0
                        ? `₹${c.flat_discount} OFF`
                        : `${c.discount_percent}% OFF`}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Minimum order ₹{c.min}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between mb-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/cart");
                }}
                className=" text-sm font-bold text-green-700 -mt-2"
              >
                View all Cart
              </button>
              <span className="text-sm text-gray-500">Subtotal :-</span>
              <span className="font-bold">
                <CurrencyFormatter price={subtotal} />
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearCartFun}
                className="flex-1 border-2 border-red-500 text-red-500 py-2 rounded-lg font-bold"
              >
                Clear
              </button>
              <button
                onClick={checkout}
                className="flex-1 bg-black text-white py-2 rounded-lg font-bold"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {isLoginPage && !session && <Login onClose={handleLogin} />}
    </>
  );
};

export default Cart;
