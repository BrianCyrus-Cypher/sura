import React, { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { canUseOptionalPreferences, COOKIE_CONSENT_EVENT, readPreferenceCookie, AESTHETIC_MIX_COOKIE, AESTHETIC_THEME_COOKIE, writePreferenceCookie } from "@/lib/privacy";
import { getCustomAesthetics, getCustomAestheticPalette, type CustomAestheticPalette } from "@/lib/customAesthetics";
import { useOptionalTheme, type ResolvedTheme } from "@/contexts/ThemeContext";

export const AESTHETIC_THEMES = {
  "Soft Power": { page: "#f6f0e6", paper: "#fbf7ef", primary: "#241a12", ink: "#2b2118", accent: "#8a5a33", soft: "#efe3cf", border: "#dfd2be", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Thrift Remix": { page: "#f7ece3", paper: "#fff8f2", primary: "#285a58", ink: "#173a38", accent: "#d05b3c", soft: "#ebc8a5", border: "#d8b9a0", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Syne", "Inter", system-ui, sans-serif' },
  "Heritage Modern": { page: "#f0e6d3", paper: "#fff9ef", primary: "#59371f", ink: "#332419", accent: "#a96f2c", soft: "#d6b17e", border: "#cfb592", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Comfort Official": { page: "#eaf0e9", paper: "#fbfdf8", primary: "#294d42", ink: "#1e342e", accent: "#6e987a", soft: "#cbdcc8", border: "#bfd1bd", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Coastal Ease": { page: "#e7f0ee", paper: "#f9fdfc", primary: "#205963", ink: "#17373d", accent: "#d28853", soft: "#bddbd5", border: "#b4cfca", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Savanna Atelier": { page: "#ece6dc", paper: "#fffaf2", primary: "#31271f", ink: "#2a2018", accent: "#8a5633", soft: "#dfc5a7", border: "#d5bea6", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Ink & Ivory": { page: "#efefeb", paper: "#fffefa", primary: "#151515", ink: "#23211f", accent: "#9e7540", soft: "#ddd7ca", border: "#c8c1b5", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Orchid After Dark": { page: "#eee5ed", paper: "#fffbff", primary: "#472a46", ink: "#342132", accent: "#9b5b7f", soft: "#e8cddd", border: "#d8bbce", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Syne", "Inter", system-ui, sans-serif' },
  "Tangerine Social": { page: "#f7ede0", paper: "#fffaf2", primary: "#3b2920", ink: "#372014", accent: "#c8602e", soft: "#f1d4b1", border: "#dfc3a1", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Syne", "Inter", system-ui, sans-serif' },
  "Moss & Marigold": { page: "#f0f0df", paper: "#fffdf0", primary: "#405030", ink: "#2e3b24", accent: "#9c7618", soft: "#e2d99f", border: "#d1c785", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Cobalt Ritual": { page: "#e7edf4", paper: "#fbfdff", primary: "#173d73", ink: "#172f55", accent: "#9b672d", soft: "#c9d7e9", border: "#b8c9dd", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Syne", "Inter", system-ui, sans-serif' },
  "Thermal Bloom": { page: "#f6e8ed", paper: "#fffafd", primary: "#35203d", ink: "#2e1e33", accent: "#cc4a39", soft: "#f0c4cb", border: "#deb5c0", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Soft Comfort": { page: "#f3eee6", paper: "#fffaf3", primary: "#5a4738", ink: "#3d3026", accent: "#c28b62", soft: "#ead8c4", border: "#d9c3ab", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Warm Minimal": { page: "#f1eee8", paper: "#fcfbf7", primary: "#373531", ink: "#262522", accent: "#9a8062", soft: "#e5ded2", border: "#d2c8ba", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Quiet Utility": { page: "#e9ece8", paper: "#f9fbf7", primary: "#263a37", ink: "#20302d", accent: "#728b7f", soft: "#cddbd2", border: "#bbcec2", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Earthbound Home": { page: "#eee7d9", paper: "#fffaf0", primary: "#4b3827", ink: "#33271d", accent: "#a26f42", soft: "#ddc6a5", border: "#d3b998", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Bright Play": { page: "#f8efe1", paper: "#fffdf5", primary: "#4d395d", ink: "#34253e", accent: "#ed8b3d", soft: "#f3d5a8", border: "#e3bf94", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Syne", "Inter", system-ui, sans-serif' },
  "Street Archive": { page: "#e7e6e2", paper: "#faf9f5", primary: "#252729", ink: "#1e2021", accent: "#b55b3b", soft: "#d5c9be", border: "#c5b9ae", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Syne", "Inter", system-ui, sans-serif' },
  "Studio Calm": { page: "#e8eef0", paper: "#fbfdfd", primary: "#29404a", ink: "#21343c", accent: "#a87961", soft: "#cadde1", border: "#b9cfd3", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Pet Piece": { page: "#f2ecdf", paper: "#fffaf1", primary: "#5b4632", ink: "#3b2c21", accent: "#d0885b", soft: "#ead0b4", border: "#dbc0a0", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Object Story": { page: "#eee9e3", paper: "#fffdf9", primary: "#3b3532", ink: "#2e2926", accent: "#ab7052", soft: "#dfd0c4", border: "#d1bcae", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  "Motion Detail": { page: "#e8edf3", paper: "#fbfdff", primary: "#223b58", ink: "#1b2e45", accent: "#c27d43", soft: "#cbd8e6", border: "#b8c9dc", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Syne", "Inter", system-ui, sans-serif' },
} as const;

export type HardcodedAestheticName = keyof typeof AESTHETIC_THEMES;
export type AestheticName = string;

type PaletteEntry = (typeof AESTHETIC_THEMES)[HardcodedAestheticName];

function resolvePalette(name: string): PaletteEntry | CustomAestheticPalette {
  if (name in AESTHETIC_THEMES) return AESTHETIC_THEMES[name as HardcodedAestheticName];
  const custom = getCustomAestheticPalette(name);
  if (custom) return custom;
  return AESTHETIC_THEMES["Soft Power"];
}

const ALL_BUILTIN_NAMES = Object.keys(AESTHETIC_THEMES) as HardcodedAestheticName[];

export function getAllKnownAestheticNames(): string[] {
  const customNames = getCustomAesthetics().map((a) => a.name);
  return [...ALL_BUILTIN_NAMES, ...customNames];
}

export function isBuiltinAesthetic(name: string): name is HardcodedAestheticName {
  return name in AESTHETIC_THEMES;
}

const ACTIVE_STORAGE_KEY = "sura-aesthetic-theme";
const PREFERENCES_STORAGE_KEY = "sura-aesthetic-preferences";
const defaultAesthetic: AestheticName = "Soft Power";

const SURA_FONTS = {
  "font-display": '"Syne", "Inter", system-ui, sans-serif',
  "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif',
  "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif',
} as const;

const DARK_VARS = {
  page: "#12100e",
  paper: "#241914",
  primary: "#0e0a07",
  ink: "#f3e6d2",
  accent: "#caf240",
  soft: "#35231b",
  border: "#493126",
  signal: "#caf240",
  "on-signal": "#12100e",
  "accent-strong": "#b85c45",
  tint: "#5a3828",
  surface: "#241914",
  gold: "#d89b3d",
  terracotta: "#b85c45",
  cocoa: "#5a3828",
  forest: "#263b25",
  cream: "#f3e6d2",
  sand: "#d9c6aa",
  ochre: "#d89b3d",
  "input-bg": "#2a1c17",
  "input-border": "#50372a",
  placeholder: "#a98f76",
  ...SURA_FONTS,
} as const;

function deriveVars(palette: PaletteEntry | CustomAestheticPalette, theme: ResolvedTheme): Record<string, string> {
  if (theme === "dark") return { ...DARK_VARS } as Record<string, string>;
  return {
    ...palette,
    signal: palette.accent,
    "on-signal": "#17120f",
    "accent-strong": "#995f26",
    tint: palette.border,
    surface: palette.paper,
    gold: "#d89b3d",
    terracotta: "#b85c45",
    cocoa: palette.accent,
    forest: "#3d5237",
    cream: "#f3e6d2",
    sand: "#d9c6aa",
    ochre: "#d89b3d",
    "input-bg": "#f0e5d3",
    "input-border": "#c9b89a",
    placeholder: "#a98f76",
    ...SURA_FONTS,
  };
}

type AestheticThemeContextValue = { aesthetic: AestheticName; palette: PaletteEntry | CustomAestheticPalette; preferenceMix: AestheticName[]; setAesthetic: (aesthetic: AestheticName) => void; setPreferenceMix: (aesthetics: AestheticName[]) => void; resetAesthetic: () => void };
const AestheticThemeContext = createContext<AestheticThemeContextValue | null>(null);

function normaliseMix(values: readonly string[]) {
  const allKnown = new Set(getAllKnownAestheticNames());
  const unique = Array.from(new Set(values.filter((value) => allKnown.has(value)))).slice(0, 5);
  return unique.length ? unique : [defaultAesthetic];
}

export function AestheticThemeProvider({ children }: { children: ReactNode }) {
  const [aesthetic, setAestheticState] = useState<AestheticName>(defaultAesthetic);
  const [preferenceMix, setPreferenceMixState] = useState<AestheticName[]>([defaultAesthetic]);
  const { resolvedTheme } = useOptionalTheme();
  const setPreferenceMix = (values: AestheticName[]) => { const next = normaliseMix(values); setPreferenceMixState(next); setAestheticState(next[0]); };
  const setAesthetic = (next: AestheticName) => setPreferenceMix([next, ...preferenceMix.filter((value) => value !== next)]);
  const resetAesthetic = () => setPreferenceMix([defaultAesthetic]);
  useEffect(() => {
    if (!canUseOptionalPreferences()) return;
    try {
      const rawMix = readPreferenceCookie(AESTHETIC_MIX_COOKIE) ?? window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (rawMix) setPreferenceMixState(normaliseMix(JSON.parse(rawMix)));
      const saved = readPreferenceCookie(AESTHETIC_THEME_COOKIE) ?? window.localStorage.getItem(ACTIVE_STORAGE_KEY);
      if (saved && getAllKnownAestheticNames().includes(saved)) setAestheticState(saved as AestheticName);
    } catch { /* The default palette remains usable. */ }
  }, []);
  useEffect(() => {
    const palette = resolvePalette(aesthetic);
    const vars = deriveVars(palette, resolvedTheme);
    const root = document.documentElement;
    root.dataset.aesthetic = aesthetic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    Object.entries(vars).forEach(([key, value]) => root.style.setProperty(`--sura-${key}`, value));
    root.style.colorScheme = resolvedTheme === "dark" ? "dark" : "light";
    if (canUseOptionalPreferences()) {
      try { window.localStorage.setItem(ACTIVE_STORAGE_KEY, aesthetic); } catch { /* Theme remains available for this session. */ }
      writePreferenceCookie(AESTHETIC_THEME_COOKIE, aesthetic);
    }
  }, [aesthetic, resolvedTheme]);
  useEffect(() => {
    const persist = () => {
      if (!canUseOptionalPreferences()) return;
      try { window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferenceMix)); } catch { /* Theme remains available for this session. */ }
      writePreferenceCookie(AESTHETIC_MIX_COOKIE, JSON.stringify(preferenceMix));
    };
    persist();
    window.addEventListener(COOKIE_CONSENT_EVENT, persist);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, persist);
  }, [preferenceMix]);
  const value = useMemo(() => ({ aesthetic, palette: resolvePalette(aesthetic), preferenceMix, setAesthetic, setPreferenceMix, resetAesthetic }), [aesthetic, preferenceMix]);
  return <AestheticThemeContext.Provider value={value}>{children}</AestheticThemeContext.Provider>;
}

export function useAestheticTheme() {
  const context = useContext(AestheticThemeContext);
  if (!context) throw new Error("useAestheticTheme must be used inside AestheticThemeProvider");
  return context;
}
