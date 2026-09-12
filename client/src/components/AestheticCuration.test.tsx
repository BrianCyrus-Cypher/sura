// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AestheticThemeProvider } from "@/contexts/AestheticThemeContext";
import { AestheticCuration } from "./AestheticCuration";

const queryState = vi.hoisted(() => ({
  data: { aesthetics: [] as string[], onboardingComplete: false },
  refetch: vi.fn(),
}));
const mutationState = vi.hoisted(() => ({ mutateAsync: vi.fn(), isPending: false, isError: false }));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    account: {
      aestheticPreferences: { useQuery: () => ({ ...queryState, isLoading: false, isError: false }) },
      setAestheticPreferences: { useMutation: () => mutationState },
    },
  },
}));

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  queryState.data = { aesthetics: [], onboardingComplete: false };
  mutationState.mutateAsync.mockReset();
});

const clickCard = (name: string) => fireEvent.click(screen.getByRole("button", { name: new RegExp(name) }));
const nextPage = () => fireEvent.click(screen.getByRole("button", { name: /next page/i }));

describe("SURA expression board", () => {
  it("keeps the save action visible and stops selection at five directions", () => {
    render(<AestheticThemeProvider><AestheticCuration alwaysVisible /></AestheticThemeProvider>);
    clickCard("Thrift Remix");
    clickCard("Heritage Modern");
    clickCard("Comfort Official");
    nextPage();
    clickCard("Coastal Ease");
    expect(screen.getByText("5 of 5 selected")).toBeTruthy();
    clickCard("Savanna Atelier");
    expect(screen.getByText("5 of 5 selected")).toBeTruthy();
    expect(screen.getByRole("button", { name: /save my aesthetic mix/i })).toBeTruthy();
  });

  it("pages through directions and keeps the mobile-first card grid available", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
    const { container } = render(<AestheticThemeProvider><AestheticCuration alwaysVisible /></AestheticThemeProvider>);
    expect(container.querySelector(".grid.sm\\:grid-cols-2")).toBeTruthy();
    expect(screen.getByText("01 / 06")).toBeTruthy();
    expect(screen.getByRole("button", { name: /next page/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /save my aesthetic mix/i })).toBeTruthy();
    nextPage();
    nextPage();
    expect(screen.getByText("Tangerine Social")).toBeTruthy();
    expect(screen.getByText("Thermal Bloom")).toBeTruthy();
  });
});
