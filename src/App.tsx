import { Editor, Tldraw, useEditor } from "tldraw";
import { useRef, useState } from "react";
import "tldraw/tldraw.css";
import { InFrontOfTheCanvas } from "./InFrontOfTheCanvas";
import { CustomQuickActions } from "./CustomQuickActions";
import { getUniqueGroupIdsInOrder } from "./getUniqueGroupIdsInOrder";
import { getNewActions } from "./getNewActions";
import { assetUrls } from "./assetUrls";
import { SharePanel } from "./SharePanel";
import { WelcomeDialogHandler } from "./WelcomeDialog/WelcomeDialogHandler";
import { IconTool } from "./IconTool/IconTool";
import { IconDialogHandler } from "./IconTool/IconDialogHandler";
import {
  DefaultToolbar,
  DefaultToolbarContent,
  TldrawUiMenuItem,
  useIsToolSelected,
  useTools,
  TLUiOverrides,
  TLComponents,
} from "tldraw";

const uiOverrides: TLUiOverrides = {
  tools(editor, tools) {
    tools.icon = {
      id: "icon",
      icon: "icon-tool",
      label: "Icon",
      kbd: "i",
      onSelect: () => {
        editor.setCurrentTool("icon");
      },
    };
    return tools;
  },
};

const Toolbar: TLComponents["Toolbar"] = (props) => {
  const tools = useTools();
  const isIconSelected = useIsToolSelected(tools["icon"]);
  return (
    <DefaultToolbar {...props}>
      <TldrawUiMenuItem {...tools["icon"]} isSelected={isIconSelected} />
      <DefaultToolbarContent />
    </DefaultToolbar>
  );
};

const customAssetUrls = {
  icons: {
    "icon-tool": "/icon-tool.svg",
  },
};

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

  const customTools = [IconTool];

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        persistenceKey="icon"
        onUiEvent={(event) => {
          if (event === "change-page") {
            setCurrentStep(0);
          }
        }}
        tools={customTools}
        overrides={{
          ...uiOverrides,
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
          ...(isPresentationModeActive ? { StylePanel: null } : {}),
          Toolbar,
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
          TopPanel: () => (
            <>
              <WelcomeDialogHandler />
              <IconDialogHandler />
            </>
          ),
        }}
        getShapeVisibility={(shape, editor) => {
          if (!isPresentationModeActive) {
            return "visible";
          }
          const uniqueGroupIdsInOrder = getUniqueGroupIdsInOrder(editor);
          const groupId = uniqueGroupIdsInOrder[currentStep];
          return Number(shape.meta.groupId) > groupId ? "hidden" : "visible";
        }}
        assetUrls={{ ...assetUrls, ...customAssetUrls }}
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
