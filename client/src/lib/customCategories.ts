const STORAGE_KEY = "sura-custom-categories";
const MAX_CUSTOM = 15;

export type CustomCategory = {
  name: string;
  subcategories: string[];
};

function readStorage(): CustomCategory[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_CUSTOM) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: CustomCategory[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* storage full or unavailable */ }
}

export function getCustomCategories(): CustomCategory[] {
  return readStorage();
}

export function getCustomCategoryNames(): string[] {
  return readStorage().map((c) => c.name);
}

export function addCustomCategory(name: string, subcategories: string[] = []): { success: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) return { success: false, error: "A category name is required." };
  if (trimmed.length > 40) return { success: false, error: "Keep the name under 40 characters." };
  const existing = readStorage();
  if (existing.length >= MAX_CUSTOM) return { success: false, error: `You can create up to ${MAX_CUSTOM} custom categories.` };
  if (existing.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) return { success: false, error: "That category already exists." };
  const cleaned = subcategories.map((s) => s.trim()).filter(Boolean).slice(0, 10);
  writeStorage([...existing, { name: trimmed, subcategories: cleaned }]);
  return { success: true };
}

export function removeCustomCategory(name: string): void {
  writeStorage(readStorage().filter((c) => c.name !== name));
}

export function updateCustomCategory(name: string, subcategories: string[]): void {
  const existing = readStorage();
  const updated = existing.map((c) => c.name === name ? { ...c, subcategories: subcategories.map((s) => s.trim()).filter(Boolean).slice(0, 10) } : c);
  writeStorage(updated);
}
