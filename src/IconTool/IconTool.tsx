import { AssetRecordType, createShapeId, StateNode, TLImageShape } from "tldraw";
import { getIcon } from "./selectedIcon";
import { getSvgIcon } from "./getSvgIcon";
import { getFillColor } from "./getFillColor";

export class IconTool extends StateNode {
  static override id = "icon" as const;

  override onEnter(): void {
    this.editor.emit("icon-tool-enter" as any, {});
  }

  override onExit(): void {
    this.editor.emit("icon-tool-exit" as any, {});
  }

  override onPointerDown() {
    const { currentPagePoint } = this.editor.inputs;

    const selectedIconName = getIcon();
    const size = 48;
    const fillColor = getFillColor(this.editor);
    const svgString = getSvgIcon(selectedIconName, {
      size,
      outFillColor: fillColor,
    });

    const svgDataUrl = svgStringToBase64(svgString);

    const assetId = AssetRecordType.createId();
    this.editor.createAssets([
      {
        id: assetId,
        typeName: "asset",
        type: "image",
        meta: {},
        props: {
          w: size,
          h: size,
          mimeType: "image/svg+xml",
          src: svgDataUrl,
          name: "image",
          isAnimated: false,
        },
      },
    ]);

    const shapeId = createShapeId();
    this.editor.createShape<TLImageShape>({
      id: shapeId,
      type: "image",
      x: currentPagePoint.x - size / 2,
      y: currentPagePoint.y - size / 2,
      props: {
        w: size,
        h: size,
        assetId,
      },
    });
  }
}

function svgStringToBase64(svgString: string) {
  const base64 = btoa(unescape(encodeURIComponent(svgString)));
  return `data:image/svg+xml;base64,${base64}`;
}
