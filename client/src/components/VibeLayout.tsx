import {
  ArrowUpRight,
  Bookmark,
  Compass,
  Home,
  MapPin,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Settings2,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useAestheticTheme } from "@/contexts/AestheticThemeContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useKenyaLocation } from "@/contexts/KenyaLocationContext";
import { AestheticPicker } from "./AestheticPicker";
import { CountyPicker } from "./CountyPicker";
import { NotificationCenter } from "./NotificationCenter";
import { useFeature } from "@/lib/features";

type VibeLayoutProps = { children: ReactNode; dark?: boolean };

type AppNavItem = {
  href: string;
  label: string;
  icon: typeof Home;
  exact?: boolean;
};

const appNav: AppNavItem[] = [
  { href: "/", label: "Home", icon: Home, exact: true },
  { href: "/discover", label: "Explore", icon: Compass },
  { href: "/brief", label: "Create", icon: Plus },
  { href: "/board", label: "Saved board", icon: Bookmark },
  { href: "/ai-studio", label: "AI studio", icon: Sparkles },
];

function isNavActive(location: string, item: AppNavItem) {
  return item.exact ? location === item.href : location === item.href || location.startsWith(`${item.href}/`);
}

function PlatformNav({ items, dark, location, onNavigate, collapsed = false }: { items: AppNavItem[]; dark: boolean; location: string; onNavigate?: () => void; collapsed?: boolean }) {
  return (
    <nav className="space-y-1.5" aria-label="Primary navigation">
      {items.map(({ href, label, icon: Icon, exact }) => {
        const active = isNavActive(location, { href, label, icon: Icon, exact });
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`vb-focus group flex items-center gap-3 rounded-2xl py-3 text-sm font-semibold transition-[background-color,color,transform] duration-150 active:scale-[0.98] ${collapsed ? "justify-center px-2" : "px-3.5"} ${
              active
                ? dark
                  ? "bg-[#caf240] text-[#17120f]"
                  : "bg-[var(--sura-primary)] text-[#fbf8f2]"
                : dark
                  ? "text-[#aaa89f] hover:bg-white/[0.07] hover:text-[#f6f0e6]"
                  : "text-[var(--sura-accent)] hover:bg-[var(--sura-soft)] hover:text-[var(--sura-ink)]"
            }`}
          >
            <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={active ? 2.4 : 1.9} />
            <span className={collapsed ? "sr-only" : ""}>{label}</span>
            {label === "Create" && !collapsed && <span className="ml-auto rounded-full bg-[#ff765d] px-1.5 py-0.5 text-[0.55rem] font-black uppercase tracking-[0.08em] text-[#210f0b]">New</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export function VibeLayout({ children, dark: forcedDark = false }: VibeLayoutProps) {
  const [location] = useLocation();
  const { county } = useKenyaLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { palette } = useAestheticTheme();
  const { resolvedTheme } = useTheme();
  const dark = forcedDark || resolvedTheme === "dark";
  const aiStudioEnabled = useFeature("ai_studio");
  const visibleNav = aiStudioEnabled ? appNav : appNav.filter((item) => item.href !== "/ai-studio");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [railCollapsed, setRailCollapsed] = useState(false);
  const surface = dark ? "bg-[var(--sura-paper)]" : "bg-[var(--sura-paper)]";
  const border = dark ? "border-white/[0.09]" : "border-[var(--sura-border)]";
  const muted = dark ? "text-[#9e9d94]" : "text-[var(--sura-accent)]";
  const sandMuted = dark ? "text-[#9e9d94]" : "text-[var(--sura-sand)]";

  return (
    <div
      style={!dark ? { backgroundColor: palette.page, color: palette.ink } : undefined}
      className={`min-h-screen ${dark ? "bg-[var(--sura-primary)] text-[#f4efe6]" : "bg-[var(--sura-page)]"}`}
    >
      <aside className={`fixed inset-y-0 left-0 z-50 hidden flex-col border-r py-6 lg:flex ${railCollapsed ? "w-[4.75rem] px-3" : "w-[15rem] px-5"} ${dark ? "border-white/[0.09] bg-[var(--sura-primary)]" : "border-[var(--sura-border)] bg-[var(--sura-soft)]"}`}>
        <Link href="/" className={`vb-focus flex items-center gap-3 rounded-2xl px-2 py-1.5 ${railCollapsed ? "justify-center" : ""} ${dark ? "text-[#f6f0e6]" : "text-[var(--sura-ink)]"}`} aria-label="SURA home">
          <span className="relative grid h-10 w-10 overflow-hidden rounded-xl bg-[var(--sura-primary)] shadow-sm"><img src="/favicon.svg" alt="" className="h-full w-full object-cover" /></span>
          <span className={`${railCollapsed ? "sr-only" : "flex"} flex-col leading-none`}>
            <span className="text-[0.92rem] font-black tracking-[0.2em]">SURA</span>
            <span className={`mt-1 text-[0.51rem] font-bold tracking-[0.17em] ${dark ? "text-[#caf240]" : "text-[var(--sura-accent)]"}`}>LOCAL NETWORK</span>
          </span>
        </Link>
        <button onClick={() => setRailCollapsed((collapsed) => !collapsed)} className={`vb-focus mt-7 grid h-9 w-full place-items-center rounded-xl border ${dark ? "border-white/[0.1] text-[#aaa89f] hover:bg-white/[0.07]" : "border-[var(--sura-border)] text-[var(--sura-accent)] hover:bg-[var(--sura-soft)]"}`} aria-label={railCollapsed ? "Expand Sura navigation" : "Minimize Sura navigation"} title={railCollapsed ? "Expand navigation" : "Minimize navigation"}>{railCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}</button>

        <div className="mt-7"><PlatformNav items={visibleNav} dark={dark} location={location} collapsed={railCollapsed} /></div>

        <div className="mt-auto space-y-4">
          <div className={`rounded-2xl border ${railCollapsed ? "grid h-12 place-items-center p-2" : "p-4"} ${dark ? "border-white/[0.09] bg-white/[0.045]" : "border-[var(--sura-border)] bg-[var(--sura-soft)]"}`} title={railCollapsed ? `${county || "Nairobi County"} · Kenya` : undefined}>
            {railCollapsed ? <MapPin className="h-4 w-4 text-[var(--sura-ochre)]" aria-label={`${county || "Nairobi County"} · Kenya`} /> : <><div className="flex items-center gap-2 text-xs font-semibold"><MapPin className="h-3.5 w-3.5 text-[var(--sura-ochre)]" /><span className={sandMuted}>{county ? `${county} County` : "Nairobi County"} · Kenya</span></div><p className={`mt-3 text-xs leading-5 ${sandMuted}`}>Your local lens keeps recommendations close to where life is happening.</p></>}
          </div>
          <div className="flex items-center gap-2">
            <Link href={isAuthenticated ? "/account" : "/join"} className={`vb-focus flex min-w-0 flex-1 items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-bold ${railCollapsed ? "justify-center" : ""} ${dark ? "text-[#d8d5ca] hover:bg-white/[0.07]" : "text-[var(--sura-accent)] hover:bg-[var(--sura-soft)]"}`}>
              <UserRound className="h-4 w-4 shrink-0" />
              <span className={railCollapsed ? "sr-only" : "truncate"}>{isAuthenticated ? user?.name || "Your account" : "Sign in to Sura"}</span>
            </Link>
            {!railCollapsed && <Link href="/account" aria-label="Account settings" className={`vb-focus rounded-xl p-2 ${dark ? "text-[#8c8d83] hover:bg-white/[0.07] hover:text-white" : "text-[var(--sura-accent)] hover:bg-[var(--sura-soft)]"}`}><Settings2 className="h-4 w-4" /></Link>}
          </div>
        </div>
      </aside>

      <div className={railCollapsed ? "lg:pl-[4.75rem]" : "lg:pl-[15rem]"}>
        <header className={`sticky top-0 z-40  backdrop-blur-xl ${dark ? " bg-[var(--sura-primary)]/88" : " bg-[var(--sura-page)]/88"}`}>
          <div className="mx-auto flex h-[4.55rem] max-w-[1100px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button onClick={() => setMobileOpen((open) => !open)} className={`vb-focus grid h-10 w-10 place-items-center rounded-xl border lg:hidden ${dark ? "border-white/[0.12] bg-white/[0.05] text-[#f4efe6]" : "border-[var(--sura-border)] bg-[var(--sura-paper)] text-[var(--sura-ink)]"}`} aria-label="Open Sura navigation">
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
              <p className={`hidden text-sm font-semibold sm:block ${sandMuted}`}>{location === "/" ? "Home" : visibleNav.find((item) => isNavActive(location, item))?.label || "Sura"}</p>
              <Link href="/discover" className={`vb-focus hidden items-center gap-2 rounded-xl border px-3 py-2 text-xs md:flex ${dark ? "border-white/[0.1] bg-white/[0.04] text-[#8f9088] hover:border-white/20 hover:text-white" : "border-[var(--sura-border)] bg-[var(--sura-paper)] text-[var(--sura-accent)] hover:border-[var(--sura-border)]"}`}>
                <Search className="h-3.5 w-3.5" />
                <span>Search local edits</span>
                <span className={`ml-7 rounded-md px-1.5 py-0.5 text-[0.58rem] ${dark ? "bg-white/[0.08] text-[#77786f]" : "bg-[var(--sura-soft)] text-[var(--sura-accent)]"}`}>/</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:block"><CountyPicker compact value={county} onChange={() => undefined} label="County" placeholder="Your county" align="right" /></div>
              <div className="hidden sm:block"><AestheticPicker compact /></div>
              <NotificationCenter />
              {isAuthenticated ? (
                <div className="hidden items-center gap-2 md:flex">
                  <Link href="/account" className={`vb-focus flex max-w-[10rem] items-center gap-2 rounded-xl px-2 py-2 text-xs font-semibold ${dark ? "text-[#d9d5cb] hover:bg-white/[0.06]" : "text-[var(--sura-accent)] hover:bg-[var(--sura-soft)]"}`}>
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.68rem] font-black ${dark ? "bg-[#caf240] text-[#17120f]" : "bg-[var(--sura-primary)] text-[#fbf8f2]"}`}>{(user?.name || "S").slice(0, 1).toUpperCase()}</span>
                    <span className="truncate">{user?.name || "Account"}</span>
                  </Link>
                  <button onClick={() => logout()} className={`vb-focus rounded-xl px-2 py-2 text-xs font-bold ${dark ? "text-[#8f9088] hover:bg-white/[0.06] hover:text-[#ff8a75]" : "text-[var(--sura-ink)]/75 hover:bg-[var(--sura-soft)] hover:text-[#8b3d2d]"}`}>Sign out</button>
                </div>
              ) : (
                <Link href="/join" className={`vb-button vb-focus inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold ${dark ? "bg-[var(--sura-paper)] text-[#17120f] hover:bg-[#caf240]" : "bg-[var(--sura-primary)] text-[#fbf8f2] hover:bg-[var(--sura-soft)]"}`}><span className="hidden min-[420px]:inline">Sign in</span></Link>
              )}
            </div>
          </div>
          {mobileOpen && <div className={` px-4 py-3 lg:hidden ${dark ? " bg-[var(--sura-primary)]" : " bg-[var(--sura-soft)]"}`}><div className="mb-3 flex justify-end"><AestheticPicker compact /></div><PlatformNav items={visibleNav} dark={dark} location={location} onNavigate={() => setMobileOpen(false)} /></div>}
        </header>

        <div className={`mx-auto min-h-[calc(100vh-4.55rem)] max-w-[1100px] ${surface}`}>
          {children}
        </div>

        <nav className={`fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-xl px-2 pb-[max(0.55rem,env(safe-area-inset-bottom))] pt-2 lg:hidden ${dark ? "border-white/[0.09] bg-[var(--sura-primary)]/85" : "border-[var(--sura-border)] bg-[var(--sura-page)]/80"}`} aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
            {visibleNav.map(({ href, label, icon: Icon, exact }) => {
              const active = isNavActive(location, { href, label, icon: Icon, exact });
              return <Link key={href} href={href} className={`vb-focus flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[0.62rem] font-semibold ${active ? (dark ? "text-[#caf240]" : "text-[var(--sura-ink)]") : muted}`}><Icon className="h-4 w-4" strokeWidth={active ? 2.4 : 1.8} /><span>{label === "Create" ? "Create" : label.replace("Saved board", "Saved").replace("AI studio", "AI")}</span></Link>;
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

export const formatKes = (amount: number) => new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(amount);
export const labelize = (value: string) => value.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
