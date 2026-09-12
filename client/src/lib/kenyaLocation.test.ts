import { describe, expect, it } from "vitest";
import { isKenyanCity, isWithinKenya, locationFallbackMessage, resolveKenyanLocation } from "./kenyaLocation";
import { KENYAN_COUNTIES } from "@shared/kenyaCounties";

describe("Kenya county dataset", () => {
  it("contains exactly 47 counties with unique names, codes, and centroids", () => {
    expect(KENYAN_COUNTIES).toHaveLength(47);
    const names = KENYAN_COUNTIES.map((c) => c.name);
    const codes = KENYAN_COUNTIES.map((c) => c.code);
    const centroids = KENYAN_COUNTIES.map((c) => `${c.latitude},${c.longitude}`);
    expect(new Set(names).size).toBe(47);
    expect(new Set(codes).size).toBe(47);
    expect(new Set(centroids).size).toBe(47);
  });

  it("all centroids are within Kenya bounds", () => {
    for (const county of KENYAN_COUNTIES) {
      expect(isWithinKenya(county.latitude, county.longitude)).toBe(true);
    }
  });
});

describe("Kenya location resolution", () => {
  it("matches Nairobi coordinates to Nairobi county", () => {
    const result = resolveKenyanLocation(-1.2864, 36.8172);
    expect(result.inKenya).toBe(true);
    expect(result.county?.name).toBe("Nairobi");
    expect(result.city).toBe("Nairobi");
  });

  it("matches Mombasa coordinates to Mombasa county", () => {
    const result = resolveKenyanLocation(-4.0435, 39.6682);
    expect(result.inKenya).toBe(true);
    expect(result.county?.name).toBe("Mombasa");
    expect(result.city).toBe("Mombasa");
  });

  it("matches Kisumu coordinates to Kisumu county", () => {
    const result = resolveKenyanLocation(-0.1022, 34.7617);
    expect(result.inKenya).toBe(true);
    expect(result.county?.name).toBe("Kisumu");
    expect(result.city).toBe("Kisumu");
  });

  it("matches Nakuru coordinates to Nakuru county", () => {
    const result = resolveKenyanLocation(-0.3031, 36.08);
    expect(result.inKenya).toBe(true);
    expect(result.county?.name).toBe("Nakuru");
    expect(result.city).toBe("Nakuru");
  });

  it("does not treat foreign coordinates as Kenya", () => {
    expect(resolveKenyanLocation(-6.7924, 39.2083)).toEqual({ inKenya: false, county: null, city: null, distanceKm: null });
  });

  it("matches Eldoret coordinates to Uasin Gishu county (not a named city)", () => {
    const result = resolveKenyanLocation(0.51, 35.27);
    expect(result.inKenya).toBe(true);
    expect(result.county?.name).toBe("Uasin Gishu");
    expect(result.city).toBeNull();
  });

  it("supports manual county and city selection and fallback messages", () => {
    expect(isKenyanCity("Kisumu")).toBe(true);
    expect(isKenyanCity("Eldoret")).toBe(false);
    expect(locationFallbackMessage("denied")).toContain("optional");
    expect(locationFallbackMessage("unsupported")).toContain("browser");
    expect(locationFallbackMessage("outside_kenya")).toContain("outside Kenya");
  });
});
