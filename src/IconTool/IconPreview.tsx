import parse from "html-react-parser";
import { getIconByName } from "./getIconByName";
import { DEFAULT_ICON_FILL_COLOR } from "./constants";

const iconCache = new Map<string, React.ReactNode>();

export function IconPreview({ name }: { name: string }) {
  if (!iconCache.has(name)) {
    const icon = getIconByName(name);
    const svg = icon({ size: 24, theme: "filled", fill: DEFAULT_ICON_FILL_COLOR });
    iconCache.set(name, parse(svg));
  }
  return iconCache.get(name)!;
}
