import { act, renderHook } from "@testing-library/react";
import { useToggle } from "../useToggle";

describe("useToggle", () => {
  it("should initialize with the default value", () => {
    const { result } = renderHook(() => useToggle(true));
    const [value] = result.current;
    expect(value).toBe(true);
  });

  it("should toggle the value when called without an argument", () => {
    const { result } = renderHook(() => useToggle(false));
    const [, toggleValue] = result.current;

    act(() => {
      toggleValue(); // 切り替える
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      toggleValue(); // 再度切り替える
    });

    expect(result.current[0]).toBe(false);
  });

  it("should set the value to the given boolean argument", () => {
    const { result } = renderHook(() => useToggle(false));
    const [, toggleValue] = result.current;

    act(() => {
      toggleValue(true);
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      toggleValue(false);
    });

    expect(result.current[0]).toBe(false);
  });
});
