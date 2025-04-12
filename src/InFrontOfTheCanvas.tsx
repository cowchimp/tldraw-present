import { stopEventPropagation, useEditor, useValue } from "tldraw";
import { ChangeGroupId } from "./ChangeGroupId.tsx";

export function InFrontOfTheCanvas() {
  const editor = useEditor();

  const info = useValue(
    "selection bounds",
    () => {
      const screenBounds = editor.getViewportScreenBounds();
      const rotation = editor.getSelectionRotation();
      const rotatedScreenBounds = editor.getSelectionRotatedScreenBounds();
      if (!rotatedScreenBounds) return;
      return {
        x: rotatedScreenBounds.x - screenBounds.x,
        y: rotatedScreenBounds.y - screenBounds.y,
        width: rotatedScreenBounds.width,
        height: rotatedScreenBounds.height,
        rotation: rotation,
      };
    },
    [editor],
  );

  if (!info) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transformOrigin: "top left",
        transform: `translate(${info.x}px, ${info.y}px) rotate(${info.rotation}rad)`,
        pointerEvents: "all",
      }}
      onPointerDown={stopEventPropagation}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          gap: "4px",
          pointerEvents: "all",
          transform: `translate(${info.width / 2 - 32}px, ${-40}px)`,
        }}
        onPointerDown={stopEventPropagation}
      >
        <ChangeGroupId />
      </div>
    </div>
  );
}
