import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { VibeLayout, labelize } from "@/components/VibeLayout";
import { SuraEmptyState, SuraErrorState, SuraPageSkeleton } from "@/components/SuraStates";
import { VendorCard } from "@/components/VendorCard";
import { CountyPicker } from "@/components/CountyPicker";
import { Seo } from "@/components/Seo";
import { useKenyaLocation } from "@/contexts/KenyaLocationContext";
import { getAllKnownAestheticNames } from "@/contexts/AestheticThemeContext";
import { isKenyanCountyName } from "@shared/kenyaCounties";
import { trpc } from "@/lib/trpc";

const initialFilters = { search: "", county: "All counties", type: "All types", budgetTier: "All ranges", aesthetic: "All aesthetics" };

export default function Discover() {
  const { county: detectedCounty, message: locationMessage, setCounty: setPreferredCounty } = useKenyaLocation();
  const [filters, setFilters] = useState(initialFilters);
  const [countyManuallyAdjusted, setCountyManuallyAdjusted] = useState(false);
  useEffect(() => { if (detectedCounty && !countyManuallyAdjusted) setFilters((current) => ({ ...current, county: detectedCounty })); }, [detectedCounty, countyManuallyAdjusted]);
  const queryInput = useMemo(() => ({ ...filters, type: filters.type === "All types" ? undefined : filters.type }), [filters]);
  const vendors = trpc.vendors.list.useQuery(queryInput);
  const setFilter = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => setFilters((current) => ({ ...current, [key]: value }));
  const activeFilters = Object.values(filters).filter((value) => value && !value.startsWith("All")).length;
  const resetFilters = () => { setCountyManuallyAdjusted(false); setFilters({ ...initialFilters, county: detectedCounty ?? "All counties" }); };

  return <VibeLayout>
    <Seo title="SURA — Discover local makers and companies" description="Search local makers by county, type, price character, and aesthetic direction. Profiles show indicative pricing — confirm availability and a current quote before you commit." />
    <main className="container pb-20 pt-10 sm:pt-14">
      <div className="max-w-2xl">
        <span className="vb-kicker text-[var(--sura-terracotta)]">The local directory</span>
        <h1 className="vb-serif mt-4 text-5xl leading-[0.94] tracking-[-0.045em] text-[var(--sura-ink)] sm:text-6xl">Find the people who can <em className="font-normal text-[var(--sura-accent)]">take it there.</em></h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--sura-sand)]">Search local makers by county, category, price character, and aesthetic direction. Profiles show indicative pricing — confirm availability and a current quote before you commit.</p>
        {detectedCounty && <button onClick={() => { setCountyManuallyAdjusted(false); setFilters((current) => ({ ...current, county: detectedCounty })); }} className="vb-focus mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--sura-soft)] px-3 py-2 text-xs font-bold text-[var(--sura-ochre)]">Showing {detectedCounty} first · use my county</button>}
        {locationMessage && !detectedCounty && <p className="mt-4 max-w-lg text-xs leading-5 text-[var(--sura-sand)]">{locationMessage}</p>}
      </div>
      <section className="mt-10 grid gap-8 lg:grid-cols-[17rem_1fr] lg:items-start">
        <aside className="rounded-[1.5rem] border border-[var(--sura-border)] bg-[var(--sura-paper)] p-5 lg:sticky lg:top-28">
          <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-sm font-bold text-[var(--sura-ink)]"><SlidersHorizontal className="h-4 w-4 text-[var(--sura-accent)]" />Refine the mix</div>{activeFilters > 0 && <button onClick={resetFilters} className="vb-focus inline-flex items-center gap-1 text-xs font-bold text-[var(--sura-accent)] hover:text-[var(--sura-ink)]"><X className="h-3.5 w-3.5" />Clear</button>}</div>
          <div className="mt-5 space-y-4">
            <label className="block"><span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--sura-sand)]">County</span><div className="mt-2"><CountyPicker value={isKenyanCountyName(filters.county) ? filters.county : null} onChange={(county) => { setCountyManuallyAdjusted(true); if (county) { setPreferredCounty(county); setFilter("county", county); } else setFilter("county", "All counties"); }} placeholder="All counties" label="County" /></div></label>
            <FilterSelect label="Type" value={filters.type} onChange={(value) => setFilter("type", value)} options={["All types", ...["thrift", "tailor", "home_studio", "stylist", "creative"].map(labelize)]} values={["All types", "thrift", "tailor", "home_studio", "stylist", "creative"]} />
            <FilterSelect label="Budget" value={filters.budgetTier} onChange={(value) => setFilter("budgetTier", value)} options={["All ranges", "Considered", "Signature", "Statement"]} values={["All ranges", "considered", "signature", "statement"]} />
            <FilterSelect label="Aesthetic" value={filters.aesthetic} onChange={(value) => setFilter("aesthetic", value)} options={["All aesthetics", ...getAllKnownAestheticNames()]} />
          </div>
          {activeFilters > 0 && <div className="mt-5   pt-4"><p className="text-xs font-bold text-[var(--sura-sand)]">Active filters</p><div className="mt-2 flex flex-wrap gap-1.5">{filters.county !== "All counties" && <span className="inline-flex items-center gap-1 rounded-full bg-[var(--sura-soft)] px-2.5 py-1 text-[0.62rem] font-bold text-[var(--sura-sand)]">{filters.county}<button onClick={() => { setCountyManuallyAdjusted(true); setFilter("county", "All counties"); }} className="ml-0.5"><X className="h-2.5 w-2.5" /></button></span>}{filters.type !== "All types" && <span className="inline-flex items-center gap-1 rounded-full bg-[var(--sura-soft)] px-2.5 py-1 text-[0.62rem] font-bold text-[var(--sura-sand)]">{labelize(filters.type)}<button onClick={() => setFilter("type", "All types")} className="ml-0.5"><X className="h-2.5 w-2.5" /></button></span>}{filters.budgetTier !== "All ranges" && <span className="inline-flex items-center gap-1 rounded-full bg-[var(--sura-soft)] px-2.5 py-1 text-[0.62rem] font-bold text-[var(--sura-sand)]">{labelize(filters.budgetTier)}<button onClick={() => setFilter("budgetTier", "All ranges")} className="ml-0.5"><X className="h-2.5 w-2.5" /></button></span>}{filters.aesthetic !== "All aesthetics" && <span className="inline-flex items-center gap-1 rounded-full bg-[var(--sura-soft)] px-2.5 py-1 text-[0.62rem] font-bold text-[var(--sura-sand)]">{filters.aesthetic}<button onClick={() => setFilter("aesthetic", "All aesthetics")} className="ml-0.5"><X className="h-2.5 w-2.5" /></button></span>}</div></div>}
        </aside>
        <div>
          <div className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--sura-accent)]" /><input value={filters.search} onChange={(event) => setFilter("search", event.target.value)} placeholder="Search name, neighbourhood, or category" className="vb-focus w-full rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] py-3 pl-11 pr-4 text-sm text-[var(--sura-ink)] placeholder:text-[var(--sura-placeholder)]" /></div>
          <div className="mt-5 flex items-center justify-between"><p className="text-sm text-[var(--sura-sand)]">{vendors.isLoading ? "Finding sources…" : `${vendors.data?.length ?? 0} local profile${(vendors.data?.length ?? 0) !== 1 ? "s" : ""}`}</p><p className="rounded-full bg-[var(--sura-soft)] px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.08em] text-[var(--sura-sand)]">Live preview</p></div>
          <div className="mt-5">
            {vendors.isLoading && <SuraPageSkeleton cards={6} />}
            {vendors.isError && <SuraErrorState title="The directory needs another moment." copy="Your city and filter choices are still here. Try loading company profiles again when you are ready." onRetry={() => vendors.refetch()} />}
            {!vendors.isLoading && !vendors.isError && (vendors.data?.length ?? 0) === 0 && <SuraEmptyState eyebrow="SURA / LOCAL DIRECTORY" title="Nothing lands here yet." copy="Try broadening the city, aesthetic, or budget range. The directory is intentionally small during this MVP." action={<button onClick={resetFilters} className="vb-button vb-focus rounded-xl border border-[var(--sura-accent)] px-5 py-3 text-sm font-bold text-[var(--sura-primary)]">Reset filters</button>} />}
            {!vendors.isLoading && !vendors.isError && (vendors.data?.length ?? 0) > 0 && <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{vendors.data?.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)}</div>}
          </div>
        </div>
      </section>
    </main>
  </VibeLayout>;
}

function FilterSelect({ label, value, onChange, options, values }: { label: string; value: string; onChange: (value: string) => void; options: string[]; values?: string[] }) {
  return <label className="block"><span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--sura-sand)]">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="vb-focus mt-2 w-full rounded-xl border border-[var(--sura-border)] bg-[var(--sura-paper)] px-3 py-2.5 text-sm text-[var(--sura-ink)]">{options.map((option, index) => <option key={option} value={values?.[index] ?? option}>{option}</option>)}</select></label>;
}
