import { useEffect } from "react";
import { useDialogs, useEditor } from "tldraw";
import { IconDialog } from "./IconDialog";

export function IconDialogHandler() {
  const editor = useEditor();
  const dialogs = useDialogs();

  useEffect(() => {
    function handleOpenIconDialog() {
      dialogs.addDialog({
        component: ({ onClose }) => <IconDialog onClose={onClose} />,
      });
    }
    editor.on("open-icon-dialog" as any, handleOpenIconDialog);
    return () => {
      editor.off("open-icon-dialog" as any, handleOpenIconDialog);
    };
  }, [editor, dialogs]);

  return null;
}
