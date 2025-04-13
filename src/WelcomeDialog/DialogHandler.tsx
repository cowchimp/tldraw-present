import { useEffect } from "react";
import { useWelcomeDialog } from "./useWelcomeDialog";

let hasShownDialogThisSession = false;

export function DialogHandler() {
  const { showDialog, getDontShowAgainPreference } = useWelcomeDialog();

  useEffect(() => {
    if (hasShownDialogThisSession) {
      return;
    }

    if (getDontShowAgainPreference()) {
      return;
    }

    hasShownDialogThisSession = true;
    showDialog();
  }, [showDialog, getDontShowAgainPreference]);

  return null;
}
