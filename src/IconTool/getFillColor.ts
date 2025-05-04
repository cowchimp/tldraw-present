import { DefaultColorStyle, Editor, getDefaultColorTheme } from "tldraw";

export function getFillColor(editor: Editor) {
  const color = editor.getStyleForNextShape(DefaultColorStyle);
  const theme = getDefaultColorTheme({ isDarkMode: editor.user.getIsDarkMode() });
  const solid = theme[color].solid;
  return solid;
}
