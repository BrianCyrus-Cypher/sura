const BUILD_SAVED_KEY = "sura-build-saved";

export function markBuildSaved() {
  try {
    window.localStorage.setItem(BUILD_SAVED_KEY, "1");
  } catch {
    // storage unavailable — the curation gate simply stays closed
  }
}

export function wasBuildSaved(): boolean {
  try {
    return window.localStorage.getItem(BUILD_SAVED_KEY) === "1";
  } catch {
    return false;
  }
}