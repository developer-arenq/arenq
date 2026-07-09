"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import Product from "./card";

const RelatedProduct = ({ recommendations }) => {
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: "free-snap",
    slides: {
      perView: 2,
      spacing: 8,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3, spacing: 10 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 12 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 5, spacing: 12 },
      },
    },
  });

  if (!recommendations?.length) return null;

  return (
    <div className="bg-white py-1">
      <h2 className="text-xl md:text-2xl font-bold text-center text-green-700 mb-4">
        Related Products
      </h2>

      <div ref={sliderRef} className="keen-slider">
        {recommendations.map((item) => (
          <div key={item._id} className="keen-slider__slide">
            <div className="scale-90"> {/* 👈 card small */}
              <Product
                product={{
                  _id: item._id,
                  title: item.name,
                  price: item.price,
                  MRP: item.MRP,
                  category: item.category_id?.name,
                  image: item.main_image,
                  alt_text: item.alt_text,
                  out_of_stock: item.out_of_stock,
                  slug: item.slug,
                  rating: item.rating,
                  numReviews: item.numReviews,
                  SKU: item.SKU,
                  label: item.label || "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
