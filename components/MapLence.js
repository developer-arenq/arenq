"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function MagnifierImage({ src, alt, width = 400, height = 400 }) {
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const wrapperRef = useRef(null);

  const lensSize = 160; // Diameter of lens
  const zoom = 2; // Zoom factor

  const handleMouseMove = (e) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Keep lens inside image
    const posX = Math.max(lensSize / 2, Math.min(x, rect.width - lensSize / 2));
    const posY = Math.max(lensSize / 2, Math.min(y, rect.height - lensSize / 2));

    setLensPos({ x: posX, y: posY });
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-md"
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto rounded-lg shadow-lg"
      />

      {showLens && (
        <div
          className="absolute pointer-events-none rounded-full border-2 border-green-600 overflow-hidden"
          style={{
            width: lensSize,
            height: lensSize,
            left: lensPos.x - lensSize / 2,
            top: lensPos.y - lensSize / 2,
          }}
        >
          <div
            className="absolute"
            style={{
              width: `${width * zoom}px`,
              height: `${height * zoom}px`,
              transform: `translate(-${lensPos.x * zoom - lensSize / 1}px, -${lensPos.y * zoom - lensSize / 1}px)`,
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={width * zoom}
              height={height * zoom}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
