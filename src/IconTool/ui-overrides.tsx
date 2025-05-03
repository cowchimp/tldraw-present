import { Editor, TLUiToolsContextType } from "tldraw";

export function extendWithIconTool(editor: Editor, tools: TLUiToolsContextType) {
  tools.icon = {
    id: "icon",
    icon: "icon-tool",
    label: "Icon",
    kbd: "i",
    onSelect: () => {
      editor.setCurrentTool("icon");
    },
  };
  return tools;
}
