import { useDialogs, useEditor } from "tldraw";
import { IconDialog } from "./IconDialog";
import { IconPreview } from "./IconPreview";
import { getIcon } from "./selectedIcon";
import { useEffect, useState } from "react";

export function IconDialogHandler() {
  const editor = useEditor();
  const dialogs = useDialogs();
  const [isIconToolActive, setIsIconToolActive] = useState(false);

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
      <button
        className="hihihi"
        style={{
          userSelect: "auto",
          WebkitUserSelect: "auto",
          pointerEvents: "auto",
        }}
        onClick={() =>
          dialogs.addDialog({
            component: ({ onClose }) => <IconDialog onClose={onClose} />,
          })
        }
      >
        <IconPreview name={getIcon()} />
      </button>
    )
  );
}
