import { useDialogs } from "tldraw";
import { WelcomeDialog } from "./WelcomDialog";

const DIALOG_PREFERENCE_KEY = "myDialog.hideDialog";

interface WelcomeDialogHook {
  showDialog: () => void;
  getDontShowAgainPreference: () => boolean;
}

export function useWelcomeDialog(): WelcomeDialogHook {
  const { addDialog } = useDialogs();

  const getDontShowAgainPreference = () => {
    return localStorage.getItem(DIALOG_PREFERENCE_KEY) === "true";
  };

  const setDontShowAgainPreference = (value: boolean) => {
    if (value) {
      localStorage.setItem(DIALOG_PREFERENCE_KEY, "true");
    } else {
      localStorage.removeItem(DIALOG_PREFERENCE_KEY);
    }
  };

  const showDialog = () => {
    addDialog({
      component: ({ onClose }) => (
        <WelcomeDialog
          initialDontShowAgain={getDontShowAgainPreference()}
          onDontShowAgainChange={setDontShowAgainPreference}
          onClose={onClose}
        />
      ),
    });
  };

  return {
    showDialog,
    getDontShowAgainPreference,
  };
}
