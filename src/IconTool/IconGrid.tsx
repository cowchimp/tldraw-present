import { IconPreview } from "./IconPreview";

interface IconGridProps {
  iconNames: string[];
  selectedIcon: string;
  onSetIcon: (iconName: string) => void;
  onClose: () => void;
  fillColor: string;
}

export function IconGrid({ iconNames, selectedIcon, onSetIcon, onClose, fillColor }: IconGridProps) {
  return (
    <div className="icon-dialog__icon-grid">
      {iconNames.map((name) => (
        <div
          key={name}
          className={`icon-dialog__icon-item${selectedIcon === name ? " icon-dialog__icon-item--selected" : ""}`}
          onClick={() => {
            onSetIcon(name);
          }}
          onDoubleClick={() => {
            onSetIcon(name);
            onClose();
          }}
          title={name}
        >
          <IconPreview name={name} fillColor={fillColor} />
        </div>
      ))}
    </div>
  );
}
