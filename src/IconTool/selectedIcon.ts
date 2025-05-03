const LOCAL_STORAGE_KEY = "iconDialog.selectedIcon";

export function setIcon(iconName: string) {
  localStorage.setItem(LOCAL_STORAGE_KEY, iconName);
}

export function getIcon(): string {
  return localStorage.getItem(LOCAL_STORAGE_KEY) || "abdominal";
}
