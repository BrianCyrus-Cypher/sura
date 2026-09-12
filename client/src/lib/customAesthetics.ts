const STORAGE_KEY = "sura-custom-aesthetics";
const MAX_CUSTOM = 10;

export type CustomAestheticPalette = {
  page: string;
  paper: string;
  primary: string;
  ink: string;
  accent: string;
  soft: string;
  border: string;
  "font-display": string;
  "font-body": string;
  "font-kicker": string;
};

type CustomAesthetic = {
  name: string;
  palette: CustomAestheticPalette;
};

const PALETTE_PRESETS: CustomAestheticPalette[] = [
{ page: "#f0e8f0", paper: "#fdf8fd", primary: "#5a3d6a", ink: "#3d2847", accent: "#b86b8a", soft: "#e4cdd8", border: "#d4b8c8", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  { page: "#e8f0e8", paper: "#f8fdf8", primary: "#3d5a3d", ink: "#284728", accent: "#6ab86b", soft: "#cdd8cd", border: "#b8c8b8", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  { page: "#f0ece8", paper: "#fdf9f8", primary: "#6a4a3d", ink: "#473528", accent: "#b88a6b", soft: "#d8c8b8", border: "#c8b8a8", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  { page: "#e8ecf0", paper: "#f8fbfd", primary: "#3d4a6a", ink: "#283547", accent: "#6b8ab8", soft: "#c8d0d8", border: "#b8c0c8", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  { page: "#f0eee8", paper: "#fdfcfa", primary: "#5a5540", ink: "#3d3a2e", accent: "#a89848", soft: "#d8d2c0", border: "#c8c0a8", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  { page: "#eee8f0", paper: "#fcf8fd", primary: "#4a3d5a", ink: "#352840", accent: "#9a6bb8", soft: "#d0c8d8", border: "#c0b8c8", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  { page: "#f0e8ec", paper: "#fdf8fa", primary: "#6a3d50", ink: "#472838", accent: "#b86b80", soft: "#d8c8d0", border: "#c8b8c0", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
  { page: "#e8f0ec", paper: "#f8fdf9", primary: "#3d5a50", ink: "#284038", accent: "#6bb898", soft: "#c8d8d0", border: "#b8c8c0", "font-display": '"Syne", "Inter", system-ui, sans-serif', "font-body": '"Instrument Sans", "Inter", system-ui, sans-serif', "font-kicker": '"Instrument Sans", "Inter", system-ui, sans-serif' },
];

function generatePalette(name: string, index: number): CustomAestheticPalette {
  const base = PALETTE_PRESETS[index % PALETTE_PRESETS.length];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  const hueShift = Math.abs(hash) % 30 - 15;
  const shift = (hex: string, amount: number) => {
    const r = Math.min(255, Math.max(0, parseInt(hex.slice(1, 3), 16) + amount));
    const g = Math.min(255, Math.max(0, parseInt(hex.slice(3, 5), 16) + amount));
    const b = Math.min(255, Math.max(0, parseInt(hex.slice(5, 7), 16) + amount));
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };
  return {
    ...base,
    accent: shift(base.accent, hueShift),
    primary: shift(base.primary, Math.floor(hueShift / 2)),
  };
}

function readStorage(): CustomAesthetic[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_CUSTOM) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: CustomAesthetic[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* storage full or unavailable */ }
}

export function getCustomAesthetics(): CustomAesthetic[] {
  return readStorage();
}

export function getCustomAestheticNames(): string[] {
  return readStorage().map((a) => a.name);
}

export function getCustomAestheticPalette(name: string): CustomAestheticPalette | undefined {
  return readStorage().find((a) => a.name === name)?.palette;
}

export function addCustomAesthetic(name: string): { success: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) return { success: false, error: "A name is required." };
  if (trimmed.length > 40) return { success: false, error: "Keep the name under 40 characters." };
  const existing = readStorage();
  if (existing.length >= MAX_CUSTOM) return { success: false, error: `You can create up to ${MAX_CUSTOM} custom directions.` };
  if (existing.some((a) => a.name.toLowerCase() === trimmed.toLowerCase())) return { success: false, error: "That direction already exists." };
  const palette = generatePalette(trimmed, existing.length);
  writeStorage([...existing, { name: trimmed, palette }]);
  return { success: true };
}

export function removeCustomAesthetic(name: string): void {
  writeStorage(readStorage().filter((a) => a.name !== name));
}
