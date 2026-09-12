import { ArrowUpRight, Compass, Home } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";

export default function NotFound() {
  return (
    <div className="vb-paper relative flex min-h-screen flex-col overflow-hidden text-[var(--sura-ink)]">
      <Seo title="Page not found — SURA" description="That page could not be found. Return to the SURA home page or explore local directions in the directory." />
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-[color-mix(in_srgb,var(--sura-accent)_14%,transparent)] blur-[130px]" />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-7">
          <Link href="/" className="vb-focus inline-flex items-center gap-2.5">
            <img src="/sura-mark.svg" alt="" className="h-9 w-9 rounded-lg" />
            <span className="vb-serif text-xl font-extrabold tracking-[0.14em]">SURA</span>
          </Link>
          <Link href="/discover" className="vb-focus inline-flex items-center gap-2 rounded-xl border border-[var(--sura-border)] bg-[var(--sura-paper)] px-4 py-2.5 text-xs font-bold text-[var(--sura-ink)] hover:border-[var(--sura-accent)]">Explore the directory</Link>
        </header>

        <main className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="vb-kicker text-[var(--sura-terracotta)]">SURA / NOT FOUND</p>
            <h1 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.06em] sm:text-7xl">This page has<br /><span className="text-[var(--sura-accent)]">moved on.</span></h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[var(--sura-sand)]">The link you opened does not point to a live SURA page. It may have been moved, renamed, or retired.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/" className="vb-button vb-focus inline-flex items-center gap-2 rounded-xl bg-[var(--sura-primary)] px-6 py-3.5 text-sm font-bold text-[#fbf8f2]"><Home className="h-4 w-4" />Back to SURA</Link>
              <Link href="/discover" className="vb-focus inline-flex items-center gap-2 rounded-xl border border-[var(--sura-border)] bg-[var(--sura-paper)] px-6 py-3.5 text-sm font-bold text-[var(--sura-ink)]"><Compass className="h-4 w-4 text-[var(--sura-ochre)]" />Find local directions</Link>
              <Link href="/brief" className="vb-focus inline-flex items-center gap-2 text-sm font-bold text-[var(--sura-accent)]">Start a brief <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <img src="/assets/sura-auth-interior.jpg" alt="A warm interior being shaped" className="aspect-[4/5] w-full max-w-sm rounded-[1.8rem] object-cover shadow-[0_30px_70px_rgba(23,19,12,0.3)]" />
            <span className="absolute -bottom-4 -left-6 rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] px-5 py-4 text-xs font-semibold text-[var(--sura-sand)] shadow-[0_18px_40px_rgba(23,19,12,0.18)]">404 — nothing to see here,<br />but the local edit continues.</span>
          </div>
        </main>
      </div>
    </div>
  );
}