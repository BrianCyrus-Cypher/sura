import { ArrowLeft, ArrowUpRight, Check, CircleAlert, Loader2, MapPin, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { VibeLayout, formatKes } from "@/components/VibeLayout";
import { InquiryPanel } from "@/components/InquiryPanel";
import { SuraImage } from "@/components/SuraImage";
import { SuraErrorState, SuraProcessing } from "@/components/SuraStates";
import { Seo } from "@/components/Seo";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { useKenyaLocation } from "@/contexts/KenyaLocationContext";
import { getAllKnownAestheticNames, useAestheticTheme } from "@/contexts/AestheticThemeContext";
import { CountyPicker } from "@/components/CountyPicker";
import type { KenyanCountyName } from "@shared/kenyaCounties";
import { isKenyanCountyName } from "@shared/kenyaCounties";
import { trpc } from "@/lib/trpc";
import { markBuildSaved } from "@/lib/onboarding";
import type { DemoBuild, DemoVendor } from "../../../server/vibebuild-data";

const lifestyles = [
  { label: "Everyday", description: "Daily essentials that feel put together without trying too hard." },
  { label: "Creative Work", description: "Pieces that keep up with studio hours, site visits, and long making sessions." },
  { label: "Celebration", description: "Outfits and settings for weddings, launches, and important gatherings." },
  { label: "Home Refresh", description: "Small shifts that make a room feel new — textiles, objects, soft lighting." },
  { label: "Hosting", description: "What your space and table look like when people come over." },
  { label: "Campus", description: "Budget-forward, expressive pieces that hold up through lectures and socials." },
  { label: "New Move", description: "Setting up a new place — from bedding to kitchen basics to entryway details." },
];
const priorities = ["Polish", "Value", "Warmth", "Presence", "Function"];
const STEP_TOTAL = 5;

type RecommendationData = {
  build: DemoBuild;
  selectedVendors: DemoVendor[];
  withinBudget: boolean;
  budgetGapKes: number;
  transparencyNote: string;
  personalisationNote: string;
};

function getStepIndex(brief: { budgetKes: number; city: string; lifestyle: string; aesthetic: string; priority: string }) {
  let step = 0;
  if (brief.budgetKes > 500) step++;
  if (brief.city) step++;
  if (brief.lifestyle) step++;
  if (brief.aesthetic) step++;
  if (brief.priority) step++;
  return step;
}

function ChoiceRow({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return <div><p className="mb-3 text-sm font-semibold text-[var(--sura-ink)]">{label}</p><div className="flex flex-wrap gap-2">{options.map((option) => <button key={option} onClick={() => onChange(option)} className={`vb-button vb-focus rounded-full border px-3.5 py-2 text-xs font-semibold sm:text-sm transition-colors ${value === option ? "border-[var(--sura-primary)] bg-[var(--sura-primary)] text-[#fbf8f2]" : "border-[var(--sura-border)] bg-[var(--sura-paper)] text-[var(--sura-ink)]"}`}>{option}</button>)}</div></div>;
}

function LifestyleChoiceRow({ label, options, value, onChange }: { label: string; options: Array<{ label: string; description: string }>; value: string; onChange: (value: string) => void }) {
  return <div><p className="mb-3 text-sm font-semibold text-[var(--sura-ink)]">{label}</p><div className="space-y-2">{options.map(({ label: option, description }) => <button key={option} onClick={() => onChange(option)} className={`vb-button vb-focus w-full rounded-xl border px-4 py-3 text-left transition-colors ${value === option ? "border-[var(--sura-primary)] bg-[var(--sura-primary)]/10" : "border-[var(--sura-border)] bg-[var(--sura-paper)] hover:bg-[var(--sura-soft)]/60"}`}><span className={`block text-sm font-semibold ${value === option ? "text-[var(--sura-primary)]" : "text-[var(--sura-ink)]"}`}>{option}</span><span className="mt-0.5 block text-xs text-[var(--sura-sand)]/65">{description}</span></button>)}</div></div>;
}

export default function BuildBrief() {
  const { county: detectedCounty, message: locationMessage, setCounty: setPreferredCounty } = useKenyaLocation();
  const { aesthetic, preferenceMix, setAesthetic } = useAestheticTheme();
  const { isAuthenticated } = useAuth();
  const savedAestheticMix = trpc.account.aestheticPreferences.useQuery(undefined, { enabled: isAuthenticated });
  const persistedMix = (savedAestheticMix.data?.aesthetics ?? []).filter((name) => getAllKnownAestheticNames().includes(name));
  const expressionMix = persistedMix.length ? persistedMix : preferenceMix;
  const allAesthetics = getAllKnownAestheticNames();
  const [brief, setBrief] = useState({ budgetKes: 12000, city: "Nairobi", lifestyle: "Creative Work", aesthetic, priority: "Polish" });
  const [submitted, setSubmitted] = useState(false);
  const [cityEdited, setCityEdited] = useState(false);
  useEffect(() => {
    try {
      const fromQuery = Number(new URLSearchParams(window.location.search).get("budget"));
      const fromStorage = Number(window.localStorage.getItem("sura-running-budget"));
      const candidate = [fromQuery, fromStorage].find((value) => Number.isFinite(value) && value >= 500);
      if (candidate) setBrief((current) => ({ ...current, budgetKes: Math.round(candidate) }));
    } catch {
      // search or storage unavailable — leave the default brief alone
    }
  }, []);
  useEffect(() => {
    if (detectedCounty && !cityEdited) {
      setBrief((current) => ({ ...current, city: detectedCounty }));
      setSubmitted(false);
    }
  }, [detectedCounty, cityEdited]);
  useEffect(() => {
    setBrief((current) => current.aesthetic === aesthetic ? current : { ...current, aesthetic });
    setSubmitted(false);
  }, [aesthetic]);
  const queryInput = useMemo(() => ({ ...brief, aestheticMix: expressionMix }), [brief, expressionMix]);
  const recommendation = trpc.builds.recommend.useQuery(queryInput, { enabled: submitted });
  const revise = <K extends keyof typeof brief>(key: K, value: (typeof brief)[K]) => { setBrief((current) => ({ ...current, [key]: value })); setSubmitted(false); };
  const step = getStepIndex(brief);

  return <VibeLayout>
    <Seo title="SURA — Start a build brief" description="Turn a feeling, room, occasion, or idea into a clear local brief. Start with a budget, city, lifestyle, and the aesthetic direction you care about." />
    <main className="container pb-20 pt-8 sm:pt-12">
      <Link href="/" className="vb-focus inline-flex items-center gap-2 text-sm font-semibold text-[var(--sura-accent)] hover:text-[var(--sura-accent)]"><ArrowLeft className="h-4 w-4" />Back to the overview</Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <span className="vb-kicker text-[var(--sura-terracotta)]">Your build brief</span>
          <h1 className="vb-serif mt-4 text-5xl leading-[0.94] tracking-[-0.045em] text-[var(--sura-ink)] sm:text-6xl">A plan that begins with <em className="font-normal text-[var(--sura-accent)]">what is real.</em></h1>
          <p className="mt-5 max-w-md text-base leading-7 text-[var(--sura-sand)]">There is no ideal number here. Give us the spend, city, and feeling you want to create. We will show a transparent direction you can shape.</p>
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] p-4 text-sm leading-6 text-[var(--sura-sand)]"><Sparkles className="h-5 w-5 shrink-0 text-[var(--sura-accent)]" />Recommendations use indicative local pricing and honest ranges — confirm details with the maker before you commit.</div>

          <div className="mt-6 rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] p-4">
            <div className="flex items-center justify-between">
              <span className="vb-kicker text-[var(--sura-terracotta)]">Progress</span>
              <span className="text-xs font-bold text-[var(--sura-accent-strong)]">{step} of {STEP_TOTAL}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--sura-soft)]">
              <div className="h-full rounded-full bg-[#ae6c36] transition-all duration-300" style={{ width: `${(step / STEP_TOTAL) * 100}%` }} />
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-[var(--sura-soft)] p-4">
            <p className="vb-kicker text-[var(--sura-terracotta)]">Your expression lens</p>
            <p className="mt-2 text-sm leading-6 text-[var(--sura-ink)]">{expressionMix.join(" · ")}</p>
            <p className="mt-2 text-xs leading-5 text-[var(--sura-accent-strong)]">Your active direction guides this brief first. Change it any time; the rest of your saved mix keeps the wider SURA experience personal.</p>
          </div>

          {submitted && recommendation.data && (
            <div className="mt-4 rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-soft)] p-4">
              <p className="vb-kicker text-[var(--sura-terracotta)]">Live estimate</p>
              <p className="mt-2 text-2xl font-bold text-[var(--sura-ink)]">{formatKes((recommendation.data as RecommendationData).build.totalMinKes)} – {formatKes((recommendation.data as RecommendationData).build.totalMaxKes)}</p>
              <p className="mt-1 text-xs text-[var(--sura-accent-strong)]">Based on your {brief.city} brief at {formatKes(brief.budgetKes)} budget</p>
            </div>
          )}
        </aside>

        <div className="space-y-6">
          <section className="rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] p-5 shadow-[0_16px_40px_rgba(62,43,22,0.06)] sm:p-7">
            <div className="flex items-center justify-between   pb-5">
              <div><p className="vb-kicker text-[var(--sura-terracotta)]">Five clear inputs</p><h2 className="vb-serif mt-2 text-3xl text-[var(--sura-ink)]">Shape your brief</h2></div>
              <span className="rounded-full bg-[var(--sura-soft)] px-3 py-1.5 text-xs font-bold text-[var(--sura-sand)]">Step {step} of {STEP_TOTAL}</span>
            </div>
            <div className="mt-7 space-y-7">
              <div>
                <label htmlFor="budget" className="text-sm font-semibold text-[var(--sura-ink)]">What would you like to spend?</label>
                <div className="mt-3 flex items-center rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] px-4 py-2">
                  <span className="text-sm font-bold text-[var(--sura-accent)]">KES</span>
                  <input id="budget" type="number" min="500" step="500" value={brief.budgetKes} onChange={(event) => revise("budgetKes", Math.max(500, Number(event.target.value) || 500))} className="vb-focus w-full bg-transparent px-3 py-2 text-xl font-semibold text-[var(--sura-ink)] outline-none" />
                </div>
                <p className="mt-2 text-xs text-[var(--sura-sand)]">Start wherever makes sense. We will show an honest range, not a pressure point.</p>
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between"><p className="text-sm font-semibold text-[var(--sura-ink)]">Which county are you sourcing from?</p>{brief.city && <span className="rounded-full bg-[var(--sura-soft)] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-[var(--sura-sand)]">Kenya · 47 counties</span>}</div>
                <CountyPicker value={(isKenyanCountyName(brief.city) ? brief.city : null)} onChange={(county) => { setCityEdited(true); if (county) { setPreferredCounty(county); revise("city", county); } }} placeholder="Search all 47 Kenyan counties …" label="County" />
                {detectedCounty && <p className="mt-3 inline-flex rounded-full bg-[var(--sura-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--sura-sand)]">Using your area: {detectedCounty}</p>}
                {locationMessage && !detectedCounty && <p className="mt-3 text-xs leading-5 text-[var(--sura-sand)]">{locationMessage}</p>}
              </div>
              <LifestyleChoiceRow label="What is this build supporting?" options={lifestyles} value={brief.lifestyle} onChange={(value) => revise("lifestyle", value)} />
              <ChoiceRow label="Which direction feels most like you?" options={allAesthetics.slice(0, 10)} value={brief.aesthetic} onChange={(value) => { setAesthetic(value); revise("aesthetic", value); }} />
              <ChoiceRow label="What matters most right now?" options={priorities} value={brief.priority} onChange={(value) => revise("priority", value)} />
              <button onClick={() => setSubmitted(true)} style={{ backgroundColor: "var(--sura-signal)", color: "var(--sura-on-signal)" }} className="vb-button vb-focus inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold shadow-[0_12px_25px_rgba(39,28,18,0.14)]">Show my local build direction <ArrowUpRight className="h-4 w-4" /></button>
            </div>
          </section>

          {submitted && <section aria-live="polite">
            {recommendation.isLoading && <SuraProcessing eyebrow="SURA / BUILD DIRECTION" title="Shaping the right edit." copy="Balancing your budget, purpose, aesthetic, and selected local city." />}
            {recommendation.isError && <SuraErrorState title="Your build direction needs another moment." copy="Your brief is still here. Try the recommendation again when you are ready." onRetry={() => recommendation.refetch()} />}
            {recommendation.data && <><RecommendationResult data={recommendation.data as RecommendationData} /><div className="mt-4 rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] p-4"><p className="vb-kicker text-[var(--sura-terracotta)]">Your expression lens</p><p className="mt-2 text-sm leading-6 text-[var(--sura-sand)]">{(recommendation.data as RecommendationData).personalisationNote}</p></div><div className="mt-4 rounded-2xl bg-[var(--sura-soft)] p-4"><p className="vb-kicker text-[var(--sura-terracotta)]">What happens next</p><ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--sura-ink)]"><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ae6c36]" />Share this direction with a verified studio to start a real conversation.</li><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ae6c36]" />Save the build to your board to compare with other directions.</li><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ae6c36]" />Refine the brief and regenerate until it feels right.</li></ul></div></>}
          </section>}
        </div>
      </div>
    </main>
  </VibeLayout>;
}

