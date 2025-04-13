import { useState } from "react";
import { TldrawUiButton, TldrawUiButtonLabel, TldrawUiDialogBody, TldrawUiDialogFooter } from "tldraw";
import { EmblaCarousel } from "./EmblaCarousel";

export function WelcomeDialog({
  onClose,
  initialDontShowAgain,
  onDontShowAgainChange,
}: {
  onClose(): void;
  initialDontShowAgain: boolean;
  onDontShowAgainChange: (value: boolean) => void;
}) {
  const [dontShowAgain, setDontShowAgain] = useState(initialDontShowAgain);

  const handleDontShowAgainChange = (checked: boolean) => {
    setDontShowAgain(checked);
    onDontShowAgainChange(checked);
  };

  return (
    <>
      <TldrawUiDialogBody style={{ fontSize: "16px", width: "600px" }}>
        <p>
          Welcome to <b>tldraw-present!</b>
          <br />
          Use this as a whiteboard app like just you would use{" "}
          <a href="https://www.tldraw.com/" target="_blank">
            tldraw
          </a>
          , but with an added superpower: you can reveal parts of your sketch one step at a time.
          <br />
          It's perfect for walking through complex diagrams, system architectures, or any visual explanation that's
          better understood piece by piece.
        </p>
        <EmblaCarousel
          slides={{
            "slide-1": <img src="/slide-1.png" alt="Create your sketch" />,
            "slide-2": <img src="/slide-2.png" alt={'Turn on "Edit Presentation" mode'} />,
            "slide-3": <img src="/slide-3.png" alt="Select a group of elements and set their step number" />,
            "slide-4": <img src="/slide-4.png" alt={'Ready to present? Turn on "Presentation" mode'} />,
            "slide-5": (
              <img src="/slide-5.png" alt="Use the slide navigation buttons to step through your presentation" />
            ),
          }}
          options={{
            loop: true,
          }}
        />
      </TldrawUiDialogBody>
      <TldrawUiDialogFooter className="tlui-dialog__footer__actions">
        <div style={{ marginRight: "auto", paddingLeft: "8px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => handleDontShowAgainChange(e.target.checked)}
            />
            Don't show again
          </label>
        </div>
        <TldrawUiButton type="primary" onClick={onClose}>
          <TldrawUiButtonLabel>Close</TldrawUiButtonLabel>
        </TldrawUiButton>
      </TldrawUiDialogFooter>
    </>
  );
}
