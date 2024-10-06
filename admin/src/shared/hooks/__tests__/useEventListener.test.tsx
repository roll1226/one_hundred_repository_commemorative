import { renderHook } from "@testing-library/react";
import { useEventListener } from "../useEventListener";
import { fireEvent } from "@testing-library/dom";

describe("useEventListener", () => {
  it("should add event listener to the window by default", () => {
    const mockCallback = vi.fn();

    renderHook(() => useEventListener("resize", mockCallback));

    // Trigger the resize event
    fireEvent(window, new Event("resize"));

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should add event listener to the provided element", () => {
    const mockCallback = vi.fn();
    const div = document.createElement("div");

    renderHook(() => useEventListener("click", mockCallback, div));

    fireEvent.click(div);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should remove the event listener on cleanup", () => {
    const mockCallback = vi.fn();
    const div = document.createElement("div");

    const { unmount } = renderHook(() =>
      useEventListener("click", mockCallback, div)
    );

    fireEvent.click(div);

    expect(mockCallback).toHaveBeenCalledTimes(1);

    unmount();

    fireEvent.click(div);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should handle ref objects as the target element", () => {
    const mockCallback = vi.fn();
    const div = document.createElement("div");

    renderHook(() => {
      const ref = { current: div };
      useEventListener("click", mockCallback, ref);
    });

    fireEvent.click(div);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
