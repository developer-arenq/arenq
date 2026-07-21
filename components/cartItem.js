"use client";

import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

import { initialCart } from "../slices/cart";
import CurrencyFormatter from "../helper/currencyFormatter";
import {
  updateGuestCartQty,
  removeGuestCartItem,
} from "../helper/guestCart";

const CartItem = ({ item, itemcount }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const {
    id,
    thumbnail,
    title,
    price,
    quantity,
    variant,
    MRP,
  } = item;

  const reloadCart = (response) => {
    dispatch(
      initialCart({
        savedcart: response.items,
        shipping: response.shipping,
        subtotal: response.subtotal,
        total: response.total,
      })
    );
  };

  const minus = async () => {
    if (!session) {
      const updatedCart = updateGuestCartQty(
        id,
        variant?.sku,
        -1
      );

      dispatch(initialCart(updatedCart));
      return;
    }

    const res = await fetch(`/api/cart/${session.user.id}/minus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: id,
        quantity: 1,
        selectedVariant: {
          sku: variant?.sku,
        },
      }),
    });

    if (res.ok) {
      reloadCart(await res.json());
    }
  };

  const add = async () => {
    if (!session) {
      const updatedCart = updateGuestCartQty(
        id,
        variant?.sku,
        1
      );

      dispatch(initialCart(updatedCart));
      return;
    }

    const res = await fetch(`/api/cart/${session.user.id}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: id,
        quantity: 1,
        selectedVariant: {
          sku: variant?.sku,
        },
      }),
    });

    if (res.ok) {
      reloadCart(await res.json());
    }
  };

  const removeItem = async () => {
    if (!session) {
      const updatedCart = removeGuestCartItem(
        id,
        variant?.sku
      );

      dispatch(initialCart(updatedCart));
      return;
    }

    if (itemcount === 1) {
      const res = await fetch(
        `/api/cart/${session.user.id}/clear`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        dispatch(
          initialCart({
            savedcart: [],
            shipping: 0,
            subtotal: 0,
            total: 0,
          })
        );
      }

      return;
    }

    const res = await fetch(
      `/api/cart/${session.user.id}/removeItem`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: id,
          selectedVariant: {
            sku: variant?.sku,
          },
        }),
      }
    );

    if (res.ok) {
      reloadCart(await res.json());
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24 bg-[#fafafa] rounded-xl overflow-hidden border">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-contain p-2"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h3
              className="font-medium text-[#1f1f1f] text-sm md:text-base"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {title}
            </h3>

            {variant && (
              <div className="text-xs text-gray-500 mt-1 space-y-1">
                {(variant?.attributes?.model || variant?.model) && (
                  <p>
                    Model:{" "}
                    {variant?.attributes?.model || variant?.model}
                  </p>
                )}

                {/* {(variant?.attributes?.voltage || variant?.voltage) && (
                  <p>
                    Voltage:{" "}
                    {variant?.attributes?.voltage ||
                      variant?.voltage}
                  </p>
                )}

                {(variant?.attributes?.capacity || variant?.capacity) && (
                  <p>
                    Capacity:{" "}
                    {variant?.attributes?.capacity ||
                      variant?.capacity}
                  </p>
                )} */}
              </div>
            )}

            <p className="text-sm text-gray-500 mt-1">
              Unit: ₹{price}
            </p>
          </div>

          <button
            onClick={removeItem}
            className="text-red-500 hover:text-red-600"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              className="px-3 py-2 bg-gray-50"
              onClick={minus}
            >
              <IoMdRemove />
            </button>

            <span className="px-4 font-medium">
              {quantity}
            </span>

            <button
              className="px-3 py-2 bg-gray-50"
              onClick={add}
            >
              <IoMdAdd />
            </button>
          </div>

          <div className="text-right">
            <p className="font-bold text-[#9b5738]">
              <CurrencyFormatter
                price={price * quantity}
              />
            </p>

            {!!MRP && (
              <p className="text-xs text-gray-400 line-through">
                <CurrencyFormatter
                  price={MRP * quantity}
                />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;