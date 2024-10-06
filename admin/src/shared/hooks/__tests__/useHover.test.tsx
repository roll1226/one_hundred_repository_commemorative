import { act, renderHook } from "@testing-library/react";
import { useHover } from "../useHover";

describe("useHover", () => {
  it("should return false when not hovered", () => {
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() => useHover(ref));

    expect(result.current).toBe(false);
  });

  it("should return true when hovered", () => {
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() => useHover(ref));

    // マウスオーバーイベントを発生させる
    act(() => {
      ref.current?.dispatchEvent(
        new MouseEvent("mouseover", { bubbles: true })
      );
    });

    expect(result.current).toBe(true);
  });

  it("should return false when mouse leaves", () => {
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() => useHover(ref));

    // マウスオーバーイベントを発生させる
    act(() => {
      ref.current?.dispatchEvent(
        new MouseEvent("mouseover", { bubbles: true })
      );
    });

    expect(result.current).toBe(true);

    // マウスアウトイベントを発生させる
    act(() => {
      ref.current?.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
    });

    expect(result.current).toBe(false);
  });
});
