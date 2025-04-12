import { Editor, Tldraw, useEditor } from "tldraw";
import { useRef, useState } from "react";
import "tldraw/tldraw.css";
import { InFrontOfTheCanvas } from "./InFrontOfTheCanvas";
import { CustomQuickActions } from "./CustomQuickActions";
import { getUniqueGroupIdsInOrder } from "./getUniqueGroupIdsInOrder";
import { getNewActions } from "./getNewActions";
import { assetUrls } from "./assetUrls";
import { SharePanel } from "./SharePanel";

export default function App() {
  const [isPresentationModeActive, setIsPresentationModeActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPresentationEditModeActive, setIsPresentationEditModeActive] = useState(false);
  const editorRef = useRef<Editor | null>(null);

  const togglePresentationMode = () => {
    setIsPresentationModeActive((prev) => {
      if (!prev && editorRef.current) {
        editorRef.current.selectNone();
      }
      return !prev;
    });
    setIsPresentationEditModeActive(false);
    setCurrentStep(0);
  };

  const togglePresentationEditMode = () => {
    setIsPresentationEditModeActive((prev) => !prev);
    setIsPresentationModeActive(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        persistenceKey="tldraw-present"
        onUiEvent={(event) => {
          if (event === "change-page") {
            setCurrentStep(0);
          }
        }}
        overrides={{
          actions: (_editor, actions) => {
            const uniqueGroupIdsInOrder = getUniqueGroupIdsInOrder(_editor);
            const maxStep = uniqueGroupIdsInOrder.length - 1;

            const newActions = getNewActions({
              togglePresentationEditMode,
              togglePresentationMode,
              isPresentationModeActive,
              maxStep,
              setCurrentStep,
            });

            return {
              ...actions,
              ...newActions,
            };
          },
        }}
        components={{
          ...(isPresentationEditModeActive ? { InFrontOfTheCanvas } : {}),
          QuickActions: () => {
            const editor = useEditor();
            const uniqueGroupIdsInOrder = getUniqueGroupIdsInOrder(editor);
            const maxStep = uniqueGroupIdsInOrder.length - 1;
            return (
              <CustomQuickActions
                currentStep={currentStep}
                maxStep={maxStep}
                isPresentationEditModeActive={isPresentationEditModeActive}
              />
            );
          },
          SharePanel,
        }}
        isShapeHidden={(shape, editor) => {
          if (!isPresentationModeActive) {
            return false;
          }
          const uniqueGroupIdsInOrder = getUniqueGroupIdsInOrder(editor);
          const groupId = uniqueGroupIdsInOrder[currentStep];
          return Number(shape.meta.groupId) > groupId;
        }}
        assetUrls={assetUrls}
        onMount={(editor) => {
          editorRef.current = editor;
          editor.getInitialMetaForShape = () => {
            return {
              groupId: 0,
            };
          };
        }}
      />
    </div>
  );
}
