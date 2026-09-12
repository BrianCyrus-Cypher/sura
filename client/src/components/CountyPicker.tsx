import { Command } from "cmdk";
import { Check, Loader2, LocateFixed, MapPin, Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useKenyaLocation } from "@/contexts/KenyaLocationContext";
import { KENYAN_COUNTIES, KENYAN_REGIONS, countiesByRegion, type KenyanCountyName } from "@shared/kenyaCounties";

type CountyPickerProps = {
  value: KenyanCountyName | null;
  onChange: (value: KenyanCountyName | null) => void;
  label?: string;
  placeholder?: string;
  allowClear?: boolean;
  compact?: boolean;
  align?: "left" | "right";
};

export function CountyPicker({ value, onChange, label = "County", placeholder = "Choose a county …", allowClear = true, compact = false, align = "left" }: CountyPickerProps) {
  const { isLocating, message, requestLocation, setCounty } = useKenyaLocation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const grouped = useMemo(() => KENYAN_REGIONS.map((region) => ({ region, counties: countiesByRegion(region).filter((c) => c.name.toLowerCase().includes(search.trim().toLowerCase())) })).filter((group) => group.counties.length > 0), [search]);

  const select = (county: KenyanCountyName | null) => {
    setCounty(county);
    onChange(county);
    setOpen(false);
    setSearch("");
  };

  const detect = () => {
    requestLocation();
  };

  const selectedCounty = value ? KENYAN_COUNTIES.find((c) => c.name === value) : undefined;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`vb-focus inline-flex w-full items-center justify-between gap-2 rounded-xl border border-[var(--sura-border)] bg-[var(--sura-paper)] text-left font-semibold text-[var(--sura-ink)] ${compact ? "px-3 py-2 text-xs" : "px-3 py-2.5 text-sm"}`}
      >
        <span className="flex min-w-0 items-center gap-2 text-[var(--sura-ink)]">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--sura-ochre)]" />
          <span className="truncate">{value ? (selectedCounty ? `${value}` : value) : placeholder}</span>
        </span>
        <span className={`text-[0.6rem] font-bold uppercase tracking-[0.08em] text-[var(--sura-sand)] transition-transform ${open ? "rotate-180" : ""}`}>{label}</span>
      </button>

      {open && (
        <div className={`absolute ${align === "right" ? "right-0" : "left-0"} top-[calc(100%+0.45rem)] z-50 w-[min(19rem,calc(100vw-1rem))] overflow-hidden rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] shadow-[0_18px_45px_rgba(48,33,16,0.18)]`}>
          <div className="flex items-center gap-2 border-b border-[var(--sura-border)] px-3 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-[var(--sura-accent)]" />
            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search all 47 counties …"
              className="vb-focus w-full bg-transparent text-sm font-semibold text-[var(--sura-ink)] placeholder:text-[var(--sura-placeholder)] outline-none"
              aria-label={`Search ${label}`}
            />
          </div>

          <div className="px-2 pt-2">
            <button
              onClick={detect}
              type="button"
              className="vb-focus flex w-full items-center gap-2 rounded-xl bg-[var(--sura-soft)]/70 px-3 py-2.5 text-left text-sm font-bold text-[var(--sura-accent)] hover:bg-[var(--sura-soft)]"
            >
              {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
              {isLocating ? "Detecting your location …" : "Use my current location"}
            </button>
            {message && open && <p className="mt-1.5 px-1 text-[0.65rem] leading-4 text-[var(--sura-sand)]">{message}</p>}
          </div>

          <Command className="mt-1" label={label}>
            <Command.List className="max-h-[17rem] overflow-y-auto overscroll-contain px-1.5 pb-2">
              {search.trim() === "" && allowClear && <Command.Item onSelect={() => select(null)} className={`flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-sm font-semibold text-[var(--sura-accent)] aria-selected:bg-[var(--sura-soft)] data-[selected=true]:bg-[var(--sura-soft)] ${!value ? "bg-[var(--sura-soft)]" : ""}`}>{!value ? <><span>All counties</span><Check className="h-4 w-4" /></> : "All counties"}</Command.Item>}
              {grouped.map((group) => (
                <Command.Group key={group.region} heading={<span className="px-1 py-1.5 text-[0.6rem] font-black uppercase tracking-[0.1em] text-[var(--sura-sand)]">{group.region}</span>}>
                  {group.counties.map((county) => (
                    <Command.Item
                      key={county.name}
                      value={`${county.name} ${county.capital} ${county.region}`}
                      onSelect={() => select(county.name)}
                      className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-[var(--sura-ink)] data-[selected=true]:bg-[var(--sura-soft)] aria-selected:bg-[var(--sura-soft)] ${value === county.name ? "bg-[var(--sura-soft)]" : ""}`}
                    >
                      <span className="min-w-0"><span className="block truncate">{county.name}</span><span className="block text-[0.62rem] font-medium text-[var(--sura-sand)]">{county.capital}{county.capital.toLowerCase() !== county.name.toLowerCase() ? ` · ${county.region}` : ""}</span></span>
                      {value === county.name && <Check className="h-4 w-4 shrink-0 text-[var(--sura-accent)]" />}
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
              {grouped.every((group) => group.counties.length === 0) && <Command.Empty className="py-6 text-center text-sm font-semibold text-[var(--sura-sand)]">No counties match “{search}”.</Command.Empty>}
            </Command.List>
          </Command>
        </div>
      )}
    </div>
  );
}