/* eslint-disable @next/next/no-img-element -- unknown approved CMS hosts fall back to native browser loading. */

import Image from "next/image"

import { canOptimizeImage } from "@/lib/image-hosts"

type ManagedImageProps = {
  src: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  quality?: number
  priority?: boolean
}

export function ManagedImage({ src, alt, className, fill = false, width, height, sizes, quality, priority = false }: ManagedImageProps) {
  if (canOptimizeImage(src)) {
    return <Image src={src} alt={alt} className={className} fill={fill} width={fill ? undefined : width} height={fill ? undefined : height} sizes={sizes} quality={quality} priority={priority} />
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : undefined}
    />
  )
}
