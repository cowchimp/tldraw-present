import { describe, it, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChangeGroupId } from "./ChangeGroupId";
import { EditorContext, Editor } from "@tldraw/editor";

describe("ChangeGroupId", () => {
  it("renders nothing when no shapes are selected", () => {
    const mockEditor = {
      getSelectedShapes: vi.fn().mockReturnValue([]),
    } as Partial<Editor> as Editor;

    const { container } = render(
      <EditorContext.Provider value={mockEditor}>
        <ChangeGroupId />
      </EditorContext.Provider>,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders input with value when shapes with same group ID are selected", () => {
    const mockEditor = {
      getSelectedShapes: vi.fn().mockReturnValue([
        { id: "1", type: "shape", meta: { groupId: 1 } },
        { id: "2", type: "shape", meta: { groupId: 1 } },
      ]),
    } as Partial<Editor> as Editor;

    render(
      <EditorContext.Provider value={mockEditor}>
        <ChangeGroupId />
      </EditorContext.Provider>,
    );
    const input = screen.getByTestId("group-id-input") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("1");
  });

  it("renders input with placeholder when shapes have different group IDs", () => {
    const mockEditor = {
      getSelectedShapes: vi.fn().mockReturnValue([
        { id: "1", type: "shape", meta: { groupId: 1 } },
        { id: "2", type: "shape", meta: { groupId: 2 } },
      ]),
    } as Partial<Editor> as Editor;

    render(
      <EditorContext.Provider value={mockEditor}>
        <ChangeGroupId />
      </EditorContext.Provider>,
    );
    const input = screen.getByTestId("group-id-input") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe("?");
    expect(input.value).toBe("");
  });

  it("updates shapes when input value changes", () => {
    const mockEditor = {
      getSelectedShapes: vi.fn().mockReturnValue([
        { id: "1", type: "shape", meta: { groupId: 1 } },
        { id: "2", type: "shape", meta: { groupId: 1 } },
      ]),
      updateShapes: vi.fn(),
    } as Partial<Editor> as Editor;

    render(
      <EditorContext.Provider value={mockEditor}>
        <ChangeGroupId />
      </EditorContext.Provider>,
    );
    const input = screen.getByTestId("group-id-input");

    fireEvent.change(input, { target: { value: "2" } });

    expect(mockEditor.updateShapes).toHaveBeenCalledWith([
      { id: "1", type: "shape", meta: { groupId: 2 } },
      { id: "2", type: "shape", meta: { groupId: 2 } },
    ]);
  });

  it("doesn't update shapes when input value is not a number", () => {
    const mockEditor = {
      getSelectedShapes: vi.fn().mockReturnValue([{ id: "1", type: "shape", meta: { groupId: 1 } }]),
      updateShapes: vi.fn(),
    } as Partial<Editor> as Editor;

    render(
      <EditorContext.Provider value={mockEditor}>
        <ChangeGroupId />
      </EditorContext.Provider>,
    );
    const input = screen.getByTestId("group-id-input");

    fireEvent.change(input, { target: { value: "invalid" } });

    expect(mockEditor.updateShapes).not.toHaveBeenCalled();
  });
});
