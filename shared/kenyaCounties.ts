export type KenyanCountyName =
  "Mombasa" | "Kwale" | "Kilifi" | "Tana River" | "Lamu" | "Taita-Taveta" |
  "Garissa" | "Wajir" | "Mandera" |
  "Marsabit" | "Isiolo" | "Meru" | "Tharaka-Nithi" | "Embu" | "Kitui" | "Machakos" | "Makueni" |
  "Nyandarua" | "Nyeri" | "Kirinyaga" | "Murang'a" | "Kiambu" |
  "Turkana" | "West Pokot" | "Samburu" | "Trans Nzoia" | "Uasin Gishu" | "Elgeyo-Marakwet" | "Nandi" | "Baringo" | "Laikipia" | "Nakuru" | "Narok" | "Kajiado" | "Kericho" | "Bomet" |
  "Kakamega" | "Vihiga" | "Bungoma" | "Busia" |
  "Siaya" | "Kisumu" | "Homa Bay" | "Migori" | "Kisii" | "Nyamira" |
  "Nairobi";

export type KenyanCountyRegion = "Coast" | "North Eastern" | "Eastern" | "Central" | "Rift Valley" | "Western" | "Nyanza" | "Nairobi";

export type KenyanCounty = {
  name: KenyanCountyName;
  code: string;
  region: KenyanCountyRegion;
  capital: string;
  latitude: number;
  longitude: number;
};

