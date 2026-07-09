"use client";
import { useRouter } from "next/router";
import { FaShoppingCart } from "react-icons/fa";

const EmptyCart = () => {
  const router = useRouter();

  const handleAddItems = () => {
    router.push("/search?category=all"); 
  };

  return (
    <div className="flex flex-col justify-center items-center h-full text-center px-4">
      <div className="bg-green-100 p-6 rounded-full mb-4">
        <FaShoppingCart className="text-4xl text-green-600" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Your cart is empty
      </h2>

      <p className="text-gray-500 mb-6">
        Looks like you haven’t added anything to your cart yet.
      </p>

      <button
        onClick={handleAddItems}
        className="bg-[#2d241b] text-white px-6 py-2 rounded-full hover:bg-green-500 transition duration-300"
      >
        Add Items
      </button>
    </div>
  );
};

export default EmptyCart;
