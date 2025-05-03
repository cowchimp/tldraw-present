import * as iconPark from "@icon-park/svg";
import type { IIconProps } from "@icon-park/svg/lib/runtime";
import { pascalCase } from "change-case";
import parse from "html-react-parser";

const allIcons = iconPark as unknown as Record<string, (opts?: IIconProps) => string>;

export function IconPreview({ name }: { name: string }) {
  const propKey = pascalCase(name);
  const icon = allIcons[propKey];
  const svg = icon({});
  const parsed = parse(svg);
  return parsed;
}
