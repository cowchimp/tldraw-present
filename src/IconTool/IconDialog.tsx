import { useState } from "react";
import { TldrawUiButton, TldrawUiButtonLabel, TldrawUiDialogBody, TldrawUiDialogFooter } from "tldraw";
import iconsJson from "@icon-park/svg/icons.json";
import "./IconDialog.css";
import { IconPreview } from "./IconPreview";

const categories = iconsJson.reduce((acc, icon) => {
  acc.add(icon.category);
  return acc;
}, new Set<string>());

export function IconDialog({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredIcons = iconsJson.filter((icon) => {
    const matchesCategory = selectedCategory ? icon.category === selectedCategory : true;
    const matchesSearch = search.trim() === "" ? true : icon.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <TldrawUiDialogBody>
        <input
          type="text"
          placeholder="Search icons by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", marginBottom: 12, padding: 8, fontSize: 16 }}
        />
        <div style={{ marginBottom: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Array.from(categories).map((x) => (
            <button
              className={`category${selectedCategory === x ? " active" : ""}`}
              key={x}
              onClick={() => setSelectedCategory(selectedCategory === x ? null : x)}
            >
              {x}
            </button>
          ))}
        </div>
        {filteredIcons.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", margin: "32px 0" }}>No matches</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(48px, 1fr))",
              gap: 12,
              maxHeight: 400,
              overflowY: "auto",
              background: "#fafbfc",
              padding: 8,
              borderRadius: 8,
              border: "1px solid #eee",
            }}
          >
            {filteredIcons.map((x) => (
              <div
                key={x.name}
                style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}
                onClick={() => console.log("Selected icon:", x.name)}
                title={x.name}
              >
                <IconPreview name={x.name} />
                <span
                  style={{ fontSize: 10, marginTop: 2, color: "#555", textAlign: "center", wordBreak: "break-all" }}
                >
                  {x.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </TldrawUiDialogBody>
      <TldrawUiDialogFooter className="tlui-dialog__footer__actions">
        <TldrawUiButton type="primary" onClick={onClose}>
          <TldrawUiButtonLabel>Close</TldrawUiButtonLabel>
        </TldrawUiButton>
      </TldrawUiDialogFooter>
    </>
  );
}
