import * as iconPark from "@icon-park/svg";
import type { IIconProps } from "@icon-park/svg/lib/runtime";
import { pascalCase } from "change-case";

const allIcons = iconPark as unknown as Record<string, (opts: IIconProps) => string>;

export function getIconByName(name: string) {
  const propKey = pascalCase(name);
  const icon = allIcons[propKey];
  return icon;
}
