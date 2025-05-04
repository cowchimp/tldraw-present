import { TldrawUiButton, useDialogs, useEditor } from "tldraw";
import { IconDialog } from "./IconDialog";
import { IconPreview } from "./IconPreview";
import { getIcon, setIcon } from "./selectedIcon";
import { useEffect, useState } from "react";
import { getFillColor } from "./getFillColor";
import { EXIT_EVENT_NAME, ENTER_EVENT_NAME } from "./constants";

export function IconDialogHandler() {
  const editor = useEditor();
  const solid = getFillColor(editor);
  const dialogs = useDialogs();
  const [isIconToolActive, setIsIconToolActive] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(() => getIcon());

  useEffect(() => {
    editor.on(ENTER_EVENT_NAME, () => {
      setIsIconToolActive(true);
    });
    editor.on(EXIT_EVENT_NAME, () => {
      setIsIconToolActive(false);
    });
    return () => {
      editor.off(ENTER_EVENT_NAME, () => {});
      editor.off(EXIT_EVENT_NAME, () => {});
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