export const KENYAN_COUNTIES: readonly KenyanCounty[] = [
  { name: "Mombasa",          code: "001", region: "Coast",        capital: "Mombasa",          latitude: -4.0435,  longitude: 39.6682 },
  { name: "Kwale",            code: "002", region: "Coast",        capital: "Kwale",            latitude: -4.18,    longitude: 39.45   },
  { name: "Kilifi",           code: "003", region: "Coast",        capital: "Kilifi",           latitude: -3.63,    longitude: 39.85   },
  { name: "Tana River",       code: "004", region: "Coast",        capital: "Hola",             latitude: -1.5,     longitude: 40.0    },
  { name: "Lamu",             code: "005", region: "Coast",        capital: "Lamu",             latitude: -2.27,    longitude: 40.90   },
  { name: "Taita-Taveta",     code: "006", region: "Coast",        capital: "Voi",              latitude: -3.4,     longitude: 38.5    },
  { name: "Garissa",          code: "007", region: "North Eastern", capital: "Garissa",          latitude: -0.46,    longitude: 39.64   },
  { name: "Wajir",            code: "008", region: "North Eastern", capital: "Wajir",            latitude: 1.74,     longitude: 40.06   },
  { name: "Mandera",          code: "009", region: "North Eastern", capital: "Mandera",          latitude: 3.9,      longitude: 41.87   },
  { name: "Marsabit",         code: "010", region: "Eastern",       capital: "Marsabit",         latitude: 2.33,     longitude: 37.99   },
  { name: "Isiolo",           code: "011", region: "Eastern",       capital: "Isiolo",           latitude: 0.35,     longitude: 37.58   },
  { name: "Meru",             code: "012", region: "Eastern",       capital: "Meru",             latitude: 0.05,     longitude: 37.65   },
  { name: "Tharaka-Nithi",    code: "013", region: "Eastern",       capital: "Chuka",            latitude: -0.33,    longitude: 37.65   },
  { name: "Embu",             code: "014", region: "Eastern",       capital: "Embu",             latitude: -0.53,    longitude: 37.45   },
  { name: "Kitui",            code: "015", region: "Eastern",       capital: "Kitui",            latitude: -1.37,    longitude: 38.01   },
  { name: "Machakos",         code: "016", region: "Eastern",       capital: "Machakos",         latitude: -1.51,    longitude: 37.26   },
  { name: "Makueni",          code: "017", region: "Eastern",       capital: "Wote",             latitude: -1.8,     longitude: 37.62   },
  { name: "Nyandarua",        code: "018", region: "Central",       capital: "Ol Kalou",         latitude: -0.56,    longitude: 36.45   },
  { name: "Nyeri",            code: "019", region: "Central",       capital: "Nyeri",            latitude: -0.42,    longitude: 36.95   },
  { name: "Kirinyaga",        code: "020", region: "Central",       capital: "Kerugoya",         latitude: -0.5,     longitude: 37.28   },
  { name: "Murang'a",         code: "021", region: "Central",       capital: "Murang'a",         latitude: -0.72,    longitude: 37.15   },
  { name: "Kiambu",           code: "022", region: "Central",       capital: "Kiambu",           latitude: -1.17,    longitude: 36.83   },
  { name: "Turkana",          code: "023", region: "Rift Valley",   capital: "Lodwar",           latitude: 3.12,     longitude: 35.6    },
  { name: "West Pokot",       code: "024", region: "Rift Valley",   capital: "Kapenguria",       latitude: 1.56,     longitude: 35.0    },
  { name: "Samburu",          code: "025", region: "Rift Valley",   capital: "Maralal",          latitude: 1.1,      longitude: 36.7    },
  { name: "Trans Nzoia",      code: "026", region: "Rift Valley",   capital: "Kitale",           latitude: 1.02,     longitude: 35.0    },
  { name: "Uasin Gishu",     code: "027", region: "Rift Valley",   capital: "Eldoret",          latitude: 0.51,     longitude: 35.27   },
  { name: "Elgeyo-Marakwet",  code: "028", region: "Rift Valley",   capital: "Iten",             latitude: 0.67,     longitude: 35.5    },
  { name: "Nandi",            code: "029", region: "Rift Valley",   capital: "Kapsabet",         latitude: 0.2,      longitude: 35.09   },
  { name: "Baringo",          code: "030", region: "Rift Valley",   capital: "Kabarnet",         latitude: 0.49,     longitude: 35.74   },
  { name: "Laikipia",         code: "031", region: "Rift Valley",   capital: "Nanyuki",          latitude: 0.02,     longitude: 36.87   },
  { name: "Nakuru",           code: "032", region: "Rift Valley",   capital: "Nakuru",           latitude: -0.30,    longitude: 36.08   },
  { name: "Narok",            code: "033", region: "Rift Valley",   capital: "Narok",            latitude: -1.08,    longitude: 35.87   },
  { name: "Kajiado",          code: "034", region: "Rift Valley",   capital: "Kajiado",          latitude: -1.85,    longitude: 36.79   },
  { name: "Kericho",          code: "035", region: "Rift Valley",   capital: "Kericho",          latitude: -0.37,    longitude: 35.28   },
  { name: "Bomet",            code: "036", region: "Rift Valley",   capital: "Bomet",            latitude: -0.78,    longitude: 35.34   },
  { name: "Kakamega",         code: "037", region: "Western",       capital: "Kakamega",         latitude: 0.28,     longitude: 34.75   },
  { name: "Vihiga",           code: "038", region: "Western",       capital: "Vihiga",           latitude: 0.08,     longitude: 34.72   },
  { name: "Bungoma",          code: "039", region: "Western",       capital: "Bungoma",          latitude: 0.56,     longitude: 34.56   },
  { name: "Busia",            code: "040", region: "Western",       capital: "Busia",            latitude: 0.46,     longitude: 34.11   },
  { name: "Siaya",            code: "041", region: "Nyanza",        capital: "Siaya",            latitude: 0.06,     longitude: 34.28   },
  { name: "Kisumu",           code: "042", region: "Nyanza",        capital: "Kisumu",           latitude: -0.10,    longitude: 34.76   },
  { name: "Homa Bay",         code: "043", region: "Nyanza",        capital: "Homa Bay",         latitude: -0.53,    longitude: 34.45   },
  { name: "Migori",           code: "044", region: "Nyanza",        capital: "Migori",           latitude: -1.07,    longitude: 34.47   },
  { name: "Kisii",            code: "045", region: "Nyanza",        capital: "Kisii",            latitude: -0.68,    longitude: 34.77   },
  { name: "Nyamira",          code: "046", region: "Nyanza",        capital: "Nyamira",          latitude: -0.56,    longitude: 34.93   },
  { name: "Nairobi",          code: "047", region: "Nairobi",       capital: "Nairobi",          latitude: -1.2864,  longitude: 36.8172 },
] as const;

export const KENYAN_REGIONS: readonly KenyanCountyRegion[] = [
  "Nairobi", "Coast", "Central", "Eastern", "Rift Valley", "Nyanza", "Western", "North Eastern",
] as const;

export function isKenyanCountyName(value: string | null | undefined): value is KenyanCountyName {
  return Boolean(value && KENYAN_COUNTIES.some((c) => c.name === value));
}

export function countyByName(name: string): KenyanCounty | undefined {
  return KENYAN_COUNTIES.find((c) => c.name === name);
}

export function countiesByRegion(region: KenyanCountyRegion): readonly KenyanCounty[] {
  return KENYAN_COUNTIES.filter((c) => c.region === region);
}