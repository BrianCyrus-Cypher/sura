import { describe, expect, it } from "vitest";
import { isValidCommerceOrderStatusTransition } from "./sura-validation";
import { calculateCommissionBreakdown } from "./sura-commerce";

describe("SURA company order settlement and state contract", () => {
  it("moves a buyer order forward through the fulfillment journey", () => {
    let status: "draft" | "awaiting_payment" | "paid" | "processing" | "delivered" | "cancelled" | "refunded" = "awaiting_payment";
    expect(isValidCommerceOrderStatusTransition(status, "paid")).toBe(true);
    status = "paid";
    expect(isValidCommerceOrderStatusTransition(status, "processing")).toBe(true);
    status = "processing";
    expect(isValidCommerceOrderStatusTransition(status, "delivered")).toBe(true);
  });

  it("allows a company to cancel pending orders and refund only fulfilled ones", () => {
    expect(isValidCommerceOrderStatusTransition("awaiting_payment", "cancelled")).toBe(true);
    expect(isValidCommerceOrderStatusTransition("paid", "cancelled")).toBe(true);
    expect(isValidCommerceOrderStatusTransition("processing", "cancelled")).toBe(true);
    expect(isValidCommerceOrderStatusTransition("delivered", "refunded")).toBe(true);
  });

  it("never rewinds or reopens a finished order", () => {
    expect(isValidCommerceOrderStatusTransition("delivered", "processing")).toBe(false);
    expect(isValidCommerceOrderStatusTransition("refunded", "processing")).toBe(false);
    expect(isValidCommerceOrderStatusTransition("cancelled", "paid")).toBe(false);
    expect(isValidCommerceOrderStatusTransition("awaiting_payment", "delivered")).toBe(false);
    expect(isValidCommerceOrderStatusTransition("paid", "delivered")).toBe(false);
  });

  it("keeps a restockable draft open only to payment or cancellation", () => {
    expect(isValidCommerceOrderStatusTransition("draft", "awaiting_payment")).toBe(true);
    expect(isValidCommerceOrderStatusTransition("draft", "cancelled")).toBe(true);
    expect(isValidCommerceOrderStatusTransition("draft", "delivered")).toBe(false);
  });

  it("records an explicit seller, platform, and delivery split for every order file", () => {
    const split = calculateCommissionBreakdown({ unitPriceKes: 5000, quantity: 2, commissionRatePct: 30, deliveryKes: 450 });
    expect(split.merchandiseSubtotalKes).toBe(10000);
    expect(split.commissionKes).toBe(3000);
    expect(split.sellerSettlementKes).toBe(7000);
    expect(split.deliveryKes).toBe(450);
    expect(split.customerTotalKes).toBe(10450);
    expect(split.sellerSettlementKes + split.commissionKes + split.deliveryKes).toBe(split.customerTotalKes);
  });
});