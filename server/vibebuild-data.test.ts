import { describe, expect, it } from "vitest";
import { filterDemoVendors, getBuildRecommendation } from "./vibebuild-data";

describe("VibeBuild demo matching", () => {
  it("selects an in-budget plan when one is available", () => {
    const recommendation = getBuildRecommendation({
      budgetKes: 10000,
      city: "Nairobi",
      lifestyle: "Creative Work",
      aesthetic: "Soft Power",
      priority: "Polish",
    });

    expect(recommendation.withinBudget).toBe(true);
    expect(recommendation.build.slug).toBe("the-nairobi-after-five");
  });

  it("finds vendors using combined county and aesthetic filters", () => {
    const vendors = filterDemoVendors({ county: "Nairobi", aesthetic: "Heritage Modern" });
    expect(vendors.map((vendor) => vendor.slug)).toContain("ember-thread-atelier");
    expect(vendors.map((vendor) => vendor.slug)).toContain("northline-makers");
  });

  it("filters vendors by county while ignoring city when county is present", () => {
    const mombasa = filterDemoVendors({ county: "Mombasa" });
    expect(mombasa.map((vendor) => vendor.slug).sort()).toEqual(["coast-drip-studio", "kanga-matter-studio"]);
    const kisumu = filterDemoVendors({ city: "Kisumu" });
    expect(kisumu.map((vendor) => vendor.slug).sort()).toEqual(["kijani-corner", "lake-side-tailors"]);
  });

  it("every demo vendor and build carries a valid county", () => {
    const counties = new Set(["Mombasa", "Nairobi", "Kisumu", "Nakuru"]);
    for (const vendor of filterDemoVendors({})) expect(counties.has(vendor.county)).toBe(true);
  });

  it("uses a bounded aesthetic mix to rank and explain the local build direction without changing demo facts", () => {
    const recommendation = getBuildRecommendation({
      budgetKes: 16000,
      city: "Nairobi",
      lifestyle: "Home Refresh",
      aesthetic: "Soft Power",
      aestheticMix: ["Soft Power", "Heritage Modern", "Coastal Ease"],
      priority: "Warmth",
    });
    expect(recommendation.build.slug).toBe("the-one-room-reset");
    expect(recommendation.personalisationNote).toContain("Soft Power · Heritage Modern · Coastal Ease");
    expect(recommendation.personalisationNote).toContain("not the demo vendors, prices, or availability");
    expect(recommendation.personalisationNote).toContain("active direction leads this plan");
  });
});
