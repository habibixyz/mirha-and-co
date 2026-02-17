"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="w-full">

      {/* Main Image */}
      <div className="relative w-full aspect-[4/5] mb-6 overflow-hidden">
        <Image
          src={active}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img) => (
          <button
            key={img}
            onClick={() => setActive(img)}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src={img}
              alt={alt}
              fill
              className={`object-cover transition ${
                active === img ? "opacity-100" : "opacity-60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
