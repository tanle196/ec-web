"use client";

import { useState } from "react";
import Image from "next/image";

const NO_IMAGE = "/no-image.svg";

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
} & (
  | { fill: true; width?: never; height?: never }
  | { fill?: false; width: number; height: number }
);

export function ProductImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority,
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src || NO_IMAGE);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      {...(fill ? { fill: true } : { width, height })}
      className={className}
      priority={priority}
      onError={() => setImgSrc(NO_IMAGE)}
    />
  );
}
