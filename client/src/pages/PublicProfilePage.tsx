import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Globe2, Heart, MapPin, Repeat2, UserCheck, UserPlus, UserRound } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { VibeLayout } from "@/components/VibeLayout";
import { SuraShelf } from "@/components/SuraShelf";
import { Seo } from "@/components/Seo";
import { trpc } from "@/lib/trpc";
import { useTrackView } from "@/lib/trackView";

const platformLabels: Record<string, string> = { instagram: "Instagram", tiktok: "TikTok", linkedin: "LinkedIn", youtube: "YouTube", x: "X", website: "Website" };
type PublicLink = { id: number; platform: string; url: string };
type PublicContact = { id: number; label: string; contactType: "email" | "phone" | "whatsapp" | "address"; value: string };
type SocialTarget = { kind: "person" | "company"; id: number };

function UnavailableProfile() {
  return <VibeLayout><main className="container grid min-h-[60vh] place-items-center"><section className="max-w-md rounded-[1.5rem] border border-[var(--sura-border)] bg-[var(--sura-paper)] p-8 text-center"><UserRound className="mx-auto h-7 w-7 text-[var(--sura-accent)]" /><h1 className="vb-serif mt-4 text-3xl">This public profile is not available.</h1><p className="mt-3 text-sm leading-6 text-[var(--sura-sand)]">It may be private, unverified, or no longer active.</p><Link href="/" className="vb-focus mt-6 inline-flex rounded-xl bg-[var(--sura-primary)] px-5 py-3 text-sm font-bold text-[#fbf7ef]">Return to SURA</Link></section></main></VibeLayout>;
}

function RepostShelf({ reposts }: { reposts: Array<any> }) {
  if (reposts.length === 0) return null;
  return <section className="mt-8  border-[var(--sura-border)] pt-7"><div className="flex items-end justify-between gap-4"><div><p className="vb-kicker text-[var(--sura-terracotta)]">Sura shelf / reposts</p><h2 className="vb-serif mt-2 text-3xl">Signals they chose to carry.</h2></div><Repeat2 className="h-5 w-5 text-[var(--sura-accent)]" /></div><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{reposts.slice(0, 6).map((item) => <article key={item.repost.id} className="overflow-hidden rounded-[1.25rem] border border-[var(--sura-border)] bg-[var(--sura-paper)]"><img src={item.post.imageUrl} alt={item.post.title} className="h-40 w-full object-cover" /><div className="p-4"><p className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[var(--sura-sand)]">{item.company.name}</p><h3 className="mt-2 text-sm font-black text-[var(--sura-ink)]">{item.post.title}</h3>{item.repost.note && <p className="mt-2 text-xs leading-5 text-[var(--sura-sand)]">“{item.repost.note}”</p>}<div className="mt-3 flex items-center gap-3 text-[0.68rem] font-semibold text-[var(--sura-sand)]"><span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" />{item.likeCount}</span><span>{item.repostCount} reposts</span></div></div></article>)}</div></section>;
}

