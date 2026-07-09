import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { initialCart, clearCart } from "../slices/cart";

/* ======================
   Helpers
====================== */
const getGuestCart = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("guest_cart")) || [];
  } catch {
    return [];
  }
};

const clearGuestCart = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("guest_cart");
  }
};

/* ======================
   CartSync Component
====================== */
const CartSync = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const syncedRef = useRef(false);

  useEffect(() => {
    /* ---------- Guest ---------- */
    if (status === "unauthenticated") {
      dispatch(initialCart(getGuestCart()));
      syncedRef.current = false;
      return;
    }

    /* ---------- Wait ---------- */
    if (status !== "authenticated") return;
    if (!session?.user?.id) return;
    if (syncedRef.current) return;

    syncedRef.current = true;

    const syncCart = async () => {
      try {
        const guestCart = getGuestCart();

        /* ---------- Merge ---------- */
        if (guestCart.length > 0) {
          const res = await fetch("/api/cart/merge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: session.user.id,
              guestCart,
            }),
          });

          if (res.ok) clearGuestCart();
        }

        /* ---------- Load backend ---------- */
        const cartRes = await fetch(`/api/cart/${session.user.id}`);

        if (!cartRes.ok) {
          dispatch(clearCart());
          return;
        }

        const data = await cartRes.json();

        // ✅ FIX: handle null/undefined safely
        const safeData = data ?? {};

        dispatch(
          initialCart({
            savedcart: Array.isArray(safeData.items) ? safeData.items : [],
            subtotal: safeData.subtotal ?? 0,
            total: safeData.total ?? 0,
            shipping: safeData.shipping ?? 0,
          })
        );
      } catch (err) {
        console.error("Cart sync failed:", err);
        dispatch(clearCart());
      }
    };

    syncCart();
  }, [status, session?.user?.id, dispatch]);

  return null;
};

export default CartSync;