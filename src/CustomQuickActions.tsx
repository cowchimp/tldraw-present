import { DefaultQuickActions, DefaultQuickActionsContent, TldrawUiMenuItem, useActions } from "tldraw";

export function CustomQuickActions({
  currentStep,
  maxStep,
  isPresentationEditModeActive,
}: {
  currentStep: number;
  maxStep: number;
  isPresentationEditModeActive: boolean;
}) {
  const actions = useActions();
  return (
    <DefaultQuickActions>
      <DefaultQuickActionsContent />
      {actions["presentation-edit"] && (
        <>
          {isPresentationEditModeActive ? (
            <div
              style={{
                backgroundColor: "rgb(216, 219, 219)",
                borderRadius: "4px",
              }}
            >
              <TldrawUiMenuItem {...actions["presentation-edit"]} />
            </div>
          ) : (
            <TldrawUiMenuItem {...actions["presentation-edit"]} />
          )}
        </>
      )}
      {actions["presentation"] && <TldrawUiMenuItem {...actions["presentation"]} />}
      {actions["presentation-first"] && (
        <TldrawUiMenuItem {...actions["presentation-first"]} disabled={currentStep === 0} />
      )}
      {actions["presentation-left"] && (
        <TldrawUiMenuItem {...actions["presentation-left"]} disabled={currentStep === 0} />
      )}
      {actions["presentation-right"] && (
        <TldrawUiMenuItem {...actions["presentation-right"]} disabled={currentStep === maxStep} />
      )}
      {actions["presentation-last"] && (
        <TldrawUiMenuItem {...actions["presentation-last"]} disabled={currentStep === maxStep} />
      )}
    </DefaultQuickActions>
  );
}
