import { renderHook } from "@testing-library/react";
import { useEffectOnce } from "../useEffectOnce";

describe("useEffectOnce", () => {
  it("should only call the callback once on mount", () => {
    const callback = vi.fn();

    renderHook(() => useEffectOnce(callback));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback on re-render", () => {
    const callback = vi.fn();

    const { rerender } = renderHook(() => useEffectOnce(callback));

    rerender();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call the callback on unmount", () => {
    const callback = vi.fn();

    const { unmount } = renderHook(() => useEffectOnce(callback));

    unmount();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
