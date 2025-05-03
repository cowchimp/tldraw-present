import { TldrawUiButton, TldrawUiButtonLabel, TldrawUiDialogBody, TldrawUiDialogFooter } from "tldraw";
import iconsJson from "@icon-park/svg/icons.json";
import "./IconDialog.css";
import { IconPreview } from "./IconPreview";

const categories = iconsJson.reduce((acc, icon) => {
  acc.add(icon.category);
  return acc;
}, new Set<string>());

export function IconDialog({ onClose }: { onClose: () => void }) {
  return (
    <>
      <TldrawUiDialogBody style={{ fontSize: "16px", width: "600px" }}>
        {Array.from(categories).map((x) => (
          <button className="category" key={x}>
            {x}
          </button>
        ))}
        {iconsJson.map((x) => (
          <IconPreview key={x.name} name={x.name} />
        ))}
      </TldrawUiDialogBody>
      <TldrawUiDialogFooter className="tlui-dialog__footer__actions">
        <TldrawUiButton type="primary" onClick={onClose}>
          <TldrawUiButtonLabel>Close</TldrawUiButtonLabel>
        </TldrawUiButton>
      </TldrawUiDialogFooter>
    </>
  );
}
