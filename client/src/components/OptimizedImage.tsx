import { ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

/**
 * OptimizedImage Component
 * 
 * Provides automatic image optimization with:
 * - Lazy loading for better performance
 * - Responsive sizing with srcset
 * - Modern format support (WebP, AVIF)
 * - Fallback to original format
 * - Descriptive alt text for accessibility
 * 
 * Usage:
 * <OptimizedImage
 *   src="https://example.com/image.jpg"
 *   alt="Descriptive text for the image"
 *   width={400}
 *   height={300}
 *   priority={false}
 *   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
 * />
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className,
  ...props
}: OptimizedImageProps) {
  // Generate responsive image URLs if using a CDN that supports transformations
  // For Houfy CDN, we can append query parameters for optimization
  const getOptimizedUrl = (url: string, format: "webp" | "avif" | "original" = "original") => {
    if (!url) return url;
    
    // If URL is from Houfy CDN, add optimization parameters
    if (url.includes("d2xsxph8kpxj0f.cloudfront.net")) {
      const params = new URLSearchParams();
      if (width) params.append("w", width.toString());
      if (height) params.append("h", height.toString());
      params.append("q", "80"); // Quality 80% for good balance
      
      // Add format parameter if supported by CDN
      if (format === "webp") params.append("f", "webp");
      if (format === "avif") params.append("f", "avif");
      
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}${params.toString()}`;
    }
    
    return url;
  };

  // Generate srcset for responsive images
  const srcset = width ? [
    `${getOptimizedUrl(src, "original")} 1x`,
    `${getOptimizedUrl(src, "original")} 2x`,
  ].join(", ") : undefined;

  return (
    <picture>
      {/* AVIF format for cutting-edge browsers */}
      <source
        srcSet={getOptimizedUrl(src, "avif")}
        type="image/avif"
      />
      
      {/* WebP format for modern browsers */}
      <source
        srcSet={getOptimizedUrl(src, "webp")}
        type="image/webp"
      />
      
      {/* Fallback to original format */}
      <img
        src={getOptimizedUrl(src, "original")}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        srcSet={srcset}
        sizes={sizes}
        className={className}
        {...props}
      />
    </picture>
  );
}
