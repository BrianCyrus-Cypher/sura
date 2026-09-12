import { afterEach, describe, expect, it, vi } from "vitest";
import { getFeatureState } from "./features";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getFeatureState", () => {
  it("defaults every registered feature to closed", () => {
    expect(getFeatureState()).toEqual({ ai_studio: false });
  });

  it("opens a feature when its env flag is set to true", () => {
    vi.stubEnv("FEATURE_AI_STUDIO", "true");
    expect(getFeatureState().ai_studio).toBe(true);
  });

  it("accepts a numeric 1 flag", () => {
    vi.stubEnv("FEATURE_AI_STUDIO", "1");
    expect(getFeatureState().ai_studio).toBe(true);
  });

  it("leaves a feature closed for any other value", () => {
    vi.stubEnv("FEATURE_AI_STUDIO", "TRUE");
    expect(getFeatureState().ai_studio).toBe(false);
  });

  it("exposes only known features and ignores unrelated env flags", () => {
    vi.stubEnv("FEATURE_AI_STUDIO", "true");
    vi.stubEnv("FEATURE_UNKNOWN", "true");
    expect(Object.keys(getFeatureState())).toEqual(["ai_studio"]);
  });
});