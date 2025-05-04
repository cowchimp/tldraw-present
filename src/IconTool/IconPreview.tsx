import parse from "html-react-parser";
import { getSvgIcon } from "./getSvgIcon";

export function IconPreview({ name, fillColor }: { name: string; fillColor: string }) {
  const svgString = getSvgIcon(name, {
    size: 24,
    outFillColor: fillColor,
  });
  return parse(svgString);
}
