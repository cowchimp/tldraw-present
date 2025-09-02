import {
  DefaultQuickActions,
  DefaultQuickActionsContent,
  TldrawUiMenuItem,
  useActions,
  TLUiActionsContextType,
} from "tldraw";

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
  const transformedActions = transformActionForMenuItem(actions);

  return (
    <DefaultQuickActions>
      <DefaultQuickActionsContent />
      {transformedActions["presentation-edit"] && (
        <>
          {isPresentationEditModeActive ? (
            <div
              style={{
                backgroundColor: "rgb(216, 219, 219)",
                borderRadius: "4px",
              }}
            >
              <TldrawUiMenuItem {...transformedActions["presentation-edit"]} />
            </div>
          ) : (
            <TldrawUiMenuItem {...transformedActions["presentation-edit"]} />
          )}
        </>
      )}
      {transformedActions["presentation"] && <TldrawUiMenuItem {...transformedActions["presentation"]} />}
      {transformedActions["presentation-first"] && (
        <TldrawUiMenuItem {...transformedActions["presentation-first"]} disabled={currentStep === 0} />
      )}
      {transformedActions["presentation-left"] && (
        <TldrawUiMenuItem {...transformedActions["presentation-left"]} disabled={currentStep === 0} />
      )}
      {transformedActions["presentation-right"] && (
        <TldrawUiMenuItem {...transformedActions["presentation-right"]} disabled={currentStep === maxStep} />
      )}
      {transformedActions["presentation-last"] && (
        <TldrawUiMenuItem {...transformedActions["presentation-last"]} disabled={currentStep === maxStep} />
      )}
    </DefaultQuickActions>
  );
}

function transformActionForMenuItem(actions: TLUiActionsContextType) {
  return Object.fromEntries(
    Object.entries(actions).map(([key, action]) => [
      key,
      {
        ...action,
        icon: action.icon as string,
      },
    ]),
  );
}
