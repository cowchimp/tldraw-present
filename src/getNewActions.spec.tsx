import { describe, it, expect, vi, beforeEach } from "vitest";
import { getNewActions } from "./getNewActions";
import { TLUiEventSource } from "@tldraw/tldraw";

describe("getNewActions", () => {
  const mockProps = {
    togglePresentationEditMode: vi.fn(),
    togglePresentationMode: vi.fn(),
    isPresentationModeActive: false,
    maxStep: 5,
    setCurrentStep: vi.fn(),
  };

  const mockEvent: TLUiEventSource = "quick-actions";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return basic actions when presentation mode is not active", () => {
    const actions = getNewActions(mockProps);

    // Check if basic actions exist
    expect(actions["presentation-edit"]).toBeDefined();
    expect(actions["presentation"]).toBeDefined();

    // Check if presentation mode actions don't exist
    expect(actions["presentation-first"]).toBeUndefined();
    expect(actions["presentation-left"]).toBeUndefined();
    expect(actions["presentation-right"]).toBeUndefined();
    expect(actions["presentation-last"]).toBeUndefined();

    // Test basic actions properties
    expect(actions["presentation-edit"]).toEqual({
      id: "presentation-edit",
      label: "Edit Presentation",
      icon: "presentation-edit",
      onSelect: mockProps.togglePresentationEditMode,
    });

    expect(actions["presentation"]).toEqual({
      id: "presentation",
      label: "Present",
      icon: "presentation",
      onSelect: mockProps.togglePresentationMode,
    });
  });

  it("should include presentation navigation actions when presentation mode is active", () => {
    const activeProps = { ...mockProps, isPresentationModeActive: true };
    const actions = getNewActions(activeProps);

    // Check if all presentation mode actions exist
    expect(actions["presentation-first"]).toBeDefined();
    expect(actions["presentation-left"]).toBeDefined();
    expect(actions["presentation-right"]).toBeDefined();
    expect(actions["presentation-last"]).toBeDefined();

    // Test navigation actions properties
    expect(actions["presentation-first"]).toEqual({
      id: "presentation-first",
      label: "First",
      icon: "chevron-first",
      kbd: "Home",
      onSelect: expect.any(Function),
    });

    expect(actions["presentation-last"]).toEqual({
      id: "presentation-last",
      label: "Last",
      icon: "chevron-last",
      kbd: "End",
      onSelect: expect.any(Function),
    });
  });

  it("should handle navigation actions correctly", () => {
    const activeProps = { ...mockProps, isPresentationModeActive: true };
    const actions = getNewActions(activeProps);

    // Test first slide action
    actions["presentation-first"].onSelect?.(mockEvent);
    expect(activeProps.setCurrentStep).toHaveBeenCalledWith(0);

    // Test last slide action
    actions["presentation-last"].onSelect?.(mockEvent);
    expect(activeProps.setCurrentStep).toHaveBeenCalledWith(activeProps.maxStep);

    // Test previous slide action
    actions["presentation-left"].onSelect?.(mockEvent);
    expect(activeProps.setCurrentStep).toHaveBeenCalled();

    // Test next slide action
    actions["presentation-right"].onSelect?.(mockEvent);
    expect(activeProps.setCurrentStep).toHaveBeenCalled();
  });

  it("should handle navigation bounds correctly", () => {
    const activeProps = {
      ...mockProps,
      isPresentationModeActive: true,
      maxStep: 3,
      setCurrentStep: (stepOrFn: number | ((prev: number) => number)) => {
        if (typeof stepOrFn === "function") {
          return stepOrFn(0); // Test from first slide
        }
        return stepOrFn;
      },
    };
    const actions = getNewActions(activeProps);

    // Test previous slide at beginning
    const prevAction = actions["presentation-left"].onSelect?.(mockEvent);
    expect(prevAction).toBe(0); // Should not go below 0

    // Test next slide at beginning
    const nextAction = actions["presentation-right"].onSelect?.(mockEvent);
    expect(nextAction).toBe(1); // Should increment by 1
  });
});
