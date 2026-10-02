export const merchSizes = ["M", "L", "XL", "XXL"] as const;
export type MerchSize = (typeof merchSizes)[number];

export type MerchProduct = {
  id: string;
  name: string;
  color: string;
  price: number;
  image: string;
  imageAlt: string;
  sizes: readonly MerchSize[];
};

export const merchWhatsAppNumber = "255741231633";

export const merchCatalog: readonly MerchProduct[] = [
  {
    id: "uiss-polo-white",
    name: "UISS Polo — White",
    color: "White",
    price: 20_000,
    image: "/merch/uiss-polo-white-front-v2.png",
    imageAlt: "Front of the white UISS polo with the UDSM crest and black UISS chest logo",
    sizes: merchSizes,
  },
  {
    id: "uiss-polo-black",
    name: "UISS Polo — Black",
    color: "Black",
    price: 20_000,
    image: "/merch/uiss-polo-black-front.png",
    imageAlt: "Front of the black UISS polo with the UDSM crest and gold and white UISS chest logo",
    sizes: merchSizes,
  },
];

export function formatMerchPrice(price: number) {
  return `Tsh ${price.toLocaleString("en-US")}`;
}

export function getMerchOrderUrl(product: MerchProduct, size: MerchSize) {
  const message = `Hi UISS, I’d like to order the ${product.name}, size ${size} (${formatMerchPrice(product.price)}). Please confirm availability and pickup or delivery.`;
  return `https://wa.me/${merchWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}
