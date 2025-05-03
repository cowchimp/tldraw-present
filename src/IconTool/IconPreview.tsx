import parse from "html-react-parser";
import { getIconByName } from "./getIconByName";

const iconCache = new Map<string, React.ReactNode>();

export function IconPreview({ name }: { name: string }) {
  if (!iconCache.has(name)) {
    const icon = getIconByName(name);
    const svg = icon({});
    iconCache.set(name, parse(svg));
  }
  return iconCache.get(name)!;
}
