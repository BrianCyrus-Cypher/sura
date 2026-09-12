import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Plus, Sparkles, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { AESTHETIC_THEMES, type HardcodedAestheticName, useAestheticTheme } from "@/contexts/AestheticThemeContext";
import { AESTHETIC_EXPRESSIONS } from "@/lib/aestheticExpressions";
import { SuraErrorState, SuraProcessing } from "@/components/SuraStates";
import { getCustomAesthetics, addCustomAesthetic, removeCustomAesthetic } from "@/lib/customAesthetics";
import { PagedCards } from "@/components/PagedCards";

const aestheticEntries = Object.entries(AESTHETIC_THEMES) as [HardcodedAestheticName, (typeof AESTHETIC_THEMES)[HardcodedAestheticName]][];

export function AestheticCuration({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
  const preferences = trpc.account.aestheticPreferences.useQuery();
  const update = trpc.account.setAestheticPreferences.useMutation({ onSuccess: () => preferences.refetch() });
  const { aesthetic, setAesthetic, setPreferenceMix } = useAestheticTheme();
  const [selected, setSelected] = useState<HardcodedAestheticName[]>([aesthetic as HardcodedAestheticName]);
  const [customInput, setCustomInput] = useState("");
  const [customError, setCustomError] = useState("");
  const [customKey, setCustomKey] = useState(0);

  useEffect(() => {
    if (preferences.data) {
      const saved = preferences.data.aesthetics.filter((name): name is HardcodedAestheticName => name in AESTHETIC_THEMES);
      setSelected(saved.length ? saved : [aesthetic as HardcodedAestheticName]);
    }
  }, [preferences.data, aesthetic]);

  const customAesthetics = useMemo(() => { void customKey; return getCustomAesthetics(); }, [customKey]);

  if (preferences.isLoading) return alwaysVisible ? <SuraProcessing eyebrow="SURA / YOUR DIRECTION" title="Finding your saved mix." copy="Your private aesthetic preferences are loading." /> : null;
  if (preferences.isError) return alwaysVisible ? <SuraErrorState title="Your aesthetic mix is unavailable right now." copy="Please try again before saving a new direction." onRetry={() => preferences.refetch()} /> : null;
  if (!alwaysVisible && preferences.data?.onboardingComplete) return null;

  const toggle = (name: HardcodedAestheticName) => {
    setSelected((current) => {
      if (current.includes(name)) return current.length === 1 ? current : current.filter((item) => item !== name);
      return current.length >= 5 ? current : [...current, name];
    });
  };
  const makePrimary = (name: HardcodedAestheticName) => setSelected((current) => [name, ...current.filter((item) => item !== name)]);
  const save = async () => {
    await update.mutateAsync({ aesthetics: selected });
    setPreferenceMix(selected);
  };
  const handleCreateCustom = () => {
    setCustomError("");
    const result = addCustomAesthetic(customInput);
    if (result.success) {
      setCustomInput("");
      setCustomKey((k) => k + 1);
      setAesthetic(customInput.trim());
    } else if (result.error) {
      setCustomError(result.error);
    }
  };
  const handleDeleteCustom = (name: string) => {
    removeCustomAesthetic(name);
    setCustomKey((k) => k + 1);
  };
  const mountCustom = (name: string) => setAesthetic(name);

  if (!alwaysVisible) {
    return (
      <section className="mb-7 overflow-hidden rounded-[1.5rem] border border-[var(--sura-border)] bg-[var(--sura-paper)] shadow-[0_12px_30px_rgba(55,39,19,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--sura-soft)] text-[var(--sura-accent)]"><Sparkles className="h-4 w-4" /></span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[var(--sura-ink)]">Finish your aesthetic direction</p>
              <p className="mt-0.5 text-xs text-[var(--sura-sand)]">{selected.length} of 5 chosen · {selected.join(" · ")}</p>
            </div>
          </div>
          <Link to="/aesthetics" className="vb-button vb-focus inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--sura-primary)] px-4 py-2.5 text-xs font-bold text-[#fbf8f2]">Choose directions <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[1.65rem] border border-[var(--sura-border)] bg-[var(--sura-paper)] shadow-[0_14px_34px_rgba(55,39,19,0.06)]">
      <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
        <div className="bg-[var(--sura-primary)] p-6 text-[#fbf8f2] sm:p-8">
          <p className="vb-kicker text-[var(--sura-terracotta)]">{preferences.data?.onboardingComplete ? "Your saved aesthetic mix" : "Start with your point of view"}</p>
          <h2 className="vb-serif mt-3 text-3xl leading-[0.98]">Choose up to five directions that feel like yours.</h2>
          <p className="mt-4 text-sm leading-6 text-[#fbf8f2]/75">Your first choice sets the active SURA palette. The full mix informs personal expression prompts, not a score of your taste.</p>
          <div className="mt-7 rounded-2xl border border-white/15 bg-white/8 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--sura-sand)]">{selected.length} of 5 selected</p>
            <p className="mt-2 text-sm leading-6 text-[#fbf8f2]/80">{selected.length === 0 ? "Pick one to get started." : selected.join(" · ")}</p>
          </div>
        </div>
        <div className="p-5 sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="vb-kicker text-[var(--sura-terracotta)]">Your expression board</p>
              <p className="mt-2 text-sm leading-6 text-[var(--sura-sand)]">The primary direction is used first. Select a card to add or remove it; selected directions can be made primary.</p>
            </div>
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[var(--sura-accent)]" />
          </div>
          <PagedCards
            items={aestheticEntries}
            keyOf={([name]) => name}
            pageSize={4}
            className="grid gap-2 sm:grid-cols-2"
            renderItem={([name, palette]) => {
              const active = selected.includes(name);
              const primary = selected[0] === name;
              const expression = AESTHETIC_EXPRESSIONS[name];
              return (
                <article key={name} className={`rounded-xl border transition-colors ${active ? "border-[var(--sura-accent)] bg-[var(--sura-soft)]" : "border-[var(--sura-border)] bg-white/40"}`}>
                  <button type="button" onClick={() => toggle(name)} className="vb-focus w-full p-2.5 text-left">
                    <span className="flex items-center gap-2.5">
                      <span className="h-6 w-6 shrink-0 rounded-lg border lack/10 shadow-inner" style={{ background: `linear-gradient(135deg, ${palette.paper} 0%, ${palette.soft} 48%, ${palette.accent} 100%)` }} />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <strong className="text-xs text-[var(--sura-ink)]">{name}</strong>
                          {active && <Check className="h-3.5 w-3.5 shrink-0 text-[var(--sura-accent)]" />}
                        </span>
                        <span className="mt-0.5 block text-[0.62rem] leading-4 text-[var(--sura-sand)]">{expression.mood}</span>
                      </span>
                    </span>
                  </button>
                  {active && (
                    <span className="flex items-center justify-between gap-3 px-2.5 pb-2">
                      <span className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[var(--sura-accent-strong)]">{primary ? "Primary palette" : `Expression ${selected.indexOf(name) + 1}`}</span>
                      {!primary && <button type="button" onClick={() => makePrimary(name)} className="vb-focus text-[0.68rem] font-bold text-[var(--sura-accent)]">Make primary</button>}
                    </span>
                  )}
                </article>
              );
            }}
          />
          {customAesthetics.length > 0 && (
            <div className="mt-5   pt-4">
              <p className="vb-kicker text-[var(--sura-terracotta)]">Your directions</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {customAesthetics.map((ca) => (
                  <span key={ca.name} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${aesthetic === ca.name ? "border-[var(--sura-accent)] bg-[var(--sura-soft)] text-[var(--sura-ink)]" : "border-[var(--sura-border)] bg-white/40 text-[var(--sura-ink)]"}`}>
                    <i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ca.palette.accent }} />
                    <button type="button" onClick={() => mountCustom(ca.name)} className="vb-focus font-bold hover:text-[var(--sura-accent)]">{ca.name}</button>
                    <button type="button" onClick={() => handleDeleteCustom(ca.name)} aria-label={`Remove ${ca.name}`} className="vb-focus rounded-full p-0.5 text-[var(--sura-accent)]/80 hover:text-red-600"><Trash2 className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5   pt-4">
            <div className="flex gap-2">
              <input
                value={customInput}
                onChange={(e) => { setCustomInput(e.target.value); setCustomError(""); }}
                onKeyDown={(e) => { if (e.key === "Enter") handleCreateCustom(); }}
                placeholder="Create your own direction…"
                maxLength={40}
                className="flex-1 rounded-xl border border-[var(--sura-border)] bg-[var(--sura-soft)]/40 px-3 py-2.5 text-sm font-semibold text-[var(--sura-ink)] placeholder:text-[var(--sura-placeholder)] focus:border-[var(--sura-accent)] focus:outline-none"
              />
              <button onClick={handleCreateCustom} disabled={!customInput.trim()} className="vb-button vb-focus inline-flex items-center gap-1 rounded-xl bg-[var(--sura-accent)] px-3.5 py-2.5 text-xs font-bold text-[#fbf8f2] disabled:opacity-40"><Plus className="h-3.5 w-3.5" />Add</button>
            </div>
            {customError && <p className="mt-1.5 text-xs font-semibold text-red-600">{customError}</p>}
          </div>

          <div className="mt-6 rounded-2xl bg-[var(--sura-soft)] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--sura-sand)]">Current blend</p>
            <p className="mt-2 text-sm leading-6 text-[var(--sura-ink)]">{selected.map((name) => AESTHETIC_EXPRESSIONS[name].cues[0]).join(" · ")}</p>
          </div>
          {update.isError && <p className="mt-4 text-sm text-[#8c432f]">Your mix could not be saved. Keep your selection and try again.</p>}
          <button type="button" onClick={save} disabled={update.isPending} className="vb-button vb-focus mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--sura-primary)] px-5 py-3.5 text-sm font-bold text-[#fbf8f2] disabled:opacity-60">
            {update.isPending ? "Saving your mix…" : preferences.data?.onboardingComplete ? "Update my expression mix" : "Save my aesthetic mix"}
          </button>
        </div>
      </div>
    </section>
  );
}