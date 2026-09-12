import { ArrowUpRight, Clock, MapPin, Tag } from "lucide-react";
import { Link } from "wouter";
import type { DemoVendor } from "../../../server/vibebuild-data";
import { formatKes, labelize } from "./VibeLayout";
import { PortfolioCarousel } from "./PortfolioCarousel";
import { SuraImage } from "./SuraImage";

const tierColors: Record<string, string> = {
  considered: "bg-[var(--sura-soft)] text-[var(--sura-sand)]",
  signature: "bg-[#caf240]/20 text-[#3a5c0f]",
  statement: "bg-[#f2c6b3] text-[#653526]",
};

const availabilityStyles: Record<string, { dot: string; label: string }> = {
  same_day: { dot: "bg-emerald-500", label: "Same day" },
  soon: { dot: "bg-amber-500", label: "1–3 days" },
  book_ahead: { dot: "bg-neutral-400", label: "Book ahead" },
};

function getAvailability(vendor: DemoVendor) {
  if (vendor.type === "tailor") return availabilityStyles.book_ahead;
  if (vendor.type === "home_studio") return availabilityStyles.book_ahead;
  if (vendor.type === "stylist") return availabilityStyles.soon;
  return availabilityStyles.same_day;
}

export function VendorCard({ vendor, compact = false }: { vendor: DemoVendor; compact?: boolean }) {
  const availability = getAvailability(vendor);
  const serviceCount = vendor.services.length;
  const floor = vendor.priceFloorKes;
  const ceiling = vendor.priceCeilingKes;

  return (
    <article className="group overflow-hidden rounded-[1.4rem] border border-[var(--sura-border)] bg-[var(--sura-paper)] shadow-[0_12px_32px_rgba(53,39,22,0.06)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(53,39,22,0.1)]">
      <Link href={`/vendors/${vendor.slug}`} className="block overflow-hidden">
        <PortfolioCarousel images={vendor.portfolio.slice(0, 4)} alt={`${vendor.name} demonstration portfolio`} className={`vb-image w-full object-cover ${compact ? "h-44" : "h-60"}`} />
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="vb-kicker text-[var(--sura-terracotta)]">{labelize(vendor.type)}</span>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] ${tierColors[vendor.budgetTier] ?? "bg-[var(--sura-soft)] text-[var(--sura-sand)]"}`}>{vendor.budgetTier}</span>
            <span className="rounded-full border border-[var(--sura-border)] px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[var(--sura-sand)]">Local</span>
          </div>
        </div>
        <Link href={`/vendors/${vendor.slug}`} className="vb-focus mt-3 flex items-start justify-between gap-3 text-[var(--sura-ink)]">
          <h3 className="vb-serif text-2xl leading-[1.05]">{vendor.name}</h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[var(--sura-accent)]" />
        </Link>
        <p className="mt-2 text-sm leading-6 text-[var(--sura-sand)]">{vendor.description}</p>
        {vendor.aestheticTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {vendor.aestheticTags.slice(0, 3).map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-[var(--sura-soft)] px-2 py-0.5 text-[0.6rem] font-semibold text-[var(--sura-sand)]"><Tag className="h-2.5 w-2.5" />{tag}</span>
            ))}
          </div>
        )}
        <div className="mt-3 flex items-center gap-1.5 text-[0.62rem] font-semibold text-[var(--sura-sand)]">
          <span className={`h-1.5 w-1.5 rounded-full ${availability.dot}`} />
          <Clock className="h-3 w-3 text-[var(--sura-accent)]" />
          {availability.label}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2   pt-3 text-xs text-[var(--sura-sand)]">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[var(--sura-ochre)]" />{vendor.neighbourhood}, {vendor.city}</span>
          <span className="font-semibold text-[var(--sura-ink)]">{serviceCount} services · {formatKes(floor)} – {formatKes(ceiling)}</span>
        </div>
      </div>
    </article>
  );
}
