import { ManagedImage } from "@/components/managed-image";
import { cn } from "@/lib/utils";
import type { ExperienceMedia } from "@/lib/experience-catalog";

export function ExperienceCover({
  media,
  className,
}: {
  media: ExperienceMedia;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-surface", className)}>
      <ManagedImage
        src={media.src}
        alt={media.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
