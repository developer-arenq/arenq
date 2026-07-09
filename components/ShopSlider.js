/* eslint-disable react/no-unknown-property */
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const ShopSlider = () => {
  // Use static array outside component to avoid recreation on each render
  const images = [
    "/images/ShopSlider/3.webp",
    "/images/ShopSlider/1.webp",
    "/images/ShopSlider/7.webp",
    "/images/ShopSlider/5.webp",
    "/images/ShopSlider/6.webp",
    "/images/ShopSlider/2.webp",
    "/images/ShopSlider/4.webp",
  ];

  return (
    <div className="px-2 lg:px-2 sm:px-0 md:px-0 relative">
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        showThumbs={false}
        showArrows
        showStatus={false}
        showIndicators={false}
        swipeable
        emulateTouch
      >
        {images.map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt={`Shop Slider Image ${index + 1}`}
              width={1600}
              height={500}
              className="rounded"
              priority={index === 0} // Prioritize loading of first image
              sizes="100vw"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default React.memo(ShopSlider);
