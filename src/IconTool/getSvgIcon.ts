import * as iconPark from "@icon-park/svg";
import type { IIconProps } from "@icon-park/svg/lib/runtime";
import { pascalCase } from "change-case";

const allIcons = iconPark as unknown as Record<string, (opts: IIconProps) => string>;

export function getSvgIcon(
  name: string,
  opts: {
    size: number;
    outFillColor: string;
  },
) {
  const propKey = pascalCase(name);
  const icon = allIcons[propKey];
  const svgString = icon({
    size: opts.size,
    theme: "multi-color",
    fill: ["#000", opts.outFillColor, "#FFF", "#000"],
    strokeWidth: 4,
  });
  return svgString;
}
