"use client";

const Loader = () => {
  return (
    <div
      className="
      fixed inset-0 
      z-50 
      flex 
      justify-center 
      items-center
      backdrop-blur-md
      "
      style={{
        background:
          "rgba(6,20,40,0.35)",
      }}
    >

      <div
        className="
        relative 
        flex 
        justify-center 
        items-center
        "
      >

        {/* Outer Glow */}
        <div
          className="
          absolute 
          h-36 w-36
          rounded-full
          "
          style={{
            background:
              "radial-gradient(circle,hsl(145 70% 42% / .35),transparent 65%)",
          }}
        />


        {/* Spinner */}
        <div
          className="
          absolute 
          animate-spin 
          rounded-full 
          h-32 w-32 
          border-t-4 
          border-b-4
          "
          style={{
            borderColor:
              "hsl(145 70% 45%) transparent",
          }}
        />


        {/* Logo */}
        <div
          className="
          relative 
          h-28 
          w-28
          rounded-full
          bg-white
          shadow-xl
          p-2
          "
        >

          <img
            src="/images/logo/Arenq_light.png"
            alt="Loading..."
            className="
            rounded-full 
            object-contain
            h-full 
            w-full
            "
          />

        </div>

      </div>

    </div>
  );
};

export default Loader;