function RecommendationResult({ data }: { data: RecommendationData }) {
  const { build, selectedVendors, transparencyNote, withinBudget } = data;
  const { isAuthenticated } = useAuth();
  const savedSelections = trpc.board.selections.useQuery(undefined, { enabled: isAuthenticated });
  const saveBuild = trpc.board.saveBuild.useMutation({ onSuccess: () => savedSelections.refetch() });
  const isSaved = ((savedSelections.data ?? []) as { buildId: number | null }[]).some((selection) => selection.buildId === build.id);
  const budgetRange = `${formatKes(build.totalMinKes)} – ${formatKes(build.totalMaxKes)}`;
  const gapAmount = data.budgetGapKes;
  return <article className="overflow-hidden rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] shadow-[0_20px_50px_rgba(62,43,22,0.08)]">
    <div className="relative min-h-[13rem] overflow-hidden bg-[var(--sura-soft)]">
      <SuraImage src={build.heroImageUrl} fallbackSrc="/assets/sura-auth-interior.jpg" alt="Local build aesthetic" className="absolute inset-0 h-full w-full object-cover opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#201911]/80 via-[#201911]/36 to-transparent" />
      <div className="relative max-w-lg p-6 sm:p-8">
        <span className="vb-kicker text-[#e7b46f]">Your local direction</span>
        <h2 className="vb-serif mt-3 text-4xl leading-[0.95] text-[#fff8ed]">{build.title}</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--sura-ink)]/50">{build.headline}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#e7b46f]/20 px-3 py-1 text-xs font-bold text-[#e7b46f]">{build.lifestyle}</span>
          <span className="rounded-full bg-[#e7b46f]/20 px-3 py-1 text-xs font-bold text-[#e7b46f]">{build.aesthetic}</span>
          <span className="rounded-full bg-[#e7b46f]/20 px-3 py-1 text-xs font-bold text-[#e7b46f]">{build.priority}</span>
        </div>
      </div>
    </div>
    <div className="p-6 sm:p-8">
      <div className={`flex gap-3 rounded-2xl border p-4 text-sm leading-6 ${withinBudget ? "border-[var(--sura-border)] bg-[var(--sura-soft)] text-[var(--sura-ink)]" : "border-[#e3bcae] bg-[#fff2ed] text-[#7d4635] dark:border-[#5a3828] dark:bg-[#2a1914] dark:text-[#e8bfa8]"}`}>
        <Check className="mt-1 h-4 w-4 shrink-0" />{transparencyNote}
      </div>
      {!withinBudget && gapAmount > 0 && (
        <div className="mt-4 rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--sura-sand)]">Your budget</span>
            <span className="font-bold text-[var(--sura-ink)]">{formatKes(data.build.totalMinKes - gapAmount)}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--sura-soft)]">
            <div className="h-full rounded-full bg-[#c1783c]" style={{ width: `${Math.max(10, Math.min(100, ((data.build.totalMinKes - gapAmount) / data.build.totalMinKes) * 100))}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-[var(--sura-sand)]/80">
            <span>Build starts at {formatKes(build.totalMinKes)}</span>
            <span className="font-semibold text-[#7d4635]">Gap: {formatKes(gapAmount)}</span>
          </div>
        </div>
      )}
      <p className="mt-6 text-sm leading-6 text-[var(--sura-sand)]">{build.rationale}</p>
      <div className="mt-7">
        <div className="flex items-end justify-between">
          <p className="vb-kicker text-[var(--sura-terracotta)]">Build breakdown</p>
          <p className="vb-serif text-2xl text-[var(--sura-ink)]">{budgetRange}</p>
        </div>
        <div className="mt-4    ">
          {build.items.map((item) => (
            <div key={item.id} className="flex gap-3 py-4">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#c1783c]" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-[var(--sura-ink)]">{item.label}</h3>
                  <strong className="text-sm text-[var(--sura-ink)]">{formatKes(item.estimatedCostKes)}</strong>
                </div>
                <p className="mt-1 text-xs leading-5 text-[var(--sura-sand)]">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3   pt-6">
        <InquiryPanel buildId={build.id} contextName={build.title} triggerLabel="Ask about this plan" />
        <button onClick={() => { if (!isAuthenticated) { startLogin(); return; } const saving = !isSaved; saveBuild.mutate({ buildId: build.id, shouldSave: saving }); if (saving) markBuildSaved(); }} className="vb-button vb-focus inline-flex items-center gap-2 rounded-xl border border-[var(--sura-border)] bg-[var(--sura-paper)] px-5 py-3.5 text-sm font-semibold text-[var(--sura-ink)] hover:border-[var(--sura-accent)]">{isSaved ? "Saved to board" : "Save this build"}</button>
      </div>
      <div className="mt-8   pt-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="vb-kicker text-[var(--sura-terracotta)]">Local sources in this plan</p><p className="mt-2 text-sm text-[var(--sura-sand)]">Explore the maker profiles before reaching out.</p></div>
          <span className="inline-flex items-center gap-1 text-xs text-[var(--sura-sand)]"><MapPin className="h-3.5 w-3.5 text-[var(--sura-ochre)]" />{build.city}</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {selectedVendors.map((vendor) => (
            <Link key={vendor.id} href={`/vendors/${vendor.slug}`} className="vb-focus group rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] p-4 hover:border-[var(--sura-accent)]">
              <div className="flex items-center gap-3">
                <SuraImage src={vendor.portfolio[0]} fallbackSrc="/assets/sura-auth-street.jpg" alt="" className="h-11 w-11 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[var(--sura-ink)]">{vendor.name}</p>
                  <p className="mt-0.5 text-xs text-[var(--sura-sand)]">{vendor.neighbourhood} · Local source</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--sura-accent)]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </article>;
}
