export const optimizedImageHosts = [
  "images.unsplash.com",
  "res.cloudinary.com",
  "images.zenblog.com",
  "img.freepik.com",
  "media.istockphoto.com",
] as const

export function canOptimizeImage(src: string) {
  if (src.startsWith("/")) return true

  try {
    return optimizedImageHosts.includes(new URL(src).hostname as (typeof optimizedImageHosts)[number])
  } catch {
    return false
  }
}
