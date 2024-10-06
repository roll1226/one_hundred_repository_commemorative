import { act, renderHook } from "@testing-library/react";
import { useStateWithHistory } from "../useStateWithHistory";

describe("useStateWithHistory", () => {
  it("should initialize with default value", () => {
    const { result } = renderHook(() => useStateWithHistory("initial"));
    const [value] = result.current;
    expect(value).toBe("initial");
  });

  it("should add new values to history", () => {
    const { result } = renderHook(() => useStateWithHistory("initial"));
    const [, setValue] = result.current;

    act(() => {
      setValue("first");
    });

    act(() => {
      setValue("second");
    });

    const { history } = result.current[2];
    expect(history).toEqual(["initial", "first", "second"]);
  });

  it("should respect history capacity", () => {
    const { result } = renderHook(() =>
      useStateWithHistory("initial", { capacity: 2 })
    );
    const [, setValue] = result.current;

    act(() => {
      setValue("first");
      setValue("second");
      setValue("third");
    });

    const { history } = result.current[2];
    expect(history).toEqual(["second", "third"]);
  });

  it("should navigate back in history", () => {
    const { result } = renderHook(() => useStateWithHistory("initial"));
    const [, setValue] = result.current;

    act(() => {
      setValue("first");
      setValue("second");
    });

    const { back, history } = result.current[2];

    act(() => {
      back();
    });

    expect(result.current[0]).toBe("first");
    expect(history).toEqual(["initial", "first", "second"]);
  });

  it("should navigate forward in history", () => {
    const { result } = renderHook(() => useStateWithHistory("initial"));
    const [, setValue] = result.current;

    act(() => {
      setValue("first");
      setValue("second");
    });

    const { back, forward } = result.current[2];

    act(() => {
      back();
    });

    act(() => {
      forward();
    });

    expect(result.current[0]).toBe("second");
  });

  it("should go to a specific history index", () => {
    const { result } = renderHook(() => useStateWithHistory("initial"));
    const [, setValue] = result.current;

    act(() => {
      setValue("first");
      setValue("second");
      setValue("third");
    });

    const { go } = result.current[2];

    act(() => {
      go(0);
    });

    expect(result.current[0]).toBe("initial");

    act(() => {
      go(1);
    });

    expect(result.current[0]).toBe("first");

    act(() => {
      go(2);
    });

    expect(result.current[0]).toBe("second");
  });
});
