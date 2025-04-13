import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useWelcomeDialog } from "./useWelcomeDialog";

vi.mock("tldraw", () => ({
  useDialogs: () => ({ addDialog: vi.fn() }),
}));

describe("useWelcomeDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe("getDontShowAgainPreference", () => {
    it("should return false when preference is not set", () => {
      const { result } = renderHook(() => useWelcomeDialog());
      expect(result.current.getDontShowAgainPreference()).toBe(false);
      expect(localStorage.getItem("myDialog.hideDialog")).toBeNull();
    });

    it("should return true when preference is set to true", () => {
      localStorage.setItem("myDialog.hideDialog", "true");
      const { result } = renderHook(() => useWelcomeDialog());
      expect(result.current.getDontShowAgainPreference()).toBe(true);
    });
  });
});
