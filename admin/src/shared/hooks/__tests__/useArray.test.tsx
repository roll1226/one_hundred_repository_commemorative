import { act, renderHook } from "@testing-library/react";
import { useArray } from "../useArray";

describe("useArray", () => {
  it("should initialize with default value", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    expect(result.current.array).toEqual([1, 2, 3]);
  });

  it("should add a new element using push", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => {
      result.current.push(4);
    });
    expect(result.current.array).toEqual([1, 2, 3, 4]);
  });

  it("should filter elements using filter", () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 4]));
    act(() => {
      result.current.filter((n) => n % 2 === 0);
    });
    expect(result.current.array).toEqual([2, 4]);
  });

  it("should update element at specified index", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => {
      result.current.update(1, 5);
    });
    expect(result.current.array).toEqual([1, 5, 3]);
  });

  it("should not update element if index is out of bounds", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => {
      result.current.update(5, 5);
    });
    expect(result.current.array).toEqual([1, 2, 3, 5]);
  });

  it("should remove element at specified index", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => {
      result.current.remove(1);
    });
    expect(result.current.array).toEqual([1, 3]);
  });

  it("should not remove element if index is out of bounds", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => {
      result.current.remove(5);
    });
    expect(result.current.array).toEqual([1, 2, 3]);
  });

  it("should clear all elements", () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));
    act(() => {
      result.current.clear();
    });
    expect(result.current.array).toEqual([]);
  });
});
