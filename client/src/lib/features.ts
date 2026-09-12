import { trpc } from "./trpc";

export type FeatureKey = "ai_studio";
export const FEATURE_DEFAULTS: Record<FeatureKey, boolean> = { ai_studio: false };
const OVERRIDE_STORAGE_KEY = "sura-feature-overrides";

function readOverrides(): Partial<Record<FeatureKey, boolean>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(OVERRIDE_STORAGE_KEY) ?? new URLSearchParams(window.location.search).get("features");
    if (!raw) return {};
    const overrides: Partial<Record<FeatureKey, boolean>> = {};
    for (const entry of raw.split(",")) {
      const [name, value] = entry.split(":").map((part) => part.trim());
      if (!name || !(name in FEATURE_DEFAULTS)) continue;
      const enabled = value ? !["0", "off", "false"].includes(String(value).toLowerCase()) : true;
      (overrides as Record<string, boolean>)[name] = enabled;
    }
    return overrides;
  } catch {
    return {};
  }
}

export function useFeature(name: FeatureKey): boolean {
  const overrides = readOverrides();
  if (name in overrides) return overrides[name] as boolean;
  const state = trpc.features.state.useQuery(undefined, { staleTime: 60_000, initialData: FEATURE_DEFAULTS });
  return state.data?.[name] ?? FEATURE_DEFAULTS[name];
}