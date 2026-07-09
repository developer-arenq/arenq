/* eslint-disable react/jsx-no-target-blank */
import Head from "next/head";
import Image from "next/image";
import { useEffect, useCallback, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  removeFromWishlist,
  setWishlist,
  addToWishlist,
} from "../slices/wishlist";
import { initialCart } from "../slices/cart";

import { FiTrash, FiShare2 } from "react-icons/fi";
import {
  FaShoppingCart,
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

/* =========================
   SSR – PRODUCTION SAFE
========================= */
export async function getServerSideProps(context) {
  const token = await getToken({
    req: context.req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return { props: { wishlistPro: [] } };
  }

  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/users/wishlist`,
      {
        headers: {
          cookie: context.req.headers.cookie || "",
        },
      }
    );

    const data = await res.json();

    return {
      props: {
        wishlistPro: Array.isArray(data) ? data : [],
      },
    };
  } catch (err) {
    console.error("Wishlist SSR error:", err);
    return { props: { wishlistPro: [] } };
  }
}

/* =========================
   COMPONENT
========================= */
const Wishlist = ({ wishlistPro }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [loadingItem, setLoadingItem] = useState(null);
  const [openShareId, setOpenShareId] = useState(null);
  const shareRef = useRef(null);

  /* ---------- INIT ---------- */
  useEffect(() => {
    if (wishlistPro?.length) {
      dispatch(
        setWishlist(
          wishlistPro.map((item) => ({
            _id: item._id,
            title: item.name,
            price: item.price,
            MRP: item.MRP,
            image: item.main_image,
            alt_text: item.alt_text,
            addedDate: item.createdAt,
          }))
        )
      );
    }
    setIsPageLoading(false);
  }, [wishlistPro, dispatch]);

  /* ---------- REMOVE ---------- */
  const removeWishlistItem = useCallback(
    async (_id) => {
      if (!session) return;

      setLoadingItem(_id);
      dispatch(removeFromWishlist(_id));

      try {
        const res = await fetch(
          "/api/users/product/removefromwhishlist",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ id: _id }),
          }
        );

        const data = await res.json();
        if (!data.success) throw new Error();
        toast.success("Item removed from wishlist");
      } catch {
        dispatch(addToWishlist(wishlist.find((i) => i._id === _id)));
        toast.error("Failed to remove item");
      } finally {
        setLoadingItem(null);
      }
    },
    [dispatch, session, wishlist]
  );

  /* ---------- ADD TO CART ---------- */
  const addToCartHandler = async (item) => {
    if (!session) return toast.warning("Please sign in");

    try {
      const res = await fetch(`/api/cart/${session.user.id}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: item._id, quantity: 1 }),
      });

      const data = await res.json();
      dispatch(initialCart(data));
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  /* ---------- SHARE CLOSE ---------- */
  useEffect(() => {
    const close = (e) =>
      shareRef.current &&
      !shareRef.current.contains(e.target) &&
      setOpenShareId(null);

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* =========================
     UI – SAME PREMIUM DESIGN
  ========================= */
  return (
    <>
      <Head>
        <title>My Wishlist</title>
      </Head>

      <div className="min-h-screen">
        {isPageLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : wishlist.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600">
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
              <div className="text-6xl mb-4">📄❤️</div>
              <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
            </div>
          </div>
        ) : (
          wishlist.map((item) => {
            const productLink = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${item._id}`;

            return (
              <div key={item._id} className="max-w-4xl mx-auto p-2">
                <div className="flex gap-3 bg-slate-50 border-b p-3">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.alt_text || item.title}
                    width={96}
                    height={96}
                    className="rounded border"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="font-semibold mt-1">₹{item.price}</p>

                    <div className="flex gap-2 mt-2">
                       <button
                        onClick={() =>
                          addToCartHandler(item)
                        }
                        className="text-green-600 hover:text-black text-sm flex items-center gap-1 border border-green-600 hover:border-black px-3 py-1 rounded"
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>

                      <button
                        onClick={() => removeWishlistItem(item._id)}
                        disabled={loadingItem === item._id}
                        className="text-red-500"
                      >
                        <FiTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Wishlist;
