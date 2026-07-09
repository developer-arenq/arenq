/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormatter from "../../helper/currencyFormatter";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useRazorpay from "react-razorpay";
import { getSession } from "next-auth/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import countryState from "../../database/country-states.json";
import Head from "next/head";
import { clearCart } from "../../slices/cart";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { initialCart } from "../../slices/cart";
import { FaArrowRight } from "react-icons/fa";
import CartItem from "../../components/cartItem";

export async function getServerSideProps({ req }) {
  // Check if the user is authenticated, if not redirect to login page
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  const userid = session.user.id;
  // Fetch user's saved addresses from the database
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/address/user/${session.user.id}`
  );
  let saved_address = await res.json();
  const checkSavedAddress = saved_address instanceof Array;
  if (!checkSavedAddress) {
    saved_address = [];
  }
  // Filter the enabled addresses and set the Razorpay key

  const RAZORPAY_KEY = process.env.RAZORPAY_KEY_ID;

  // Return the fetched data as props
  return {
    props: {
      saved_address: saved_address,
      RAZORPAY_KEY: RAZORPAY_KEY,
      user_idd: userid,
    },
  };
}

const formatDate = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CheckOut = ({ saved_address, RAZORPAY_KEY, user_idd }) => {
  const { cartItems, total, subtotal } = useSelector((state) => state.cart);
  const [shipping, setShipping] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const Razorpay = useRazorpay();
  const dispatch = useDispatch();

  const initialValues = {
    token: session && session.user.accessToken,
    user_id: session && session.user.id,
    fullname: "",
    address_line: "",
    mobile: "",
    state: "",
    country: "",
    city: "",
    postal_code: "",
    email: session && session.user.email,
    payment_method: "netbanking",
    shipping_price: shipping,
    order_items: cartItems,
    total: total,
    transaction_id: null,
    shipping_address: "",
    coupon: "",
    discount: 0,
  };

  const [address, setAddress] = useState(initialValues);
  const [pickedaddress, setPickedaddress] = useState("");
  const [dis, setDis] = useState(0);
  const [savedAddress, setSavedAddress] = useState(saved_address);
  const [savedAddressId, setSavedAddressId] = useState();
  const [editAddressModalOpen, setEditAddressModalOpen] = useState(false);
  const [countryCode, setCountryCode] = useState(countryState.states["IN"]);
  const [toggleAddNewAddress, setToggleAddNewAddress] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const formRef = useRef(null);
  const [coupon_code, setCoupon_code] = useState("");
  const [discount, setDiscount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [tempCoupon, setTempCoupon] = useState(null); // modal मध्ये select
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);


  const submitCheckout = (e) => {
    e.preventDefault();

    if (isProcessing) return;

    setIsProcessing(true);   // 🔥 START LOADING
    setDisableBtn(true);

    if (savedAddress.length > 0 && toggleAddNewAddress) {
      setFormSubmitted(true);
      return;
    }

    if (!formRef.current) {
      toast.error("Please fill the address form");
      setIsProcessing(false);
      setDisableBtn(false);
      return;
    }

    const formData = new FormData(formRef.current);
    const values = Object.fromEntries(formData.entries());

    setAddress((prev) => ({
      ...prev,
      ...values,
    }));

    setFormSubmitted(true);
  };


  const clearCartFun = async () => {
    const data = await fetch(`/api/cart/${session.user.id}/clear`, {
      method: "Delete",
    });
  };

  const minus = async (id) => {
    const itemInCart = cartItems.find((item) => item.id === id);

    if (!itemInCart) {
      toast.warning("Product not found in cart.");
      return;
    }

    const requestBody = {
      product_id: id,
      quantity: 1,
    };

    if (itemInCart.variant) {
      requestBody.selectedVariant = itemInCart.variant;
    }

    const data = await fetch(`/api/cart/${session.user.id}/minus`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    if (data.ok) {
      const response = await data.json();
      if (response) {
        const savedcart = response.items;
        const initialCartObj = {
          savedcart,
          shipping: response.shipping,
          subtotal: response.subtotal,
          total: response.total,
        };
        dispatch(initialCart(initialCartObj));
      }
    }
  };

  const add = async (id) => {
    const itemInCart = cartItems.find((item) => {
      const sameId = item.id === id;

      // If no variant is present
      const noVariant = !item.variant;

      // If same variant exists
      const sameVariant = cartItems.some(
        (cartItem) =>
          cartItem.id === id &&
          cartItem.variant &&
          item.variant &&
          cartItem.variant.value === item.variant.value &&
          cartItem.variant.type === item.variant.type
      );

      return sameId && (noVariant || sameVariant);
    });

    if (!itemInCart) {
      toast.warning("Product not found in cart. Please add it first.");
      return;
    }

    const requestBody = {
      product_id: id,
      quantity: 1,
    };

    if (itemInCart.variant) {
      requestBody.selectedVariant = itemInCart.variant;
    }

    const res = await fetch(`/api/cart/${session.user.id}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (res.ok) {
      const data = await res.json();
      const cartData = {
        savedcart: data.items,
        shipping: data.shipping,
        subtotal: data.subtotal,
        total: data.total,
      };
      dispatch(initialCart(cartData));
    }
  };

  // ✅ Create Order Function
  const createOrderFun = async (address) => {
    try {
      const token = session?.user?.accessToken;

      if (!token) {
        toast.error("Session expired, login again");
        router.push("/login");
        return;
      }

      const payableTotal =
        address.total + address.shipping_price - (discount || 0);

      const res = await fetch(`/api/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // backend reads this correctly now
        },
        body: JSON.stringify({
          user_id: session.user.id,
          order_items: cartItems,
          payment_method: address.payment_method,
          shipping_price: address.shipping_price,
          total: payableTotal,
          transaction_id: address.transaction_id || null,
          shipping_address: address.shipping_address,
          coupon: address.coupon || null,
          discount: discount || 0,
          taxAmount: address.taxAmount,
          taxPercentage: address.taxPercentage,
        }),
      });

      const response = await res.json();

      if (res.ok && response.id) {
        toast.success("Order placed successfully!");
        await clearCartFun();
        dispatch(clearCart());
        router.push(`/checkout/ordered/${response.id}`);
      } else {
        console.log("Order Error:", response);
        toast.error(response.message || "Order creation failed");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (savedAddress && savedAddress.length > 0 && !pickedaddress) {
      setPickedaddress(savedAddress[0]);
    }
  }, [savedAddress]);

  useEffect(() => {
    if (pickedaddress) {
      setAddress((prev) => ({
        ...prev,
        shipping_address: pickedaddress._id,
        fullname: pickedaddress.fullname,
        email: pickedaddress.email,
        mobile: pickedaddress.mobile,
        address_line: pickedaddress.address_line,
        city: pickedaddress.city,
        state: pickedaddress.state,
        country: pickedaddress.country,
        postal_code: pickedaddress.postal_code,
      }));
    }
  }, [pickedaddress]);


  const razorpayHandler = useCallback(
    async (address) => {
      try {
        setDisableBtn(true);

        const payableAmount =
          subtotal + address.shipping_price - (discount || 0);

        /* 1️⃣ CREATE RAZORPAY ORDER */
        const rpRes = await fetch("/api/payment/createPaymentOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify({ total: payableAmount }),
        });

        const rpData = await rpRes.json();

        if (!rpData?.id) {
          toast.error("Failed to create Razorpay order");
          setDisableBtn(false);
          return;
        }

        /* 2️⃣ OPEN RAZORPAY */
        const options = {
          key: RAZORPAY_KEY,
          amount: rpData.amount,
          currency: "INR",
          name: "Apneehatti Pvt Ltd",
          description: "Order Payment",
          image: "https://arenq.s3.amazonaws.com/image-1727026815300.png",
          order_id: rpData.id,

          handler: async function (paymentResults) {
            try {
              /* 3️⃣ VERIFY PAYMENT */
              const validateRes = await fetch("/api/payment/validation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_payment_id: paymentResults.razorpay_payment_id,
                  razorpay_order_id: paymentResults.razorpay_order_id,
                  razorpay_signature: paymentResults.razorpay_signature,
                }),
              });

              const validateData = await validateRes.json();

              if (!validateRes.ok || !validateData?.success) {
                toast.error("Payment verification failed");
                return;
              }

              /* 4️⃣ CREATE ORDER (AFTER PAYMENT SUCCESS) */
              const orderRes = await fetch("/api/orders/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session.user.accessToken}`,
                },
                body: JSON.stringify({
                  order_items: cartItems,
                  payment_method: "netbanking",
                  shipping_address: address.shipping_address,
                  coupon: address.coupon || null,
                  discount: discount || 0,
                  transaction_id: paymentResults.razorpay_payment_id,
                }),
              });

              const orderData = await orderRes.json();

              if (!orderRes.ok || !orderData?.id) {
                toast.error("Order creation failed after payment");
                return;
              }

              /* 5️⃣ 🔥 CALL paymentSuccess → SHIPROCKET */
              await fetch("/api/payment/success", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session.user.accessToken}`,
                },
                body: JSON.stringify({
                  orderId: orderData.id,
                }),
              });

              /* 6️⃣ CLEANUP + REDIRECT */
              await clearCartFun();
              dispatch(clearCart());
              router.push(`/checkout/ordered/${orderData.id}`);
            } catch (err) {
              console.error(err);
              toast.error("Payment success flow failed");
            }
          },

          modal: {
            ondismiss: function () {
              toast.info("Payment cancelled");
              setDisableBtn(false);
              setIsProcessing(false);
              setFormSubmitted(false);
            },
          },

          theme: {
            color: "#2d241b",
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();

        rzp.on("payment.failed", function () {
          toast.error("Payment failed");
          setDisableBtn(false);
          setIsProcessing(false);
          setFormSubmitted(false);
        });
      } catch (err) {
        console.error("Razorpay error:", err);
        toast.error("Razorpay initialization failed");
        setDisableBtn(false);
      }
    },
    [subtotal, discount, cartItems, session]
  );



  const createOrder = async () => {
    toast.info("Order processing in progress");
    setDisableBtn(true);

    const shipping_price = address.payment_method === "netbanking" ? 70 : 100;
    const updatedAddress = { ...address, shipping_price };

    try {
      const response = await fetch("/api/address/create", {
        method: "POST",
        body: JSON.stringify(updatedAddress),
      });

      const data = await response.json();
      if (data?.shipping_address) {
        updatedAddress.shipping_address = data.shipping_address;

        if (updatedAddress.payment_method === "netbanking") {
          await razorpayHandler(updatedAddress);
        }


        else {
          await createOrderFun(updatedAddress);
        }
      } else {
        toast.error("Failed to save shipping address");
      }
    } catch (error) {
      console.error("createOrder error:", error);
      toast.error("Something went wrong during order");
    } finally {
      if (updatedAddress.payment_method === "cod") {
        setDisableBtn(false); // ✅ ONLY for COD
      }
    }

  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createOrderWithoutAddress = async () => {
    if (!address.shipping_address) {
      toast.warning("Please add a shipping address");
      return;
    }

    const shipping_price = address.payment_method === "netbanking" ? 70 : 100;
    const updatedAddress = { ...address, shipping_price };

    if (updatedAddress.payment_method === "netbanking") {
      await razorpayHandler(updatedAddress);
    }


    else {
      await createOrderFun(updatedAddress);
    }
  };

  useEffect(() => {
    // Calculate total savings
    let totalDiscount = 0;
    cartItems.forEach((item) => {
      totalDiscount += item.MRP * item.quantity - item.price * item.quantity;
    });
    setDis(totalDiscount);

    // Update address total
    const shippingPrice = address.payment_method === "netbanking" ? 70 : 100;
    setAddress((prev) => ({
      ...prev,
      shipping_price: shippingPrice,
      total: subtotal,
      discount: discount,
      order_items: cartItems,
    }));

  }, [cartItems, address.payment_method, subtotal, discount]);


  useEffect(() => {
    if (!formSubmitted || isProcessing === false) return;

    const proceed = async () => {
      try {
        if (savedAddress.length > 0 && toggleAddNewAddress) {
          await createOrderWithoutAddress();
        } else {
          await createOrder();
        }
      } catch (err) {
        toast.error("Order failed");
      } finally {
        setFormSubmitted(false);
        setIsProcessing(false);
        setDisableBtn(false);
      }
    };

    proceed();
  }, [formSubmitted]);



  useEffect(() => {
    if (!pickedaddress) return;
    const state = pickedaddress.state;
    const pincode = pickedaddress.postal_code;

    let newShippingPrice = 70; // default

    if (address.payment_method === "cod") {
      newShippingPrice = 100;
    } else if (address.payment_method === "netbanking") {
      newShippingPrice = 70;
    }

    setAddress((prevAddress) => ({
      ...prevAddress,
      shipping_price: newShippingPrice,
    }));
  }, [pickedaddress, address.payment_method]);



  const saveAddressHandler = async (e) => {
    // Prevent default button action
    e.preventDefault();

    // Get the form element
    const formElement = e.target.closest("form");
    const formData = new FormData(formElement);

    // Extract the specific fields
    const addressData = {
      user_id: user_idd, // Use the prop passed from getServerSideProps
      address_line: formData.get("address_line"),
      city: formData.get("city"),
      postal_code: formData.get("postal_code"),
      country: formData.get("country"),
      state: formData.get("state"),
      mobile: formData.get("mobile"),
      email: session.user.email, // Use session email directly
      fullname: formData.get("fullname"),
    };

    try {

      if (!addressData.state) {
        toast.error("Please select a state");
        return;
      }
      const data = await fetch("/api/address/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });

      const response = await data.json();

      if (response) {
        // Fetch updated addresses
        const res = await fetch(`/api/address/user/${user_idd}`);
        const newAddresses = await res.json();

        // Ensure we have an array of addresses
        if (Array.isArray(newAddresses)) {
          setSavedAddress(newAddresses);
          toast.success("Address added successfully");
          setToggleAddNewAddress(true);
        } else {
          setSavedAddress([]);
          toast.error("Error loading addresses");
        }
      } else {
        toast.error("Failed to add address");
      }
    } catch (error) {
      toast.error("An error occurred while saving the address");
    }
  };

  const deleteAddressById = async (id) => {
    const data = await fetch(`/api/address/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enable: false }),
    });
    const res = data.json();
    if (res.error) {
      toast.error(res.error);
    } else {
      setSavedAddress(savedAddress.filter((item) => item._id !== id));
      toast.success("Address deleted successfully");
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      if (user_idd) {
        try {
          const res = await fetch(`/api/address/user/${user_idd}`);
          const addresses = await res.json();
          if (Array.isArray(addresses)) {
            setSavedAddress(addresses);
          } else {
            setSavedAddress([]);
          }
        } catch (error) {
          setSavedAddress([]);
        }
      }
    };

    fetchAddresses();
  }, [user_idd]);

  const updateAddress = async (id, e) => {
    e.preventDefault();
    setEditAddressModalOpen(false);
    const formData = new FormData(e.target);
    formData.append("user_id", address.user_id);
    formData.append("email", address.email);
    const form_data = Object.fromEntries(formData);

    const data = await fetch(`/api/address/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form_data),
    });
    const res = await data.json();
    if (res.error) {
      toast.error(res.error);
    } else {
      setSavedAddress([...res]);
      toast.success("Address updated successfully");
    }
  };

  useEffect(() => {
    if (!session) return;

    const fetchCoupons = async () => {
      try {
        const res = await fetch("/api/coupon/all", {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setCoupons(data);
        }
      } catch (err) {
        console.log("Coupon fetch error");
      }
    };

    fetchCoupons();
  }, [session]);


  const isCouponValid = async (codeFromList = "", couponObj = null) => {
    try {
      const finalCode = (codeFromList || coupon_code || "");

      if (!finalCode) {
        toast.error("Please enter a coupon code");
        return;
      }

      // 🔎 Find coupon from fetched coupons list
      const coupon =
        couponObj ||
        coupons.find(
          (c) => c.coupon_code.toUpperCase() === finalCode
        );

      if (!coupon) {
        toast.error("Invalid coupon code");
        return;
      }

      // ❌ FRONTEND MIN / MAX CHECK (IMPORTANT)
      if (subtotal < coupon.min) {
        toast.error(
          `Add ₹${Math.ceil(coupon.min - subtotal)} more to apply this coupon`
        );
        return;
      }



      // ⛔ Prevent re-applying same coupon
      if (appliedCoupon === coupon.coupon_code) {
        toast.info("This coupon is already applied");
        return;
      }

      // 🧾 Prepare payload
      const orderIds = cartItems.map((x) => x.id);
      const orderQty = cartItems.map((x) => ({
        id: x.id,
        quantity: x.quantity,
      }));

      // 🚀 API CALL
      const res = await fetch("/api/coupon/validateCoupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify({
          order_qty: orderQty,
          order_items: orderIds,
          shipping_price: address.shipping_price,
          coupon_code: finalCode,
          subtotal,
        }),
      });

      const data = await res.json();

      // ✅ SUCCESS
      if (res.ok && data?._id) {
        setCoupon_code(data.coupon_code);
        setDiscount(data.discount);
        setAppliedCoupon(data.coupon_code);

        setAddress((prev) => ({
          ...prev,
          coupon: data._id,
          discount: data.discount,
          total: data.discounted_price,
        }));

        toast.success("Coupon applied successfully 🎉");
        setShowCouponModal(false);
        setTempCoupon(null);
      } else {
        toast.error(data?.message || "Coupon not applicable");
      }
    } catch (error) {
      console.error("Coupon validation error:", error);
      toast.error("Something went wrong while applying coupon");
    }
  };

  const handleApplyBestCoupon = async () => {
    if (!bestCoupon) return;

    if (subtotal < bestCoupon.min) {
      toast.error(
        `Add ₹${bestCoupon.min - subtotal} more to apply this coupon`
      );
      return;
    }

    if (applyingCoupon || appliedCoupon) return;

    setApplyingCoupon(true);
    await isCouponValid(bestCoupon.coupon_code, bestCoupon);
    setApplyingCoupon(false);
  };


  // first / best coupon (you can sort if needed)
  const bestCoupon = coupons.length > 0 ? [...coupons].sort((a, b) => a.min - b.min)[0] : null;

  const displayCoupon = appliedCoupon ? coupons.find(c => c.coupon_code === appliedCoupon) : bestCoupon;

  const isBestCouponEligible = bestCoupon && subtotal >= bestCoupon.min;

  const bestCouponRemaining = bestCoupon && subtotal < bestCoupon.min ? Math.ceil(bestCoupon.min - subtotal) : 0;

  const bestCouponDiscount = bestCoupon && (bestCoupon.flat_discount > 0 ? bestCoupon.flat_discount : Math.floor((subtotal * bestCoupon.discount_percent) / 100));


  useEffect(() => {
    let totalTax = 0;
    let totalPercentage = 0;

    cartItems.forEach((item) => {
      totalTax += item.taxAmount || 0;
      totalPercentage += item.taxPercentage || 0;
    });

    const avgTaxPercent =
      cartItems.length > 0
        ? totalPercentage / cartItems.length
        : 0;

    setAddress(prev => ({
      ...prev,
      taxAmount: Number(totalTax.toFixed(2)),
      taxPercentage: Number(avgTaxPercent.toFixed(2)),
    }));
  }, [cartItems]);


  useEffect(() => {
    if (session === null) {
      router.push("/");
    }
  }, [session]);




  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>

      <div className="min-h-screen w-full  p-4 flex justify-center">

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE – PRODUCT + ADDRESS + PAYMENT */}
          <div className="lg:col-span-2 space-y-6">

            {/* CART ITEMS */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Your Items</h2>

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
             
            </div>




            {/* ADDRESS FORM */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

              {/* Saved Address */}
              {savedAddress.length > 0 && toggleAddNewAddress ? (
                <div>
                  <div className="flex justify-between mb-3">
                    <h3 className="font-semibold">Choose Address</h3>
                    <button
                      className="text-green-600 text-sm"
                      onClick={() => {
                        setToggleAddNewAddress(false);
                        setPickedaddress(null);
                      }}
                    >
                      + Add New
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {savedAddress.map((item) => (
                      <label
                        key={item._id}
                        className="border p-3 rounded-xl cursor-pointer"
                        onClick={() => setPickedaddress(item)}
                      >
                        <div className="flex justify-between text-sm font-bold">
                          <div className="flex gap-2 items-center">
                            <input
                              type="radio"
                              checked={pickedaddress?._id === item._id}
                              onChange={() => setPickedaddress(item)}
                            />
                            Address
                          </div>

                          <div className="flex gap-2">
                            <MdEdit
                              onClick={() => {
                                setEditAddressModalOpen(true);
                                setSavedAddressId(item._id);
                              }}
                            />
                            <MdDelete onClick={() => deleteAddressById(item._id)} />
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 mt-2">
                          {item.fullname} • {item.mobile} <br />
                          {item.address_line}, {item.city}, {item.postal_code}, {item.country}
                        </p>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* New Address Form */}
                  <form id="checkoutForm" ref={formRef} onSubmit={submitCheckout} className="space-y-4">

                    <div>
                      <label className="font-medium text-sm">Full Name</label>
                      <input
                        name="fullname"
                        required
                        className="w-full mt-1 p-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="font-medium text-sm">Mobile</label>
                      <input
                        name="mobile"
                        required
                        className="w-full mt-1 p-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="font-medium text-sm">Address</label>
                      <input
                        name="address_line"
                        required
                        className="w-full mt-1 p-2 border rounded-md"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-medium text-sm">City</label>
                        <input
                          name="city"
                          required
                          className="w-full mt-1 p-2 border rounded-md"
                        />
                      </div>

                      <div>
                        <label className="font-medium text-sm">Postal Code</label>
                        <input
                          name="postal_code"
                          required
                          className="w-full mt-1 p-2 border rounded-md"
                        />
                      </div>

                      <div>
                        <label className="font-medium text-sm">Country</label>
                        <select
                          name="country"
                          defaultValue="IN"
                          className="w-full mt-1 p-2 border rounded-md"
                          onChange={(e) => {
                            setCountryCode(
                              countryState.states[e.target.value]
                            );

                            setAddress((prev) => ({
                              ...prev,
                              country: e.target.value,
                              state: "",
                            }));
                          }}
                        >
                          {Object.entries(countryState.country).map(([code, name]) => (
                            <option key={code} value={code}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-medium text-sm">State</label>
                        <select
                          name="state"
                          required
                          defaultValue=""
                          onChange={(e) =>
                            setAddress((prev) => ({
                              ...prev,
                              state: e.target.value,
                            }))
                          }
                          className="w-full mt-1 p-2 border rounded-md"
                        >
                          <option value="" disabled>
                            Select State
                          </option>

                          {countryCode.map((item) => (
                            <option
                              key={item.code}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={saveAddressHandler}
                      className="w-full py-2 bg-[#2d241b] text-white rounded-lg font-semibold"
                    >
                      Save Address
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* PAYMENT SECTION */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Payment</h2>

              <div className="space-y-3">
                <label className="flex gap-3 items-center">
                  <input
                    type="radio"
                    value="netbanking"
                    checked={address.payment_method === "netbanking"}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, payment_method: e.target.value }))
                    }
                  />
                  Net Banking
                </label>

                <label className="flex gap-3 items-center">
                  <input
                    type="radio"
                    value="cod"
                    checked={address.payment_method === "cod"}
                    onChange={(e) =>
                      setAddress((prev) => ({ ...prev, payment_method: e.target.value }))
                    }
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>

          </div>


          <div className="bg-white shadow-lg rounded-xl p-6 h-fit sticky top-24 space-y-6">

            {/* RIGHT SIDE – ORDER SUMMARY */}
            <div>
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm">

                <div className="flex justify-between">
                  <span>Total (Including Tax)</span>
                  <CurrencyFormatter price={subtotal} />
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <CurrencyFormatter price={address.shipping_price} />
                </div>

                {dis > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Your Savings</span>
                    -<CurrencyFormatter price={dis} />
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Coupon Discount</span>
                    -<CurrencyFormatter price={discount} />
                  </div>
                )}
              </div>

              <hr className="my-3" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <CurrencyFormatter
                  price={subtotal + address.shipping_price - discount}
                />
              </div>
            </div>

            {/* Coupon details show*/}
            {discount > 0 && (
              <div className="mt-3 p-3 border rounded-lg bg-green-50 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium text-green-700">
                    Coupon Applied
                  </span>
                  <span className="font-semibold text-green-800">
                    {appliedCoupon || coupon_code}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Discount</span>
                  <span>- ₹{discount}</span>
                </div>

                {displayCoupon?.valid_until && (
                  <p className="text-xs text-gray-500">
                    Valid till: {formatDate(displayCoupon.valid_until)}
                  </p>
                )}
              </div>
            )}

            {/* Coupon apply button  */}
            {bestCoupon && (
              <div
                className={`mt-3 border rounded-xl p-3 flex justify-between items-center transition${isBestCouponEligible
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
                  }`}
              >
                {/* LEFT CONTENT */}
                <div className="flex-1 pr-3">
                  <p
                    className={`text-sm font-semibold${isBestCouponEligible
                      ? "text-green-700"
                      : "text-gray-600"
                      }`}
                  >
                    Save ₹{bestCouponDiscount} with{" "}
                    <span className="font-bold">
                      {bestCoupon.coupon_code}
                    </span>
                  </p>

                  {isBestCouponEligible ? (
                    <p className="text-xs text-green-600 mt-1">
                      ✅ You can apply this coupon
                    </p>
                  ) : bestCouponRemaining > 0 ? (
                    <p className="text-xs text-orange-600 mt-1">
                      Add ₹{bestCouponRemaining} more to use this coupon
                    </p>
                  ) : null}


                  <button
                    onClick={() => setShowCouponModal(true)}
                    className="text-xs text-green-600 underline mt-1"
                  >
                    View other coupons
                  </button>
                </div>

                {/* RIGHT BUTTON */}
                <button
                  onClick={handleApplyBestCoupon}
                  disabled={
                    appliedCoupon === bestCoupon.coupon_code ||
                    applyingCoupon ||
                    !isBestCouponEligible
                  }
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition whitespace-nowrap ${appliedCoupon === bestCoupon.coupon_code
                    ? "border-green-700 text-green-700 bg-green-100 cursor-not-allowed"
                    : !isBestCouponEligible
                      ? "border-gray-300 text-gray-400 bg-gray-200 cursor-not-allowed"
                      : applyingCoupon
                        ? "border-gray-400 text-gray-400 bg-gray-100 cursor-not-allowed"
                        : "border-green-600 text-green-700 hover:bg-green-100"
                    }`}
                >
                  {appliedCoupon === bestCoupon.coupon_code
                    ? "Applied"
                    : applyingCoupon
                      ? "Applying..."
                      : "Apply"}
                </button>
              </div>
            )}

            {/* Coupon remove button  */}
            {discount > 0 && (
              <button
                onClick={() => {
                  setCoupon_code("");
                  setDiscount(0);
                  setTempCoupon(null);

                  setAppliedCoupon(null);     // ✅ ADD
                  setApplyingCoupon(false);   // ✅ ADD

                  setAddress((prev) => ({
                    ...prev,
                    coupon: "",
                    discount: 0,
                    total: subtotal,
                  }));
                }}
                className="text-xs text-red-600 underline"
              >
                Remove
              </button>
            )}

            {/* FINAL CHECKOUT BUTTON */}
            <button
              onClick={submitCheckout}
              disabled={isProcessing}
              className={`w-full py-3 rounded-lg text-white font-semibold flex justify-center items-center gap-2
    ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#2d241b] hover:bg-[#524232]"}
  `}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Checkout <FaArrowRight />
                </>
              )}
            </button>


          </div>
        </div>
      </div>

      <Modal
        show={editAddressModalOpen}
        size="2xl"
        popup
        onClose={() => setEditAddressModalOpen(false)}
      >
        <h1 className="font-sans text-xl font-semibold p-4 text-center text-gray-800">
          Edit Address
        </h1>

        <Modal.Body className="px-6 pb-8">
          {savedAddress
            .filter((address) => address._id == savedAddressId)
            .map((address) => (
              <form
                onSubmit={(e) => updateAddress(address._id, e)}
                key={address._id}
                className="space-y-8"
              >
                {/* Contact Info */}
                <div className="p-4 rounded-xl bg-gray-50 border">
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Contact Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Fullname */}
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="fullname"
                        className="text-sm font-medium text-gray-700"
                      >
                        Fullname
                      </label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        defaultValue={address.fullname}
                        className="w-full rounded-lg border-gray-300 bg-white p-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                        required
                      />
                    </div>

                    {/* Mobile */}
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="mobile_number"
                        className="text-sm font-medium text-gray-700"
                      >
                        Mobile number
                      </label>
                      <input
                        type="number"
                        id="mobile_number"
                        name="mobile"
                        defaultValue={address.mobile}
                        className="w-full rounded-lg border-gray-300 bg-white p-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="p-4 rounded-xl bg-gray-50 border">
                  <h4 className="text-lg font-medium text-gray-800 mb-3">
                    Shipping Address
                  </h4>

                  <div className="space-y-5">
                    {/* Address Line */}
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="address"
                        className="text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address_line"
                        defaultValue={address.address_line}
                        className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* City */}
                      <div className="flex flex-col space-y-1">
                        <label
                          htmlFor="city"
                          className="text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          defaultValue={address.city}
                          className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                          required
                        />
                      </div>

                      {/* State */}
                      <div className="flex flex-col space-y-1">
                        <label
                          htmlFor="state"
                          className="text-sm font-medium text-gray-700"
                        >
                          State / Province
                        </label>
                        <select
                          id="state"
                          name="state"
                          defaultValue={address.state}
                          className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                          required
                        >
                          {countryCode.map((item) => (
                            <option key={item.code} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Postal Code */}
                      <div className="flex flex-col space-y-1">
                        <label
                          htmlFor="postal_code"
                          className="text-sm font-medium text-gray-700"
                        >
                          Postal code
                        </label>
                        <input
                          type="text"
                          id="postal_code"
                          name="postal_code"
                          defaultValue={address.postal_code}
                          className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                          required
                        />
                      </div>

                      {/* Country */}
                      <div className="flex flex-col space-y-1">
                        <label
                          htmlFor="country"
                          className="text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          defaultValue={address.country}
                          className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                          required
                          onChange={(e) =>
                            setCountryCode(countryState.states[e.target.value])
                          }
                        >
                          {Object.entries(countryState.country).map(
                            ([code, name]) => (
                              <option key={code} value={code}>
                                {name}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#2d241b] text-white rounded-lg shadow hover:bg-[#524232] transition"
                  >
                    Update Address
                  </button>
                </div>
              </form>
            ))}
        </Modal.Body>
      </Modal>

      <Modal
        show={showCouponModal}
        onClose={() => {
          setShowCouponModal(false);
          setTempCoupon(null);
        }}
      >
        <Modal.Header>
          <span className="text-base font-semibold">
            Available Coupons
          </span>
        </Modal.Header>

        <Modal.Body className="space-y-4">

          {/* MANUAL COUPON INPUT */}
          <div className="flex gap-2">
            <input
              value={coupon_code}
              onChange={(e) => setCoupon_code(e.target.value)}
              className="border p-2 rounded-md w-full text-sm"
              placeholder="Enter coupon code"
            />

            <button
              disabled={(() => {
                const c = coupons.find(
                  (x) => x.coupon_code === coupon_code
                );
                return !coupon_code || (c && subtotal < c.min);
              })()}
              onClick={() => isCouponValid(coupon_code)}
              className={`px-4 rounded-md text-sm transition
      ${!coupon_code
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : (() => {
                    const c = coupons.find(
                      (x) => x.coupon_code === coupon_code.toUpperCase()
                    );
                    return c && subtotal < c.min
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#2d241b] hover:bg-[#524232] text-white";
                  })()
                }
    `}
            >
              Apply
            </button>
          </div>

          <hr />

          {/* COUPON LIST */}
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
            {coupons.map((coupon) => {
              const eligible = subtotal >= coupon.min;
              const isFlat = coupon.flat_discount > 0;
              const selected = tempCoupon?._id === coupon._id;


              return (
                <div
                  key={coupon._id}
                  className={`border rounded-lg p-3 transition
              ${selected ? "border-green-600 bg-green-100" : "bg-white"}
              ${!eligible ? "opacity-60" : ""}
            `}
                >
                  {/* TOP ROW */}
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm">
                      {coupon.coupon_code}
                    </p>

                    {isFlat ? (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded animate-pulse">
                        Flat ₹{coupon.flat_discount} OFF
                      </span>
                    ) : (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded animate-pulse">
                        {coupon.discount_percent}% OFF
                      </span>
                    )}
                  </div>

                  {/* DETAILS */}
                  <p className="text-xs text-gray-600 mt-1">
                    Order value: ₹{coupon.min} – ₹{coupon.max || "No limit"}
                  </p>

                  <p className="text-xs text-gray-500">
                    Valid till: {formatDate(coupon.valid_until)}
                  </p>


                  {/* ACTION */}
                  {eligible ? (
                    <button
                      onClick={() => setTempCoupon(coupon)}
                      className={`text-xs mt-2 underline
                  ${selected ? "text-green-700 font-semibold" : "text-green-600"}
                `}
                    >
                      {selected ? "Selected" : "Select"}
                    </button>
                  ) : (
                    <p className="text-xs text-red-500 mt-2">
                      Add ₹{Math.ceil(coupon.min - subtotal)} more to apply
                    </p>

                  )}
                </div>
              );
            })}
          </div>

          {/* FINAL APPLY BUTTON */}
          {tempCoupon && (
            <button
              onClick={() => isCouponValid(tempCoupon.coupon_code)}
              className="w-full bg-[#2d241b] hover:bg-[#524232] transition text-white py-2 rounded-md text-sm font-semibold"
            >
              Apply {tempCoupon.coupon_code}
            </button>
          )}

        </Modal.Body>
      </Modal>


    </>

  );
};

export default CheckOut;

