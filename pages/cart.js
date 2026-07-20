import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ShoppingCart, ArrowRight, Lock } from "lucide-react";

import CartItem from "../components/cartItem";

const Login = dynamic(() => import("../components/login"), {
    ssr: false,
});

const SHIPPING_CHARGE = 100;

const deliveryCharge = SHIPPING_CHARGE;

const CartPage = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [showLogin, setShowLogin] = useState(false);

    const { cartItems, subtotal } = useSelector((state) => state.cart);

    const deliveryCharge = SHIPPING_CHARGE;


    const finalTotal =
        cartItems.length > 0 ? subtotal + deliveryCharge : 0;

    const totalItems = cartItems.reduce(
        (acc, item) => acc + (item.quantity || 1),
        0
    );

    const handleCheckout = () => {
        if (session) {
            router.push("/checkout");
        } else {
            setShowLogin(true);
        }
    };

     const totalSavings = cartItems.reduce(
        (acc, item) =>
            acc +
            (((item.MRP || item.price) - item.price) *
                (item.quantity || 1)),
        0
    );

    return (
        <>
            <Head>
                <title>Your Cart</title>
            </Head>

            <div className="bg-[#f7f2eb] min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-24">
                    <h1 className="text-4xl font-bold text-center mb-10">
                        Your Cart
                    </h1>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 rounded-full bg-[#8b4b3220] flex items-center justify-center mx-auto mb-5">
                                <ShoppingCart
                                    size={32}
                                    className="text-[#8b4b32]"
                                />
                            </div>

                            <h2 className="text-2xl font-semibold mb-3">
                                Your cart is empty
                            </h2>

                            <p className="text-gray-500 mb-6">
                                Explore our products and add something special.
                            </p>

                            <button
                                onClick={() => router.push("/shop")}
                                className="bg-[#8b4b32] text-white px-8 py-3 rounded-xl"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 flex flex-col gap-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={`${item.id}-${item.variant?.id || ""}`}
                                        className="bg-white border border-[#ddd] rounded-2xl p-4 shadow-sm"
                                    >
                                        <CartItem
                                            item={item}
                                            itemcount={cartItems.length}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="bg-white border border-[#ddd] rounded-2xl p-6 h-fit sticky top-24">
                                <h2 className="font-bold text-xl mb-5">
                                    Order Summary
                                </h2>

                                <div className="space-y-3 mb-5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Subtotal ({totalItems} items)
                                        </span>

                                        <span>₹{subtotal}</span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Delivery
                                        </span>

                                        <span className="font-medium">
                                            ₹{deliveryCharge}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            Save
                                        </span>

                                        <span className="text-green-700 font-medium">
                                            ₹{totalSavings}
                                        </span>
                                    </div>


                                    <hr />

                                    <div className="text-xs text-gray-500 mb-2">
                                        Prices are inclusive of all taxes.
                                    </div>

                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>

                                        <span className="text-[#8b4b32]">
                                            ₹{finalTotal}
                                        </span>
                                    </div>
                                </div>

                                {/* Promo */}
                                {/* <div className="flex gap-2 mb-5">
                                    <input
                                        type="text"
                                        placeholder="Promo code"
                                        className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none"
                                    />

                                    <button className="px-4 py-2 rounded-xl bg-[#8b4b3210] text-[#8b4b32] font-semibold">
                                        Apply
                                    </button>
                                </div> */}

                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-[#8b4b32] text-white py-4 rounded-xl flex items-center justify-center gap-2 font-semibold"
                                >
                                    <Lock size={14} />
                                    Proceed to Checkout
                                    <ArrowRight size={16} />
                                </button>

                                <div className="flex flex-col gap-2 mt-4">
                                    <p className="text-xs text-center text-gray-500">
                                        ✓ Secure Payment
                                    </p>

                                    <p className="text-xs text-center text-gray-500">
                                        ✓ COD Available
                                    </p>

                                    <p className="text-xs text-center text-gray-500">
                                        ✓ 2-Day Returns
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Sticky Checkout */}
                {cartItems.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center lg:hidden">
                        <div>
                            <p className="text-xs text-gray-500">Total</p>
                            <p className="font-bold text-lg">
                                ₹{finalTotal}
                            </p>
                        </div>

                        <button
                            onClick={() => router.push("/checkout")}
                            className="bg-[#8b4b32] text-white px-6 py-2 rounded-lg"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
            {!session && showLogin && (
                <Login
                    onClose={() => setShowLogin(false)}
                />
            )}
        </>
    );
};

export default CartPage;