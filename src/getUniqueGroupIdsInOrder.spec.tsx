import { Editor } from "tldraw";
import { describe, it, expect } from "vitest";
import { getUniqueGroupIdsInOrder } from "./getUniqueGroupIdsInOrder";

describe("getUniqueGroupIdsInOrder", () => {
  it("should return unique group IDs in ascending order", () => {
    const mockShapes = [
      { meta: { groupId: 3 } },
      { meta: { groupId: 1 } },
      { meta: { groupId: 3 } },
      { meta: { groupId: 2 } },
      { meta: { groupId: 1 } },
    ];

    const mockEditor = {
      getCurrentPageShapes: () => mockShapes,
    } as unknown as Editor;

    const result = getUniqueGroupIdsInOrder(mockEditor);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should handle empty shapes array", () => {
    const mockEditor = {
      getCurrentPageShapes: () => [],
    } as unknown as Editor;

    const result = getUniqueGroupIdsInOrder(mockEditor);
    expect(result).toEqual([]);
  });

  it("should handle shapes with same groupId", () => {
    const mockShapes = [{ meta: { groupId: 1 } }, { meta: { groupId: 1 } }, { meta: { groupId: 1 } }];

    const mockEditor = {
      getCurrentPageShapes: () => mockShapes,
    } as unknown as Editor;

    const result = getUniqueGroupIdsInOrder(mockEditor);
    expect(result).toEqual([1]);
  });
});