function PublicProfileShell({ label, title, description, city, links, contacts = [], websiteUrl, socialTarget }: { label: string; title: string | null; description?: string | null; city?: string | null; links: PublicLink[]; contacts?: PublicContact[]; websiteUrl?: string | null; socialTarget: SocialTarget }) {
  const { isAuthenticated } = useAuth();
  const social = trpc.social.profile.useQuery(socialTarget);
  const trackView = useTrackView();
  const followUser = trpc.social.followUser.useMutation({ onSuccess: () => social.refetch() });
  const followCompany = trpc.social.followCompany.useMutation({ onSuccess: () => social.refetch() });
  const companyPosts = trpc.social.companyPosts.useQuery({ companyId: socialTarget.id }, { enabled: socialTarget.kind === "company" });
  const likePost = trpc.social.likePost.useMutation({ onSuccess: () => companyPosts.refetch() });
  const repostPost = trpc.social.repostPost.useMutation({ onSuccess: () => { companyPosts.refetch(); social.refetch(); } });
  const [following, setFollowing] = useState(false);

  useEffect(() => { if (social.data) setFollowing(social.data.isFollowing); }, [social.data?.isFollowing]);

  const toggleFollow = () => {
    if (!isAuthenticated) { startLogin(); return; }
    if (socialTarget.kind === "person") followUser.mutate({ userId: socialTarget.id, shouldFollow: !following });
    else followCompany.mutate({ companyId: socialTarget.id, shouldFollow: !following });
  };
  const followPending = followUser.isPending || followCompany.isPending;
  const contactHref = (contact: PublicContact) => contact.contactType === "email" ? `mailto:${contact.value}` : contact.contactType === "phone" ? `tel:${contact.value}` : contact.contactType === "whatsapp" ? `https://wa.me/${contact.value.replace(/[^0-9]/g, "")}` : undefined;
  const followers = social.data?.followerCount ?? 0;
  const followingCount = social.data?.followingCount ?? 0;
  const reposts = social.data && "reposts" in social.data ? (social.data as { reposts: Array<any> }).reposts : [];
  useEffect(() => { if (socialTarget.kind === "company" && socialTarget.id) trackView("company_profile", socialTarget.id, socialTarget.id); }, [socialTarget.kind, socialTarget.id, trackView]);
  const postIdKey = companyPosts.data?.map((item) => item.post.id).join(",") ?? "";
  useEffect(() => { if (socialTarget.kind === "company" && socialTarget.id && companyPosts.data?.length) companyPosts.data.forEach((item) => trackView("post", item.post.id, socialTarget.id)); }, [postIdKey, socialTarget.kind === "company" ? socialTarget.id : 0, trackView]);

  return <VibeLayout><main className="container max-w-5xl pb-20 pt-10 sm:pt-16"><Seo title={`${title || "SURA profile"} — ${label === "SURA COMPANY" ? "Company" : "Person"} on SURA`} description={(description ?? `A considered ${label.toLowerCase()} presence on the SURA local network${city ? ` in ${city}` : ""}.`).slice(0, 158)} /><Link href="/" className="vb-focus inline-flex items-center gap-2 text-sm font-bold text-[var(--sura-accent)]"><ArrowLeft className="h-4 w-4" />Back to SURA</Link><section className="mt-8 overflow-hidden rounded-2xl border border-[var(--sura-border)] bg-[var(--sura-paper)] shadow-[0_18px_50px_rgba(59,41,22,0.07)]"><div className="vb-ink p-7 text-[#fbf5ec] sm:p-12"><div className="flex flex-wrap items-start justify-between gap-6"><div><p className="vb-kicker text-[#d7a261]">{label}</p><h1 className="vb-serif mt-4 text-5xl leading-[0.94] sm:text-6xl">{title || "SURA profile"}</h1>{city && <p className="mt-5 inline-flex items-center gap-2 text-sm text-[#d8cabc]"><MapPin className="h-4 w-4 text-[#d7a261]" />{city} · Kenya</p>}</div><button onClick={toggleFollow} disabled={followPending} className="vb-button vb-focus inline-flex items-center gap-2 rounded-xl bg-[#caf240] px-4 py-3 text-xs font-black text-[#17120f] disabled:opacity-60">{following ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}{following ? "Following" : label === "SURA COMPANY" ? "Follow studio" : "Follow direction"}</button></div><div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#d8cabc]"><span><strong className="text-[#fbf5ec]">{followers}</strong> followers</span>{socialTarget.kind === "person" && <span><strong className="text-[#fbf5ec]">{followingCount}</strong> following</span>}<span><strong className="text-[#fbf5ec]">{social.data?.repostCount ?? 0}</strong> reposts</span></div></div><div className="p-7 sm:p-12"><div className="grid gap-8 sm:grid-cols-[1.05fr_0.95fr]"><div><p className="vb-kicker text-[var(--sura-terracotta)]">Public profile</p><p className="mt-4 text-base leading-7 text-[var(--sura-sand)]">{description || "A considered SURA public presence."}</p>{websiteUrl && <a href={websiteUrl} target="_blank" rel="noreferrer" className="vb-focus mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--sura-accent)]">Visit website <ExternalLink className="h-4 w-4" /></a>}{contacts.length > 0 && <div className="mt-7  border-[var(--sura-border)] pt-5"><p className="vb-kicker text-[var(--sura-terracotta)]">Contact this studio</p><div className="mt-3 space-y-2">{contacts.map((contact) => { const href = contactHref(contact); return href ? <a key={contact.id} href={href} className="vb-focus flex items-center justify-between rounded-xl border border-[var(--sura-border)] bg-[var(--sura-paper)] px-3 py-3 text-sm font-semibold text-[var(--sura-accent-strong)]"><span>{contact.label}</span><span className="text-xs text-[var(--sura-sand)]">{contact.contactType}</span></a> : <p key={contact.id} className="rounded-xl border border-[var(--sura-border)] bg-[var(--sura-paper)] px-3 py-3 text-sm font-semibold text-[var(--sura-accent-strong)]"><span>{contact.label}: </span><span className="font-normal text-[var(--sura-sand)]">{contact.value}</span></p>; })}</div></div>}</div><aside className="rounded-[1.5rem] border border-[var(--sura-border)] bg-[var(--sura-paper)] p-5"><div className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-[var(--sura-accent)]" /><p className="text-sm font-bold text-[var(--sura-ink)]">Selected public links</p></div><div className="mt-4 space-y-2">{links.length === 0 && <p className="text-sm text-[var(--sura-sand)]">No public links have been shared.</p>}{links.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="vb-focus flex items-center justify-between rounded-xl border border-[var(--sura-border)] px-3 py-3 text-sm font-semibold text-[var(--sura-accent-strong)] hover:border-[var(--sura-accent)]"><span>{platformLabels[link.platform]}</span><ExternalLink className="h-3.5 w-3.5 text-[var(--sura-accent)]" /></a>)}</div></aside></div>{socialTarget.kind === "company" && <section className="mt-8  border-[var(--sura-border)] pt-7"><div className="flex items-end justify-between gap-4"><div><p className="vb-kicker text-[var(--sura-terracotta)]">Live Signal</p><h2 className="vb-serif mt-2 text-3xl">The studio’s visual voice.</h2><p className="mt-1 text-sm leading-6 text-[var(--sura-sand)]">Original posts from this verified Sura studio.</p></div><Repeat2 className="h-5 w-5 text-[var(--sura-accent)]" /></div><div className="mt-5 grid gap-4 sm:grid-cols-2">{companyPosts.isLoading && <div className="h-52 animate-pulse rounded-[1.25rem] bg-[var(--sura-soft)]" />}{companyPosts.data?.map((item) => <article key={item.post.id} className="overflow-hidden rounded-[1.25rem] border border-[var(--sura-border)] bg-[var(--sura-paper)]"><img src={item.post.imageUrl} alt={item.post.title} className="h-52 w-full object-cover" /><div className="p-4"><h3 className="text-base font-black text-[var(--sura-ink)]">{item.post.title}</h3>{item.post.caption && <p className="mt-2 text-sm leading-6 text-[var(--sura-sand)]">{item.post.caption}</p>}<div className="mt-4 flex items-center gap-2"><button onClick={() => isAuthenticated ? likePost.mutate({ postId: item.post.id, shouldLike: !item.liked }) : startLogin()} className={`vb-focus inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold ${item.liked ? "text-[var(--sura-accent)]" : "text-[var(--sura-accent)]"}`}><Heart className={item.liked ? "h-3.5 w-3.5 fill-current" : "h-3.5 w-3.5"} />{item.likeCount}</button><button onClick={() => isAuthenticated ? repostPost.mutate({ postId: item.post.id, shouldRepost: !item.reposted }) : startLogin()} className={`vb-focus inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold ${item.reposted ? "text-[var(--sura-accent)]" : "text-[var(--sura-accent)]"}`}><Repeat2 className="h-3.5 w-3.5" />{item.repostCount} {item.reposted ? "Carried" : "Repost"}</button></div></div></article>)}{!companyPosts.isLoading && companyPosts.data?.length === 0 && <p className="col-span-full rounded-xl border border-dashed border-[var(--sura-border)] p-5 text-sm text-[var(--sura-sand)]">This studio has not published a signal yet.</p>}</div></section>}<RepostShelf reposts={reposts} /><SuraShelf title={label === "SURA COMPANY" ? "A company shelf" : "A personal shelf"} /></div></section></main></VibeLayout>;
}

