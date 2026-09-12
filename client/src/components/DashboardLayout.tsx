import { ArrowUpRight, Bookmark, Building2, Compass, CreditCard, FileText, Home, Landmark, LayoutDashboard, LogOut, Menu, Palette, Plus, Settings, ShieldCheck, Sparkles, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { NotificationCenter } from "./NotificationCenter";
import { AestheticCuration } from "./AestheticCuration";
import { AestheticPicker } from "./AestheticPicker";
import { SuraPageSkeleton } from "./SuraStates";
import { startLogin } from "@/const";
import { useFeature } from "@/lib/features";
import { wasBuildSaved } from "@/lib/onboarding";

type DashboardLayoutProps = { title: string; eyebrow: string; description: string; children: ReactNode; showAestheticOnboarding?: boolean };

const baseNav = [
  { href: "/account", label: "My profile", icon: Settings },
  { href: "/aesthetics", label: "Expression board", icon: Palette },
  { href: "/edit-studio", label: "Personal edits", icon: Sparkles },
  { href: "/company", label: "Company studio", icon: Building2 },
  { href: "/checkout", label: "Payments", icon: CreditCard },
  { href: "/board", label: "Build board", icon: Sparkles },
];

const dashNav = [
  { href: "/", label: "Home", icon: Home, exact: true },
  { href: "/discover", label: "Explore", icon: Compass },
  { href: "/brief", label: "Create", icon: Plus },
  { href: "/board", label: "Saved", icon: Bookmark },
  { href: "/ai-studio", label: "AI", icon: Sparkles },
];

export default function DashboardLayout({ title, eyebrow, description, children, showAestheticOnboarding = true }: DashboardLayoutProps) {
  const { user, loading, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authNotice, setAuthNotice] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const hasOAuthConfig = Boolean(import.meta.env.VITE_OAUTH_PORTAL_URL && import.meta.env.VITE_APP_ID);
  const nav = user?.role === "admin" ? [...baseNav, { href: "/admin", label: "Admin review", icon: ShieldCheck }, { href: "/admin/commissions", label: "Commission controls", icon: Landmark }] : baseNav;
  const aiStudioEnabled = useFeature("ai_studio");
  const bottomNav = aiStudioEnabled ? dashNav : dashNav.filter((item) => item.href !== "/ai-studio");

  const handleDemoLogin = () => {
    setIsLoggingIn(true);
    setAuthNotice("");
    const started = startLogin();
    if (!started) {
      setAuthNotice("Sign-in is not available right now. Please try again.");
      setIsLoggingIn(false);
    }
  };

  if (loading) return <div style={{ backgroundColor: "var(--sura-page)" }} className="vb-paper min-h-screen p-5 sm:p-8"><div className="mx-auto max-w-6xl pt-8"><SuraPageSkeleton cards={2} dashboard /></div></div>;
  if (!user) return <main style={{ backgroundColor: "var(--sura-page)" }} className="vb-paper grid min-h-screen place-items-center p-5"><section style={{ borderColor: "var(--sura-border)", backgroundColor: "var(--sura-paper)" }} className="w-full max-w-5xl overflow-hidden rounded-2xl border shadow-[0_28px_80px_rgba(47,33,17,0.12)] lg:grid lg:grid-cols-[0.88fr_1.12fr]"><div style={{ backgroundColor: "var(--sura-primary)" }} className="hidden min-h-[34rem] flex-col justify-between p-10 text-[#fbf5ec] lg:flex"><div><img src="/favicon.svg" alt="SURA" className="h-11 w-11 rounded-xl" /><p className="vb-kicker mt-8" style={{ color: "var(--sura-terracotta)" }}>SURA / PRIVATE SPACE</p><h1 className="vb-serif mt-4 text-5xl leading-[0.96]">A place to keep the good direction moving.</h1></div><p className="max-w-sm text-sm leading-6 text-[#d8cabc]">Profiles, company studios, secure payment records, and your saved local build thinking—held with intention.</p></div><div className="flex min-h-[34rem] flex-col justify-center p-7 sm:p-12"><Link href="/" style={{ color: "var(--sura-accent)" }} className="vb-focus inline-flex items-center gap-2 text-sm font-bold"><ArrowUpRight className="h-4 w-4 rotate-[225deg]" />Back to SURA</Link><p className="vb-kicker mt-12" style={{ color: "var(--sura-terracotta)" }}>Your SURA account</p><h2 style={{ color: "var(--sura-ink)" }} className="vb-serif mt-4 text-5xl leading-[0.95]">Sign in to make the plan yours.</h2><p style={{ color: "var(--sura-ink)" }} className="mt-5 max-w-md text-base font-medium leading-7">{hasOAuthConfig ? "We use secure OAuth sign-in. Your session is protected; payment information is never entered or stored on this page." : "Enter the demo to explore the full SURA experience — briefs, local makers, and your personal board."}</p><button onClick={handleDemoLogin} disabled={isLoggingIn} style={{ backgroundColor: "var(--sura-signal)", color: "var(--sura-on-signal)" }} className="vb-button vb-focus mt-9 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold disabled:opacity-70">{isLoggingIn ? "Entering SURA…" : hasOAuthConfig ? "Continue securely" : "Enter SURA (Demo)"}<ArrowUpRight className="h-4 w-4" /></button>{authNotice && <p className="mt-3 rounded-xl border border-[var(--sura-accent)] bg-[var(--sura-paper)] px-4 py-3 text-center text-xs font-semibold leading-5 text-[var(--sura-ink)]" role="status">{authNotice}</p>}<p className="mt-5 text-center text-xs leading-5 text-[var(--sura-accent)]">By continuing, you can review our <Link href="/terms" className="underline underline-offset-2">Terms</Link> and <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.</p></div></section></main>;

  return <div style={{ backgroundColor: "var(--sura-page)", color: "var(--sura-ink)" }} className="min-h-screen"><header style={{ borderColor: "var(--sura-border)", backgroundColor: "color-mix(in srgb, var(--sura-paper) 96%, transparent)" }} className="sticky top-0 z-40  backdrop-blur"><div className="container flex h-[4.7rem] items-center justify-between gap-4"><Link href="/" style={{ color: "var(--sura-ink)" }} className="vb-focus flex items-center gap-2.5"><img src="/favicon.svg" alt="" className="h-8 w-8 rounded-lg" /><span className="flex flex-col leading-none"><span className="text-[0.82rem] font-extrabold tracking-[0.16em]">SURA</span><span style={{ color: "var(--sura-accent)" }} className="mt-1 text-[0.48rem] font-bold tracking-[0.16em]">PRIVATE SPACE</span></span></Link><div className="flex items-center gap-3"><span className="hidden text-right text-xs leading-4 text-[var(--sura-sand)] sm:block"><strong style={{ color: "var(--sura-ink)" }} className="block">{user.name ?? "Your account"}</strong>{user.role === "admin" ? "Platform administrator" : "Member account"}</span><div className="hidden sm:block"><AestheticPicker compact /></div><NotificationCenter /><button onClick={() => setMobileOpen(!mobileOpen)} style={{ borderColor: "var(--sura-border)", backgroundColor: "var(--sura-paper)", color: "var(--sura-ink)" }} className="vb-focus grid h-10 w-10 place-items-center rounded-full border md:hidden" aria-label="Toggle dashboard navigation">{mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button><button onClick={logout} style={{ borderColor: "var(--sura-border)", backgroundColor: "var(--sura-paper)", color: "var(--sura-ink)" }} className="vb-focus hidden items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold md:inline-flex"><LogOut className="h-3.5 w-3.5" />Sign out</button></div></div></header>
    <div className="container grid gap-8 py-7 md:grid-cols-[15.5rem_1fr] md:py-10"><aside className={`${mobileOpen ? "block" : "hidden"} rounded-[1.5rem] border border-[var(--sura-border)] bg-[var(--sura-paper)] p-3 shadow-[0_10px_28px_rgba(52,37,20,0.06)] md:sticky md:top-28 md:block md:h-fit`}><nav className="space-y-1">{nav.map((item) => { const Icon = item.icon; const active = location === item.href; return <button key={item.href} onClick={() => { setLocation(item.href); setMobileOpen(false); }} className={`vb-focus flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors ${active ? "bg-[var(--sura-primary)] text-[#fbf7ef]" : "text-[var(--sura-accent)] hover:bg-[var(--sura-soft)]"}`}><Icon className="h-4 w-4" />{item.label}</button>; })}</nav><div className="mt-5 pt-4"><Link href="/terms" className="vb-focus flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[var(--sura-accent)]"><FileText className="h-3.5 w-3.5" />Legal & privacy</Link><button onClick={logout} className="vb-focus flex w-full items-center gap-2 px-3 py-2 text-xs font-bold text-[#8b3d2d] md:hidden"><LogOut className="h-3.5 w-3.5" />Sign out</button></div></aside><main>{showAestheticOnboarding && wasBuildSaved() && <AestheticCuration />}<div className="pb-7"><p className="vb-kicker text-[var(--sura-terracotta)]">{eyebrow}</p><h1 className="vb-serif mt-3 text-4xl leading-[0.96] text-[var(--sura-ink)] sm:text-5xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--sura-sand)] sm:text-base">{description}</p></div><div className="pt-7">{children}</div></main></div><div className="h-24 lg:hidden" /><nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--sura-border)] bg-[var(--sura-page)]/80 px-2 pb-[max(0.55rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden" aria-label="Mobile dashboard navigation"><div className="mx-auto grid max-w-md grid-cols-5 gap-1">{bottomNav.map(({ href, label, icon: Icon, exact }) => { const active = exact ? location === href : location === href || location.startsWith(`${href}/`); return <Link key={href} href={href} className={`vb-focus flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[0.62rem] font-semibold ${active ? "text-[var(--sura-ink)]" : "text-[var(--sura-accent)]"}`}><Icon className="h-4 w-4" strokeWidth={active ? 2.4 : 1.8} /><span>{label}</span></Link>; })}</div></nav></div>;
}
