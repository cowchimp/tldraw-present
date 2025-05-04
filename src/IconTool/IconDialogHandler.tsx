import { TldrawUiButton, useDialogs, useEditor } from "tldraw";
import { IconDialog } from "./IconDialog";
import { IconPreview } from "./IconPreview";
import { getIcon, setIcon } from "./selectedIcon";
import { useEffect, useState } from "react";
import { getFillColor } from "./getFillColor";

export function IconDialogHandler() {
  const editor = useEditor();
  const solid = getFillColor(editor);
  const dialogs = useDialogs();
  const [isIconToolActive, setIsIconToolActive] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(() => getIcon());

  useEffect(() => {
    editor.on("icon-tool-enter" as any, () => {
      setIsIconToolActive(true);
    });
    editor.on("icon-tool-exit" as any, () => {
      setIsIconToolActive(false);
    });
    return () => {
      editor.off("icon-tool-enter" as any, () => {});
      editor.off("icon-tool-exit" as any, () => {});
    };
  }, [editor, dialogs]);

  return (
    isIconToolActive && (
      <TldrawUiButton
        type="tool"
        style={{
          userSelect: "auto",
          WebkitUserSelect: "auto",
          pointerEvents: "auto",
        }}
        onClick={() =>
          dialogs.addDialog({
            component: ({ onClose }) => (
              <IconDialog
                onClose={onClose}
                onSelectIcon={(icon: string) => {
                  setIcon(icon);
                  setSelectedIcon(icon);
                }}
              />
            ),
          })
        }
      >
        <IconPreview name={selectedIcon} fillColor={solid} />
      </TldrawUiButton>
    )
  );
}
