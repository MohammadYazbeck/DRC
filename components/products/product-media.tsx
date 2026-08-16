import Image from "next/image";
import type { Product, ProductBrandLogo } from "@/lib/content";
import { cn } from "@/lib/utils";

const fallbackImage = "/images/brands/drc-logo-transparent-cropped.png";

export function ProductBrandLogos({
  product,
  className,
  sizes = "96px",
  alt = ""
}: {
  product: Pick<Product, "logo" | "logos">;
  className?: string;
  sizes?: string;
  alt?: string;
}) {
  const logos: ProductBrandLogo[] = product.logos?.length
    ? product.logos
    : [{ name: alt, src: product.logo || fallbackImage }];

  return (
    <span dir="ltr" className={cn("flex items-center justify-center gap-1.5", className)}>
      {logos.map((logo) => (
        <span
          key={logo.src}
          className={cn("relative h-full min-w-0", logos.length > 1 ? "w-1/2" : "w-full")}
        >
          <Image src={logo.src} alt={alt ? logo.name : ""} fill sizes={sizes} className="object-contain" />
        </span>
      ))}
    </span>
  );
}

export function ProductCardMedia({
  product,
  alt,
  sizes,
  imageClassName
}: {
  product: Pick<Product, "image" | "cardImage" | "cardImages">;
  alt: string;
  sizes: string;
  imageClassName?: string;
}) {
  const images = product.cardImages?.length ? product.cardImages : [product.cardImage || product.image || fallbackImage];

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-contain", imageClassName)}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center px-2 py-3 sm:px-4 sm:py-5">
      {images.slice(0, 2).map((src, index) => (
        <span
          key={src}
          className={cn(
            "relative h-full w-[58%] min-w-0 transition duration-300",
            index === 0 ? "z-10 translate-x-3 -rotate-2" : "z-0 -translate-x-3 rotate-2"
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-contain drop-shadow-[0_18px_24px_rgba(26,75,135,0.14)]"
          />
        </span>
      ))}
    </div>
  );
}
