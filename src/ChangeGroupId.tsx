import { useEditor, useValue } from "tldraw";

export function ChangeGroupId() {
  const editor = useEditor();

  const { currentCount, allSameValue } = useValue(
    "shapeGroupInfo",
    () => {
      const selectedShapes = editor.getSelectedShapes();
      if (selectedShapes.length === 0) return { currentCount: null, allSameValue: false };

      const firstGroupId = selectedShapes[0].meta.groupId as number;
      const allSameValue = selectedShapes.every((shape) => (shape.meta.groupId as number) === firstGroupId);

      return {
        currentCount: allSameValue ? firstGroupId : undefined,
        allSameValue,
      };
    },
    [editor],
  );

  if (currentCount === null) {
    return null;
  }

  const updateCount = (newValue: number) => {
    const selectedShapes = editor.getSelectedShapes();
    if (selectedShapes.length === 0) return;

    // Update each selected shape
    editor.updateShapes(
      selectedShapes.map((shape) => ({
        id: shape.id,
        type: shape.type,
        meta: {
          ...shape.meta,
          groupId: newValue,
        },
      })),
    );
  };

  return (
    <div
      style={{
        width: 64,
        height: 32,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      <input
        type="number"
        data-testid="group-id-input"
        value={currentCount ?? ""}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (!isNaN(value)) {
            updateCount(value);
          }
        }}
        placeholder={allSameValue ? undefined : "?"}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          textAlign: "center",
          outline: "none",
        }}
      />
    </div>
  );
}
