import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { SuraImage } from "./SuraImage";

export function PortfolioCarousel({ images, alt, className }: { images: string[]; alt: string; className?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1, duration: 22 });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (images.length <= 1) {
    return <SuraImage src={images[0]} fallbackSrc="/assets/sura-auth-street.jpg" alt={alt} className={className} />;
  }

  return <div className="relative">
    <div ref={emblaRef} className="overflow-hidden">
      <div className="flex">
        {images.map((src, index) => (
          <SuraImage key={`${src}-${index}`} src={src} fallbackSrc="/assets/sura-auth-street.jpg" alt={`${alt} ${index + 1}`} className={`${className ?? ""} w-full shrink-0 grow-0 basis-full`} />
        ))}
      </div>
    </div>
    <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
      {images.map((_, index) => (
        <span key={index} className={`h-1 rounded-full transition-all ${index === selected ? "w-4 bg-[var(--sura-paper)]" : "w-1.5 bg-[var(--sura-paper)]/60"}`} />
      ))}
    </div>
  </div>;
}