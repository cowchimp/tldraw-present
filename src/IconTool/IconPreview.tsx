import parse from "html-react-parser";
import { getIconByName } from "./getIconByName";

// const iconCache = new Map<string, React.ReactNode>();

export function IconPreview({ name, fillColor }: { name: string; fillColor: string }) {
  //if (!iconCache.has(name)) {
  const icon = getIconByName(name);
  const svg = icon({ size: 24, theme: "filled", fill: fillColor });
  return parse(svg);
  //iconCache.set(name, parse(svg));
  //}
  //return iconCache.get(name)!;
}
