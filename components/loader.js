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
     
    >

      <div
        className="
        relative 
        flex 
        justify-center 
        items-center
        "
      >

       


      


        {/* Logo */}
        <div
          className="p-2"
        >

          <img
            src="/images/logo/Arenq-logo-animation.2.gif"
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