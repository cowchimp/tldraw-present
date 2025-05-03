import { useState } from "react";
import { TldrawUiButton, TldrawUiButtonLabel, TldrawUiDialogBody, TldrawUiDialogFooter } from "tldraw";
import iconsJson from "@icon-park/svg/icons.json";
import "./IconDialog.css";
import { IconPreview } from "./IconPreview";
import { getIcon, setIcon } from "./selectedIcon";

const categories = iconsJson.reduce((acc, icon) => {
  acc.add(icon.category);
  return acc;
}, new Set<string>());

export function IconDialog({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState(() => getIcon());

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
          className="icon-dialog__search-input"
        />
        <div className="icon-dialog__categories">
          {Array.from(categories).map((x) => (
            <button
              className={`icon-dialog__category${selectedCategory === x ? " icon-dialog__category--active" : ""}`}
              key={x}
              onClick={() => setSelectedCategory(selectedCategory === x ? null : x)}
            >
              {x}
            </button>
          ))}
        </div>
        {filteredIcons.length === 0 ? (
          <div className="icon-dialog__no-matches">No matches</div>
        ) : (
          <div className="icon-dialog__icon-grid">
            {filteredIcons.map((x) => (
              <div
                key={x.name}
                className={`icon-dialog__icon-item${
                  selectedIcon === x.name ? " icon-dialog__icon-item--selected" : ""
                }`}
                onClick={() => {
                  setSelectedIcon(x.name);
                  setIcon(x.name);
                }}
                title={x.name}
              >
                <IconPreview name={x.name} />
                <span className="icon-dialog__icon-label">{x.name}</span>
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
