export function getTheme() {
  const theme = localStorage.getItem("theme");

  if ("light" === theme || "dark" === theme) return theme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : theme;
}

export function setTheme(theme: string) {
  localStorage.setItem("theme", theme);
  window.dispatchEvent(new StorageEvent("storage", { key: "theme", newValue: theme }));
}

export function toggleTheme() {
  // default is dark
  setTheme((localStorage.theme || "dark") === "dark" ? "light" : "dark");
}
