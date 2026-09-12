import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { VibeLayout } from "@/components/VibeLayout";

export default function AiStudioTeaser() {
  return (
    <VibeLayout>
      <main className="container grid min-h-[70vh] place-items-center pb-20 pt-12 sm:pt-16">
        <section className="max-w-2xl text-center">
          <span className="vb-kicker text-[var(--sura-terracotta)]">SURA / NEXT RELEASE</span>
          <h1 className="vb-serif mt-5 text-5xl leading-[0.92] tracking-[-0.045em] text-[var(--sura-ink)] sm:text-6xl">The AI direction studio unlocks soon.</h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[var(--sura-sand)]">We are finishing a private image studio where your uploads, consent records, and generated concepts stay tied to your account. It ships with the next SURA release.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/ai-studio-preview" className="vb-button vb-focus inline-flex items-center gap-2 rounded-xl border border-[var(--sura-border)] bg-[var(--sura-paper)] px-5 py-3 text-sm font-bold text-[var(--sura-ink)]">Take the read-only tour <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/brief" className="vb-button vb-focus inline-flex items-center gap-2 rounded-xl bg-[var(--sura-primary)] px-5 py-3 text-sm font-bold text-[#fbf8f2]"><Sparkles className="h-4 w-4" />Start a brief instead</Link>
          </div>
        </section>
      </main>
    </VibeLayout>
  );
}