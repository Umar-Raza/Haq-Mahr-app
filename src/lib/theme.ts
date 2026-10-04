export const THEME_STORAGE_KEY = "hmf-theme";
export const LIGHT_THEME = "hmf-light";
export const DARK_THEME = "hmf-dark";

export type ThemeName = typeof LIGHT_THEME | typeof DARK_THEME;

export function resolveTheme(
  stored: string | null,
  prefersDark: boolean,
): ThemeName {
  if (stored === LIGHT_THEME || stored === DARK_THEME) return stored;
  return prefersDark ? DARK_THEME : LIGHT_THEME;
}

// Keep in sync with resolveTheme. Runs in <head> before paint: stored choice wins, otherwise follow the OS preference.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="${LIGHT_THEME}"&&t!=="${DARK_THEME}"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"${DARK_THEME}":"${LIGHT_THEME}"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
