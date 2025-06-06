import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { IconDialog } from "./IconDialog";
import { useEditor } from "tldraw";

vi.mock("tldraw", () => ({
  DefaultColorStyle: "color",
  getDefaultColorTheme: vi.fn(() => ({
    black: { solid: "#000000" },
    grey: { solid: "#666666" },
    red: { solid: "#ff0000" },
    blue: { solid: "#0000ff" },
  })),
  Editor: class MockEditor {},
  useEditor: vi.fn(),
  TldrawUiButton: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  TldrawUiButtonLabel: ({ children }: any) => <span>{children}</span>,
  TldrawUiDialogBody: ({ children }: any) => <div>{children}</div>,
  TldrawUiDialogFooter: ({ children }: any) => <div>{children}</div>,
}));

describe("IconDialog", () => {
  const mockOnClose = vi.fn();
  const mockOnSelectIcon = vi.fn();
  const mockEditor = {
    user: { getIsDarkMode: () => false },
    getStyleForNextShape: vi.fn(() => "black"),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useEditor as any).mockReturnValue(mockEditor);
    localStorage.clear();
  });

  const renderIconDialog = () => {
    return render(<IconDialog onClose={mockOnClose} onSelectIcon={mockOnSelectIcon} />);
  };

  it("should render search input with correct placeholder", () => {
    renderIconDialog();

    const searchInput = screen.getByPlaceholderText("Search icons by name...");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("");
  });

  it("should render category buttons", () => {
    renderIconDialog();

    // Check for some real categories from the actual icons.json
    expect(screen.getByText("Office")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Character")).toBeInTheDocument();
    expect(screen.getByText("Health")).toBeInTheDocument();
  });

  it("should display all icons by default", () => {
    renderIconDialog();

    const iconGrid = document.querySelector(".icon-dialog__icon-grid");
    expect(iconGrid).toBeInTheDocument();
    const iconItems = document.querySelectorAll(".icon-dialog__icon-item");
    expect(iconItems.length).toBeGreaterThan(100); // Real icons.json has hundreds of icons
  });

  it("should filter icons by search term", async () => {
    renderIconDialog();

    const searchInput = screen.getByPlaceholderText("Search icons by name...");
    fireEvent.change(searchInput, { target: { value: "add" } });

    await waitFor(() => {
      const iconItems = document.querySelectorAll(".icon-dialog__icon-item");
      expect(iconItems.length).toBeGreaterThan(0); // Should find icons containing "add"
      expect(iconItems.length).toBeLessThan(100); // Should be filtered down from the total
    });
  });

  it("should filter icons by category", async () => {
    renderIconDialog();

    const officeButton = screen.getByText("Office");
    fireEvent.click(officeButton);

    await waitFor(() => {
      const iconItems = document.querySelectorAll(".icon-dialog__icon-item");
      expect(iconItems.length).toBeGreaterThan(0); // Should find icons in Office category
      expect(iconItems.length).toBeLessThan(300); // Should be filtered down from the total
    });

    // Should highlight active category
    expect(officeButton).toHaveClass("icon-dialog__category--active");
  });

  it("should toggle category filter when clicking same category", async () => {
    renderIconDialog();

    const officeButton = screen.getByText("Office");
    let initialCount: number;

    // Get initial count
    await waitFor(() => {
      const iconItems = document.querySelectorAll(".icon-dialog__icon-item");
      initialCount = iconItems.length;
      expect(initialCount).toBeGreaterThan(100);
    });

    // First click - activate filter
    fireEvent.click(officeButton);
    await waitFor(() => {
      const iconItems = document.querySelectorAll(".icon-dialog__icon-item");
      const filteredCount = iconItems.length;
      expect(filteredCount).toBeLessThan(initialCount);
    });

    // Second click - deactivate filter
    fireEvent.click(officeButton);
    await waitFor(() => {
      const iconItems = document.querySelectorAll(".icon-dialog__icon-item");
      const restoredCount = iconItems.length;
      expect(restoredCount).toBe(initialCount);
    });

    expect(officeButton).not.toHaveClass("icon-dialog__category--active");
  });

  it("should combine search and category filters", async () => {
    renderIconDialog();

    // Apply category filter
    fireEvent.click(screen.getByText("Office"));
    let categoryFilteredCount: number;
    await waitFor(() => {
      const iconItems = document.querySelectorAll(".icon-dialog__icon-item");
      categoryFilteredCount = iconItems.length;
      expect(categoryFilteredCount).toBeGreaterThan(0);
    });

    // Apply search filter
    const searchInput = screen.getByPlaceholderText("Search icons by name...");
    fireEvent.change(searchInput, { target: { value: "add" } });

    await waitFor(() => {
      const iconItems = document.querySelectorAll(".icon-dialog__icon-item");
      const combinedFilteredCount = iconItems.length;
      expect(combinedFilteredCount).toBeLessThan(categoryFilteredCount); // Should be further filtered
      expect(combinedFilteredCount).toBeGreaterThanOrEqual(0); // Might be 0 if no matches
    });
  });

  it("should show 'No matches' when no icons match filters", async () => {
    renderIconDialog();

    const searchInput = screen.getByPlaceholderText("Search icons by name...");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    await waitFor(() => {
      expect(screen.getByText("No matches")).toBeInTheDocument();
      expect(document.querySelector(".icon-dialog__icon-grid")).not.toBeInTheDocument();
    });
  });

  it("should handle icon selection from grid", async () => {
    renderIconDialog();

    await waitFor(() => {
      const iconItems = document.querySelectorAll(".icon-dialog__icon-item");
      expect(iconItems.length).toBeGreaterThan(0);
    });

    // Find an icon item specifically (not the SVG title) by CSS selector
    const addIcon = document.querySelector('.icon-dialog__icon-item[title="add"]');
    expect(addIcon).toBeInTheDocument();
    fireEvent.click(addIcon!);

    expect(mockOnSelectIcon).toHaveBeenCalledWith("add");
  });

  it("should close dialog when close button clicked", () => {
    renderIconDialog();

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should search case-insensitively", async () => {
    renderIconDialog();

    const searchInput = screen.getByPlaceholderText("Search icons by name...");
    fireEvent.change(searchInput, { target: { value: "ADD" } });

    await waitFor(() => {
      const iconItems = document.querySelectorAll(".icon-dialog__icon-item");
      expect(iconItems.length).toBeGreaterThan(0); // Should find icons containing "add" (case-insensitive)
    });
  });
});
