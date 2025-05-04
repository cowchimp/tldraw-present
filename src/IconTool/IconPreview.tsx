import parse from "html-react-parser";
import { getIconByName } from "./getIconByName";

export function IconPreview({ name, fillColor }: { name: string; fillColor: string }) {
  const icon = getIconByName(name);
  const svg = icon({ size: 24, theme: "filled", fill: fillColor });
  return parse(svg);
}
