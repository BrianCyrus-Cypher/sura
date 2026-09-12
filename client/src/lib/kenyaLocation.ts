import { KENYAN_COUNTIES, type KenyanCounty } from "@shared/kenyaCounties";

export const KENYAN_CITIES = [
  { name: "Nairobi", latitude: -1.2864, longitude: 36.8172 },
  { name: "Mombasa", latitude: -4.0435, longitude: 39.6682 },
  { name: "Kisumu", latitude: -0.1022, longitude: 34.7617 },
  { name: "Nakuru", latitude: -0.3031, longitude: 36.08 },
] as const;

export type KenyanCity = (typeof KENYAN_CITIES)[number]["name"];

export type LocationResolution = {
  inKenya: boolean;
  county: KenyanCounty | null;
  city: KenyanCity | null;
  distanceKm: number | null;
};

export type LocationFallback = "unsupported" | "denied" | "unavailable" | "outside_kenya" | "unmatched";

const KENYA_BOUNDS = { minLatitude: -4.9, maxLatitude: 5.5, minLongitude: 33.4, maxLongitude: 42.1 };
const MAX_COUNTY_MATCH_KM = 120;
const MAX_CITY_MATCH_KM = 45;

export function isWithinKenya(latitude: number, longitude: number) {
  return latitude >= KENYA_BOUNDS.minLatitude && latitude <= KENYA_BOUNDS.maxLatitude && longitude >= KENYA_BOUNDS.minLongitude && longitude <= KENYA_BOUNDS.maxLongitude;
}

export function isKenyanCity(value: string | null | undefined): value is KenyanCity {
  return Boolean(value && KENYAN_CITIES.some((city) => city.name === value));
}

export function locationFallbackMessage(status: LocationFallback) {
  const messages: Record<LocationFallback, string> = {
    unsupported: "Location is not available in this browser. Choose your county instead.",
    denied: "Location permission is optional. Choose your county instead.",
    unavailable: "We could not confirm your location. Choose your county instead.",
    outside_kenya: "You appear to be outside Kenya. Choose a county to explore Kenyan options.",
    unmatched: "You are in Kenya, but we could not match a nearby county. Choose your nearest county.",
  };
  return messages[status];
}

export function kilometresBetween(latitudeA: number, longitudeA: number, latitudeB: number, longitudeB: number) {
  const radians = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const deltaLatitude = radians(latitudeB - latitudeA);
  const deltaLongitude = radians(longitudeB - longitudeA);
  const a = Math.sin(deltaLatitude / 2) ** 2 + Math.cos(radians(latitudeA)) * Math.cos(radians(latitudeB)) * Math.sin(deltaLongitude / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function countyFromCoordinates(latitude: number, longitude: number): { county: KenyanCounty; distanceKm: number } | null {
  const candidates = KENYAN_COUNTIES.map((county) => ({ county, distanceKm: kilometresBetween(latitude, longitude, county.latitude, county.longitude) }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
  const nearest = candidates[0];
  if (!nearest || nearest.distanceKm > MAX_COUNTY_MATCH_KM) return null;
  return { county: nearest.county, distanceKm: Math.round(nearest.distanceKm) };
}

export function resolveKenyanLocation(latitude: number, longitude: number): LocationResolution {
  if (!isWithinKenya(latitude, longitude)) return { inKenya: false, county: null, city: null, distanceKm: null };
  const countyResult = countyFromCoordinates(latitude, longitude);
  const cityResult = KENYAN_CITIES.map((city) => ({ city, distanceKm: kilometresBetween(latitude, longitude, city.latitude, city.longitude) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)[0];
  const matchedCity = cityResult && cityResult.distanceKm <= MAX_CITY_MATCH_KM ? cityResult.city.name : null;
  return {
    inKenya: true,
    county: countyResult?.county ?? null,
    city: matchedCity,
    distanceKm: countyResult?.distanceKm ?? cityResult?.distanceKm ?? null,
  };
}
