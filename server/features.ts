export type FeatureKey = "ai_studio";
export type FeatureState = Record<FeatureKey, boolean>;

const FEATURE_ENV: Record<FeatureKey, string> = {
  ai_studio: "FEATURE_AI_STUDIO",
};

function envEnabled(name: string): boolean {
  const value = process.env[name];
  return value === "true" || value === "1";
}

export function getFeatureState(): FeatureState {
  const state = {} as FeatureState;
  for (const key of Object.keys(FEATURE_ENV) as FeatureKey[]) {
    state[key] = envEnabled(FEATURE_ENV[key]);
  }
  return state;
}