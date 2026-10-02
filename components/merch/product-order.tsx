"use client";

import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import { getMerchOrderUrl, type MerchProduct, type MerchSize } from "@/lib/merch-catalog";

export function MerchProductOrder({ product }: { product: MerchProduct }) {
  const [selectedSize, setSelectedSize] = useState<MerchSize | null>(null);

  return (
    <div className="mt-5">
      <FieldSet aria-label={`Size for ${product.name}`} className="gap-0">
        <FieldLegend className="mb-2 text-sm">Size</FieldLegend>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <label key={size} className="relative block">
              <input
                type="radio"
                name={`size-${product.id}`}
                value={size}
                checked={selectedSize === size}
                onChange={() => setSelectedSize(size)}
                required
                className="peer sr-only"
              />
              <span className="merch-size-option inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md border border-line bg-canvas px-3 text-sm font-semibold text-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-canvas peer-focus:outline peer-focus:outline-[3px] peer-focus:outline-focus peer-focus:outline-offset-[3px]">
                {size}
              </span>
            </label>
          ))}
        </div>
      </FieldSet>
      {selectedSize ? (
        <Button asChild size="lg" className="mt-5 w-full focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2">
          <a
            href={getMerchOrderUrl(product, selectedSize)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${product.name}, size ${selectedSize}, on WhatsApp (opens in a new tab)`}
          >
            <MessageCircle aria-hidden="true" />
            Order on WhatsApp
            <ArrowUpRight aria-hidden="true" className="ml-auto" />
          </a>
        </Button>
      ) : (
        <Button disabled size="lg" className="mt-5 w-full" aria-label={`Choose a size to order ${product.name} on WhatsApp`}>
          <MessageCircle aria-hidden="true" /> Choose a size
        </Button>
      )}
    </div>
  );
}
