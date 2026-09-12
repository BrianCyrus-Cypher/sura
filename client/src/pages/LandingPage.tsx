import { ArrowRight, ChevronDown, Heart, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { formatKes } from "@/components/VibeLayout";
import { Seo } from "@/components/Seo";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const [budget, setBudget] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const budgetChips = [50000, 150000, 400000, 1200000];

  const faqs = [
    { q: "Does SURA sell the products itself?", a: "No. SURA is a local signal network, not a storefront. Verified local companies keep their own catalogs, prices, and stock. SURA connects your brief to them and arranges a clear quote request where the merchandise, delivery, and the platform's approved commission allocation are separated." },
    { q: "What does starting with a budget actually do?", a: "Your spend is treated as a direction, not a promise. The brief is built around the range you set, and any returning plan stays within it — with a transparency note when a direction goes beyond it." },
    { q: "How does a company become verified?", a: "Companies join through a controlled path and their listings are gated by verification and active status. Discounts are proposed by companies and only surface once approved by Sura." },
    { q: "Is my account private by default?", a: "Yes. Your board, saved sources, and account details stay private. You can turn a board into a clean public build link only when you choose to share it." },
    { q: "Where does SURA operate?", a: "SURA is built for Kenyan cities and towns. Location choice is yours — you can set a county that fits where you live, move, or are planning for." },
  ];

  const startBudget = (value: number) => {
    try {
      window.localStorage.setItem("sura-running-budget", String(value));
    } catch {
      // storage unavailable — prefill fallback still works
    }
    navigate(`/brief?budget=${value}`);
  };
  return (
    <div className="vb-paper relative min-h-screen overflow-x-hidden text-[var(--sura-ink)]">
      <Seo title="SURA — Local living, composed with care." description="SURA is a local signal network for the spaces you care about. Start with a budget and build a clear, local brief around it." />
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-[color-mix(in_srgb,var(--sura-accent)_16%,transparent)] blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-48 -right-40 -z-10 h-[26rem] w-[26rem] rounded-full bg-[color-mix(in_srgb,var(--sura-tint)_55%,transparent)] blur-[130px]" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-7">
          <Link href="/" className="vb-focus inline-flex items-center gap-2.5">
            <img src="/sura-mark.svg" alt="" className="h-9 w-9 rounded-lg" />
            <span className="vb-serif text-xl font-extrabold tracking-[0.14em]">SURA</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--sura-border)_65%,transparent)] bg-[color-mix(in_srgb,var(--sura-page)_45%,transparent)] px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--sura-ochre)] backdrop-blur-sm md:inline-flex"><Sparkles className="h-3 w-3" />Landing signal</span>
            <Link href="/join" className="vb-focus inline-flex items-center gap-2 rounded-xl border border-[var(--sura-border)] bg-[var(--sura-paper)] px-5 py-2.5 text-xs font-bold text-[var(--sura-ink)] hover:border-[var(--sura-accent)]">Sign in</Link>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center pb-10">
          <p className="vb-kicker text-[var(--sura-terracotta)]">SURA / NAIROBI · WHAT’S LOCAL</p>
          <h1 className="mt-5 max-w-4xl text-center text-[2.75rem] font-extrabold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-[4.5rem]">
            See everyday builds from your{" "}
            <span className="bg-[linear-gradient(100deg,var(--sura-accent)_0%,color-mix(in_srgb,var(--sura-accent)_45%,var(--sura-ink))_100%)] bg-clip-text text-transparent">close circles</span>.
          </h1>
          <p className="mt-6 max-w-xl text-center text-base leading-7 text-[var(--sura-sand)] sm:text-lg">
            SURA is a local signal network for the spaces you care about — budget-led, maker-first, and
            shaped by the people you already trust.
          </p>

          <div className="relative mt-14 flex w-full items-center justify-center">
            <div className="absolute -left-2 top-16 hidden w-44 -rotate-6 overflow-hidden rounded-lg bg-[var(--sura-surface)] opacity-80 shadow-[0_18px_40px_rgba(23,19,12,0.25)] grayscale-[0.25] sm:block md:-left-16 md:w-56 lg:-left-24 lg:w-64">
              <img src="/assets/sura-auth-street.jpg" alt="A street-level local find" className="h-60 w-full object-cover md:h-72" />
              <span className="absolute -left-5 bottom-10 grid h-11 w-11 rotate-12 place-items-center rounded-full bg-[var(--sura-signal)] text-[var(--sura-on-signal)] shadow-lg"><Heart className="h-4 w-4" fill="currentColor" /></span>
            </div>

            <div className="relative z-10 h-[20rem] w-60 overflow-hidden rounded-lg bg-[var(--sura-surface)] shadow-[0_30px_70px_rgba(23,19,12,0.35)] sm:h-[24rem] md:h-[26rem] md:w-72">
              <img src="/assets/sura-auth-hero.jpg" alt="A considered local moment in progress" className="h-full w-full object-cover" />
              <div className="to-transparent absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 p-4">
                <div className="mx-4 mb-2 flex items-center gap-3">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                    <div className="h-full w-1/3 rounded-full bg-[var(--sura-signal)]" />
                  </div>
                  <span className="text-[var(--sura-signal)]"><Star className="h-4 w-4" fill="currentColor" /></span>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 top-10 hidden w-40 -rotate-6 overflow-hidden rounded-lg bg-[var(--sura-surface)] opacity-80 shadow-[0_18px_40px_rgba(23,19,12,0.25)] grayscale-[0.25] sm:block md:-right-14 md:w-52 lg:-right-24 lg:w-60">
              <img src="/assets/sura-auth-interior.jpg" alt="A warm interior being shaped" className="h-56 w-full object-cover md:h-64" />
              <span className="absolute -right-4 top-14 grid h-9 w-9 -rotate-12 place-items-center rounded-full border border-[var(--sura-accent)] bg-[var(--sura-signal)] text-[var(--sura-on-signal)] shadow-lg"><Star className="h-3.5 w-3.5" fill="currentColor" /></span>
            </div>
          </div>

          <section className="mt-14 w-full max-w-2xl rounded-3xl border border-[var(--sura-border)] bg-[var(--sura-paper)]/70 p-5 text-center shadow-[0_18px_50px_rgba(23,19,12,0.16)] backdrop-blur sm:p-7">
            <p className="vb-kicker text-[var(--sura-terracotta)]">START WITH A NUMBER</p>
            <h2 className="vb-serif mt-3 text-3xl text-[var(--sura-ink)] sm:text-4xl">What’s the range you can move in?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--sura-sand)]">Your spend is a direction, not a pressure point. Pick a range and we will build the brief around it.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {budgetChips.map((amount) => <button key={amount} onClick={() => startBudget(amount)} className="vb-focus rounded-full border border-[var(--sura-border)] bg-[var(--sura-page)] px-4 py-2 text-xs font-bold text-[var(--sura-ink)] hover:border-[var(--sura-accent)]">{formatKes(amount)}</button>)}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); const parsed = Number(budget); if (parsed >= 500) startBudget(parsed); }} className="mx-auto mt-5 flex max-w-md items-center gap-2 rounded-full border border-[var(--sura-border)] bg-[var(--sura-page)] p-1.5 pl-4">
              <span className="text-sm font-bold text-[var(--sura-accent)]">KES</span>
              <input value={budget} onChange={(event) => setBudget(event.target.value)} type="number" min="500" step="500" placeholder="Your own number" aria-label="Your budget in Kenyan shillings" className="vb-focus w-full min-w-0 bg-transparent text-sm font-semibold text-[var(--sura-ink)] outline-none placeholder:text-[var(--sura-placeholder)]/70" />
              <button type="submit" disabled={!(Number(budget) >= 500)} className="vb-button vb-focus inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--sura-primary)] px-5 py-2.5 text-xs font-bold text-[#fbf8f2] disabled:opacity-40">Start the brief <ArrowRight className="h-3.5 w-3.5" /></button>
            </form>
          </section>
          <section className="mx-auto mt-8 flex w-full max-w-2xl flex-col items-center gap-4 rounded-3xl border border-[var(--sura-border)] bg-[var(--sura-paper)]/60 p-6 text-center backdrop-blur sm:p-8">
          <p className="vb-kicker text-[var(--sura-terracotta)]">READY WHEN YOU ARE</p>
          <Link href="/discover" className="vb-focus group inline-flex items-center gap-3 rounded-xl bg-[var(--sura-signal)] px-8 py-4 text-base font-extrabold text-[var(--sura-on-signal)] shadow-[0_18px_50px_rgba(23,19,12,0.25)] transition-colors hover:bg-[var(--sura-accent-strong)]">
            Explore the signal
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/join" className="vb-focus text-xs font-bold text-[var(--sura-accent)]">or sign in to pick up where you left off</Link>
        </section>
        <section className="mx-auto w-full max-w-3xl pb-16">
        <p className="vb-kicker text-center text-[var(--sura-terracotta)]">A FEW STRAIGHT ANSWERS</p>
        <h2 className="vb-serif mt-3 text-center text-3xl text-[var(--sura-ink)] sm:text-4xl">Asked often, answered plainly.</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((faq, index) => (
            <div key={faq.q} className="rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)]">
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} className="vb-focus flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-[var(--sura-ink)]">
                {faq.q}
                <ChevronDown className={`h-4 w-4 shrink-0 text-[var(--sura-accent)] transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
              </button>
              {openFaq === index && <p className="px-5 pb-5 text-sm leading-6 text-[var(--sura-sand)]">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </main>

        <footer className="border-t border-[var(--sura-border)]/70 pb-10 pt-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-sm">
              <p className="vb-serif text-xl font-extrabold tracking-[0.14em]">SURA</p>
              <p className="mt-2 text-xs leading-5 text-[var(--sura-sand)]">A local signal network for Kenyan cities and towns — budget-led, maker-first, and shaped by the people you already trust.</p>
            </div>
            <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-bold">
              <Link href="/discover" className="vb-focus text-[var(--sura-ink)] hover:text-[var(--sura-accent)]">Discover local</Link>
              <Link href="/shop" className="vb-focus text-[var(--sura-ink)] hover:text-[var(--sura-accent)]">Connected shops</Link>
              <Link href="/brief" className="vb-focus text-[var(--sura-ink)] hover:text-[var(--sura-accent)]">Build a brief</Link>
              <Link href="/join" className="vb-focus text-[var(--sura-ink)] hover:text-[var(--sura-accent)]">Sign in</Link>
              <Link href="/terms" className="vb-focus text-[var(--sura-sand)] hover:text-[var(--sura-accent)]">Terms</Link>
              <Link href="/privacy" className="vb-focus text-[var(--sura-sand)] hover:text-[var(--sura-accent)]">Privacy</Link>
            </nav>
          </div>
          <p className="mt-8 text-[0.65rem] text-[var(--sura-sand)]/75">SURA operates across Kenya. Company listings are gated by verification and active status; prices and fulfilment terms are set by each company.</p>
        </footer>
      </div>
    </div>
  );
}