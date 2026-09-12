import React, { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { isKenyanCity, KENYAN_CITIES, locationFallbackMessage, resolveKenyanLocation } from "@/lib/kenyaLocation";
import { KENYAN_COUNTIES, countyByName, isKenyanCountyName, type KenyanCounty, type KenyanCountyName } from "@/lib/kenyaCounties";

type LocationStatus = "idle" | "locating" | "matched" | "manual" | "outside_kenya" | "unsupported" | "denied" | "unmatched" | "unavailable";

function countyNameToCityName(countyName: KenyanCountyName): string | null {
  const capital = countyByName(countyName)?.capital ?? null;
  return KENYAN_CITIES.some((c) => c.name === capital) ? capital : null;
}

type KenyaLocationContextValue = {
  county: KenyanCountyName | null;
  countyData: KenyanCounty | null;
  city: string | null;
  status: LocationStatus;
  message: string | null;
  isLocating: boolean;
  setCounty: (county: KenyanCountyName | null) => void;
  requestLocation: () => void;
  counties: readonly KenyanCounty[];
  countyNames: readonly KenyanCountyName[];
};

const COUNTY_STORAGE_KEY = "sura-kenya-county";
const CITY_STORAGE_KEY = "vibebuild-kenya-city";

const KenyaLocationContext = createContext<KenyaLocationContextValue | null>(null);

export function KenyaLocationProvider({ children }: { children: ReactNode }) {
  const [countyName, setCountyName] = useState<KenyanCountyName | null>(null);
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedCounty = window.localStorage.getItem(COUNTY_STORAGE_KEY);
      if (isKenyanCountyName(savedCounty)) {
        setCountyName(savedCounty);
        setStatus("manual");
        return;
      }
      const savedCity = window.localStorage.getItem(CITY_STORAGE_KEY);
      if (isKenyanCity(savedCity)) {
        const county = KENYAN_COUNTIES.find((c) => c.capital === savedCity);
        if (county) {
          setCountyName(county.name);
          setStatus("manual");
        }
      }
    } catch {
      // The experience remains useful if local storage is unavailable.
    }
  }, []);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const qaState = new URLSearchParams(window.location.search).get("locationQA");
    if (qaState === "manual") {
      setCountyName("Kisumu");
      setStatus("manual");
      setMessage("Using Kisumu for local recommendations.");
      return;
    }
    if (qaState === "unsupported" || qaState === "denied" || qaState === "outside_kenya" || qaState === "unmatched") {
      setCountyName(null);
      setStatus(qaState);
      setMessage(locationFallbackMessage(qaState));
    }
  }, []);

  const setCounty = (nextCounty: KenyanCountyName | null) => {
    setCountyName(nextCounty);
    setStatus(nextCounty ? "manual" : "idle");
    setMessage(nextCounty ? `Using ${nextCounty} for local recommendations.` : null);
    try {
      if (nextCounty) {
        window.localStorage.setItem(COUNTY_STORAGE_KEY, nextCounty);
        const city = countyNameToCityName(nextCounty);
        if (city) window.localStorage.setItem(CITY_STORAGE_KEY, city);
        else window.localStorage.removeItem(CITY_STORAGE_KEY);
      } else {
        window.localStorage.removeItem(COUNTY_STORAGE_KEY);
        window.localStorage.removeItem(CITY_STORAGE_KEY);
      }
    } catch {
      // County selection is kept for this session even if it cannot be persisted.
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus("unsupported");
      setMessage(locationFallbackMessage("unsupported"));
      return;
    }
    setStatus("locating");
    setMessage("Checking your Kenyan location. Your coordinates are not stored.");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const resolution = resolveKenyanLocation(position.coords.latitude, position.coords.longitude);
        if (!resolution.inKenya) {
          setStatus("outside_kenya");
          setMessage(locationFallbackMessage("outside_kenya"));
          return;
        }
        if (!resolution.county && !resolution.city) {
          setStatus("unmatched");
          setMessage(locationFallbackMessage("unmatched"));
          return;
        }
        const nextCounty = resolution.county?.name ?? null;
        setCountyName(nextCounty);
        setStatus("matched");
        setMessage(nextCounty
          ? `In ${nextCounty}${resolution.distanceKm ? ` · about ${resolution.distanceKm} km away` : ""}. We will use this county for your local plan.`
          : `We could not match a county. Choose your nearest county.`);
        try {
          if (nextCounty) {
            window.localStorage.setItem(COUNTY_STORAGE_KEY, nextCounty);
            if (resolution.city) window.localStorage.setItem(CITY_STORAGE_KEY, resolution.city);
          }
        } catch { /* Local preference is optional. */ }
      },
      (error) => {
        if (error.code === 1) {
          setStatus("denied");
          setMessage(locationFallbackMessage("denied"));
        } else {
          setStatus("unavailable");
          setMessage(locationFallbackMessage("unavailable"));
        }
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  };

  const countyData = countyName ? countyByName(countyName) ?? null : null;
  const city = countyData && countyName ? countyNameToCityName(countyName) : null;

  const value = useMemo(() => ({
    county: countyName,
    countyData,
    city,
    status,
    message,
    isLocating: status === "locating",
    setCounty,
    requestLocation,
    counties: KENYAN_COUNTIES,
    countyNames: KENYAN_COUNTIES.map((c) => c.name),
  }), [countyName, countyData, city, status, message]);

  return <KenyaLocationContext.Provider value={value}>{children}</KenyaLocationContext.Provider>;
}

export function useKenyaLocation() {
  const context = useContext(KenyaLocationContext);
  if (!context) throw new Error("useKenyaLocation must be used inside KenyaLocationProvider");
  return context;
}
