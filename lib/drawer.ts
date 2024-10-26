export function getDrawer() {
  return localStorage.drawer;
}

export function setDrawer(drawer: boolean) {
  const newValue = String(drawer);
  localStorage.setItem("drawer", newValue);
  window.dispatchEvent(new StorageEvent("storage", { key: "drawer", newValue }));
}

export function toggleDrawer() {
  setDrawer(localStorage.getItem("drawer") !== "true");
}
