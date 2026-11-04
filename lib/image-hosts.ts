export const optimizedImageHosts = [
  "images.unsplash.com",
  "res.cloudinary.com",
  "images.zenblog.com",
  "img.freepik.com",
  "media.istockphoto.com",
] as const;

export function canOptimizeImage(src: string) {
  if (src.startsWith("/")) return true;

  try {
    const hostname = new URL(src).hostname;

    return optimizedImageHosts.some((knownHost) => knownHost === hostname);
  } catch {
    return false;
  }
}
