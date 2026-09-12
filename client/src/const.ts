import { COOKIE_NAME, ONE_YEAR_MS, getOAuthStateCookieName, encodeOAuthState } from "@shared/const";

export { COOKIE_NAME, ONE_YEAR_MS, getOAuthStateCookieName, encodeOAuthState } from "@shared/const";

// Start the Manus OAuth login. Call this from an event handler or effect at the
// moment you want to navigate, e.g. `onClick={() => startLogin()}`.
//
// It has SIDE EFFECTS — it mints a one-time nonce, writes the __Host- state
// cookie, and navigates immediately — so the cookie nonce always matches the
// `state` it sends. Do NOT call it during render (no `href={startLogin()}` /
// `loginUrl={...}`): each call overwrites the cookie, so a stray render-phase
// call would desync it from an in-flight login and the callback would reject it
// with "invalid oauth state". It returns false when configuration is missing
// and true after the redirect has been prepared.
export const startLogin = (): boolean => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;

  // Demo mode: when OAuth is not configured, auto-login via the dev demo endpoint
  if (!oauthPortalUrl || !appId) {
    const returnTo = window.location.pathname === "/join" ? "/account" : window.location.pathname;
    console.log("[Auth] OAuth not configured — using demo login");
    fetch("/api/dev/demo-login", { method: "POST", credentials: "include" })
      .then((response) => {
        if (response.ok) {
          window.location.href = returnTo;
        } else {
          console.error("[Auth] Demo login failed");
        }
      })
      .catch((error) => {
        console.error("[Auth] Demo login request failed:", error);
      });
    return true;
  }

  const redirectUri = `${window.location.origin}/api/oauth/callback`;

  const secure = window.location.protocol === "https:";
  const nonce = crypto.randomUUID();
  const cookieName = getOAuthStateCookieName(secure);
  const cookiePolicy = secure ? "SameSite=None; Secure" : "SameSite=Lax";
  document.cookie = `${cookieName}=${nonce}; Path=/; Max-Age=600; ${cookiePolicy}`;
  const state = encodeOAuthState({ redirectUri, nonce });

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  window.location.href = url.toString();
  return true;
};
