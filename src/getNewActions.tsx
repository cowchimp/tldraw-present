import { TLUiActionsContextType } from "tldraw";

export function getNewActions({
  togglePresentationEditMode,
  togglePresentationMode,
  isPresentationModeActive,
  maxStep,
  setCurrentStep,
}: {
  togglePresentationEditMode: () => void;
  togglePresentationMode: () => void;
  isPresentationModeActive: boolean;
  maxStep: number;
  setCurrentStep: (step: number | ((prev: number) => number)) => void;
}) {
  const newActions: TLUiActionsContextType = {
    "presentation-edit": {
      id: "presentation-edit",
      label: "Edit Presentation",
      icon: "presentation-edit",
      onSelect: togglePresentationEditMode,
    },
    presentation: {
      id: "presentation",
      label: "Present",
      icon: "presentation",
      onSelect: togglePresentationMode,
    },
    ...(isPresentationModeActive
      ? {
          "presentation-first": {
            id: "presentation-first",
            label: "First",
            icon: "chevron-first",
            kbd: "Home",
            onSelect: () => setCurrentStep(0),
          },
          "presentation-left": {
            id: "presentation-left",
            label: "Previous",
            icon: "chevron-left",
            kbd: "Left",
            onSelect: () => setCurrentStep((prev: number) => Math.max(0, prev - 1)),
          },
          "presentation-right": {
            id: "presentation-right",
            label: "Next",
            icon: "chevron-right",
            kbd: "Right",
            onSelect: () => setCurrentStep((prev: number) => Math.min(maxStep, prev + 1)),
          },
          "presentation-last": {
            id: "presentation-last",
            label: "Last",
            icon: "chevron-last",
            kbd: "End",
            onSelect: () => setCurrentStep(maxStep),
          },
        }
      : {}),
  };
  return newActions;
}
