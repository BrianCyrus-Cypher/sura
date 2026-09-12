import { ArrowUpRight, Bookmark, Loader2, Share2, Sparkles, X } from "lucide-react";
import { useMemo } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { VibeLayout, formatKes } from "@/components/VibeLayout";
import { VendorCard } from "@/components/VendorCard";
import { PagedCards } from "@/components/PagedCards";
import { SuraImage } from "@/components/SuraImage";
import { Seo } from "@/components/Seo";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";

type Selection = { buildId: number | null; vendorId: number | null };

export default function BuildBoard() {
  const [, setLocation] = useLocation();
  const { user, loading, isAuthenticated } = useAuth();
  const savedIds = trpc.board.savedVendorIds.useQuery(undefined, { enabled: isAuthenticated });
  const selections = trpc.board.selections.useQuery(undefined, { enabled: isAuthenticated });
  const vendors = trpc.vendors.list.useQuery(undefined, { enabled: isAuthenticated });
  const builds = trpc.builds.list.useQuery(undefined, { enabled: isAuthenticated });
  const share = trpc.shares.create.useMutation({ onSuccess: (data) => setLocation(`/share/${data.shareToken}`) });
  const saveVendor = trpc.board.saveVendor.useMutation({ onSuccess: () => savedIds.refetch() });
  const saveBuild = trpc.board.saveBuild.useMutation({ onSuccess: () => selections.refetch() });
  const selectedVendorIds = (savedIds.data ?? []) as number[];
  const selectedBuildIds = ((selections.data ?? []) as Selection[]).map((selection) => selection.buildId).filter((id): id is number => id !== null);
  const boardVendors = useMemo(() => (vendors.data ?? []).filter((vendor) => selectedVendorIds.includes(vendor.id)), [vendors.data, selectedVendorIds.join(",")]);
  const boardBuilds = useMemo(() => (builds.data ?? []).filter((build) => selectedBuildIds.includes(build.id)), [builds.data, selectedBuildIds.join(",")]);
  const totalItems = boardVendors.length + boardBuilds.length;
  const totalCostMin = boardBuilds.reduce((sum, build) => sum + build.totalMinKes, 0);
  const totalCostMax = boardBuilds.reduce((sum, build) => sum + build.totalMaxKes, 0);
  const isLoading = savedIds.isLoading || selections.isLoading || vendors.isLoading || builds.isLoading;
  const hasDataError = savedIds.isError || selections.isError || vendors.isError || builds.isError;
  const removeVendor = (vendorId: number) => saveVendor.mutate({ vendorId, shouldSave: false });
  const removeBuild = (buildId: number) => saveBuild.mutate({ buildId, shouldSave: false });

  if (loading) return <VibeLayout><main className="container grid min-h-[60vh] place-items-center"><Loader2 className="h-7 w-7 animate-spin text-[var(--sura-accent)]" /></main></VibeLayout>;
  if (!isAuthenticated) return <VibeLayout><main className="container grid min-h-[66vh] place-items-center py-16"><section className="max-w-xl rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] p-8 text-center shadow-[0_18px_45px_rgba(61,43,23,0.07)] sm:p-12"><Bookmark className="mx-auto h-9 w-9 text-[var(--sura-accent)]" /><span className="vb-kicker mt-6 block text-[var(--sura-terracotta)]">Your planning space</span><h1 className="vb-serif mt-4 text-4xl leading-[0.98] text-[var(--sura-ink)] sm:text-5xl">Keep the good directions close.</h1><p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[var(--sura-sand)]">Sign in to keep local sources and curated edits on a private SURA board. When it is ready, turn it into a clean public build link.</p><button onClick={() => startLogin()} className="vb-button vb-focus mt-7 inline-flex items-center gap-2 rounded-xl bg-[var(--sura-primary)] px-6 py-3.5 text-sm font-bold text-[#fbf7ef]">Sign in to your board <ArrowUpRight className="h-4 w-4" /></button></section></main></VibeLayout>;
  if (hasDataError) return <VibeLayout><main className="container grid min-h-[62vh] place-items-center py-14"><section className="max-w-lg rounded-2xl border border-[#dfb2a0] bg-[var(--sura-paper)] p-8 text-center"><p className="vb-kicker text-[#9b4e36]">Your board is still yours</p><h1 className="vb-serif mt-3 text-3xl text-[#5f2c20]">We could not open it just now.</h1><p className="mt-3 text-sm leading-6 text-[#7b4637]">Nothing has been removed. Try loading the board again in a moment.</p><button onClick={() => { savedIds.refetch(); selections.refetch(); vendors.refetch(); builds.refetch(); }} className="vb-button vb-focus mt-6 rounded-xl bg-[#5e2c20] px-5 py-3 text-sm font-bold text-white">Reload board</button></section></main></VibeLayout>;

  return <VibeLayout>
    <Seo title="SURA — Saved board" description="Your private SURA planning board for local sources and curated edits. Turn it into a clean public build link when it is ready." />
    <main className="container pb-20 pt-10 sm:pt-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="vb-kicker text-[var(--sura-terracotta)]">Your personal SURA board</span>
          <h1 className="vb-serif mt-4 text-5xl leading-[0.94] tracking-[-0.045em] text-[var(--sura-ink)] sm:text-6xl">Keep the edit in <em className="font-normal text-[var(--sura-accent)]">motion.</em></h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--sura-sand)]">A private planning space for the sources and directions you want to return to. Welcome back, {user?.name ?? "there"}.</p>
        </div>
        {totalItems > 0 && <button disabled={share.isPending} onClick={() => share.mutate({ title: `${user?.name ?? "My"} SURA edit`, summary: "A considered local plan shaped with SURA.", buildIds: selectedBuildIds, vendorIds: selectedVendorIds })} className="vb-button vb-focus inline-flex items-center gap-2 rounded-xl bg-[var(--sura-primary)] px-6 py-3.5 text-sm font-bold text-[#fbf7ef] disabled:opacity-70">{share.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}{share.isPending ? "Making your link" : "Share this board"}</button>}
      </div>

      {totalItems > 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] p-4"><p className="vb-kicker text-[var(--sura-terracotta)]">Saved</p><p className="vb-serif mt-1 text-2xl text-[var(--sura-ink)]">{totalItems} {totalItems === 1 ? "item" : "items"}</p></div>
          <div className="rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] p-4"><p className="vb-kicker text-[var(--sura-terracotta)]">Builds cost</p><p className="vb-serif mt-1 text-2xl text-[var(--sura-ink)]">{formatKes(totalCostMin)} – {formatKes(totalCostMax)}</p></div>
          <div className="rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] p-4"><p className="vb-kicker text-[var(--sura-terracotta)]">Sources</p><p className="vb-serif mt-1 text-2xl text-[var(--sura-ink)]">{boardVendors.length} {boardVendors.length === 1 ? "studio" : "studios"} in {boardBuilds.length} {boardBuilds.length === 1 ? "direction" : "directions"}</p></div>
        </div>
      )}

      {share.isError && <p className="mt-5 rounded-xl border border-[#e4b6a5] bg-[#fff2ec] px-4 py-3 text-sm text-[#843e2d] dark:border-[#5a3828] dark:bg-[#2a1914] dark:text-[#e8bfa8]">We could not make the share link yet. Please try again.</p>}
      {isLoading ? <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-64 animate-pulse rounded-[1.5rem] bg-[var(--sura-border)]" />)}</div> : totalItems === 0 ? <section className="mt-10 rounded-2xl border border-dashed border-[var(--sura-border)] bg-[var(--sura-paper)] p-10 text-center"><Sparkles className="mx-auto h-8 w-8 text-[var(--sura-accent)]" /><h2 className="vb-serif mt-4 text-3xl text-[var(--sura-ink)]">Your board is ready for a point of view.</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--sura-sand)]">Save a local studio from the directory, or keep a build recommendation after you shape your brief.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Link href="/discover" className="vb-button vb-focus rounded-xl bg-[var(--sura-primary)] px-5 py-3 text-sm font-bold text-[#fbf7ef]">Find a studio</Link><Link href="/brief" className="vb-button vb-focus rounded-xl border border-[var(--sura-accent)] px-5 py-3 text-sm font-bold text-[var(--sura-ink)]">Build an edit</Link></div></section> : <div className="mt-10 space-y-12">
        {boardBuilds.length > 0 && <section>
          <div className="flex items-end justify-between">
            <div>
              <span className="vb-kicker text-[var(--sura-terracotta)]">Saved directions</span>
              <h2 className="vb-serif mt-2 text-3xl text-[var(--sura-ink)]">Builds to keep shaping</h2>
            </div>
            <p className="text-sm text-[var(--sura-sand)]">{boardBuilds.length} saved</p>
          </div>
          <PagedCards
            items={boardBuilds}
            keyOf={(build) => String(build.id)}
            pageSize={4}
            className="mt-5 grid gap-5 lg:grid-cols-2"
            renderItem={(build) => (
              <article key={build.id} className="group overflow-hidden rounded-[1.6rem] border border-[var(--sura-border)] bg-[var(--sura-paper)]">
                <div className="relative">
                  <div className="grid sm:grid-cols-[0.78fr_1.22fr]">
                    <SuraImage src={build.heroImageUrl} fallbackSrc="/assets/sura-auth-interior.jpg" alt="Saved build direction" className="h-48 w-full object-cover sm:h-full" />
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="vb-kicker text-[var(--sura-terracotta)]">Saved direction · from {formatKes(build.totalMinKes)}</span>
                        <button onClick={() => removeBuild(build.id)} disabled={saveBuild.isPending} aria-label={`Remove ${build.title}`} className="vb-focus rounded-full p-1.5 text-[var(--sura-accent)]/80 hover:bg-[var(--sura-soft)] hover:text-[#8f4a2b]"><X className="h-4 w-4" /></button>
                      </div>
                      <h3 className="vb-serif mt-3 text-3xl leading-[0.95] text-[var(--sura-ink)]">{build.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--sura-sand)]">{build.headline}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[var(--sura-soft)] px-2.5 py-1 text-[0.6rem] font-bold text-[var(--sura-sand)]">{build.lifestyle}</span>
                        <span className="rounded-full bg-[var(--sura-soft)] px-2.5 py-1 text-[0.6rem] font-bold text-[var(--sura-sand)]">{build.aesthetic}</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--sura-soft)] px-2.5 py-1 text-[0.6rem] font-bold text-[var(--sura-sand)]">{formatKes(build.totalMinKes)} – {formatKes(build.totalMaxKes)}</span>
                      </div>
                      <Link href="/brief" className="vb-focus mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--sura-accent)]">Revisit direction <ArrowUpRight className="h-4 w-4" /></Link>
                    </div>
                  </div>
                </div>
              </article>
              )}
            />
        </section>}
        {boardVendors.length > 0 && <section>
          <div className="flex items-end justify-between">
            <div>
              <span className="vb-kicker text-[var(--sura-terracotta)]">Saved sources</span>
              <h2 className="vb-serif mt-2 text-3xl text-[var(--sura-ink)]">Studios in your mix</h2>
            </div>
            <p className="text-sm text-[var(--sura-sand)]">{boardVendors.length} saved</p>
          </div>
          <PagedCards
            items={boardVendors}
            keyOf={(vendor) => String(vendor.id)}
            pageSize={4}
            className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            renderItem={(vendor) => (
              <div key={vendor.id} className="relative">
                <VendorCard vendor={vendor} />
                <button onClick={() => removeVendor(vendor.id)} disabled={saveVendor.isPending} aria-label={`Remove ${vendor.name}`} className="vb-focus absolute right-3 top-3 z-10 rounded-full bg-[var(--sura-paper)]/90 p-1.5 text-[var(--sura-accent)]/80 shadow-sm hover:bg-[var(--sura-paper)] hover:text-[#8f4a2b]"><X className="h-4 w-4" /></button>
              </div>
              )}
            />
        </section>}
      </div>}
    </main>
  </VibeLayout>;
}