export default function PublicProfilePage({ kind }: { kind: "person" | "company" }) {
  const [, params] = useRoute(kind === "person" ? "/people/:slug" : "/studios/:slug");
  const slug = params?.slug ?? "";
  const person = trpc.account.publicProfile.useQuery({ slug }, { enabled: kind === "person" && Boolean(slug) });
  const company = trpc.companies.publicProfile.useQuery({ slug }, { enabled: kind === "company" && Boolean(slug) });
  if (kind === "person") {
    if (person.isLoading) return <VibeLayout><main className="container grid min-h-[60vh] place-items-center"><div className="h-12 w-12 animate-pulse rounded-2xl bg-[var(--sura-soft)]" /></main></VibeLayout>;
    if (person.isError || !person.data) return <UnavailableProfile />;
    return <PublicProfileShell label="SURA PERSON" title={person.data.profile.displayName} description={person.data.profile.bio} city={person.data.profile.city} links={person.data.socialLinks} socialTarget={{ kind: "person", id: person.data.profile.userId }} />;
  }
  if (company.isLoading) return <VibeLayout><main className="container grid min-h-[60vh] place-items-center"><div className="h-12 w-12 animate-pulse rounded-2xl bg-[var(--sura-soft)]" /></main></VibeLayout>;
  if (company.isError || !company.data) return <UnavailableProfile />;
  return <PublicProfileShell label="SURA COMPANY" title={company.data.company.name} description={company.data.company.description} city={company.data.company.city} websiteUrl={company.data.company.websiteUrl} links={company.data.socialLinks} contacts={company.data.contacts} socialTarget={{ kind: "company", id: company.data.company.id }} />;
}
