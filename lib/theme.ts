export function getTheme() {
  const theme = localStorage.getItem("theme");

  if ("light" === theme || "dark" === theme) return theme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function setTheme(theme: "light" | "dark") {
  localStorage.setItem("theme", theme);
  window.dispatchEvent(new StorageEvent("storage", { key: "theme", newValue: theme }));
}

export function toggleTheme() {
  setTheme(localStorage.theme === "dark" ? "light" : "dark");
}
