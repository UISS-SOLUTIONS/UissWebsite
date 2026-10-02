import { ManagedImage } from "@/components/managed-image";
import { MerchProductOrder } from "@/components/merch/product-order";
import { formatMerchPrice, type MerchProduct } from "@/lib/merch-catalog";

export function MerchProductCard({ product }: { product: MerchProduct }) {
  return (
    <article aria-labelledby={product.id} className="merch-card group min-w-0 rounded-lg border border-line bg-canvas p-3 sm:p-4">
      <div className="merch-image-panel relative aspect-[6/5] overflow-hidden rounded-md bg-surface">
        <span aria-hidden="true" className="absolute left-5 top-5 z-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted">
          <span className={`size-2 rounded-full border border-line ${product.color === "White" ? "bg-canvas" : "bg-ink"}`} />
          {product.color}
        </span>
        <ManagedImage
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1200px) 540px, (min-width: 768px) 46vw, 90vw"
          priority
          className="merch-shirt object-contain p-3 pt-9 sm:p-5 sm:pt-9"
        />
      </div>
      <div className="px-2 pb-3 pt-6 sm:px-3 sm:pb-4">
        <div className="flex flex-col gap-1 xl:flex-row xl:items-baseline xl:justify-between xl:gap-4">
          <h3 id={product.id} className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{product.name}</h3>
          <p className="text-lg font-semibold tabular-nums">{formatMerchPrice(product.price)}</p>
        </div>
        <MerchProductOrder product={product} />
      </div>
    </article>
  );
}
